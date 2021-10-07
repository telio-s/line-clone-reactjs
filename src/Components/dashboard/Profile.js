import React, { useState } from "react";
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

  return (
    <div className={classes.root}>
      {console.log(friendList)}
      {/* {console.log(user)}  */}
      {user && (
        <>
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
                  (obj) => obj.user.displayName !== user.displayName
                );
                // console.log(their);
                return (
                  <Link
                    key={index}
                    to={`${match.url}/${frind.group.id}`}
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <Button
                      className={classes.friendList}
                      onClick={() => {
                        const chat = friendList.find((obj) => {
                          return obj.group.id == frind.group.id;
                        });

                        const theirUser = frind.group.users.items.find(
                          (obj) => obj.user.displayName !== user.displayName
                        );
                        setChat({
                          idGroup: chat.group.id,
                          name: chat.group.name,
                          sender: "",
                          content: "",
                          time: "",
                          ISOtime: "",
                          theirUser: theirUser.user,
                          messages: chat.group.messages.items,
                          unread: 0,
                        });
                      }}
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
          {friend && console.log(friend.friend)}
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
      )}
    </div>
  );
};

export default Profile;
