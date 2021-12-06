import {
  createMessageInGroup,
  updateMessageAcceptCall,
} from "../../api/mutations";

export async function handleCall(type, setCaller, idGroup, user, theirUser) {
  setCaller({ type });
  const message = {
    type: idGroup,
    message: type === "audio" ? "Voice call" : "Video call",
    messageUserId: user.id,
    messageGroupId: idGroup,
    isBlock: false,
    hasRead: false,
    isCall: true,
    isDeclineCall: true,
    media: null,
    messageReceiverId: theirUser.id,
  };
  await createMessageInGroup(message);
}

export async function handleAcceptCall(id, isDeclineCall) {
  const data = await updateMessageAcceptCall(id, isDeclineCall);
}

export function handleCallerDialogue(setCaller, setCall) {
  setCall({ isCall: false, caller: null, callerType: "Voice call" });
  setCaller({ type: "audio" });
}

export function handleCalleeDialogue(setCallee, setCall) {
  setCall({ isCall: false, caller: null, callerType: "Voice call" });
  setCallee({ type: "audio" });
}

export function handleCallMenu(e, anchorEl, setAnchorEl) {
  if (anchorEl) {
    setAnchorEl(null);
    return;
  }
  setAnchorEl(e.currentTarget);
}

export const isEmpty = (field) => {
  let result = false;

  if (
    field === undefined ||
    field === null ||
    (typeof field === "string" && field.trim().length === 0) ||
    (typeof field === "object" && Object.keys(field).length === 0)
  )
    result = true;

  return result;
};
