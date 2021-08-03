/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      friends {
        items {
          id
          displayName
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
        friends {
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
        posts {
          nextToken
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
        friends {
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
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      posts {
        items {
          id
          name
          description
          createdAt
          updatedAt
        }
        nextToken
      }
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
        friends {
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
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
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
          updatedAt
        }
        nextToken
      }
      files {
        bucket
        region
        key
      }
      albums {
        id
        albumName
        file {
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
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        albums {
          id
          albumName
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
        friends {
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
        posts {
          nextToken
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
        albums {
          id
          albumName
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      type
      message
      createdAt
      isBlock
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
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
        isBlock
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      name
      description
      comments {
        items {
          id
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      emoji {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        emoji {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAlbum = /* GraphQL */ `
  query GetAlbum($id: ID!) {
    getAlbum(id: $id) {
      id
      albumName
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAlbums = /* GraphQL */ `
  query ListAlbums(
    $filter: ModelAlbumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        albumName
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
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
          lineID
          displayName
          statusMessage
          phoneNumber
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
        isBlock
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
