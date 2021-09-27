import React, { useEffect, useState, useRef } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
  Switch,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@material-ui/core";
import { Auth, Hub } from "aws-amplify";
import { getUserById } from "../../../api/queries";
import {
  EventNote,
  MoreVert,
  Attachment,
  CallRounded,
  VideocamRounded,
} from "@material-ui/icons";
import { getGroupById } from "../../../api/queries";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { createMessageInGroup } from "../../../api/mutations";
import { setLocalTimeZone } from "../../../service/Localtime";
import { scrollToBottom } from "../../../service/ScrollView";
import useStyles from "../../../Style/ChatFeedRoomStyle";

const ChatFeedRoom = (props) => {
  const { myUser, chat, setChat, dummy, setCaller, selection, setMyUser } =
    props;
  const classes = useStyles();
  const idGroup = useParams();
  const [currentMsg, setCurrentMsg] = useState();

  const match = useRouteMatch();
  useEffect(() => {
    checkUserCurrent();

    if (dummy.current) {
      scrollToBottom(dummy);
    }

    if (!chat) {
      console.log("no chat");
      fetch(match.params.idGroup);
    }

    return () => {};
  }, []);

  const handleSendMessage = async (e) => {
    if (e.keyCode === 13) {
      const message = {
        type: idGroup.idGroup,
        message: currentMsg,
        messageUserId: myUser.id,
        messageGroupId: idGroup.idGroup,
        isBlock: false,
        hasRead: false,
        isCall: false,
        // media: responses,
      };
      const msg = await createMessageInGroup(message);
      const time = setLocalTimeZone(msg.createdAt);

      // Set for bubble of chatfeed UI
      // await setChat((prevState) => ({
      //   idGroup: prevState.idGroup,
      //   name: prevState.name,
      //   sender: msg.user.username,
      //   content: msg.message,
      //   time: time,
      //   ISOtime: msg.createdAt,
      //   theirUser: { ...prevState.theirUser },
      //   messages: [...prevState.messages, msg],
      // }));

      // Set for chatlist UI
      // setChatList(
      //   chatList.map((obj) =>
      //     obj.idGroup === idGroup.idGroup
      //       ? {
      //           ...obj,
      //           sender: msg.user.username,
      //           content: msg.message,
      //           time: time,
      //           ISOtime: msg.createdAt,
      //           theirUser: { ...obj.theirUser },
      //           messages: [...obj.messages, msg],
      //         }
      //       : obj
      //   )
      // );
      setCurrentMsg("");
    }
  };

  const checkUserCurrent = async () => {
    // Get id by checking user current auth
    const auth = await Auth.currentAuthenticatedUser();
    console.log(auth);
    const id = auth.attributes.sub;

    // Get User by id
    try {
      const userById = await getUserById(id);
      setMyUser(userById);
    } catch (err) {
      console.log(err);
    }
  };

  const fetch = async (id) => {
    console.log(id);
    const group = await getGroupById(id);
    // console.log(group);
    // console.log(group.messages.items.length);
    setChat({
      idGroup: group.id,
      name: group.name,
      sender: "",
      content: "",
      time: "",
      ISOtime: group.createdAt,
      theirUser: group.messages.items[group.messages.items.length - 1].user,
      messages: group.messages.items,
    });
  };

  return (
    <div
      className={selection === "chats" ? classes.root : classes.rootNoAppbar}
    >
      {/* {console.log(location.pathname, match)} */}
      {/* {chat ? fetch(match.params.idGroup) : console.log(chat, "no have chat")} */}
      {console.log("chat", chat)}
      {chat && myUser && (
        <>
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
              <IconButton className={classes.iconButton}>
                <MoreVert className={classes.iconSection} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div
            className={
              selection === "chats"
                ? classes.chatfeed
                : classes.chatfeedNoAppbar
            }
          >
            {console.log(myUser)}
            {chat
              ? chat.messages.map((message, index) =>
                  message.user.id === myUser.id ? (
                    <MyMessageBubble key={index} message={message} />
                  ) : (
                    <TheirMessageBubble
                      key={index}
                      message={message}
                      user={chat.theirUser}
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
      <form className={classes.textArea}>
        <InputBase
          placeholder="Enter a message"
          fullWidth
          multiline
          rowsMin={1}
          maxRows={5}
          style={{ height: "70px" }}
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
          onKeyUp={(e) => {
            handleSendMessage(e);
          }}
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

export default ChatFeedRoom;
