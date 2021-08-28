import React, { useState } from "react";
import useStyles from "../Style/AddFriendsStyle";
import { PeopleAlt, PersonAdd } from "@material-ui/icons";
import { Button, Typography, Dialog, DialogTitle } from "@material-ui/core";
import DialogAddFriends from "./DialogAddFriends";
import CreateGroupDialog from "./CreateGroupDialog";
const AddFriends = () => {
  const classes = useStyles();
  const [openFriends, setOpenFriends] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  const openDialogFriends = () => {
    setOpenFriends(true);
  };

  const closeDialogFriends = () => {
    setOpenFriends(false);
  };

  const openDialogGroup = () => {
    setOpenGroup(true);
  };

  const closeDialogGroup = () => {
    setOpenGroup(false);
  };

  return (
    <div className={classes.root}>
      <Button
        disableRipple={true}
        className={classes.feature}
        onClick={openDialogFriends}
      >
        <PersonAdd className={classes.icon} />
        <Typography
          style={{
            marginLeft: "20px",
            fontWeight: "600",
          }}
        >
          Search for friends
        </Typography>
      </Button>
      <DialogAddFriends open={openFriends} onClose={closeDialogFriends} />

      <Button
        disableRipple={true}
        className={classes.feature}
        onClick={openDialogGroup}
      >
        <PeopleAlt className={classes.icon} />
        <Typography style={{ marginLeft: "20px", fontWeight: "600" }}>
          Create a group
        </Typography>
      </Button>
      <CreateGroupDialog open={openGroup} onClose={closeDialogGroup} />
    </div>
  );
};

export default AddFriends;
