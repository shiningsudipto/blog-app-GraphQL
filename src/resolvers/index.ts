import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Post } from "./Relations/post";
import { User } from "./Relations/user";
import { Profile } from "./Relations/profile";

export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
