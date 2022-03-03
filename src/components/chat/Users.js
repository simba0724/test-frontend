import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
// import { useGetUsers } from "../Services/userService";
// import commonUtilites from "../Utilities/common";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { makeStyles } from '@mui/styles';

import { getUsers } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  subheader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  globe: {
    backgroundColor: theme.palette.primary.dark,
  },
  subheaderText: {
    color: theme.palette.primary.dark,
  },
  list: {
    maxHeight: "calc(100vh - 112px)",
    overflowY: "auto",
  },
  avatar: {
    margin: theme.spacing(0, 3, 0, 1),
  },
}));

const Users = ({users, getUsers, setUser, setScope}) => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(null);
  const [selectID, setSelectID] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   const socket = socketIOClient(process.env.REACT_APP_API_URL);
  //   socket.on("users", (data) => {
  //     // getUsers(data);
  //   });
  // }, []);

  return (
    <List className={classes.list}>
      {users && (
        <React.Fragment>
          {users.map((u) => (
            <ListItem
              className={classes.listItem}
              key={u._id}
              onClick={() => {
                setUser(u);
                setScope(u.name);
                setSelectID(u._id);
              }}
              button
              sx={{
                backgroundColor: selectID === u._id ? "#999" : 'white'
              }}
            >
              <ListItemAvatar className={classes.avatar}>
                <Avatar>{u.name}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={u.name} />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};

const mapStateToProps = state => ({
  users: state.auth.users
});

export default connect(mapStateToProps, { getUsers })(Users);
