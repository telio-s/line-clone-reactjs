import useStyles from "./../Style/DashboardStyle";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import AllChats from "./AllChats";
import { useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";
import SignOut from "../Model/SignOut";
const chatTypeSection = [
  { title: "All" },
  { title: "Friends" },
  { title: "Groups" },
];

function Selection() {
  const classes = useStyles();
  const { setSideBar } = useContext(DashboardContext);

  function handleClick(title) {
    console.log(title);
    switch (title) {
      case "All":
        setSideBar(<AllChats />);
        break;
      case "Friends":
        setSideBar(<AllChats />);
        break;
      case "Groups":
        setSideBar(<AllChats />);
        break;
      default:
        return;
    }
  }

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0} position="static">
        <Toolbar>
          {chatTypeSection.map((obj, index) => (
            <Button
              disableRipple="true"
              key={index}
              className={classes.chatSection}
              value={obj.title}
              onClick={(e) => handleClick(obj.title)}
            >
              {obj.title}
            </Button>
          ))}
          <SignOut />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Selection;
