import React, { useContext, useEffect, useRef, useState } from "react";
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
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { DashboardContext } from "../Page/Dashboard";
import { getDirect } from "../api/queries";
import { createMessageInGroup } from "./../api/mutations";
import AddFriendsToGroup from "./AddFriendsToGroup";
import useStyles from "../Style/ChatRoomStyle";
import { resizeImages } from "../utils/resizeImage";
import S3 from "react-aws-s3";

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

  // after add friend we have to create group after that
  // so first when we get to direct message withe other user we have to find the group
  useEffect(() => {
    async function getMessages() {
      const [data, id, group] = await getDirect(user.username, friend.username);
      // console.log(data, id, group.group);
      setDirectId(id);
      setMessages(data);
      setDirect(group.group);
      let aIn = [];
      group.group.users.items.map((user) => {
        aIn.push(user.user.id);
      });
      setAlreadyIn([...aIn]);
    }

    getMessages();
    setFriend(friend);
  }, [friend]);

  async function handleSendMessage(e) {
    e.preventDefault();

    async function createMessage(message) {
      console.log(message);
      try {
        console.log("send message!", message);
        const data = await createMessageInGroup(message);
        setMessages([...messages, data.data.createMessage]);
      } catch (error) {
        console.log("Can't create message");
      }
    }
    if (!files.length && currMessage === "") {
      console.log("nothing to upload");
      return;
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
    }
  }

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
      {/* <Divider orientation="vertical" flexItem /> */}
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
      {messages
        ? messages.map((message, index) =>
            message.user.id === user.id ? (
              <MyMessageBubble key={index} message={message} />
            ) : (
              <TheirMessageBubble key={index} message={message} />
            )
          )
        : null}
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
        {resizedImgs
          ? resizedImgs.map((uri, index) => (
              <img key={index} src={uri} style={{ width: "50px" }} />
            ))
          : null}
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
        </div>
      </form>
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
