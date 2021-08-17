/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const newOnCreateMessage = /* GraphQL */ `
  subscription NewOnCreateMessage {
    newOnCreateMessage {
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
      media {
        bucket
        region
        key
      }
      createdAt
      isBlock
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          userId
          friendId
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          userId
          friendId
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          userId
          friendId
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreateUserGroups = /* GraphQL */ `
  subscription OnCreateUserGroups {
    onCreateUserGroups {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserGroups = /* GraphQL */ `
  subscription OnUpdateUserGroups {
    onUpdateUserGroups {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserGroups = /* GraphQL */ `
  subscription OnDeleteUserGroups {
    onDeleteUserGroups {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserFriends = /* GraphQL */ `
  subscription OnCreateUserFriends {
    onCreateUserFriends {
      id
      userId
      friendId
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
      friend {
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
      displayName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserFriends = /* GraphQL */ `
  subscription OnUpdateUserFriends {
    onUpdateUserFriends {
      id
      userId
      friendId
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
      friend {
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
      displayName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserFriends = /* GraphQL */ `
  subscription OnDeleteUserFriends {
    onDeleteUserFriends {
      id
      userId
      friendId
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
      friend {
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
      displayName
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
      media {
        bucket
        region
        key
      }
      createdAt
      isBlock
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
      media {
        bucket
        region
        key
      }
      createdAt
      isBlock
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
      media {
        bucket
        region
        key
      }
      createdAt
      isBlock
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      comment
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      comment
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      comment
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
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
export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum {
    onCreateAlbum {
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
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum {
    onUpdateAlbum {
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
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum {
    onDeleteAlbum {
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
