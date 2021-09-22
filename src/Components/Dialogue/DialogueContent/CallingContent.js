import React from "react";
import useStyles from "../../../styles/calling-content";
// import { isVideoEnable } from "./../../../utils/calling/utils";
import logo from "./../../../logo.svg";

function CallingContent(props) {
  const { localVideo, remoteVideo, call, user, otherend } = props;
  const classes = useStyles();
  console.log(user);
  // remoteVideo &&
  // remoteVideo.current &&
  // isVideoEnable(remoteVideo.current.srcObject)
  return (
    <>
      <div
        style={{
          width: otherend ? "400px" : "480px",
          height: "500px",
        }}
      >
        <div className={classes.container}>
          <video
            ref={localVideo}
            autoPlay
            style={{ display: call.type === "audio" ? "none" : "" }}
            // hidden={call.type === "audio"}
            className={classes.media}
            muted
          />
          <video
            ref={remoteVideo}
            autoPlay
            hidden={!otherend}
            // style={{ display: otherend ? "" : "none" }}
            className={classes.media}
          />
          <img
            className={classes.media}
            src={
              user.profilePhoto
                ? `https://${user.profilePhoto.bucket}.s3.${user.profilePhoto.region}.amazonaws.com/public/${user.profilePhoto.key}`
                : logo
            }
            hidden={otherend}
            // style={{ display: !otherend ? "" : "none" }}
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
