import { API, graphqlOperation } from "aws-amplify";
import { getGroup, listUsers, messageByDate } from "./../graphql/queries";

// get logged in user using listUser
export async function getLoggedInUser(id) {
  try {
    console.log("tao");
    const user = await API.graphql(
      graphqlOperation(listUsers, {
        filter: { id: { eq: id } },
      })
    );
    return user;
  } catch (error) {
    return error;
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
  let userGroup = [];
  let directId = "";
  let groupInfo = [];
  _user.groups.items.map((group) => {
    if (group.group.isDirect) {
      // keep all direct chats
      userGroup.push(group.group.id);
    }
  });
  _friend.groups.items.map((group) => {
    if (userGroup.includes(group.group.id)) {
      directId = group.group.id;
      groupInfo = group;
      // console.log(groupInfo);
      return;
    }
  });
  try {
    // console.log(directId);
    const _direct = await getMessageByDateInGroup(directId);
    // console.log("get message in direct success");
    return [_direct, directId, groupInfo];
  } catch (error) {
    console.log("can't get message from direct");
    return;
  }
}
