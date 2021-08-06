import useStyles from "../Style/DashboardStyle";
import ChatRoomList from "./ChatRoomList";

function AllChats() {
  const classes = useStyles();
  return (
    <div>
      <main className={classes.main}>
        <ChatRoomList />
      </main>
    </div>
  );
}

export default AllChats;
