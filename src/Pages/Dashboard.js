import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  Router as Router,
  Route,
  Link,
  useHistory,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";
import AddFriend from "../Components/dashboard/AddFriend";
import { Divider, Button } from "@material-ui/core";
import { Auth, Hub } from "aws-amplify";
import { getUserById, getMessagesByDate } from "../api/queries";
import { setLocalTimeZone } from "../service/Localtime";
import { API, graphqlOperation } from "aws-amplify";
import {
  newOnCreateMessage,
  newOnUpdateMessage,
  newOnUpdateUser,
} from "../graphql/subscriptions";
import DrawerMenu from "../Components/dashboard/DrawerMenu";
import ChatList from "../Components/dashboard/ChatList";
import Selection from "../Components/dashboard/Selection";
import ChatFeedRoom from "../Components/dashboard/chat-feed/ChatFeedRoom";
import Profile from "../Components/dashboard/Profile";
import { getToken, sendRequestPost } from "../firebase/firebase";
import { scrollToBottom } from "../service/ScrollView";
import CallerDialogue from "../Components/Dialogue/CallerDialogue";
import CalleeDialogue from "../Components/Dialogue/CalleeDialogue";
import {
  handleCalleeDialogue,
  handleCallerDialogue,
} from "../utils/chat-room/utils";
import firebase from "../firebase";

function reducer(state, action) {
  // console.log("switch");
  switch (action.type) {
    case "set":
      console.log("set");
      return [action.payload];
    case "add":
      console.log("add");
      if (
        state[0].user.id === action.payload.receiver.id ||
        state[0].user.id === action.payload.user.id
      ) {
        // send request noti
        sendRequestPost(
          action.token,
          `${action.payload.user.username} sent`,
          action.payload.message,
          action.payload
        );
        let notiForChatlist = 0;
        const time = setLocalTimeZone(action.payload.createdAt);
        if (action.payload.user.username !== state[0].user.username) {
          console.log("reducer", state[0].countNoti);
          state[0].setCountNoti(state[0].countNoti + 1);
          notiForChatlist = 1;
        }
        // for Calling
        if (action.payload.isCall) {
          console.log(action.payload);
          state[0].setCall({
            isCall: true,
            caller: action.payload.user,
            callerType: action.payload.message,
          });
        }

        // Set for chatfeed UI
        if (state[0].chat) {
          // console.log(state[0].chat);
          // Id of new msg in And id of chat at that time Are compatible.
          if (state[0].chat.idGroup === action.payload.group.id) {
            console.log("setchat");
            state[0].setChat((prevState) => ({
              idGroup: prevState.idGroup,
              name: prevState.name,
              sender: action.payload.user.username,
              content: action.payload.message,
              time: time,
              ISOtime: action.payload.createdAt,
              theirUser: { ...prevState.theirUser },
              messages: [...prevState.messages, action.payload],
              idLastMsg: action.payload.id,
            }));
          }
        }

        // Set for chatlist UI
        if (action.onClick === "noClick") {
          console.log("chatlist... editing");
          const chatExisting = state[0].chatList.some(
            (chat) => chat.idGroup === action.payload.group.id
          );
          if (chatExisting === false) {
            let theirUser;
            if (action.payload.user.username === state[0].user.username) {
              theirUser = action.payload.receiver;
            } else {
              theirUser = action.payload.user;
            }
            state[0].setChatList((preState) => [
              ...preState,
              {
                idGroup: action.payload.group.id,
                name: action.payload.group.name,
                sender: action.payload.user.username,
                content: action.payload.message,
                time: time,
                ISOtime: action.payload.createdAt,
                theirUser: theirUser,
                messages: [action.payload],
                unread: notiForChatlist,
              },
            ]);
          } else {
            state[0].setChatList(
              state[0].chatList.map((obj) =>
                obj.idGroup === action.payload.type
                  ? {
                      ...obj,
                      sender: action.payload.user.username,
                      content: action.payload.message,
                      time: time,
                      ISOtime: action.payload.createdAt,
                      theirUser: { ...obj.theirUser },
                      messages: [...obj.messages, action.payload],
                      unread: obj.unread + notiForChatlist,
                    }
                  : obj
              )
            );
          }
        }
      }
  }
}

