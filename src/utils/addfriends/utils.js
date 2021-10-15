import {
  createNewGroup,
  createUserstoGroup,
  createFriends,
} from "./../../api/mutations";
import {
  getMessagesByDate,
  getUserById,
  getUserByUsername,
} from "./../../api/queries";

export async function findFriendByUsername(username, groups, myUser) {
  let isFriend = false;
  let indexG = null;
  let indexF = null;
  if (myUser.username === username) {
    return;
  }
  for (let i = 0; i < groups.length; i++) {
    const users = groups[i].group.users.items;
    for (let j = 0; j < users.length; j++) {
      if (users[j].user.username === username) {
        isFriend = true;
        indexG = i;
        indexF = j;
        break;
      }
    }
  }
  if (isFriend) return `already-friend-${indexG}-${indexF}`;
  const user = await getUserByUsername(username);
  return user;
}

export function getGroupId(user, friendUserName) {
  let groupId = null;
  let groupName = null;
  let messages = [];
  const groups = user.groups.items;
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].group.isDirect) {
      const usersIngroup = groups[i].group.users.items;
      for (let j = 0; j < usersIngroup.length; j++) {
        if (usersIngroup[j].user.username === friendUserName) {
          groupId = groups[i].group.id;
          groupName = groups[i].group.name;
          messages = groups[i].group.messages.items;
          break;
        }
      }
    }
    if (groupId) break;
  }
  return [groupId, groupName, messages];
}

export async function addFriend(userId, friendId, userName, friendName) {
  // const success = await createFriends(userId, friendId);
  const group = await createNewGroup(`${userName}${friendName}`, true);
  const gu = await createUserstoGroup(group.id, userId);
  const gf = await createUserstoGroup(group.id, friendId);
  return [gu & gf, group];
}

export async function setChatRoom(setChat, group, friend) {
  const messages = await getMessagesByDate(group.id);
  console.log(messages);
  setChat({
    idGroup: group.id,
    name: group.name,
    sender: "",
    content: "",
    time: "",
    ISOtime: "",
    theirUser: friend,
    messages: messages.items,
    unread: 0,
  });
}
