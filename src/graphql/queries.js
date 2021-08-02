/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
        friends {
          items {
            friendUser {
              username
              displayName
              statusMessage
            }
          }
        }
        groups {
          items {
            group {
              id
              name
              messages {
                items {
                  message
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const messageByDate = /* GraphQL */ `
  query MessageByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messageByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user {
          id
          username
          email
          createdAt
          updatedAt
        }
        group {
          id
          name
          isDirect
          createdAt
          updatedAt
        }
        type
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
