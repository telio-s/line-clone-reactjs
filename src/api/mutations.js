import { API, graphqlOperation } from "aws-amplify";
import {
  createMessage,
  createUserGroups,
  createGroup,
} from "./../graphql/mutations";

export async function createMessageInGroup(message) {
  const data = await API.graphql(
    graphqlOperation(createMessage, { input: message })
  );
  return data;
}

export async function createNewGroup(group, users) {
  try {
    const data = await API.graphql(
      graphqlOperation(createGroup, { input: group })
    );
    const usersGroup = await createUsersGroup(users, data.data.createGroup.id);
    console.log("success createing group", data, usersGroup);
    return data.data.createGroup;
  } catch (error) {
    console.log("can't create group", error);
  }
}

export async function createUsersGroup(users, groupId) {
  try {
    users.map((id) => {
      const data = API.graphql(
        graphqlOperation(createUserGroups, {
          input: {
            userGroupsUserId: id,
            userGroupsGroupId: groupId,
          },
        })
      );
      console.log(data);
      return data;
    });
    console.log("success add people into group");
  } catch (error) {
    console.log("can't add user into group", error);
    return "failed add member to groups";
  }
}
