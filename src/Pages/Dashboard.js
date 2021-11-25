import React, { useState, useEffect, useReducer, useRef } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import AddFriend from "../Components/dashboard/AddFriend";
import { Divider } from "@material-ui/core";
import { Auth } from "aws-amplify";
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
  switch (action.type) {
    case "set":
      console.log("state x", action.payload.user);
      return [action.payload];
    case "add":
      console.log("add x", state);
      if (state) {
        if (
          state[0].user.id === action.payload.receiver.id ||
          state[0].user.id === action.payload.user.id
        ) {
          // send request noti
          if (action.payload.receiver.username === state[0].user.username) {
            sendRequestPost(
              action.token,
              `${action.payload.user.username} sent`,
              action.payload.message,
              action.payload
            );
          }
          let notiForChatlist = 0;
          const time = setLocalTimeZone(action.payload.createdAt);
          if (action.payload.user.username !== state[0].user.username) {
            state[0].setCountNoti(state[0].countNoti + 1);
            notiForChatlist = 1;
          }
          // for Calling
          if (action.payload.isCall) {
            state[0].setCall({
              isCall: true,
              caller: action.payload.user,
              callerType: action.payload.message,
            });
          }

          // Set for chatfeed UI
          if (state[0].chat) {
            // Id of new msg in And id of chat at that time Are compatible.
            if (state[0].chat.idGroup === action.payload.group.id) {
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
              state[0].setFriendList(
                state[0].friendList.map((flist) =>
                  flist.group.id === action.payload.group.id
                    ? {
                        ...flist,
                        group: {
                          ...flist.group,
                          messages: flist.group.messages.length
                            ? [...flist.group.messages, action.payload]
                            : [action.payload],
                        },
                      }
                    : flist
                )
              );
              console.log(state[0].friendList);
            }
          }

          // Set for chatlist UI
          if (action.onClick === "noClick") {
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
}

function reducerUser(state, action) {
  switch (action.type) {
    case "set":
      return [action.payload];
    case "add":
      let allUser = [];
      let theirUser;
      for (let i = 0; i < state[0].friendList.length; i++) {
        for (let j = 0; j < action.payload.groups.items.length; j++) {
          if (
            state[0].friendList[i].group.id ===
            action.payload.groups.items[j].group.id
          ) {
            state[0].friendList[i].group.users.items.map((user) => {
              if (user.user.id !== action.payload.id) {
                allUser.push({ user: user.user });
              } else {
                theirUser = action.payload.groups.items[j].group.id;
                allUser.push({
                  user: {
                    coverPhoto: action.payload.coverPhoto,
                    displayName: action.payload.displayName,
                    id: action.payload.id,
                    profilePhoto: action.payload.profilePhoto,
                    statusMessage: action.payload.statusMessage,
                    username: action.payload.username,
                  },
                });
              }
            });
          }
        }
      }
      state[0].setFriendList(
        state[0].friendList.map((obj) =>
          obj.group.id === theirUser
            ? {
                createdAt: obj.id,
                updatedAt: obj.updatedAt,
                id: obj.id,
                group: {
                  ...obj.group,
                  users: { items: allUser },
                },
              }
            : obj
        )
      );
      const theirObj = {
        coverPhoto: action.payload.coverPhoto,
        displayName: action.payload.displayName,
        id: action.payload.id,
        profilePhoto: action.payload.profilePhoto,
        statusMessage: action.payload.statusMessage,
        username: action.payload.username,
      };
      state[0].setChatList(
        state[0].chatList.map((chat) =>
          chat.idGroup === theirUser
            ? {
                ...chat,
                theirUser: theirObj,
              }
            : chat
        )
      );
      if (state[0].chat) {
        if (state[0].chat.idGroup === theirUser) {
          state[0].setChat((prevState) => ({
            ...prevState,
            theirUser: theirObj,
          }));
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
  const [state, dispatch] = useReducer(reducer, {});
  const [stateUser, dispatchUser] = useReducer(reducerUser, {});
  const [isDeclineCall, setIsDeclineCall] = useState(true);
  const [paramsId, setParamsId] = useState();

  useEffect(async () => {
    // service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {})
        .catch(function (err) {});
    }

    // manage on messages
    messaging.onMessage((payload) => {
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
    // Fetch for chatList\
    setChatList([]);
    fetchChatList();

    return () => {};
  }, [myUser]);

  useEffect(() => {
    chatList.sort(function sort(b, a) {
      return new Date(a.ISOtime).getTime() - new Date(b.ISOtime).getTime();
    });

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
        friendList,
        setFriendList,
      },
    });
    dispatchUser({
      type: "set",
      payload: {
        friendList: friendList,
        setFriendList: setFriendList,
        user: myUser,
        setChatList,
        chatList,
        chat,
        setChat,
      },
    });

    updateSordteChatList(chatList);

    if (dummy.current) {
      scrollToBottom(dummy);
    }
    return () => {};
  }, [chatList, chat, countNoti, friendList]);

  useEffect(() => {
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
        dispatchUser({ type: "add", payload: newUserUpdateObj });
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
    const auth = await Auth.currentAuthenticatedUser()
      .then((data) => data)
      .catch(() => null);
    if (!auth) {
      history.push("/");
      return;
    }
    const id = auth.attributes.sub;
    let i = 0;
    let userById;
    while (true) {
      try {
        console.log("try");
        userById = await getUserById(id);
        setMyUser(userById);
        setUser(userById);
        console.log("output", userById);
        console.log("success");
        if (userById) break;
      } catch (err) {
        console.log(err.message);
      }
    }

    //Get User by id
    // try {
    //   const userById = await getUserById(id);
    //   setMyUser(userById);

    //   console.log(userById);
    //   setUser(userById);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const fetchChatList = async () => {
    if (!myUser) {
      return;
    }
    let noti = 0;
    const fetchFriendList = myUser.groups.items.filter((obj) => {
      return obj.group.isDirect === true;
    });
    console.log("fetchinDash", fetchFriendList);
    setFriendList(fetchFriendList);
    if (myUser.groups.items.length === 0) {
      setCountNoti(noti);
    } else {
      await myUser.groups.items.map(async (group, index) => {
        if (group.group.isDirect && group.group.messages.items.length != 0) {
          const fetchAllMessage = await getMessagesByDate(group.group.id);
          fetchFriendList[index].group.messages = fetchAllMessage.items;
          const theirUser = findFriendForChatlist(
            myUser,
            group.group.users.items
          );
          const resultFilterTheirUser = countHasUnRead(fetchAllMessage);
          noti += resultFilterTheirUser.length;

          const localtime = setLocalTimeZone(
            fetchAllMessage.items[
              fetchAllMessage.items.length - 1
            ].createdAt.toString()
          );

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
              fetchAllMessage.items[fetchAllMessage.items.length - 1].createdAt,
            theirUser: theirUser,
            messages: fetchAllMessage.items,
            unread: resultFilterTheirUser.length,
            idLastMsg:
              fetchAllMessage.items[fetchAllMessage.items.length - 1].id,
          };
          console.log("|fetch dash board");
          if (group.group.id === paramsId) {
            console.log("|params in dash");
            setChat(newChatInfo);
            console.log("|setchat dashboard", newChatInfo);
          }
          setChatList((previouschat) => [...previouschat, newChatInfo]);
          setCountNoti(noti);
        } else {
          setCountNoti(noti);
          const fetchAllMessage = await getMessagesByDate(group.group.id);
          fetchFriendList[index].group.messages = fetchAllMessage.items;
        }
      });
    }
  };

  const countHasUnRead = (fetchAllMessage) => {
    const result = fetchAllMessage.items.filter(
      (item) => item.hasRead === false
    );
    const resultFilterTheirUser = result.filter(
      (item) => item.user.username !== myUser.username
    );

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
      <div style={{ display: "flex" }}>
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
                  dummy={dummy}
                  selection={selection}
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
