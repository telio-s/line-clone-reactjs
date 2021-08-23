// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, UserGroups, Group, Message, Album, UserFriends, Post, Comment, Like, S3Object } = initSchema(schema);

export {
  User,
  UserGroups,
  Group,
  Message,
  Album,
  UserFriends,
  Post,
  Comment,
  Like,
  S3Object
};