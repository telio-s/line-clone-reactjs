import React from "react";
import { listUsers, getUser, messageByDate } from "../../graphql/queries";

import { API, graphqlOperation } from "aws-amplify";

export const listUsersByUsername = async (username) => {
  const data = await API.graphql(
    graphqlOperation(listUsers, {
      filter: {
        username: {
          eq: username,
        },
      },
    })
  );
  return data.data.listUsers.items[0];
};

export const getUserByID = async (id) => {
  const data = await API.graphql(
    graphqlOperation(getUser, {
      id,
    })
  );
  return data.data.getUser;
};

export const getMessageByDate = async (type) => {
  const data = await API.graphql(
    graphqlOperation(messageByDate, {
      type: type,
      sortDirection: "DESC",
    })
  );
  return data.data;
};
