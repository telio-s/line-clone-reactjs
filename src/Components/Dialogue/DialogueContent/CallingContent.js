import React from "react";
import useStyles from "../../../Style/calling-content";

function CallingContent(props) {
  const { localVideo, remoteVideo, call, user, otherend } = props;
  const classes = useStyles();
  return (
    <>
      <div
        style={{
          width: call.type === "audio" ? "480px" : "960px",
          height: "500px",
        }}
      >
        <div className={classes.container}>
          <video
            ref={localVideo}
            autoPlay
            style={{ display: call.type === "audio" ? "none" : "" }}
            className={classes.media}
            muted
          />
          <video
            ref={remoteVideo}
            autoPlay
            hidden={!otherend}
            className={classes.media}
          />
          <img
            className={classes.media}
            hidden={otherend}
            src={
              user.profilePhoto
                ? `https://${user.profilePhoto.bucket}.s3.${user.profilePhoto.region}.amazonaws.com/public/${user.profilePhoto.key}`
                : "/no_display.jpeg"
            }
          />
        </div>
      </div>
      <div className={classes.details}>
        <h1>{user.username}</h1>
      </div>
    </>
  );
}

export default CallingContent;
