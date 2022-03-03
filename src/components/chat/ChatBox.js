import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@mui/styles';
import { connect } from "react-redux";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

import SendIcon from '@mui/icons-material/Send';

import socketIOClient from "socket.io-client";

import {
  getGlobalMessages,
  sendGlobalMessage,
  getConversationMessages,
  sendConversationMessage
} from "../../actions/message";

import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  headerRow: {
    maxHeight: 48,
    zIndex: 5,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.palette.primary.dark,
  },
  messageContainer: {
    display: "flex",
    alignContent: "flex-end",
  },
  messagesRow: {
    maxHeight: "calc(100vh - 184px)",
    overflowY: "auto",
  },
  newMessageRow: {
    width: "100%",
    padding: theme.spacing(0, 2, 1),
  },
  messageBubble: {
    padding: 10,
    border: "1px solid white",
    backgroundColor: "white",
    borderRadius: "0 10px 10px 10px",
    boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
    marginTop: 8,
    maxWidth: "40em",
  },
  messageBubbleRight: {
    borderRadius: "10px 0 10px 10px",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  form: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
  },
  listItem: {
    display: "flex",
    width: "100%",
  },
  listItemRight: {
    flexDirection: "row-reverse",
  },
}));

const ChatBox = ({
  messages,
  getGlobalMessages,
  sendGlobalMessage,
  getConversationMessages,
  sendConversationMessage,
  selecteduser,
  user,
  scope
}) => {
  const currentUserId = user ? user._id : "";
  const [newMessage, setNewMessage] = useState("");

  let chatBottom = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    reloadMessages();
    scrollToBottom();
  }, [scope]);

  const reloadMessages = () => {
    if (scope === "welcome") {
      getGlobalMessages()
    } else if (scope !== null) {
      getConversationMessages(selecteduser._id)
    }
  };

  const scrollToBottom = () => {
    if(chatBottom.current)
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendConversationMessage(selecteduser._id, newMessage)
    setNewMessage("");
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.headerRow}>
        <Paper className={classes.paper} square elevation={2}>
          <Typography color="inherit" variant="h6">
            {scope}
          </Typography>
        </Paper>
      </Grid>
      {
        scope === "welcome" ? (
          <Grid container justifyContent="center">
            <Typography color="inherit" variant="h1">
              Welcome
            </Typography>
          </Grid>
        ) : (
          <Grid container>
            <Grid container className={classes.messageContainer}>
              <Grid item xs={12} className={classes.messagesRow}>
                {messages && (
                  <List>
                    {messages.map((m, index) => (
                      <ListItem
                        key={index}
                        className={classnames(classes.listItem, {
                          [`${classes.listItemRight}`]:
                            m.from._id === currentUserId,
                        })}
                        alignItems="flex-start"
                      >
                        <ListItemAvatar className={classes.avatar}>
                          <Avatar>
                            {m.name}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          classes={{
                            root: classnames(classes.messageBubble, {
                              [`${classes.messageBubbleRight}`]:
                                m.from === currentUserId,
                            }),
                          }}
                          primary={m.from.name}
                          secondary={<React.Fragment>{m.body}</React.Fragment>}
                        />
                      </ListItem>
                    ))}
                  </List>)
                }
                <div ref={chatBottom} />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid
                  container
                  className={classes.newMessageRow}
                  alignItems="flex-end"
                >
                  <Grid item xs={11}>
                    <TextField
                      id="message"
                      label="Message"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton type="submit">
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        )
      }
    </Grid>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  messages: state.message.messages
});

export default connect(mapStateToProps, {
  getGlobalMessages,
  sendGlobalMessage,
  getConversationMessages,
  sendConversationMessage
})(ChatBox);
