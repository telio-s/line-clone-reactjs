import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
  Button,
} from "@material-ui/core";
import { EventNote, MoreVert, Attachment } from "@material-ui/icons";

import useStyles from "../Style/ChatRoomStyle";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { DashboardContext } from "../Page/Dashboard";
import { getDirect } from "../api/queries";
import { createMessageInGroup } from "./../api/mutations";

const DirectChatRoom = (props) => {
  const { friend } = props;
  const { user } = useContext(DashboardContext);
  const classes = useStyles();
  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [directId, setDirectId] = useState("");

  // after add friend we have to create group after that
  // so first when we get to direct message withe other user we have to find the group
  useEffect(() => {
    async function getMessages() {
      const [data, id] = await getDirect(user.username, friend.username);
      console.log(data, id);
      setDirectId(id);
      setMessages(data);
    }
    getMessages();
  }, []);

  function handleSendMessage(e) {
    e.preventDefault();
    const message = {
      type: directId,
      message: currMessage,
      messageUserId: user.id,
      messageGroupId: directId,
      isBlock: false,
    };
    async function createMessage() {
      console.log(message);
      const data = await createMessageInGroup(message);
      console.log(data);
      setMessages([...messages, data.data.createMessage]);
    }
    try {
      createMessage();
      console.log("send message!", message);
      setCurrMessage("");
    } catch (error) {
      console.log("Can't send Message", error);
    }
  }

  return (
    <div className={classes.root}>
      <Divider orientation="vertical" flexItem />
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={classes.Toolbar}>
          <Typography
            className={classes.nameChat}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            {friend.username}
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <MoreVert className={classes.iconSection} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {messages
        ? messages.map((message, index) =>
            message.user.id === user.id ? (
              <MyMessageBubble key={index} message={message} />
            ) : (
              <TheirMessageBubble key={index} message={message} />
            )
          )
        : null}
      <Divider />
      <form className={classes.textArea} onSubmit={(e) => handleSendMessage(e)}>
        <InputBase
          placeholder="Enter a message"
          fullWidth
          multiline
          rowsMin={1}
          maxRows={5}
          style={{ height: "70px" }}
          value={currMessage}
          onChange={(e) => setCurrMessage(e.target.value)}
        ></InputBase>
        <div className={classes.iconButtTextArea}>
          <IconButton className={classes.iconButton}>
            <Attachment />
          </IconButton>
          <Button
            style={{ display: currMessage ? "" : "none", marginLeft: "auto" }}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DirectChatRoom;
