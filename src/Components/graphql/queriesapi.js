import React from "react";
import { listUsers, getUser } from "../../graphql/queries";
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

// export const getUserByUsername = async (id) => {
//   const data = await API.graphql(
//     graphqlOperation(getUser, {
//       id,
//     })
//   );
//   return data;
// };
