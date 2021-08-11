import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "../Style/MyMessageBubbleStyle";
import { Storage } from "aws-amplify";

const MyMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  //if message.media !== null go find in bucket

  useEffect(() => {
    function getImage() {
      try {
        console.log("getting image...");
        message.media.map(async (media) => {
          console.log(media);
          const key = media.key.substring(7);
          const img = await Storage.get(key);
          // console.log(media.key);
          // console.log(img);
          setPhotos((prevPhotos) => [...prevPhotos, img]);
        });
      } catch (error) {
        console.log("image not found", error);
      }
    }
    if (photos.length) {
      // console.log(photos);
      return;
    }
    if (message.media) getImage();
  }, [message]);

  return (
    <div className={classes.root}>
      <Typography className={classes.buble}>
        {/* {message.media ? "photo" : message.message} */}
        {message.media
          ? photos
            ? photos.map((photo, i) => (
                <img key={i} style={{ width: "50px" }} src={photo} />
              ))
            : null
          : message.message}
      </Typography>
    </div>
  );
};

export default MyMessageBubble;
