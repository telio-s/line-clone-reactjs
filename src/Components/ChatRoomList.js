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

const ChatRoomList = (props) => {
  const { setNotificationIcon } = props;
  const classes = useStyles();
  const { setChat } = useContext(DashboardContext);
  const [myUser, setMyUser] = useState(null);
  const [messageArr, setMessageArr] = useState([]);
  const [messageSorted, setMessageSorted] = useState([]);
  const [realTimeData, setRealTimeData] = useState();
  const [newMessages, setNewMessages] = useState([]);
  // const [lastMessage, setLastMessage] = useState([]);

  // const elementRef = useRef([]);
  const messaging = firebase.messaging();

  useEffect(async () => {
    const user = await checkUserCurrent();
    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      // ...
    });

    const fetchAllChat = async (user) => {
      const userObj = await getUserByID(user.attributes.sub);
      setMyUser(userObj);
      const arrAllChat = userObj.groups.items;
      arrAllChat.map(async (group) => {
        // Fetch last message for each group
        const fetchMessage = await getMessageByDate(group.group.id);
        const countUnread = countHasRead(fetchMessage, userObj);
        if (fetchMessage.messageByDate.items == 0 && group.group.isDirect) {
          // Be friend but never talk yet
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
          let friendObj = {};
          group.group.users.items.map((item) => {
            if (item.user.id !== userObj.id) {
              friendObj = item.user;
            }
          });
          const groupInfo = {
            idGroup: group.group.id,
            name: group.group.name,
            sender: fetchMessage.messageByDate.items[0].user.username,
            content: fetchMessage.messageByDate.items[0].message,
            time: onlyTime,
            ISOtime: fetchMessage.messageByDate.items[0].createdAt,
            friend: friendObj,
            unread: countUnread,
          };
          // const lastMsgInFo = {
          //   content: fetchMessage.messageByDate.items[0].message,
          //   time: onlyTime,
          // };
          setNotificationIcon(countUnread);
          setMessageArr((previousState) => [...previousState, groupInfo]);
          // setLastMessage((previousState) => [...previousState, lastMsgInFo]);
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

  useEffect(async () => {
    setMessageArr([]);

    return () => {
      console.log("clean up");
    };
  }, [realTimeData]);

  let subscriptionOnCreate;
  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(newOnCreateMessage)
    ).subscribe({
      next: (data) => {
        console.log(data);
        setRealTimeData(data);
        if (data.value.data.newOnCreateMessage) {
          if (
            myUser.username !== data.value.data.newOnCreateMessage.user.username
          ) {
            setNewMessages((pre) => [
              ...pre,
              data.value.data.newOnCreateMessage,
            ]);
          }
        }
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
    return count;
  };

  const checkUserCurrent = async () => {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  };

  const comparetByTime = () => {
    messageArr.sort(function sort(b, a) {
      return new Date(a.ISOtime).getTime() - new Date(b.ISOtime).getTime();
    });
    setMessageSorted(messageArr);
  };

  async function handleChatRoom(friend, idGroup) {
    console.log(newMessages);
    newMessages.map(async (data) => {
      await updateMessageHasRead(data.id, true);
    });

    messageSorted.filter((obj) => {
      if (obj.idGroup == idGroup) {
        obj.unread = 0;
      }
    });
    setChat(<DirectChatRoom friend={friend} />);
    setNewMessages([]);
    setNotificationIcon(0);
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
      {messageSorted.map((message, index) => (
        <div key={index}>
          <Button
            disableRipple={true}
            className={classes.chatRoom}
            onClick={() => handleChatRoom(message.friend, message.idGroup)}
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
                // id={message.idGroup}
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
              <div className={message.unread == 0 ? null : classes.notiBox}>
                <Typography
                  // id={message.idGroup}
                  // ref={(elm) => {
                  //   elementRef.current[index] = elm;
                  // }}
                  className={message.unread == 0 ? null : classes.noti}
                >
                  {message.unread == 0 ? null : message.unread}
                </Typography>
              </div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
