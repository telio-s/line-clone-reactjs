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
import Chatfeed from "./Chatfeed";
import { getGroupById } from "../../../api/queries";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { createMessageInGroup } from "../../../api/mutations";
import { setLocalTimeZone } from "../../../service/Localtime";
import { handleCallMenu } from "../../../utils/chat-room/utils";
import CallMenu from "../../Menu/CallMenu";
import { scrollToBottom } from "../../../service/ScrollView";
import { uploadFiles } from "./../../../utils/sending-media/utils";
import useStyles from "../../../Style/ChatFeedRoomStyle";

const ChatFeedRoom = (props) => {
  const { myUser, chat, setChat, dummy, selection, setMyUser, setCaller } =
    props;
  const classes = useStyles();
  const idGroup = useParams();
  const [currentMsg, setCurrentMsg] = useState();
  const [imgs, setImgs] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);
  const hiddenUploadBtn = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [myUserLoaded, setMyUserLoaded] = useState();
  const [chatLoaded, setChatLoaded] = useState();
  const location = useLocation();
  const match = useRouteMatch();
  useEffect(() => {
    if (dummy.current) {
      scrollToBottom(dummy);
    }
    // console.log(chat);
    // if (!chat) {
    //   checkUserCurrent();
    //   console.log(chat, "no chat");
    //   const g = fetch(match.params.idGroup);
    //   console.log(g);
    // }

    return () => {};
  }, []);

  // useEffect(() => {
  //   console.log("useeffect2", chatLoaded, myUserLoaded);
  //   return () => {};
  // }, [chatLoaded, myUserLoaded]);

  const handleSendMessage = async (e) => {
    if (e.keyCode === 13) {
      let message = {
        type: idGroup.idGroup,
        message: currentMsg,
        messageUserId: myUser.id,
        messageGroupId: idGroup.idGroup,
        isBlock: false,
        hasRead: false,
        isCall: false,
      };
      if (filesUpload.length) {
        console.log(filesUpload);
        setImgs([]);
        const responses = await uploadFiles(filesUpload);
        console.log(responses);
        message = { ...message, media: responses };
      }
      const msg = await createMessageInGroup(message);
      const time = setLocalTimeZone(msg.createdAt);
      setCurrentMsg("");
      setFilesUpload([]);
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
      setMyUserLoaded(userById);
    } catch (err) {
      console.log(err);
    }
  };

  const fetch = async (id) => {
    console.log(id);
    const group = await getGroupById(id);
    console.log(group);
    // console.log(group.messages.items.length);
    setChatLoaded({
      idGroup: group.id,
      name: group.name,
      sender: "",
      content: "",
      time: "",
      ISOtime: group.createdAt,
      theirUser: group.messages.items[group.messages.items.length - 1].user,
      messages: group.messages.items,
    });

    return group;
  };

  function handleSelectedFiles(e) {
    const files = e.target.files;
    console.log(files);
    // setFilesUpload(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      setFilesUpload((prevFiles) => [...prevFiles, files[i]]);
      const _img = URL.createObjectURL(files[i]);
      setImgs((prevImgs) => [...prevImgs, _img]);
    }
  }

  function handleTriggerUploadPhoto() {
    console.log("trigger hidden btn");
    hiddenUploadBtn.current.click();
  }

  return (
    <div
      className={selection === "chats" ? classes.root : classes.rootNoAppbar}
    >
      {/* {console.log(
        "chat",
        chat,
        "chatL",
        chatLoaded,
        "myUser",
        myUser,
        "myUserL",
        myUserLoaded
      )}
      {(chat && myUser) || (chatLoaded && myUserLoaded) ? (
        <Chatfeed
          classes={classes}
          chatCrnt={chat ? chat : chatLoaded}
          setCaller={setCaller}
          idGroup={idGroup}
          myUser={myUser ? myUser : myUserLoaded}
          handleCallMenu={handleCallMenu}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          selection={selection}
          dummy={dummy}
        />
      ) : null} */}
      <form className={classes.textArea}>
        <InputBase
          placeholder={imgs.length ? "" : "Enter a message"}
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
