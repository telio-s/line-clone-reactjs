/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      lineID
      displayName
      statusMessage
      profilePhoto {
        bucket
        region
        key
      }
      coverPhoto {
        bucket
        region
        key
      }
      phoneNumber
      groups {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      blocked {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      favourites {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      lineID
      displayName
      statusMessage
      profilePhoto {
        bucket
        region
        key
      }
      coverPhoto {
        bucket
        region
        key
      }
      phoneNumber
      groups {
        items {
          group {
            id
            name
            isDirect
            messages {
              items {
                message
                user {
                  id
                  username
                  displayName
                  statusMessage
                  profilePhoto {
                    bucket
                    region
                    key
                  }
                  coverPhoto {
                    bucket
                    region
                    key
                  }
                }
              }
            }
            users {
              items {
                user {
                  id
                  username
                  displayName
                  statusMessage
                  profilePhoto {
                    bucket
                    region
                    key
                  }
                  coverPhoto {
                    bucket
                    region
                    key
                  }
                }
              }
            }
          }
        }
        nextToken
      }
      blocked {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      favourites {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      lineID
      displayName
      statusMessage
      profilePhoto {
        bucket
        region
        key
      }
      coverPhoto {
        bucket
        region
        key
      }
      phoneNumber
      groups {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      blocked {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      favourites {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }

        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          createdAt
          updatedAt
          user {
            id
            displayName
            statusMessage
            username
          }
        }
        nextToken
      }
      messages {
        items {
          message
          user {
            id
            username
            displayName
            statusMessage
            profilePhoto {
              bucket
              region
              key
            }
            coverPhoto {
              bucket
              region
              key
            }
          }
        }
        nextToken
      }
      isDirect
      createdAt
      updatedAt
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          type
          message
          createdAt
          isBlock
          hasRead
          isCall
          updatedAt
        }
        nextToken
      }
      isDirect
      announce {
        items {
          id
          type
          message
          createdAt
          isBlock
          hasRead
          isCall
          updatedAt
        }
        nextToken
      }
      files {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          type
          message
          createdAt
          isBlock
          hasRead
          isCall
          updatedAt
        }
        nextToken
      }
      isDirect
      announce {
        items {
          id
          type
          message
          createdAt
          isBlock
          hasRead
          isCall
          updatedAt
        }
        nextToken
      }
      files {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUserGroups = /* GraphQL */ `
  mutation CreateUserGroups(
    $input: CreateUserGroupsInput!
    $condition: ModelUserGroupsConditionInput
  ) {
    createUserGroups(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }

        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      group {
        id
        name
        users {
          nextToken
        }
        messages {
          nextToken
        }
        isDirect
        announce {
          nextToken
        }
        files {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUserGroups = /* GraphQL */ `
  mutation UpdateUserGroups(
    $input: UpdateUserGroupsInput!
    $condition: ModelUserGroupsConditionInput
  ) {
    updateUserGroups(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }

        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      group {
        id
        name
        users {
          nextToken
        }
        messages {
          nextToken
        }
        isDirect
        announce {
          nextToken
        }
        files {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserGroups = /* GraphQL */ `
  mutation DeleteUserGroups(
    $input: DeleteUserGroupsInput!
    $condition: ModelUserGroupsConditionInput
  ) {
    deleteUserGroups(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }

        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      group {
        id
        name
        users {
          nextToken
        }
        messages {
          nextToken
        }
        isDirect
        announce {
          nextToken
        }
        files {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      user {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
      }
      group {
        id
        name
        users {
          items {
            user {
              id
              username
            }
          }
        }
        messages {
          nextToken
        }
        isDirect
        createdAt
        updatedAt
      }
      id
      type
      message
      media
      createdAt
      isBlock
      hasRead
      isCall
      isDeclineCall
      receiver {
        id
        displayName
        username
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
      }
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      group {
        id
        name
        users {
          nextToken
        }
        messages {
          nextToken
        }
        isDirect
        announce {
          nextToken
        }
        files {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      type
      message
      media
      createdAt
      isBlock
      hasRead
      isCall
      isDeclineCall
      receiver {
        id
        displayName
      }
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        lineID
        displayName
        statusMessage
        profilePhoto {
          bucket
          region
          key
        }
        coverPhoto {
          bucket
          region
          key
        }
        phoneNumber
        groups {
          nextToken
        }
        blocked {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        favourites {
          id
          username
          email
          lineID
          displayName
          statusMessage
          phoneNumber
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      group {
        id
        name
        users {
          nextToken
        }
        messages {
          nextToken
        }
        isDirect
        announce {
          nextToken
        }
        files {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      type
      message
      media
      createdAt
      isBlock
      hasRead
      isCall
      updatedAt
    }
  }
`;
