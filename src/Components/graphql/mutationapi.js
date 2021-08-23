import React from "react";
import {
  createUserFriends,
  createGroup,
  createUserGroups,
  updateMessage,
} from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export const createUserFriendsApi = async (userId, friendId) => {
  const data = await API.graphql(
    graphqlOperation(createUserFriends, {
      input: {
        userId: userId,
        friendId: friendId,
      },
    })
  );
  return data;
};

export const createGroupApi = async (name, isDirect) => {
  const data = await API.graphql(
    graphqlOperation(createGroup, {
      input: {
        name: name,
        isDirect: isDirect,
      },
    })
  );
  return data.data.createGroup;
};

export const createUserGroupApi = async (
  userGroupsGroupId,
  userGroupsUserId
) => {
  const data = await API.graphql(
    graphqlOperation(createUserGroups, {
      input: {
        userGroupsGroupId: userGroupsGroupId,
        userGroupsUserId: userGroupsUserId,
      },
    })
  );
  return data;
};

export const updateMessageHasRead = async (id, hasRead) => {
  const data = await API.graphql(
    graphqlOperation(updateMessage, {
      input: {
        id: id,
        hasRead: hasRead,
      },
    })
  );
  return data;
};
