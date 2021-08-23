import React, { useState, useEffect } from "react";
import { Typography, Dialog } from "@material-ui/core";
import useStyles from "../Style/TheirMessageBubbleStyle";
import PicturesBubble from "./PicturesBubble";

const TheirMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [fullView, setFullView] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function getImage() {
      try {
        console.log("getting image...");
        message.media.map((media) => {
          setPhotos((prevPhotos) => [...prevPhotos, media]);
        });
      } catch (error) {
        console.log("image not found", error);
      }
    }

    if (photos.length) {
      console.log("already set in photo");
      return;
    }

    if (message.media) {
      console.log("have medias");
      getImage();
    }
  }, [message]);

  function handleFullView(index) {
    console.log("click view full view");
    setOpen(!open);
    if (!open) {
      setFullView(photos[index]);
    }
  }

  return (
    <div className={classes.root}>
      {message.message && (
        <Typography className={classes.bubble}>{message.message}</Typography>
      )}
      {message.media && (
        <Typography
          className={classes.bubble}
          style={{ backgroundColor: "transparent" }}
        >
          <PicturesBubble photos={photos} handleFullView={handleFullView} />
        </Typography>
      )}

      <Dialog
        open={open}
        onClose={() => handleFullView()}
        fullWidth={true}
        maxWidth="md"
      >
        <img src={fullView} />
      </Dialog>
    </div>
  );
};

export default TheirMessageBubble;
