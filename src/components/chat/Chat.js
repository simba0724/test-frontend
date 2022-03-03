import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ChatBox from './ChatBox';
// import Conversations from './Conversations';
import Users from './Users';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: 'calc(100vh - 64px)',
    borderRadius: 0,
  },
  sidebar: {
    zIndex: 8,
  },
  subheader: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  globe: {
    backgroundColor: theme.palette.primary.dark,
  },
  subheaderText: {
    color: theme.palette.primary.dark,
  },
}));

const Chat = ({isAuthenticated}) => {
  const [scope, setScope] = useState('welcome');
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);
  const classes = useStyles();

  const handleChange = (e, newVal) => {
    setTab(newVal);
  };

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <React.Fragment>
      <Grid container sx={{pt: 9}}>
        <Grid item md={4} className={classes.sidebar}>
          <Paper className={classes.paper} square elevation={5}>
              <Paper square>
                <Tabs
                  onChange={handleChange}
                  variant="fullWidth"
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Users" />
                  <Tab label="Group" />
                </Tabs>
              </Paper>
              {tab === 0 && (
                <Users setUser={setUser} setScope={setScope} />
              )}
              {/*{tab === 0 && (
                <Conversations
                  setUser={setUser}
                  setScope={setScope}
                />
              )}*/}
          </Paper>
        </Grid>
        <Grid item md={8}>
          <ChatBox scope={scope} selecteduser={user} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Chat);