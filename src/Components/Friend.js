import { ListItem, Checkbox } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";

function Friend(props) {
  const { friend, handleSelection } = props;
  const [add, setAdd] = useState(false);
  const { alreadyIn } = useContext(DashboardContext);

  return (
    <div>
      <ListItem
        button
        onClick={() => {
          setAdd(!add);
          handleSelection(friend, add);
        }}
      >
        {friend.friend.username}
        <Checkbox
          checked={add}
          size="small"
          inputProps={{
            "aria-label": "checkbox with small size",
          }}
          onClick={() => {
            setAdd(!add);
            handleSelection(friend, add);
          }}
        />
      </ListItem>
    </div>
  );
}

export default Friend;
