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
import { EventNote, MoreVert, Attachment } from "@material-ui/icons";
import CallIcon from "@material-ui/icons/Call";
import { API, graphqlOperation } from "aws-amplify";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { DashboardContext } from "../Page/Dashboard";
import { getDirect } from "../api/queries";
import { createMessageInGroup } from "./../api/mutations";
import { newOnCreateMessage } from "../graphql/subscriptions";
import AddFriendsToGroup from "./AddFriendsToGroup";
import { getToken, sendRequestPost } from "../firebase/firebase";
import useStyles from "../Style/ChatRoomStyle";
import { resizeImages } from "../utils/resizeImage";
import S3 from "react-aws-s3";
import handleCall from "../utils/handleCall";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};
const ReactS3Client = new S3(config);
const DirectChatRoom = (props) => {
  const { friend } = props;
  const { user, setFriend } = useContext(DashboardContext);
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

  const dummy = useRef();

  // after add friend we have to create group after that
  // so first when we get to direct message withe other user we have to find the group
  useEffect(() => {
    async function getMessages() {
      const [data, id, group] = await getDirect(user.username, friend.username);
      console.log(data);
      setDirectId(id);
      setMessages(data);
      setDirect(group.group);
      let aIn = [];
      group.group.users.items.map((user) => {
        aIn.push(user.user.id);
      });
      setAlreadyIn([...aIn]);
      console.log("scroll late");
      scrollToBottom();
    }

    getMessages();
    setFriend(friend);
  }, [friend, realTimeData]);

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, []);

  let subscriptionOnCreate;
  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(newOnCreateMessage)
    ).subscribe({
      next: async (data) => {
        console.log(data);
        setRealTimeData(data);
        if (data.value.data.newOnCreateMessage) {
          const token = await getToken();
          sendRequestPost(
            token,
            `${data.value.data.newOnCreateMessage.user.username} sent`,
            data.value.data.newOnCreateMessage.message
          );
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
        return ReactS3Client.uploadFile(file.file, file.name)
          .then((data) => {
            if (data.status === 204) {
              console.log("success to upload");
              return data.location;
            } else {
              console.log("failed to upload");
              return null;
            }
          })
          .catch((error) => console.log("Error: ", error));
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
    };
    createMessage(message);
    console.log("send message!", message);
    setCurrMessage("");
    setResizedImgs([]);
    setFiles([]);
  }

  const scrollToBottom = () => {
    console.log("test auto scroll when useeffect");
    dummy.current.scrollIntoView({
      behavior: "smooth",
    });
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

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={classes.Toolbar}>
          <Typography
            className={classes.nameChat}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            {friend.username}
          </Typography>
          <IconButton className={classes.iconButton}>
            <EventNote className={classes.iconSection} />
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
          <IconButton
            className={classes.iconButton}
            onClick={() => handleCall()}
          >
            <CallIcon />
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
    </div>
  );
};

export default DirectChatRoom;
