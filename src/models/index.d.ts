import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserGroupsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'updatedAt';
}

type AlbumMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserFriendsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LikeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly lineID?: string;
  readonly displayName?: string;
  readonly statusMessage?: string;
  readonly profilePhoto?: S3Object;
  readonly coverPhoto?: S3Object;
  readonly phoneNumber?: string;
  readonly groups?: (UserGroups | null)[];
  readonly friends?: (UserFriends | null)[];
  readonly posts?: (Post | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class UserGroups {
  readonly id: string;
  readonly user?: User;
  readonly group?: Group;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserGroups, UserGroupsMetaData>);
  static copyOf(source: UserGroups, mutator: (draft: MutableModel<UserGroups, UserGroupsMetaData>) => MutableModel<UserGroups, UserGroupsMetaData> | void): UserGroups;
}

export declare class Group {
  readonly id: string;
  readonly name: string;
  readonly users?: (UserGroups | null)[];
  readonly messages?: (Message | null)[];
  readonly isDirect: boolean;
  readonly announce?: (Message | null)[];
  readonly files?: S3Object;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Group, GroupMetaData>);
  static copyOf(source: Group, mutator: (draft: MutableModel<Group, GroupMetaData>) => MutableModel<Group, GroupMetaData> | void): Group;
}

export declare class Message {
  readonly id: string;
  readonly user?: User;
  readonly group?: Group;
  readonly type: string;
  readonly message: string;
  readonly media?: (S3Object | null)[];
  readonly createdAt: string;
  readonly isBlock: boolean;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class Album {
  readonly id: string;
  readonly albumName?: string;
  readonly file?: S3Object;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Album, AlbumMetaData>);
  static copyOf(source: Album, mutator: (draft: MutableModel<Album, AlbumMetaData>) => MutableModel<Album, AlbumMetaData> | void): Album;
}

export declare class UserFriends {
  readonly id: string;
  readonly user?: User;
  readonly friend?: User;
  readonly displayName?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserFriends, UserFriendsMetaData>);
  static copyOf(source: UserFriends, mutator: (draft: MutableModel<UserFriends, UserFriendsMetaData>) => MutableModel<UserFriends, UserFriendsMetaData> | void): UserFriends;
}

export declare class Post {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly comments?: (Comment | null)[];
  readonly likes?: (Like | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userPostsId?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly comment: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly postCommentsId?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class Like {
  readonly id: string;
  readonly emoji?: S3Object;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly postLikesId?: string;
  constructor(init: ModelInit<Like, LikeMetaData>);
  static copyOf(source: Like, mutator: (draft: MutableModel<Like, LikeMetaData>) => MutableModel<Like, LikeMetaData> | void): Like;
}