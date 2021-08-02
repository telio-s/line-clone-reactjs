import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  InputAdornment,
  Box,
  Button,
} from "@material-ui/core";
import { SearchOutlined, AccountCircle } from "@material-ui/icons";

import useStyles from "../Style/ChatRoomListStyle";

const ChatRoomList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar>
          <InputBase
            fullWidth
            className={classes.searchInput}
            placeholder="Search for chats and messages"
            startAdornment={
              <InputAdornment position="start" variant="filled">
                <SearchOutlined className={classes.iconSearch} />
              </InputAdornment>
            }
          />
        </Toolbar>
      </AppBar>
      <Button disableRipple="true" className={classes.chatRoom}>
        <AccountCircle style={{ fontSize: "60px" }} />
        <div className={classes.chatDesc}>
          <Typography className={classes.nameChat}>Name Chat</Typography>
          <Typography
            noWrap={false}
            gutterBottom
            className={classes.multiLineEllipsis}
          >
            Eu duis irure ut mollit quis aliqua qui. Ut nisi commodo esse
            deserunt sint qui in. Consequat nisi et exercitation culpa elit
            Dolore ad veniam irure magna sit. dolor ex.
          </Typography>
        </div>

        <Typography className={classes.timeChat}>12:00AM</Typography>
      </Button>
      <Button disableRipple="true" className={classes.chatRoom}>
        <AccountCircle style={{ fontSize: "60px" }} />
        <div className={classes.chatDesc}>
          <Typography className={classes.nameChat}>Name Chat</Typography>
          <Typography
            noWrap={false}
            gutterBottom
            className={classes.multiLineEllipsis}
          >
            Aliquip veniam reprehenderit adipisicing aliqua pariatur commodo
            sunt tempor ipsum enim labore ullamco dolore.
          </Typography>
        </div>

        <Typography className={classes.timeChat}>12:00AM</Typography>
      </Button>
      <Button disableRipple="true" className={classes.chatRoom}>
        <AccountCircle style={{ fontSize: "60px" }} />
        <div className={classes.chatDesc}>
          <Typography className={classes.nameChat}>Name Chat</Typography>
          <Typography
            noWrap={false}
            gutterBottom
            className={classes.multiLineEllipsis}
          >
            Aliquip veniam reprehenderit adipisicing aliqua pariatur commodo
            sunt tempor ipsum enim labore ullamco dolore.
          </Typography>
        </div>

        <Typography className={classes.timeChat}>12:00AM</Typography>
      </Button>
    </div>
  );
};

export default ChatRoomList;
