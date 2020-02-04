import { Resolver } from './apollo';
import * as prisma from '../prisma';

interface RecoverResponse extends prisma.User {
  jwt: String;
}

export type Forgot = Resolver<{ username: String }, boolean>;

export type Recover = Resolver<
  { input: { password: String; confirm: String; token: String } },
  RecoverResponse
>;

export type Login = Resolver<
  { user: { username: String; password: String } },
  RecoverResponse
>;

export type Register = Resolver<
  {
    user: {
      username: String;
      password: String;
      name: String;
      campus: String;
      department: String;
      dob: Date;
      email: String;
      type: Boolean;
    };
  },
  RecoverResponse
>;
