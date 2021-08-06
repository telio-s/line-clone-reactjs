import { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "./../graphql/mutations";

export async function createMessageInGroup(message) {
  const data = await API.graphql(
    graphqlOperation(createMessage, { input: message })
  );
  return data;
}
