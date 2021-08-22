import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import { newOnCreateMessage } from "../graphql/subscriptions";
import { SearchOutlined, AccountCircle } from "@material-ui/icons";
import { getUserByID, getMessageByDate } from "./graphql/queriesapi";
import { updateMessageHasRead } from "./graphql/mutationapi";
import { DashboardContext } from "../Page/Dashboard";
import { Auth, Hub } from "aws-amplify";
import DirectChatRoom from "./DirectChatRoom";
import firebase from "../firebase";
import useStyles from "../Style/ChatRoomListStyle";

const ChatRoomList = () => {
  const classes = useStyles();
  const { setChat } = useContext(DashboardContext);
  const [myUser, setMyUser] = useState(null);
  const [messageArr, setMessageArr] = useState([]);
  const [messageSorted, setMessageSorted] = useState([]);
  const [realTimeData, setRealTimeData] = useState();
  const [countNoti, setCountNoti] = useState(0);
  const [newMessages, setNewMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);

  const elementRef = useRef([]);
  const messaging = firebase.messaging();
  useEffect(async () => {
    const user = await checkUserCurrent();

    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      // ...
    });

    const fetchAllChat = async (user) => {
      const userObj = await getUserByID(user.attributes.sub);
      // console.log("userByID", userObj);
      setMyUser(userObj);
      const arrAllChat = userObj.groups.items;
      // console.log(arrAllChat);
      // console.log(arrAllChat);
      arrAllChat.map(async (group) => {
        // console.log(group);

        // Fetch last message for each group
        const fetchMessage = await getMessageByDate(group.group.id);
        countHasRead(fetchMessage, userObj);
        if (fetchMessage.messageByDate.items == 0 && group.group.isDirect) {
          // Be friend but never talk yet
          // console.log("empty arr");
        } else if (group.group.isDirect) {
          // set time zone
          let tzoffset = new Date().getTimezoneOffset() * 60000;
          let localISOTime = new Date(
            new Date(fetchMessage.messageByDate.items[0].createdAt.toString()) -
              tzoffset
          )
            .toISOString()
            .slice(0, -1);
          // slice to only time
          let onlyTime = new Date(localISOTime).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          // console.log(fetchMessage.messageByDate.items[0].createdAt);
          let friendObj = {};
          group.group.users.items.map((item) => {
            // console.log(userObj.id);
            // console.log(item.user.id);
            if (item.user.id !== userObj.id) {
              friendObj = item.user;
            }
          });
          // console.log(friendObj);
          const groupInfo = {
            idGroup: group.group.id,
            name: group.group.name,
            sender: fetchMessage.messageByDate.items[0].user.username,
            content: fetchMessage.messageByDate.items[0].message,
            time: onlyTime,
            ISOtime: fetchMessage.messageByDate.items[0].createdAt,
            friend: friendObj,
          };
          const lastMsgInFo = {
            content: fetchMessage.messageByDate.items[0].message,
            time: onlyTime,
          };
          setMessageArr((previousState) => [...previousState, groupInfo]);
          setLastMessage((previousState) => [...previousState, lastMsgInFo]);
        }
      });
    };
    fetchAllChat(user);

    return () => {
      console.log("clean up");
    };
  }, [realTimeData]);

  useEffect(() => {
    comparetByTime();

    setupSubscriptions();

    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, [messageArr, myUser]);

  useEffect(() => {
    setMessageArr([]);

    if (realTimeData) {
      if (
        myUser.username !==
        realTimeData.value.data.newOnCreateMessage.user.username
      ) {
        setCountNoti(countNoti + 1);
      }
    }

    return () => {
      console.log("clean up");
    };
  }, [realTimeData]);

  useEffect(() => {
    console.log(countNoti);

    return () => {
      console.log("clean up");
    };
  }, [countNoti]);

  let subscriptionOnCreate;
  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(newOnCreateMessage)
    ).subscribe({
      next: (data) => {
        let count = countNoti;
        console.log(countNoti);
        console.log(data);
        setRealTimeData(data);
        console.log(elementRef);
        if (
          myUser.username !== data.value.data.newOnCreateMessage.user.username
        ) {
          setNewMessages((pre) => [...pre, data.value.data.newOnCreateMessage]);
        }
        // for (let i = 0; i < elementRef.current.length; i++) {
        //   if (
        //     data.value.data.newOnCreateMessage.group.id ==
        //     elementRef.current[i].id
        //   ) {
        //     return (elementRef.current[i].innerHTML = "testSomething");
        //   }
        // }
      },
    });
  }

  const countHasRead = (allmessages, myuser) => {
    let messages = allmessages.messageByDate.items;
    let count = 0;

    messages.map((msg) => {
      if (myuser.username !== msg.user.username) {
        if (!msg.hasRead) {
          count++;
          setNewMessages((pre) => [...pre, msg]);
        }
      }
    });
    setCountNoti(count);
  };

  const checkUserCurrent = async () => {
    const user = await Auth.currentAuthenticatedUser();
    // console.log("user: ", user);
    return user;
  };

  const comparetByTime = () => {
    messageArr.sort(function sort(b, a) {
      return new Date(a.ISOtime).getTime() - new Date(b.ISOtime).getTime();
    });
    setMessageSorted(messageArr);
  };

  async function handleChatRoom(friend) {
    console.log(newMessages);
    newMessages.map(async (data) => {
      await updateMessageHasRead(data.id, true);
    });

    setCountNoti(0);
    setChat(<DirectChatRoom friend={friend} />);
    setNewMessages([]);
  }

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar>
          <InputBase
            fullWidth
            className={classes.searchInput}
            placeholder="Search for chats and messages"
            startAdornment={
              <InputAdornment position="start" variant="filled">
                <SearchOutlined className={classes.iconSearch} />
              </InputAdornment>
            }
          />
        </Toolbar>
      </AppBar>
      {console.log(lastMessage)}
      {messageSorted.map((message, index) => (
        <div key={index}>
          <Button
            disableRipple={true}
            className={classes.chatRoom}
            onClick={() => handleChatRoom(message.friend)}
          >
            <AccountCircle style={{ fontSize: "60px" }} />
            <div className={classes.chatDesc}>
              <Typography className={classes.nameChat}>
                {message.name}
              </Typography>
              <Typography
                noWrap={false}
                gutterBottom
                className={classes.multiLineEllipsis}
                id={message.idGroup}
                // ref={(elm) => {
                //   elementRef.current[index] = elm;
                // }}
              >
                {message.content}
              </Typography>
            </div>
            <div>
              <Typography className={classes.timeChat}>
                {message.time}
              </Typography>
              {countNoti ? (
                <div className={classes.notiBox}>
                  <Typography className={classes.noti}>{countNoti}</Typography>
                </div>
              ) : null}
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
