import { API, graphqlOperation } from "aws-amplify";
import { getGroup, listUsers, messageByDate } from "./../graphql/queries";

// get logged in user using listUser
export async function getLoggedInUser() {
  try {
    const user = await API.graphql(
      graphqlOperation(listUsers, {
        filter: { email: { eq: "kanyanat.i@ku.th" } },
      })
    );
    return user;
  } catch (error) {
    return;
  }
}

export async function getMessageByDateInGroup(id) {
  const data = await API.graphql(
    graphqlOperation(messageByDate, {
      type: id.toString(),
      sortDirection: "ASC",
    })
  );
  return data.data.messageByDate.items;
}

export async function getUserByUsername(username) {
  const data = await API.graphql(
    graphqlOperation(listUsers, { filter: { username: { eq: username } } })
  );
  return data.data.listUsers.items[0];
}

export async function getTheGroup(id) {
  const data = await API.graphql(graphqlOperation(getGroup, { id }));
  return data.data.getGroup;
}

export async function getDirect(userUsername, friendUsername) {
  const _user = await getUserByUsername(userUsername);
  const _friend = await getUserByUsername(friendUsername);
  console.log(_user);
  let userGroup = [];
  let directId = "";
  _user.groups.items.map((group) => {
    if (group.group.isDirect) {
      // keep all direct chats
      userGroup.push(group.group.id);
    }
  });
  _friend.groups.items.map((group) => {
    if (userGroup.includes(group.group.id)) {
      directId = group.group.id;
      return;
    }
  });
  const _direct = await getMessageByDateInGroup(directId);
  return [_direct, directId];
}
