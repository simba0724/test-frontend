import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { setAlert } from './actions/alert';
import { setLastMessage, getConversationMessages } from './actions/message';

import io from "socket.io-client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import './App.css';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {
      light: '#58a5f0',
      main: '#0277bd',
      dark: '#004c8c',
    },
    secondary: {
      light: '#ffd95a',
      main: '#f9a825',
      dark: '#c17900',
      contrastText: '#212121',
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: {
    useNextVariants: true,
  },
}));

const App = () => {
  const [socket, setSocket] = React.useState(null);
  // const state = store.getState();

  const setupSocket = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem('userid');
    if (token && !socket) {
      const newSocket = io("http://localhost:5000", {
        query: {
          token: localStorage.getItem("token"),
        },
        transports : ['websocket']
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        setAlert('Socket Disconnected!', 'danger');
      });

      newSocket.on(userid, (data) => {
        store.dispatch(setLastMessage(data));
        setSocket(null);
        setTimeout(setupSocket, 3000);
        setAlert('Socket gsagsfsad!', 'danger');
      });

      newSocket.on("connect", () => {
        setAlert("Socket Connected!", "success");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
    setupSocket();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
