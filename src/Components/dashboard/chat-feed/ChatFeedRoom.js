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
import {
  EventNote,
  MoreVert,
  Attachment,
  CallRounded,
  VideocamRounded,
} from "@material-ui/icons";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { createMessageInGroup } from "../../../api/mutations";
import { setLocalTimeZone } from "../../../service/Localtime";
import {
  handleCall,
  handleCalleeDialogue,
  handleCallerDialogue,
} from "../../../utils/chat-room/utils";
import { scrollToBottom } from "../../../service/ScrollView";
import useStyles from "../../../Style/ChatFeedRoomStyle";
// import CallMenu from "../../../Menu/CallMenu";

const ChatFeedRoom = (props) => {
  const { myUser, chat, setChat, setChatList, chatList, dummy, selection } =
    props;
  const classes = useStyles();
  const idGroup = useParams();
  const [currentMsg, setCurrentMsg] = useState();
  const location = useLocation();
  const [caller, setCaller] = useState({ isCall: false, type: "audio" });
  const [callee, setCallee] = useState({ isCall: false, type: "audio" });

  useEffect(() => {
    if (dummy.current) {
      scrollToBottom(dummy);
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

  return (
    <div
      className={selection === "chats" ? classes.root : classes.rootNoAppbar}
    >
      {/* {console.log(location.pathname)} */}
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
            <VideocamRounded classeName={classes.iconSection} />
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
        {console.log(chat)}
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
      {/* {caller.isCall && idGroup && (
        <CallerDialogue
          open={caller.isCall}
          onclose={() => handleCallerDialogue(setCaller)}
          id={idGroup.idGroup}
          callee={chat.theirUser}
          call={caller}
          setCall={setCaller}
        />
      )}
      {callee.isCall && idGroup && (
        <CalleeDialogue
          open={callee.isCall}
          onclose={() => handleCalleeDialogue(setCallee)}
          id={idGroup.idGroup}
          caller={myUser}
          call={callee}
          setCall={setCallee}
        />
      )} */}
    </div>
  );
};

export default ChatFeedRoom;
