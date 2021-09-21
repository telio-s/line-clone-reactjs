import React, { useContext, useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
  Button,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { EventNote, MoreVert, Attachment } from "@material-ui/icons";
import CallIcon from "@material-ui/icons/Call";
import { API, graphqlOperation, Storage } from "aws-amplify";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { DashboardContext } from "../Page/Dashboard";
import {
  getDirect,
  getMessageByDateInGroup,
  getTheGroup,
} from "../api/queries";
import { createMessageInGroup } from "./../api/mutations";
import { newOnCreateMessage } from "../graphql/subscriptions";
import AddFriendsToGroup from "./AddFriendsToGroup";
import { getToken, sendRequestPost } from "../firebase/firebase";
import useStyles from "../Style/ChatRoomStyle";
import DialogCaller from "../webRTC/DialogCaller";
import DialogCallReceiver from "../webRTC/DialogCallReceiver";
import { resizeImages } from "../utils/resizeImage";
import aws_exports from "../aws-exports";

export const DirectChatRoomContext = React.createContext();
const DirectChatRoom = () => {
  const { idGroup } = useParams();
  console.log(idGroup);
  const { user, setFriend, friend } = useContext(DashboardContext);
  const classes = useStyles();
  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [directId, setDirectId] = useState("");
  const [openInvite, setOpenInvite] = useState(false);
  const [direct, setDirect] = useState([]);
  const [alreadyIn, setAlreadyIn] = useState([]);
  const hiddenFileUpload = useRef(null);
  const [files, setFiles] = useState([]);
  const [resizedImgs, setResizedImgs] = useState([]);
  const [realTimeData, setRealTimeData] = useState();
  const [call, setCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [idCall, setIdCall] = useState("");
  const [friendthis, setFriendThis] = useState("");
  const dummy = useRef();
  const id = idGroup;
  // after add friend we have to create group after that
  // so first when we get to direct message withe other user we have to find the group
  useEffect(() => {
    async function getMessages() {
      const data = await getMessageByDateInGroup(idGroup);
      const group = await getTheGroup(idGroup);
      setDirectId(id);
      setMessages(data);
      console.log(data, id, group);
      setDirect(group);
      let aIn = [];
      group.users.items.map(async (thisuser) => {
        if (thisuser.user.id !== user.id) {
          console.log(thisuser.user);
          setFriendThis(thisuser.user);
          await setFriend(thisuser.user);
        }
        aIn.push(thisuser.user.id);
      });
      setAlreadyIn([...aIn]);
      scrollToBottom();
    }

    getMessages();
  }, [realTimeData, idGroup]);

  useEffect(() => {
    setupSubscriptions();
    console.log("gg", friendthis);
    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, [friendthis]);

  let subscriptionOnCreate;
  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(newOnCreateMessage)
    ).subscribe({
      next: async (data) => {
        console.log(data.value.data.newOnCreateMessage.isCall);
        setRealTimeData(data);
        if (data.value.data.newOnCreateMessage) {
          const token = await getToken();
          console.log(token);
          if (
            data.value.data.newOnCreateMessage.user.username !== user.username
          ) {
            sendRequestPost(
              token,
              `${data.value.data.newOnCreateMessage.user.username} sent`,
              data.value.data.newOnCreateMessage.message
            );
          }

          if (
            data.value.data.newOnCreateMessage.isCall &&
            data.value.data.newOnCreateMessage.user.username !== user.username
          ) {
            console.log("recieve if");
            setIncomingCall(true);
          }
          setIdCall(data.value.data.newOnCreateMessage.group.id);
        }
      },
    });
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!files.length && currMessage === "") {
      console.log("nothing to upload");
      return;
    }
    async function createMessage(message) {
      const data = await createMessageInGroup(message);
      setMessages([...messages, data.data.createMessage]);
    }
    if (files) {
      console.log(files);
      console.log("uploading file...");
      const responsePromise = files.map(async (file) => {
        return Storage.put(file.name, file.file, {
          contentType: file.file.type,
        }).then((data) => {
          console.log(data);
          return `https://${aws_exports.aws_user_files_s3_bucket}.s3.${aws_exports.aws_user_files_s3_bucket_region}.amazonaws.com/public/${data.key}`;
        });
      });

      const responses = await Promise.all(responsePromise)
        .then((resolve) => [...resolve])
        .catch((error) => console.log(error));
      const message = {
        type: directId,
        message: currMessage,
        messageUserId: user.id,
        messageGroupId: directId,
        isBlock: false,
        hasRead: false,
        isCall: false,
        media: responses,
      };
      createMessage(message);
      console.log("send message!", message);
      setCurrMessage("");
      setResizedImgs([]);
      setFiles([]);
      return;
    }
    const message = {
      type: directId,
      message: currMessage,
      messageUserId: user.id,
      messageGroupId: directId,
      isBlock: false,
      hasRead: false,
      isCall: false,
    };
    createMessage(message);
    console.log("send message!", message);
    setCurrMessage("");
    setResizedImgs([]);
    setFiles([]);
  }

  const scrollToBottom = () => {
    // console.log("test auto scroll when useeffect");
    console.log(dummy);
    dummy.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleCall = () => {
    setCall(true);
    const message = {
      type: directId,
      message: "Calling someone",
      messageUserId: user.id,
      messageGroupId: directId,
      isBlock: false,
      isCall: true,
    };
    console.log("press call");

    async function createMessage(message) {
      const data = await createMessageInGroup(message);
      setMessages([...messages, data.data.createMessage]);
      console.log(data.data.createMessage);
      // setIdCall(data.data.createMessage.group.id);
    }

    createMessage(message);
  };

  function handleInviteFriends() {
    setOpenInvite(!openInvite);
    console.log("handle invite friends");
  }

  function handleOnChangeSelectPhoto(e) {
    console.log("upload photo");
    console.log(e.target.files);
    resizeImages(e.target.files, setResizedImgs, setFiles);
  }

  function handleTriggerSelectPhoto() {
    hiddenFileUpload.current.click();
  }

  const closeDialogCall = () => {
    setCall(false);
  };

  const closeIncomingCall = () => {
    setIncomingCall(false);
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={classes.Toolbar}>
          <Typography
            className={classes.nameChat}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            {friendthis.username}
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
          </IconButton>
          <IconButton
            onClick={() => handleCall()}
            className={classes.iconButton}
          >
            <CallIcon className={classes.iconSection} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => handleInviteFriends()}
          >
            <MoreVert className={classes.iconSection} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.chatfeed}>
        {messages
          ? messages.map((message, index) =>
              message.user.id === user.id ? (
                <MyMessageBubble key={index} message={message} />
              ) : (
                <TheirMessageBubble key={index} message={message} />
              )
            )
          : null}
        <div ref={dummy} />
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
          <input
            type="file"
            ref={hiddenFileUpload}
            onChange={(e) => handleOnChangeSelectPhoto(e)}
            style={{ display: "none" }}
            multiple="multiple"
          />
          <IconButton
            className={classes.iconButton}
            onClick={() => handleTriggerSelectPhoto()}
          >
            <Attachment />
          </IconButton>
          <Button
            style={{
              display: currMessage || files ? "" : "none",
              marginLeft: "auto",
            }}
            type="submit"
          >
            Send
          </Button>
          {resizedImgs
            ? resizedImgs.map((uri, index) => (
                <img key={index} src={uri} style={{ width: "50px" }} />
              ))
            : null}
        </div>
      </form>

      <Divider />

      <AddFriendsToGroup
        open={openInvite}
        onClose={handleInviteFriends}
        group={direct}
        alreadyIn={alreadyIn}
        setAlreadyIn={setAlreadyIn}
        isGroup={0}
      />
      {call && idCall ? (
        <DialogCaller
          open={call}
          onClose={closeDialogCall}
          idCall={idCall}
          myUser={user}
          myFriend={friendthis}
        />
      ) : null}
      {incomingCall && idCall ? (
        <DialogCallReceiver
          open={incomingCall}
          onClose={closeIncomingCall}
          idCall={idCall}
          myUser={user}
          myFriend={friendthis}
        />
      ) : null}
    </div>
  );
};

export default DirectChatRoom;
