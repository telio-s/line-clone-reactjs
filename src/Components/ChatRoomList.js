import React, { useContext, useEffect, useState } from "react";
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
import { DashboardContext } from "../Page/Dashboard";
import { Auth, Hub } from "aws-amplify";
import DirectChatRoom from "./DirectChatRoom";
import useStyles from "../Style/ChatRoomListStyle";

const ChatRoomList = () => {
  const classes = useStyles();
  const { setChat } = useContext(DashboardContext);
  const [myUser, setMyUser] = useState(null);
  const [messageArr, setMessageArr] = useState([]);
  const [messageSorted, setMessageSorted] = useState([]);
  const [realTimeData, setRealTimeData] = useState();

  useEffect(async () => {
    const user = await checkUserCurrent();
    console.log("send message 2");

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
        // console.log(fetchMessage);
        if (fetchMessage.messageByDate.items == 0 && group.group.isDirect) {
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
          setMessageArr((previousState) => [...previousState, groupInfo]);
          // console.log(messageArr);
        }
      });
    };
    fetchAllChat(user);
  }, []);

  useEffect(() => {
    comparetByTime();
    console.log("send message 1");

    // setupSubscriptions();

    // return () => {
    //   subscriptionOnCreate.unsubscribe();
    // };
  }, [messageArr, myUser]);

  // let subscriptionOnCreate;
  // function setupSubscriptions() {
  //   subscriptionOnCreate = API.graphql(
  //     graphqlOperation(newOnCreateMessage)
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       setRealTimeData(data);
  //     },
  //   });
  // }

  const checkUserCurrent = async () => {
    const user = await Auth.currentAuthenticatedUser();
    // console.log("user: ", user);
    return user;
  };

  const comparetByTime = () => {
    messageArr.sort(function sort(b, a) {
      return new Date(a.ISOtime).getTime() - new Date(b.ISOtime).getTime();
    });
    // console.log(messageArr);
    setMessageSorted(messageArr);
  };

  async function handleChatRoom(friend) {
    console.log("chose a chat");

    setChat(<DirectChatRoom friend={friend} />);
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
              >
                {message.content}
              </Typography>
            </div>

            <Typography className={classes.timeChat}>{message.time}</Typography>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
