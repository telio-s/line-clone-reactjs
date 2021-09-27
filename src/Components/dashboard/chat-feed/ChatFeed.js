import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@material-ui/core";
import {
  EventNote,
  MoreVert,
  Attachment,
  CallRounded,
  VideocamRounded,
} from "@material-ui/icons";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
const ChatFeed = (props) => {
  const {
    chat,
    classes,
    handleCall,
    selection,
    dummy,
    setCallee,
    setCaller,
    idGroup,
    myUser,
    setChat,
  } = props;
  return (
    <>
      {console.log(chat)}
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={classes.Toolbar}>
          <Typography
            className={classes.nameChat}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            {chat.theirUser.displayName}
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() =>
              handleCall(
                "audio",
                setCaller,
                setChat,
                chat,
                idGroup.idgroup,
                myUser
              )
            }
          >
            <CallRounded className={classes.iconSection} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() =>
              handleCall(
                "video",
                setCaller,
                setChat,
                chat,
                idGroup.idGroup,
                myUser
              )
            }
          >
            <VideocamRounded className={classes.iconSection} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <MoreVert className={classes.iconSection} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        className={
          selection === "chats" ? classes.chatfeed : classes.chatfeedNoAppbar
        }
      >
        {/* {console.log(chat)} */}
        {chat
          ? chat.messages.map((message, index) =>
              message.user.id === myUser.id ? (
                <MyMessageBubble key={index} message={message} />
              ) : (
                <TheirMessageBubble key={index} message={message} />
              )
            )
          : null}
        <div ref={dummy} />
      </div>
      <Divider />
    </>
  );
};

export default ChatFeed;
