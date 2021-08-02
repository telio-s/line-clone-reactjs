import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@material-ui/core";
import { EventNote, MoreVert, Attachment } from "@material-ui/icons";

import useStyles from "../Style/ChatRoomStyle";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";

const DirectChatRoom = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider orientation="vertical" flexItem />
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={classes.Toolbar}>
          <Typography
            className={classes.nameChat}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            Name Chat
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <MoreVert className={classes.iconSection} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.chatArea}>
        <MyMessageBubble />
        <TheirMessageBubble />
        <MyMessageBubble />
      </div> */}
      <Divider />
      <form className={classes.textArea}>
        <InputBase
          placeholder="Enter a message"
          fullWidth
          multiline
          rowsMin={1}
          maxRows={5}
          style={{ height: "70px" }}
        ></InputBase>
        <div className={classes.iconButtTextArea}>
          <IconButton className={classes.iconButton}>
            <Attachment />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default DirectChatRoom;