const Dashboard = ({ match }) => {
  const history = useHistory();
  const [selection, setSelection] = useState("");
  const [myUser, setMyUser] = useState();
  const [user, setUser] = useState();
  const [chatList, setChatList] = useState([]);
  const [sordteChatList, updateSordteChatList] = useState([]);
  const [chat, setChat] = useState();
  const [newMessage, setNewMessage] = useState();
  const [countNoti, setCountNoti] = useState();
  const [friendList, setFriendList] = useState([]);
  const [call, setCall] = useState({
    isCall: false,
    caller: null,
    callerType: "Voice call",
  });
  const [caller, setCaller] = useState({ type: "audio" });
  const [callee, setCallee] = useState({ type: "audio" });
  const messaging = firebase.messaging();
  const dummy = useRef();
  const [state, dispatch] = useReducer(reducer, { user: myUser });
  const [isDeclineCall, setIsDeclineCall] = useState(true);
  const [paramsId, setParamsId] = useState();

  useEffect(async () => {
    // service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    }

    // manage on messages
    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        icon: "/firebase-logo.png",
      };

      const notification = new Notification(
        notificationTitle,
        notificationOptions
      );
    });

    // Fetch current user
    checkUserCurrent();
    return () => {};
  }, []);

  useEffect(() => {
    // Fetch for chatList
    setChatList([]);
    fetchChatList();

    return () => {};
  }, [myUser]);

  useEffect(() => {
    chatList.sort(function sort(b, a) {
      console.log("...sorting");
      return new Date(a.ISOtime).getTime() - new Date(b.ISOtime).getTime();
    });
    // console.log(chatList, chat);

    dispatch({
      type: "set",
      payload: {
        chatList: chatList,
        chat: chat,
        countNoti: countNoti,
        setChat: setChat,
        setChatList: setChatList,
        setCountNoti: setCountNoti,
        user: myUser,
        setCall,
      },
    });

    // console.log(chatList);
    updateSordteChatList(chatList);

    if (dummy.current) {
      scrollToBottom(dummy);
    }
    return () => {};
  }, [chatList, chat, countNoti]);

  useEffect(() => {
    // Open subscribe
    console.log("user sub", myUser);
    setupSubscriptions();
    return () => {
      subscriptionOnCreateMsg.unsubscribe();
      subscriptionOnUpdateMsg.unsubscribe();
      subscriptionOnUpdateUser.unsubscribe();
    };
  }, []);

  let subscriptionOnCreateMsg;
  let subscriptionOnUpdateMsg;
  let subscriptionOnUpdateUser;
  const setupSubscriptions = async () => {
    subscriptionOnCreateMsg = API.graphql(
      graphqlOperation(newOnCreateMessage)
    ).subscribe({
      next: async (data) => {
        const newMsgObj = data.value.data.newOnCreateMessage;
        setNewMessage(newMsgObj);
        if (newMsgObj) {
          console.log("subscribeCreateMsg", newMsgObj);
          const token = await getToken();
          sendReduce(token, dispatch, newMsgObj);
        }
      },
    });

    subscriptionOnUpdateMsg = API.graphql(
      graphqlOperation(newOnUpdateMessage)
    ).subscribe({
      next: async (data) => {
        const newMsgUpdateObj = data.value.data.newOnUpdateMessage;
        // setNewMessage(newMsgUpdateObj);
        console.log("subscribeUpdateMsg", newMsgUpdateObj);
        // if (newMsgUpdateObj) {
        //   setIsDeclineCall(newMsgUpdateObj.isDeclineCall);
        // }
      },
    });

    subscriptionOnUpdateUser = API.graphql(
      graphqlOperation(newOnUpdateUser)
    ).subscribe({
      next: async (data) => {
        const newUserUpdateObj = data.value.data.newOnUpdateUser;
        setNewMessage(newUserUpdateObj);
        console.log("subscribeUpdateUser", newUserUpdateObj);
      },
    });
  };

  const sendReduce = (token, dispatch, newMsgObj) => {
    dispatch({
      type: "add",
      payload: newMsgObj,
      onClick: "noClick",
      token: token,
    });
    setIsDeclineCall(newMsgObj.isDeclineCall);
  };

  const checkUserCurrent = async () => {
    // Get id by checking user current auth
    const auth = await Auth.currentAuthenticatedUser();
    console.log("cognitocheck", auth);
    const id = auth.attributes.sub;

    // Get User by id
    try {
      const userById = await getUserById(id);
      setMyUser(userById);
      console.log("dd", userById);
      setUser(userById);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChatList = async () => {
    console.log("tt", myUser);
    if (myUser) {
      // console.log(myUser);
      let noti = 0;
      const fetchFriendList = myUser.groups.items.filter((obj) => {
        return obj.group.isDirect === true;
      });
      setFriendList(fetchFriendList);
      if (myUser.groups.items.length === 0) {
        setCountNoti(noti);
      } else {
        await myUser.groups.items.map(async (group) => {
          if (group.group.isDirect && group.group.messages.items.length != 0) {
            const fetchAllMessage = await getMessagesByDate(group.group.id);
            const theirUser = findFriendForChatlist(
              myUser,
              group.group.users.items
            );
            console.log("fetchall", fetchAllMessage);
            const resultFilterTheirUser = countHasUnRead(fetchAllMessage);
            noti += resultFilterTheirUser.length;

            const localtime = setLocalTimeZone(
              fetchAllMessage.items[
                fetchAllMessage.items.length - 1
              ].createdAt.toString()
            );
            // console.log("lastMsg", fetchAllMessage.items);

            let newChatInfo = {
              idGroup: group.group.id,
              name: group.group.name,
              sender:
                fetchAllMessage.items[fetchAllMessage.items.length - 1].user
                  .username,
              content:
                fetchAllMessage.items[fetchAllMessage.items.length - 1].message,
              time: localtime,
              ISOtime:
                fetchAllMessage.items[fetchAllMessage.items.length - 1]
                  .createdAt,
              theirUser: theirUser,
              messages: fetchAllMessage.items,
              unread: resultFilterTheirUser.length,
              idLastMsg:
                fetchAllMessage.items[fetchAllMessage.items.length - 1].id,
            };

            // console.log("fetch chatlist");
            if (group.group.id === paramsId) {
              setChat(newChatInfo);
            }
            setChatList((previouschat) => [...previouschat, newChatInfo]);
            setCountNoti(noti);
          } else {
            setCountNoti(noti);
          }
        });
      }
    }
  };

  const countHasUnRead = (fetchAllMessage) => {
    const result = fetchAllMessage.items.filter(
      (item) => item.hasRead === false
    );
    // console.log("result count", result);
    const resultFilterTheirUser = result.filter(
      (item) => item.user.username !== myUser.username
    );
    // console.log(resultFilterTheirUser);

    return resultFilterTheirUser;
  };

  const findFriendForChatlist = (myuser, group) => {
    for (let i = 0; i < group.length; i++) {
      if (myuser.username !== group[i].user.username) {
        return group[i].user;
      }
    }
  };

  const choseMenu = () => {
    switch (selection) {
      case "chats":
        // console.log(selection);
        return (
          <ChatList
            match={match}
            chatListArr={sordteChatList}
            setChat={setChat}
            setChatList={setChatList}
            chatList={chatList}
            setCountNoti={setCountNoti}
            countNoti={countNoti}
            myUser={myUser}
          />
        );
      case "addfriends":
        return (
          <AddFriend
            user={myUser}
            match={match}
            chatList={sordteChatList}
            setChat={setChat}
            setFriendList={setFriendList}
          />
        );
      case "profile":
        // console.log(selection);
        return (
          <Profile
            match={match}
            user={user}
            setUser={setUser}
            friendList={friendList}
            setChat={setChat}
            setCaller={setCaller}
          />
        );
      default:
        // console.log("default profile");
        return (
          <Profile
            match={match}
            user={user}
            setUser={setUser}
            friendList={friendList}
            setChat={setChat}
            setCaller={setCaller}
          />
        );
    }
  };

  return (
    <>
      {console.log("stateT", state)}
      <div style={{ display: "flex" }}>
        {/* {console.log(match.url)} */}
        {/* {console.log(chat)} */}
        <DrawerMenu
          match={match}
          setSelection={setSelection}
          countNoti={countNoti}
        />
        <div>
          <Selection type={selection} />
          <div style={{ display: "flex" }}>
            {choseMenu()}
            <Divider orientation="vertical" flexItem />
            <Switch>
              <Route path={`${match.path}/:idGroup`}>
                <ChatFeedRoom
                  myUser={myUser}
                  chat={chat}
                  setChat={setChat}
                  dummy={dummy}
                  selection={selection}
                  setMyUser={setMyUser}
                  setCaller={setCaller}
                  setParamsId={setParamsId}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      {chat ? (
        call.isCall && call.caller.id === myUser.id ? (
          <CallerDialogue
            open={call.isCall}
            onclose={() => handleCallerDialogue(setCaller, setCall)}
            id={chat.idGroup}
            callee={chat.theirUser}
            caller={caller}
            setCaller={setCaller}
            isDeclineCall={isDeclineCall}
            idLastMsg={chat.idLastMsg}
          />
        ) : (
          call.caller && (
            <CalleeDialogue
              open={call.isCall}
              onclose={() => handleCalleeDialogue(setCallee, setCall)}
              id={chat.idGroup}
              caller={call.caller}
              callee={callee}
              setCallee={setCallee}
              call={call}
              isDeclineCall={isDeclineCall}
              idLastMsg={chat.idLastMsg}
            />
          )
        )
      ) : null}
    </>
  );
};

export default Dashboard;
