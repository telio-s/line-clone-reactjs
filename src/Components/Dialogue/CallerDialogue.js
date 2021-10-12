import { Dialog, IconButton } from "@material-ui/core";
import {
  CallEndRounded,
  VideocamOffRounded,
  VideocamRounded,
} from "@material-ui/icons";
import { useRef, useEffect, useState } from "react";
import {
  createCall,
  handleSetCallType,
  hangup,
  openMediaDevices,
  switchCallType,
} from "../../utils/calling/utils";
import { servers } from "../../utils/calling/stun-servers";
import CallingContent from "./DialogueContent/CallingContent";
import { handleAcceptCall } from "../../utils/chat-room/utils";
import useStyles from "./../../Style/calling-content";

function CallerDialogue(props) {
  const { open, onclose, id, callee, caller, setCaller, idLastMsg } = props;
  const [otherend, setOtherend] = useState(false);
  const classes = useStyles();
  const peerConnection = new RTCPeerConnection(servers);
  const [dataChannel, setDataChannel] = useState(null);
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  useEffect(async () => {
    async function setup() {
      if (open) {
        const [localStream, remoteStream] = await openMediaDevices();
        localVideo.current.srcObject = localStream;
        remoteVideo.current.srcObject = remoteStream;

        handleSetCallType(localStream, caller, dataChannel);

        await createCall(
          peerConnection,
          localStream,
          remoteStream,
          id,
          onclose,
          setOtherend,
          setDataChannel
        );
        return;
      }
    }
    setup();
  }, []);

  async function hangupthecall() {
    await hangup(
      peerConnection,
      localVideo.current.srcObject,
      remoteVideo.current.srcObject,
      id,
      onclose
    );

    // send 'isDeclineCall: true' to callee
    await handleAcceptCall(idLastMsg, false);
  }
  function handleSwitchCallType() {
    switchCallType(
      localVideo.current.srcObject,
      caller,
      setCaller,
      dataChannel
    );
  }

  return (
    <Dialog
      open={open}
      fullWidth={caller.type === "video"}
      maxWidth={caller.type === "video" && "md"}
    >
      {open && (
        <CallingContent
          localVideo={localVideo}
          remoteVideo={remoteVideo}
          call={caller}
          user={callee}
          otherend={otherend}
        />
      )}
      <div className={classes.details}>
        <IconButton
          onClick={() => hangupthecall()}
          className={classes.callEndIcon}
        >
          <CallEndRounded fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => handleSwitchCallType()}
          className={classes.videocamIcon}
        >
          {caller.type === "video" ? (
            <VideocamRounded fontSize="large" />
          ) : (
            <VideocamOffRounded fontSize="large" />
          )}
        </IconButton>
      </div>
    </Dialog>
  );
}

export default CallerDialogue;
