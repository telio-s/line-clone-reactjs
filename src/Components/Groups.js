import { useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";
import { ListItem } from "@material-ui/core";
import GroupChatRoom from "./GroupChatRoom";

function Groups(props) {
  const { user, showGroups } = props;
  const { setChat } = useContext(DashboardContext);
  console.log(user.groups.items[0].group.name);

  function handleGroupChatRoom(group) {
    setChat(<GroupChatRoom group={group} />);
  }

  return (
    <div style={{ display: showGroups ? "" : "none" }}>
      {user.groups.items.map((group, index) => (
        <ListItem
          key={index}
          button
          onClick={() => handleGroupChatRoom(group.group)}
        >
          <p>{group.group.name}</p>
        </ListItem>
      ))}
    </div>
  );
}

export default Groups;
