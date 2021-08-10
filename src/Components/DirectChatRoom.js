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
import { Storage } from "aws-amplify";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { DashboardContext } from "../Page/Dashboard";
import { getDirect } from "../api/queries";
import { createMessageInGroup } from "./../api/mutations";
import AddFriendsToGroup from "./AddFriendsToGroup";
import awsExports from "./../aws-exports";
import useStyles from "../Style/ChatRoomStyle";

export const DirectContext = React.createContext();

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
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);

  // after add friend we have to create group after that
  // so first when we get to direct message withe other user we have to find the group
  useEffect(() => {
    async function getMessages() {
      const [data, id, group] = await getDirect(user.username, friend.username);
      console.log(data, id, group.group);
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
    // console.log(user.username, friend.username);
  }, [friend]);

  function handleSendMessage(e) {
    e.preventDefault();
    async function createMessage(message) {
      console.log(message);
      const data = await createMessageInGroup(message);
      console.log(data);
      setMessages([...messages, data.data.createMessage]);
    }
    if (!file && currMessage === "") {
      console.log("nothing to upload");
      return;
    }

    if (file) {
      console.log("uploading file...");

      async function storagePut() {
        try {
          await Storage.put(file.name, file, {
            contentType: file.type,
          });
          console.log("storage file successfully");
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
      }
      storagePut();
      const image = {
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
        key: "public/" + file.name,
      };
      const message = {
        type: directId,
        message: currMessage,
        messageUserId: user.id,
        messageGroupId: directId,
        isBlock: false,
        media: image,
      };
      try {
        createMessage(message);
        console.log("send message!", message);
        setCurrMessage("");
        return;
      } catch (error) {
        console.log("Can't send Message", error);
      }
    }
    const message = {
      type: directId,
      message: currMessage,
      messageUserId: user.id,
      messageGroupId: directId,
      isBlock: false,
    };
    try {
      console.log("uploading message...");
      createMessage(message);
      console.log("send message!", message);
      setCurrMessage("");
      return;
    } catch (error) {
      console.log("Can't send Message", error);
    }
  }

  function handleInviteFriends() {
    setOpenInvite(!openInvite);
    console.log("handle invite friends");
  }

  function handleUploadPhoto(e) {
    console.log("upload photo");
    const _file = e.target.files[0];
    console.log(_file);
    setFile(_file);
    setPhoto(URL.createObjectURL(_file));
  }

  function handleTriggerUploadPhoto() {
    hiddenFileUpload.current.click();
  }

  return (
    <DirectContext.Provider value={{ friend }}>
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
        <form
          className={classes.textArea}
          onSubmit={(e) => handleSendMessage(e)}
        >
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
          <img src={photo} />
          <div className={classes.iconButtTextArea}>
            <input
              type="file"
              ref={hiddenFileUpload}
              onChange={(e) => handleUploadPhoto(e)}
              style={{ display: "none" }}
            />
            <IconButton
              className={classes.iconButton}
              onClick={() => handleTriggerUploadPhoto()}
            >
              <Attachment />
            </IconButton>
            <Button
              style={{
                display: currMessage || file ? "" : "none",
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
    </DirectContext.Provider>
  );
};

export default DirectChatRoom;
