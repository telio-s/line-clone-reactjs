import { API, graphqlOperation } from "aws-amplify";
import { listUsers, messageByDate } from "./../graphql/queries";

// get logged in user using listUser
export async function getLoggedInUser() {
  const user = await API.graphql(graphqlOperation(listUsers));
  return user;
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
