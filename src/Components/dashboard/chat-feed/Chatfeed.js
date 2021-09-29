import React from "react";
import CallMenu from "../../Menu/CallMenu";
import {
  EventNote,
  MoreVert,
  Attachment,
  CallRounded,
  VideocamRounded,
} from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@material-ui/core";
import TheirMessageBubble from "./TheirMessageBubble";
import MyMessageBubble from "./MyMessageBubble";
const Chatfeed = (props) => {
  const {
    classes,
    chatCrnt,
    setCaller,
    idGroup,
    myUser,
    handleCallMenu,
    anchorEl,
    setAnchorEl,
    selection,
    dummy,
  } = props;
  return (
    <>
      {console.log("chatC", chatCrnt, "myUserC", myUser)}
      {chatCrnt && myUser && (
        <>
          <AppBar elevation={0} position="static" className={classes.appbar}>
            <Toolbar className={classes.Toolbar}>
              <Typography
                className={classes.nameChat}
                style={{ flexGrow: 1, textAlign: "left" }}
              >
                {chatCrnt.theirUser.displayName}
              </Typography>
              <IconButton className={classes.iconButton}>
                <EventNote className={classes.iconSection} />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={(e) => handleCallMenu(e, anchorEl, setAnchorEl)}
              >
                <CallRounded className={classes.iconSection} />
              </IconButton>
              <IconButton className={classes.iconButton}>
                <MoreVert className={classes.iconSection} />
              </IconButton>
              {anchorEl && (
                <CallMenu
                  setCaller={setCaller}
                  idGroup={idGroup.idGroup}
                  user={myUser}
                  onclose={() => handleCallMenu(null, anchorEl, setAnchorEl)}
                  anchorEl={anchorEl}
                />
              )}
            </Toolbar>
          </AppBar>
          <div
            className={
              selection === "chats"
                ? classes.chatfeed
                : classes.chatfeedNoAppbar
            }
          >
            {/* {console.log(myUser)} */}
            {chatCrnt
              ? chatCrnt.messages.map((message, index) =>
                  message.user.id === myUser.id ? (
                    <MyMessageBubble key={index} message={message} />
                  ) : (
                    <TheirMessageBubble
                      key={index}
                      message={message}
                      user={chatCrnt.theirUser}
                      setCaller={setCaller}
                      idGroup={idGroup.idGroup}
                      myUser={myUser}
                    />
                  )
                )
              : null}
            <div ref={dummy} />
          </div>
          <Divider />
        </>
      )}
    </>
  );
};

export default Chatfeed;
