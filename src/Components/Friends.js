import { useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";
import { ListItem } from "@material-ui/core";
import DirectChatRoom from "./DirectChatRoom";

function Groups(props) {
  const { showFriends } = props;
  const { setChat, user } = useContext(DashboardContext);

  function handleDirectChatRoom(friend) {
    setChat(<DirectChatRoom friend={friend} />);
  }

  return (
    <div style={{ display: showFriends ? "" : "none" }}>
      {console.log(user)}
      {user.friends.items.map((friend, index) => (
        <ListItem
          key={index}
          button
          onClick={() => handleDirectChatRoom(friend.friend)}
        >
          <p>{friend.friend.username}</p>
        </ListItem>
      ))}
    </div>
  );
}

export default Groups;
