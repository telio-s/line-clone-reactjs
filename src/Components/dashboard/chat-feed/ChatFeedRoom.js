import React, { useEffect, useState, useRef } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@material-ui/core";
import { Attachment, CallRounded } from "@material-ui/icons";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { createMessageInGroup } from "../../../api/mutations";
import { setLocalTimeZone } from "../../../service/Localtime";
import { handleCallMenu, isEmpty } from "../../../utils/chat-room/utils";
import CallMenu from "../../Menu/CallMenu";
import { scrollToBottom } from "../../../service/ScrollView";
import {
  setImagesLocation,
  uploadFiles,
} from "./../../../utils/sending-media/utils";
import useStyles from "../../../Style/ChatFeedRoomStyle";

const ChatFeedRoom = (props) => {
  const { myUser, chat, dummy, selection, setCaller, setParamsId } = props;
  const classes = useStyles();
  const idGroup = useParams();
  const [currentMsg, setCurrentMsg] = useState();
  const [imgs, setImgs] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);
  const hiddenUploadBtn = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const match = useRouteMatch();

  useEffect(async () => {
    if (dummy.current) {
      scrollToBottom(dummy);
    }
    setParamsId(match.params.idGroup);

    return () => {};
  }, []);

  const handleSendMessage = async (e) => {
    if (e.keyCode === 13) {
      if (isEmpty(currentMsg) && isEmpty(imgs)) {
        setCurrentMsg("");
        return;
      }
      let message = {
        type: idGroup.idGroup,
        message: currentMsg,
        messageUserId: myUser.id,
        messageGroupId: idGroup.idGroup,
        isBlock: false,
        hasRead: false,
        isCall: false,
        messageReceiverId: chat.theirUser.id,
      };
      setImgs([]);
      const locations = setImagesLocation(filesUpload);
      message = { ...message, media: locations };
      const msg = await createMessageInGroup(message);
      const time = setLocalTimeZone(msg.createdAt);
      const responses = await uploadFiles(filesUpload);

      setCurrentMsg("");
      setFilesUpload([]);
    }
  };

  function handleSelectedFiles(e) {
    const files = e.target.files;
    // setFilesUpload(files);
    for (let i = 0; i < files.length; i++) {
      setFilesUpload((prevFiles) => [...prevFiles, files[i]]);
      const _img = URL.createObjectURL(files[i]);
      setImgs((prevImgs) => [...prevImgs, _img]);
    }
  }

  function handleTriggerUploadPhoto() {
    hiddenUploadBtn.current.click();
  }

  return (
    <div
      className={selection === "chats" ? classes.root : classes.rootNoAppbar}
    >
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
              <IconButton
                className={classes.iconButton}
                onClick={(e) => handleCallMenu(e, anchorEl, setAnchorEl)}
              >
                <CallRounded className={classes.iconSection} />
              </IconButton>
              {anchorEl && (
                <CallMenu
                  setCaller={setCaller}
                  idGroup={idGroup.idGroup}
                  user={myUser}
                  onclose={() => handleCallMenu(null, anchorEl, setAnchorEl)}
                  anchorEl={anchorEl}
                  theirUser={chat.theirUser}
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
            {/* {Number.isInteger(load) ? (
              chat && chat.messages ? (
                chat.messages.map((message, index) =>
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
              ) : null
            ) : (
              <h1> Tong Ton Tonmg</h1>
            )} */}
            {console.log("telios", chat)}
            {chat && chat.messages
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
          placeholder={imgs.length ? "" : "Enter a message"}
          id="input-message"
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
          startAdornment={
            imgs &&
            imgs.map((uri, index) => (
              <img
                key={index}
                src={uri}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  marginRight: "3px",
                  borderRadius: "5px",
                }}
              />
            ))
          }
        ></InputBase>
        <input
          ref={hiddenUploadBtn}
          style={{ display: "none" }}
          type="file"
          multiple="multiple"
          onChange={(e) => handleSelectedFiles(e)}
        />
        <div className={classes.iconButtTextArea}>
          <IconButton
            className={classes.iconButton}
            onClick={() => handleTriggerUploadPhoto()}
          >
            <Attachment />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default ChatFeedRoom;
