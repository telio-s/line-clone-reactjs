import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  InputAdornment,
  Button,
  Avatar,
} from "@material-ui/core";
import { updateMessageHasRead } from "../../api/mutations";
import { SearchOutlined } from "@material-ui/icons";
import { getImg } from "../../utils/profile/utils";
import useStyles from "../../Style/ChatListStyle";

const ChatList = (props) => {
  const {
    match,
    chatListArr,
    setChat,
    setChatList,
    chatList,
    setCountNoti,
    countNoti,
    myUser,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar>
          <InputBase
            fullWidth
            className={classes.searchInput}
            placeholder="Search for chats and messages"
            // onKeyUp={(e) => findChat(e)}
            startAdornment={
              <InputAdornment position="start" variant="filled">
                <SearchOutlined className={classes.iconSearch} />
              </InputAdornment>
            }
          />
        </Toolbar>
      </AppBar>
      {chatListArr.map((message, index) => (
        <div key={index}>
          <Link
            to={`${match.url}/${message.idGroup}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              disableRipple={true}
              className={classes.chatRoom}
              onClick={() => {
                const chat = chatListArr.find((obj) => {
                  return obj.idGroup === message.idGroup;
                });
                setChat({
                  idGroup: chat.idGroup,
                  name: chat.name,
                  sender: chat.sender,
                  content: chat.content,
                  time: chat.time,
                  ISOtime: chat.ISOtime,
                  theirUser: chat.theirUser,
                  messages: [
                    ...chat.messages.slice(0, chat.messages.length - 1),
                    {
                      ...chat.messages[chat.messages.length - 1],
                      hasRead: true,
                    },
                  ],
                  unread: chat.unread,
                });

                // update count unread to true on cloud
                const result = chat.messages.filter(
                  (item) => item.hasRead === false
                );
                const resultFilterTheirUser = result.filter(
                  (item) => item.user.username !== myUser.username
                );

                // updated hasRead on dynamodb
                console.log(resultFilterTheirUser);
                resultFilterTheirUser.map(async (data) => {
                  await updateMessageHasRead(data.id, true);
                });

                const updateReadObjs = chat.messages.map((item) =>
                  item.hasRead === false ? { ...item, hasRead: true } : item
                );
                // update count unread and hasRead in last message on chatlist UI
                setChatList(
                  chatList.map((obj) =>
                    obj.idGroup === chat.idGroup &&
                    resultFilterTheirUser.length > 0
                      ? {
                          idGroup: chat.idGroup,
                          name: chat.name,
                          sender: chat.sender,
                          content: chat.content,
                          time: chat.time,
                          ISOtime: chat.ISOtime,
                          theirUser: chat.theirUser,
                          messages: updateReadObjs,
                          unread: 0,
                        }
                      : obj
                  )
                );

                // update count unread on drawerMenu UI
                setCountNoti(countNoti - resultFilterTheirUser.length);
              }}
            >
              <Avatar
                src={
                  message.theirUser.profilePhoto &&
                  getImg(message.theirUser, "profile")
                }
                style={{ width: "50px", height: "50px" }}
              />
              <div className={classes.chatDesc}>
                <Typography className={classes.nameChat}>
                  {message.theirUser.displayName}
                </Typography>
                <Typography
                  noWrap={false}
                  gutterBottom
                  className={classes.multiLineEllipsis}
                >
                  {message.content}
                </Typography>
              </div>
              <div style={{ width: "20%" }}>
                <Typography className={classes.timeChat}>
                  {message.time}
                </Typography>
                <div className={message.unread === 0 ? null : classes.notiBox}>
                  <Typography
                    className={message.unread === 0 ? null : classes.noti}
                  >
                    {message.unread === 0 ? null : message.unread}
                  </Typography>
                </div>
              </div>
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
