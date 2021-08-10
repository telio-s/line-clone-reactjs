import React from "react";
import { createUserFriends } from "../../graphql/mutations";
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
