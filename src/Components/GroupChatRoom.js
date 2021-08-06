import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
  Button,
  Dialog,
  ListItem,
} from "@material-ui/core";
import { EventNote, MoreVert, Attachment } from "@material-ui/icons";

import useStyles from "../Style/ChatRoomStyle";

import { getMessageByDateInGroup, getTheGroup } from "./../api/queries";
import { createMessageInGroup } from "./../api/mutations";

import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";

import { DashboardContext } from "./../Page/Dashboard";
import AddFriendsToGroup from "./AddFriendsToGroup";

const GroupChatRoom = (props) => {
  const { group } = props;
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMessage] = useState("");
  const [addMember, setAddMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const { user, setAlreadyIn } = useContext(DashboardContext);

  useEffect(() => {
    async function getMessages() {
      const data = await getMessageByDateInGroup(group.id);
      setMessages(data);
    }
    async function getGroup() {
      const data = await getTheGroup(group.id);
      setMembers(data.users.items);
      let aIn = [];
      data.users.items.map((user) => {
        aIn.push(user.user.id);
      });
      setAlreadyIn([...aIn]);
    }
    getMessages();
    getGroup();
  }, [group]);

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
      const data = await createMessageInGroup(message);
      setMessages([...messages, data.data.createMessage]);
    }
    try {
      createMessage();
      setCurrMessage("");
    } catch (error) {
      console.log("Can't send Message", error);
    }
  }

  // but not for add friends to chat
  function handleAddMemberToGroup() {
    setAddMember(!addMember);
  }

  function handleAllMembers() {
    setShowMember(!showMember);
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
            {group.name}
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={handleAddMemberToGroup}
          >
            <MoreVert className={classes.iconSection} />
          </IconButton>
          <IconButton className={classes.iconButton} onClick={handleAllMembers}>
            <MoreVert className={classes.iconSection} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.chatArea}>
        {messages.length
          ? messages.map((message, index) =>
              message.user.id === user.id ? (
                <MyMessageBubble key={index} message={message} />
              ) : (
                <TheirMessageBubble key={index} message={message} />
              )
            )
          : null}
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
      <AddFriendsToGroup
        open={addMember}
        onClose={handleAddMemberToGroup}
        group={group}
      />
      <Dialog open={showMember} onClose={handleAllMembers}>
        <div style={{ width: "500px" }}>
          {members.map((member, index) => (
            <ListItem key={index}>{member.user.username}</ListItem>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default GroupChatRoom;
