import React, { useState } from "react";
import { Drawer, IconButton, Badge } from "@material-ui/core";
import { Person, PersonAdd, MoreHoriz } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreMenu from "../Menu/MoreMenu";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import useStyles from "../../Style/DrawerMenuStyle";

const DrawerMenu = (props) => {
  const { match, setSelection, countNoti } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMoreIconClick(e) {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(e.currentTarget);
  }

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton
          disableRipple={true}
          className={classes.iconButton}
          onClick={() => {
            setSelection("profile");
          }}
        >
          <Person
            className={classes.iconMtDrawer}
            style={{ marginTop: "30px" }}
          />
        </IconButton>

        <IconButton
          disableRipple={true}
          className={classes.iconButton}
          style={{ marginLeft: "2px" }}
          onClick={() => {
            setSelection("chats");
          }}
        >
          <Badge badgeContent={countNoti} color="secondary">
            <FontAwesomeIcon
              className={classes.iconAweDrawer}
              icon={faCommentDots}
            />
          </Badge>
        </IconButton>
        <IconButton
          disableRipple={true}
          className={classes.iconButton}
          onClick={() => {
            setSelection("addfriends");
          }}
        >
          <PersonAdd className={classes.iconMtDrawer} />
        </IconButton>

        <div className={classes.drawerIconBottom}>
          <IconButton
            disableRipple={true}
            className={classes.iconButton}
            onClick={(e) => handleMoreIconClick(e)}
          >
            <MoreHoriz className={classes.iconMtDrawer} />
          </IconButton>
        </div>
        {anchorEl && (
          <MoreMenu onClose={handleMoreIconClick} anchorEl={anchorEl} />
        )}
      </Drawer>
    </>
  );
};

export default DrawerMenu;
