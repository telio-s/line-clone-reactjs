import React, { useEffect, useState } from "react";
import { Typography, Dialog } from "@material-ui/core";
import useStyles from "./../../../Style/MyMessageBubbleStyle";
import { isEmpty } from "../../../utils/chat-room/utils";

const MyMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [fullView, setFullView] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("my-message bubble");
    function getMedia() {
      message.media &&
        message.media.map((media) => {
          setPhotos((prevPhotos) => [...prevPhotos, media]);
        });
    }
    if (photos.length) {
      return;
    }
    getMedia();
  }, []);

  function handleFullView(index) {
    setOpen(!open);
    if (!open) {
      setFullView(photos[index]);
    }
  }

  return (
    <div className={classes.root}>
      {!isEmpty(message.message) && (
        <Typography className={classes.bubble}>{message.message}</Typography>
      )}
      <Dialog open={open} onClose={() => handleFullView()}>
        <div
          style={{
            backgroundColor: "black",
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={fullView}
            style={{
              objectFit: "contain",
              width: "600px",
              height: "400px",
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default MyMessageBubble;
