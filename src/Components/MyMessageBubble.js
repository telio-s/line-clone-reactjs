import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "../Style/MyMessageBubbleStyle";
import { Storage } from "aws-amplify";

const MyMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  const [photo, setPhoto] = useState(null);
  //if message.media !== null go find in bucket

  useEffect(() => {
    async function getImage() {
      try {
        console.log("getting image...");
        const key = message.media[0].key.substring(7);
        const img = await Storage.get(key);
        console.log(message.media[0].key);
        console.log(img);
        setPhoto(<img src={img} />);
      } catch (error) {
        console.log("image not found", error);
      }
    }
    if (message.media) getImage();
  }, [message]);

  return (
    <div className={classes.root}>
      <Typography className={classes.buble}>
        {/* {message.media ? "photo" : message.message} */}
        {message.media ? photo : message.message}
      </Typography>
    </div>
  );
};

export default MyMessageBubble;
