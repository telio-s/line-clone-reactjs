import ChatRoomList from "./ChatRoomList";
import useStyles from "../Style/DashboardStyle";

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
