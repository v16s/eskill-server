import { Resolver } from './apollo';
import * as prisma from '../prisma';

interface RecoverResponse extends prisma.User {
  jwt: string;
}

export type Forgot = Resolver<{ username: string }, boolean>;

export type Recover = Resolver<
  { input: { password: string; confirm: string; token: string } },
  RecoverResponse
>;

export type Login = Resolver<
  { user: { username: string; password: string } },
  RecoverResponse
>;

type User = {
  username: string;
  password: string;
  name: string;
  campus: string;
  department: string;
  dob: Date;
  email: string;
  type: boolean;
};

export type Register = Resolver<
  {
    user: User;
  },
  RecoverResponse
>;
