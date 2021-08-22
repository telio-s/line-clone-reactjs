import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
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
import { API, graphqlOperation } from "aws-amplify";
import MyMessageBubble from "./MyMessageBubble";
import TheirMessageBubble from "./TheirMessageBubble";
import { DashboardContext } from "../Page/Dashboard";
import { getDirect } from "../api/queries";
import { createMessageInGroup } from "./../api/mutations";
import { newOnCreateMessage } from "../graphql/subscriptions";
import AddFriendsToGroup from "./AddFriendsToGroup";
import firebase from "../firebase";
import { getToken, sendRequestPost } from "../firebase/firebase";
import useStyles from "../Style/ChatRoomStyle";

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
    // scrollToBottom();
    // console.log(user.username, friend.username);
  }, [friend, realTimeData]);

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnCreate.unsubscribe();
      // unsubscribeFromTopic(token);
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

        const token = await getToken();
        sendRequestPost(
          token,
          `${data.value.data.newOnCreateMessage.user.username} sent`,
          data.value.data.newOnCreateMessage.message
        );
      },
    });
  }

  async function handleSendMessage(e) {
    e.preventDefault();

    const message = {
      type: directId,
      message: currMessage,
      messageUserId: user.id,
      messageGroupId: directId,
      isBlock: false,
      hasRead: false,
    };
    async function createMessage() {
      const data = await createMessageInGroup(message);
      setMessages([...messages, data.data.createMessage]);
    }
    try {
      createMessage();
      // console.log("send message!", message);
      setCurrMessage("");
    } catch (error) {
      console.log("Can't send Message", error);
    }
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
          <IconButton className={classes.iconButton}>
            <Attachment />
          </IconButton>
          <Button type="submit">Send</Button>
          {/* <Button
            style={{ display: currMessage ? "" : "none" }}
            type="submit"
          ></Button> */}
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
