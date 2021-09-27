import {
  createNewGroup,
  createUserstoGroup,
  createFriends,
} from "./../../api/mutations";
import { getUserByUsername } from "./../../api/queries";

export async function findFriendByUsername(username, friends, myUser) {
  let isFriend = false;
  let index = null;
  if (myUser.username === username) {
    return;
  }
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].friend.username === username) {
      isFriend = true;
      index = i;
      break;
    }
  }
  if (isFriend) return `already-friend-${index}`;
  const user = await getUserByUsername(username);
  return user;
}

// assume it success
export async function addFriend(userId, friendId, userName, friendName) {
  const success = await createFriends(userId, friendId);
  const group = await createNewGroup(`${userName}${friendName}`, true);
  const gu = await createUserstoGroup(group.id, userId);
  const gf = await createUserstoGroup(group.id, friendId);
  return [success & gu & gf, group.id];
}
