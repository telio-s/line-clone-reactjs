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

import { getMessageByDateInGroup } from "./../api/queries";
import { createMessageInGroup } from "./../api/mutations";

import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";

import { DashboardContext } from "./../Page/Dashboard";

const GroupChatRoom = (props) => {
  const { group } = props;
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMessage] = useState("");
  const { user } = useContext(DashboardContext);

  useEffect(() => {
    async function getMessages() {
      const data = await getMessageByDateInGroup(group.id);
      setMessages(data);
    }
    getMessages();
  }, []);

  function handleSendMessage(e) {
    e.preventDefault();
    const message = {
      type: group.id,
      message: currMessage,
      messageUserId: user.id,
      messageGroupId: group.id,
      isBlock: false,
    };
    async function createMessage() {
      console.log(message);
      await createMessageInGroup(message);
    }
    try {
      createMessage();
      console.log("send message!", message);
      setMessages([...messages, message]);
    } catch (error) {
      console.log("Can't send Message", error);
    }
  }

  console.log(messages);
  return (
    <div className={classes.root}>
      <Divider orientation="vertical" flexItem />
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={classes.Toolbar}>
          <Typography
            className={classes.nameChat}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            {group.name}
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <MoreVert className={classes.iconSection} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.chatArea}>
        <MyMessageBubble />
        <TheirMessageBubble />
        <MyMessageBubble />
      </div>
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

export default GroupChatRoom;
