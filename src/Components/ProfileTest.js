import { Button } from "@material-ui/core";
import { useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";
import useStyles from "../Style/DashboardStyle";
import GroupChatRoom from "./GroupChatRoom";

function ProfileTest(props) {
  const { user } = props;
  const classes = useStyles();
  const { setChat } = useContext(DashboardContext);

  function handleGroupChatRoom(group) {
    setChat(<GroupChatRoom group={group} />);
  }

  return (
    <div>
      <main className={classes.main}>
        <h1>Profile, {user ? user.username : null}</h1>
      </main>
      {user
        ? user.groups.items.map((group, index) => (
            <Button
              key={index}
              onClick={() => handleGroupChatRoom(group.group)}
            >
              {group.group.name}
            </Button>
          ))
        : null}
    </div>
  );
}

export default ProfileTest;
