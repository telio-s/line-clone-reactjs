import React, { useState } from "react";
import useStyles from "../Style/AddFriendsStyle";
import { PeopleAlt, PersonAdd } from "@material-ui/icons";
import { Button, Typography, Dialog, DialogTitle } from "@material-ui/core";
import DialogAddFriends from "./DialogAddFriends";

const AddFriends = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const Dialog = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Button disableRipple={true} className={classes.feature} onClick={Dialog}>
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
      <DialogAddFriends open={open} />
      <Button disableRipple={true} className={classes.feature}>
        <PeopleAlt className={classes.icon} />
        <Typography style={{ marginLeft: "20px", fontWeight: "600" }}>
          Create a group
        </Typography>
      </Button>
    </div>
  );
};

export default AddFriends;
