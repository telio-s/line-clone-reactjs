import React, { useState } from "react";
import LoadingLogo from "../../Spinner-1s-200px.gif";
import {
  Avatar,
  ListItem,
  Typography,
  Collapse,
  Button,
} from "@material-ui/core";
import { HashRouter as Router, Link } from "react-router-dom";
import { ExpandLess, ExpandMore, AccountCircle } from "@material-ui/icons";
import ProfileDialogue from "../Dialogue/ProfileDialogue";
import { getImg } from "../../utils/profile/utils";
import useStyles from "../../Style/profile-style/profile";
import FriendProfileDialogue from "../Dialogue/FriendProfileDialogue";
import { getMessagesByDate } from "../../api/queries";
import { sleep } from "../../utils/sending-media/utils";

const Profile = (props) => {
  const { match, user, setUser, friendList, setChat, setCaller } = props;
  const classes = useStyles();
  const [showFriends, setShowFriends] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendProfile, setShowFriendProfile] = useState(false);
  const [friend, setFriend] = useState(null);

  function handleShowFriends() {
    setShowFriends(!showFriends);
  }

  function handleProfile() {
    setShowProfile(!showProfile);
  }

  function handleFriendProfile() {
    setShowFriendProfile(!showFriendProfile);
  }

  async function testMessages(friendList, frind) {
    // console.log(
    //   "|lantao",
    //   "match:",
    //   match,
    //   "user",
    //   user,
    //   "friendList",
    //   friendList
    // );
    const chat = friendList.find((obj) => {
      return obj.group.id === frind.group.id;
    });

    const theirUser = frind.group.users.items.find(
      (obj) => obj.user.username !== user.username
    );
    let messages;
    let i = 1;
    // const messages = await getMessagesByDate(frind.group.id);
    while (true) {
      try {
        messages = await getMessagesByDate(frind.group.id);

        if (messages) break;
      } catch (err) {
        console.log(err);
        await sleep(800 * 2 ** i);
        i++;
      }
    }
    // console.log("|nz", messages.items);
    setChat({
      idGroup: chat.group.id,
      name: chat.group.name,
      sender: "",
      content: "",
      time: "",
      ISOtime: "",
      theirUser: theirUser.user,
      messages: messages.items,
      unread: 0,
    });
    // console.log("|setchat profile");
  }

  return (
    <div className={classes.root}>
      {/* {console.log("|profile page on JSX")}
      {console.log("|friendList 1", friendList)}
      {console.log("|userx 1", user)} */}
      {user && friendList ? (
        user && (
          <>
            {/* {console.log("|friendList 2", friendList)}
            {console.log("|userx 2", user)} */}
            <ListItem button onClick={() => handleProfile()}>
              <div className={classes.profileContainer}>
                <Avatar
                  src={user.profilePhoto ? getImg(user, "profile") : ""}
                  className={classes.imgSize}
                  style={{ marginRight: "20px" }}
                />
                <div>
                  <h4 style={{ margin: "0px" }}>{user.displayName}</h4>
                  <Typography style={{ fontSize: "14px", color: "grey" }}>
                    {user.statusMessage}
                  </Typography>
                </div>
              </div>
            </ListItem>
            <ListItem
              button
              onClick={() => handleShowFriends()}
              style={{ color: "rgb(83,86,106)" }}
            >
              Friends
              <div style={{ marginLeft: "auto" }}>
                {showFriends ? <ExpandMore /> : <ExpandLess />}
              </div>
            </ListItem>
            <Collapse in={showFriends} timeout="auto" unmountOnExit>
              <div
                style={{
                  display: showFriends ? "" : "none",
                }}
              >
                {friendList.map((frind, index) => {
                  const their = frind.group.users.items.find(
                    (obj) => obj.user.username !== user.username
                  );
                  return (
                    <Link
                      key={index}
                      to={`${match.url}/${frind.group.id}`}
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      <Button
                        className={classes.friendList}
                        id={frind.group.id}
                        onClick={() => testMessages(friendList, frind)}
                      >
                        <Avatar
                          src={
                            their.user.profilePhoto &&
                            getImg(their.user, "profile")
                          }
                          style={{ width: "50px", height: "50px" }}
                          onClick={() => {
                            setFriend({
                              friend: their.user,
                              groupId: frind.group.id,
                            });
                            handleFriendProfile();
                          }}
                        />
                        <div className={classes.listBox}>
                          <Typography style={{ fontWeight: "bold" }}>
                            {their.user.displayName}
                          </Typography>
                          <Typography
                            noWrap={false}
                            gutterBottom
                            className={classes.multiLineEllipsis}
                            style={{ fontSize: "12px" }}
                          >
                            {their.user.statusMessage}
                          </Typography>
                        </div>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </Collapse>
            <ProfileDialogue
              isOpen={showProfile}
              onClose={handleProfile}
              user={user}
              setUser={setUser}
            />
            {friend && (
              <FriendProfileDialogue
                open={showFriendProfile}
                onclose={handleFriendProfile}
                friend={friend.friend}
                setCaller={setCaller}
                idGroup={friend.groupId}
                user={user}
              />
            )}
          </>
        )
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <img src={LoadingLogo}></img>
        </div>
      )}
    </div>
  );
};

export default Profile;
