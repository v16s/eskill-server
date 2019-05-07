// Code generated by Prisma (prisma@1.32.2). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  branch: (where?: BranchWhereInput) => Promise<boolean>;
  global: (where?: GlobalWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  branch: (where: BranchWhereUniqueInput) => BranchNullablePromise;
  branches: (args?: {
    where?: BranchWhereInput;
    orderBy?: BranchOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Branch>;
  branchesConnection: (args?: {
    where?: BranchWhereInput;
    orderBy?: BranchOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => BranchConnectionPromise;
  global: (where: GlobalWhereUniqueInput) => GlobalNullablePromise;
  globals: (args?: {
    where?: GlobalWhereInput;
    orderBy?: GlobalOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Global>;
  globalsConnection: (args?: {
    where?: GlobalWhereInput;
    orderBy?: GlobalOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => GlobalConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createBranch: (data: BranchCreateInput) => BranchPromise;
  updateBranch: (args: {
    data: BranchUpdateInput;
    where: BranchWhereUniqueInput;
  }) => BranchPromise;
  updateManyBranches: (args: {
    data: BranchUpdateManyMutationInput;
    where?: BranchWhereInput;
  }) => BatchPayloadPromise;
  upsertBranch: (args: {
    where: BranchWhereUniqueInput;
    create: BranchCreateInput;
    update: BranchUpdateInput;
  }) => BranchPromise;
  deleteBranch: (where: BranchWhereUniqueInput) => BranchPromise;
  deleteManyBranches: (where?: BranchWhereInput) => BatchPayloadPromise;
  createGlobal: (data: GlobalCreateInput) => GlobalPromise;
  updateGlobal: (args: {
    data: GlobalUpdateInput;
    where: GlobalWhereUniqueInput;
  }) => GlobalPromise;
  updateManyGlobals: (args: {
    data: GlobalUpdateManyMutationInput;
    where?: GlobalWhereInput;
  }) => BatchPayloadPromise;
  upsertGlobal: (args: {
    where: GlobalWhereUniqueInput;
    create: GlobalCreateInput;
    update: GlobalUpdateInput;
  }) => GlobalPromise;
  deleteGlobal: (where: GlobalWhereUniqueInput) => GlobalPromise;
  deleteManyGlobals: (where?: GlobalWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  branch: (
    where?: BranchSubscriptionWhereInput
  ) => BranchSubscriptionPayloadSubscription;
  global: (
    where?: GlobalSubscriptionWhereInput
  ) => GlobalSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type BranchOrderByInput =
  | "name_ASC"
  | "name_DESC"
  | "_id_ASC"
  | "_id_DESC";

export type GlobalOrderByInput =
  | "regs_ASC"
  | "regs_DESC"
  | "regf_ASC"
  | "regf_DESC"
  | "id_ASC"
  | "id_DESC"
  | "_id_ASC"
  | "_id_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type UserOrderByInput =
  | "username_ASC"
  | "username_DESC"
  | "password_ASC"
  | "password_DESC"
  | "name_ASC"
  | "name_DESC"
  | "campus_ASC"
  | "campus_DESC"
  | "department_ASC"
  | "department_DESC"
  | "dob_ASC"
  | "dob_DESC"
  | "email_ASC"
  | "email_DESC"
  | "level_ASC"
  | "level_DESC"
  | "id_ASC"
  | "id_DESC";

export interface GlobalCreateInput {
  departments?: Maybe<TagCreateManyInput>;
  campuses?: Maybe<TagCreateManyInput>;
  regs?: Maybe<Boolean>;
  regf?: Maybe<Boolean>;
  id?: Maybe<String>;
  _id?: Maybe<ID_Input>;
}

export interface BranchCreateInput {
  name: String;
  _id?: Maybe<ID_Input>;
  courses?: Maybe<TagCreateManyInput>;
}

export interface BranchUpdateManyMutationInput {
  name?: Maybe<String>;
}

export type BranchWhereUniqueInput = AtLeastOne<{
  name: Maybe<String>;
  _id?: Maybe<ID_Input>;
}>;

export interface TagUpdateManyDataInput {
  name?: Maybe<String>;
  id?: Maybe<String>;
}

export interface TagRestrictedWhereInput {
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  AND?: Maybe<TagRestrictedWhereInput[] | TagRestrictedWhereInput>;
}

export interface TagUpdateManyWithWhereNestedInput {
  where: TagScalarWhereInput;
  data: TagUpdateManyDataInput;
}

export interface BranchSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<BranchWhereInput>;
  AND?: Maybe<BranchSubscriptionWhereInput[] | BranchSubscriptionWhereInput>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  username: Maybe<String>;
  id?: Maybe<ID_Input>;
}>;

export interface UserUpdateInput {
  username?: Maybe<String>;
  password?: Maybe<String>;
  name?: Maybe<String>;
  campus?: Maybe<String>;
  department?: Maybe<String>;
  dob?: Maybe<DateTimeInput>;
  email?: Maybe<String>;
  level?: Maybe<Int>;
}

export interface TagScalarWhereInput {
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  AND?: Maybe<TagScalarWhereInput[] | TagScalarWhereInput>;
  OR?: Maybe<TagScalarWhereInput[] | TagScalarWhereInput>;
  NOT?: Maybe<TagScalarWhereInput[] | TagScalarWhereInput>;
}

export interface GlobalUpdateManyMutationInput {
  regs?: Maybe<Boolean>;
  regf?: Maybe<Boolean>;
  id?: Maybe<String>;
}

export interface TagUpdateManyInput {
  create?: Maybe<TagCreateInput[] | TagCreateInput>;
  deleteMany?: Maybe<TagScalarWhereInput[] | TagScalarWhereInput>;
  updateMany?: Maybe<
    TagUpdateManyWithWhereNestedInput[] | TagUpdateManyWithWhereNestedInput
  >;
}

export type GlobalWhereUniqueInput = AtLeastOne<{
  id: Maybe<String>;
  _id?: Maybe<ID_Input>;
}>;

export interface UserWhereInput {
  username?: Maybe<String>;
  username_not?: Maybe<String>;
  username_in?: Maybe<String[] | String>;
  username_not_in?: Maybe<String[] | String>;
  username_lt?: Maybe<String>;
  username_lte?: Maybe<String>;
  username_gt?: Maybe<String>;
  username_gte?: Maybe<String>;
  username_contains?: Maybe<String>;
  username_not_contains?: Maybe<String>;
  username_starts_with?: Maybe<String>;
  username_not_starts_with?: Maybe<String>;
  username_ends_with?: Maybe<String>;
  username_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  campus?: Maybe<String>;
  campus_not?: Maybe<String>;
  campus_in?: Maybe<String[] | String>;
  campus_not_in?: Maybe<String[] | String>;
  campus_lt?: Maybe<String>;
  campus_lte?: Maybe<String>;
  campus_gt?: Maybe<String>;
  campus_gte?: Maybe<String>;
  campus_contains?: Maybe<String>;
  campus_not_contains?: Maybe<String>;
  campus_starts_with?: Maybe<String>;
  campus_not_starts_with?: Maybe<String>;
  campus_ends_with?: Maybe<String>;
  campus_not_ends_with?: Maybe<String>;
  department?: Maybe<String>;
  department_not?: Maybe<String>;
  department_in?: Maybe<String[] | String>;
  department_not_in?: Maybe<String[] | String>;
  department_lt?: Maybe<String>;
  department_lte?: Maybe<String>;
  department_gt?: Maybe<String>;
  department_gte?: Maybe<String>;
  department_contains?: Maybe<String>;
  department_not_contains?: Maybe<String>;
  department_starts_with?: Maybe<String>;
  department_not_starts_with?: Maybe<String>;
  department_ends_with?: Maybe<String>;
  department_not_ends_with?: Maybe<String>;
  dob?: Maybe<DateTimeInput>;
  dob_not?: Maybe<DateTimeInput>;
  dob_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  dob_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  dob_lt?: Maybe<DateTimeInput>;
  dob_lte?: Maybe<DateTimeInput>;
  dob_gt?: Maybe<DateTimeInput>;
  dob_gte?: Maybe<DateTimeInput>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  level?: Maybe<Int>;
  level_not?: Maybe<Int>;
  level_in?: Maybe<Int[] | Int>;
  level_not_in?: Maybe<Int[] | Int>;
  level_lt?: Maybe<Int>;
  level_lte?: Maybe<Int>;
  level_gt?: Maybe<Int>;
  level_gte?: Maybe<Int>;
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface GlobalWhereInput {
  departments_some?: Maybe<TagWhereInput>;
  departments_every?: Maybe<TagRestrictedWhereInput>;
  departments_none?: Maybe<TagRestrictedWhereInput>;
  campuses_some?: Maybe<TagWhereInput>;
  campuses_every?: Maybe<TagRestrictedWhereInput>;
  campuses_none?: Maybe<TagRestrictedWhereInput>;
  regs?: Maybe<Boolean>;
  regs_not?: Maybe<Boolean>;
  regf?: Maybe<Boolean>;
  regf_not?: Maybe<Boolean>;
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  _id?: Maybe<ID_Input>;
  _id_not?: Maybe<ID_Input>;
  _id_in?: Maybe<ID_Input[] | ID_Input>;
  _id_not_in?: Maybe<ID_Input[] | ID_Input>;
  _id_lt?: Maybe<ID_Input>;
  _id_lte?: Maybe<ID_Input>;
  _id_gt?: Maybe<ID_Input>;
  _id_gte?: Maybe<ID_Input>;
  _id_contains?: Maybe<ID_Input>;
  _id_not_contains?: Maybe<ID_Input>;
  _id_starts_with?: Maybe<ID_Input>;
  _id_not_starts_with?: Maybe<ID_Input>;
  _id_ends_with?: Maybe<ID_Input>;
  _id_not_ends_with?: Maybe<ID_Input>;
  AND?: Maybe<GlobalWhereInput[] | GlobalWhereInput>;
}

export interface GlobalSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<GlobalWhereInput>;
  AND?: Maybe<GlobalSubscriptionWhereInput[] | GlobalSubscriptionWhereInput>;
}

export interface TagWhereInput {
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  AND?: Maybe<TagWhereInput[] | TagWhereInput>;
}

export interface UserCreateInput {
  username: String;
  password: String;
  name: String;
  campus: String;
  department: String;
  dob?: Maybe<DateTimeInput>;
  email: String;
  level: Int;
  id?: Maybe<ID_Input>;
}

export interface TagCreateManyInput {
  create?: Maybe<TagCreateInput[] | TagCreateInput>;
}

export interface TagCreateInput {
  name: String;
  id: String;
}

export interface BranchUpdateInput {
  name?: Maybe<String>;
  courses?: Maybe<TagUpdateManyInput>;
}

export interface GlobalUpdateInput {
  departments?: Maybe<TagUpdateManyInput>;
  campuses?: Maybe<TagUpdateManyInput>;
  regs?: Maybe<Boolean>;
  regf?: Maybe<Boolean>;
  id?: Maybe<String>;
}

export interface UserUpdateManyMutationInput {
  username?: Maybe<String>;
  password?: Maybe<String>;
  name?: Maybe<String>;
  campus?: Maybe<String>;
  department?: Maybe<String>;
  dob?: Maybe<DateTimeInput>;
  email?: Maybe<String>;
  level?: Maybe<Int>;
}

export interface BranchWhereInput {
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  _id?: Maybe<ID_Input>;
  _id_not?: Maybe<ID_Input>;
  _id_in?: Maybe<ID_Input[] | ID_Input>;
  _id_not_in?: Maybe<ID_Input[] | ID_Input>;
  _id_lt?: Maybe<ID_Input>;
  _id_lte?: Maybe<ID_Input>;
  _id_gt?: Maybe<ID_Input>;
  _id_gte?: Maybe<ID_Input>;
  _id_contains?: Maybe<ID_Input>;
  _id_not_contains?: Maybe<ID_Input>;
  _id_starts_with?: Maybe<ID_Input>;
  _id_not_starts_with?: Maybe<ID_Input>;
  _id_ends_with?: Maybe<ID_Input>;
  _id_not_ends_with?: Maybe<ID_Input>;
  courses_some?: Maybe<TagWhereInput>;
  courses_every?: Maybe<TagRestrictedWhereInput>;
  courses_none?: Maybe<TagRestrictedWhereInput>;
  AND?: Maybe<BranchWhereInput[] | BranchWhereInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface AggregateBranch {
  count: Int;
}

export interface AggregateBranchPromise
  extends Promise<AggregateBranch>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateBranchSubscription
  extends Promise<AsyncIterator<AggregateBranch>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface Branch {
  name: String;
  _id: ID_Output;
  courses?: <T = FragmentableArray<Tag>>() => T;
}

export interface BranchPromise extends Promise<Branch>, Fragmentable {
  name: () => Promise<String>;
  _id: () => Promise<ID_Output>;
  courses: <T = FragmentableArray<Tag>>() => T;
}

export interface BranchSubscription
  extends Promise<AsyncIterator<Branch>>,
    Fragmentable {
  name: () => Promise<AsyncIterator<String>>;
  _id: () => Promise<AsyncIterator<ID_Output>>;
  courses: <T = Promise<AsyncIterator<TagSubscription>>>() => T;
}

export interface BranchNullablePromise
  extends Promise<Branch | null>,
    Fragmentable {
  name: () => Promise<String>;
  _id: () => Promise<ID_Output>;
  courses: <T = FragmentableArray<Tag>>() => T;
}

export interface BranchEdge {
  node: Branch;
  cursor: String;
}

export interface BranchEdgePromise extends Promise<BranchEdge>, Fragmentable {
  node: <T = BranchPromise>() => T;
  cursor: () => Promise<String>;
}

export interface BranchEdgeSubscription
  extends Promise<AsyncIterator<BranchEdge>>,
    Fragmentable {
  node: <T = BranchSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserPreviousValues {
  username: String;
  password: String;
  name: String;
  campus: String;
  department: String;
  dob?: DateTimeOutput;
  email: String;
  level: Int;
  id: ID_Output;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  username: () => Promise<String>;
  password: () => Promise<String>;
  name: () => Promise<String>;
  campus: () => Promise<String>;
  department: () => Promise<String>;
  dob: () => Promise<DateTimeOutput>;
  email: () => Promise<String>;
  level: () => Promise<Int>;
  id: () => Promise<ID_Output>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  username: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  campus: () => Promise<AsyncIterator<String>>;
  department: () => Promise<AsyncIterator<String>>;
  dob: () => Promise<AsyncIterator<DateTimeOutput>>;
  email: () => Promise<AsyncIterator<String>>;
  level: () => Promise<AsyncIterator<Int>>;
  id: () => Promise<AsyncIterator<ID_Output>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateGlobal {
  count: Int;
}

export interface AggregateGlobalPromise
  extends Promise<AggregateGlobal>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateGlobalSubscription
  extends Promise<AsyncIterator<AggregateGlobal>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BranchConnection {
  pageInfo: PageInfo;
  edges: BranchEdge[];
}

export interface BranchConnectionPromise
  extends Promise<BranchConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<BranchEdge>>() => T;
  aggregate: <T = AggregateBranchPromise>() => T;
}

export interface BranchConnectionSubscription
  extends Promise<AsyncIterator<BranchConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<BranchEdgeSubscription>>>() => T;
  aggregate: <T = AggregateBranchSubscription>() => T;
}

export interface GlobalConnection {
  pageInfo: PageInfo;
  edges: GlobalEdge[];
}

export interface GlobalConnectionPromise
  extends Promise<GlobalConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<GlobalEdge>>() => T;
  aggregate: <T = AggregateGlobalPromise>() => T;
}

export interface GlobalConnectionSubscription
  extends Promise<AsyncIterator<GlobalConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<GlobalEdgeSubscription>>>() => T;
  aggregate: <T = AggregateGlobalSubscription>() => T;
}

export interface GlobalPreviousValues {
  regs?: Boolean;
  regf?: Boolean;
  id: String;
  _id: ID_Output;
}

export interface GlobalPreviousValuesPromise
  extends Promise<GlobalPreviousValues>,
    Fragmentable {
  regs: () => Promise<Boolean>;
  regf: () => Promise<Boolean>;
  id: () => Promise<String>;
  _id: () => Promise<ID_Output>;
}

export interface GlobalPreviousValuesSubscription
  extends Promise<AsyncIterator<GlobalPreviousValues>>,
    Fragmentable {
  regs: () => Promise<AsyncIterator<Boolean>>;
  regf: () => Promise<AsyncIterator<Boolean>>;
  id: () => Promise<AsyncIterator<String>>;
  _id: () => Promise<AsyncIterator<ID_Output>>;
}

export interface BranchPreviousValues {
  name: String;
  _id: ID_Output;
}

export interface BranchPreviousValuesPromise
  extends Promise<BranchPreviousValues>,
    Fragmentable {
  name: () => Promise<String>;
  _id: () => Promise<ID_Output>;
}

export interface BranchPreviousValuesSubscription
  extends Promise<AsyncIterator<BranchPreviousValues>>,
    Fragmentable {
  name: () => Promise<AsyncIterator<String>>;
  _id: () => Promise<AsyncIterator<ID_Output>>;
}

export interface BranchSubscriptionPayload {
  mutation: MutationType;
  node: Branch;
  updatedFields: String[];
  previousValues: BranchPreviousValues;
}

export interface BranchSubscriptionPayloadPromise
  extends Promise<BranchSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = BranchPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = BranchPreviousValuesPromise>() => T;
}

export interface BranchSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<BranchSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = BranchSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = BranchPreviousValuesSubscription>() => T;
}

export interface Tag {
  name: String;
  id: String;
}

export interface TagPromise extends Promise<Tag>, Fragmentable {
  name: () => Promise<String>;
  id: () => Promise<String>;
}

export interface TagSubscription
  extends Promise<AsyncIterator<Tag>>,
    Fragmentable {
  name: () => Promise<AsyncIterator<String>>;
  id: () => Promise<AsyncIterator<String>>;
}

export interface TagNullablePromise extends Promise<Tag | null>, Fragmentable {
  name: () => Promise<String>;
  id: () => Promise<String>;
}

export interface GlobalSubscriptionPayload {
  mutation: MutationType;
  node: Global;
  updatedFields: String[];
  previousValues: GlobalPreviousValues;
}

export interface GlobalSubscriptionPayloadPromise
  extends Promise<GlobalSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = GlobalPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = GlobalPreviousValuesPromise>() => T;
}

export interface GlobalSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<GlobalSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = GlobalSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = GlobalPreviousValuesSubscription>() => T;
}

export interface Global {
  departments?: <T = FragmentableArray<Tag>>() => T;
  campuses?: <T = FragmentableArray<Tag>>() => T;
  regs?: Boolean;
  regf?: Boolean;
  id: String;
  _id: ID_Output;
}

export interface GlobalPromise extends Promise<Global>, Fragmentable {
  departments: <T = FragmentableArray<Tag>>() => T;
  campuses: <T = FragmentableArray<Tag>>() => T;
  regs: () => Promise<Boolean>;
  regf: () => Promise<Boolean>;
  id: () => Promise<String>;
  _id: () => Promise<ID_Output>;
}

export interface GlobalSubscription
  extends Promise<AsyncIterator<Global>>,
    Fragmentable {
  departments: <T = Promise<AsyncIterator<TagSubscription>>>() => T;
  campuses: <T = Promise<AsyncIterator<TagSubscription>>>() => T;
  regs: () => Promise<AsyncIterator<Boolean>>;
  regf: () => Promise<AsyncIterator<Boolean>>;
  id: () => Promise<AsyncIterator<String>>;
  _id: () => Promise<AsyncIterator<ID_Output>>;
}

export interface GlobalNullablePromise
  extends Promise<Global | null>,
    Fragmentable {
  departments: <T = FragmentableArray<Tag>>() => T;
  campuses: <T = FragmentableArray<Tag>>() => T;
  regs: () => Promise<Boolean>;
  regf: () => Promise<Boolean>;
  id: () => Promise<String>;
  _id: () => Promise<ID_Output>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface GlobalEdge {
  node: Global;
  cursor: String;
}

export interface GlobalEdgePromise extends Promise<GlobalEdge>, Fragmentable {
  node: <T = GlobalPromise>() => T;
  cursor: () => Promise<String>;
}

export interface GlobalEdgeSubscription
  extends Promise<AsyncIterator<GlobalEdge>>,
    Fragmentable {
  node: <T = GlobalSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface User {
  username: String;
  password: String;
  name: String;
  campus: String;
  department: String;
  dob?: DateTimeOutput;
  email: String;
  level: Int;
  id: ID_Output;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  username: () => Promise<String>;
  password: () => Promise<String>;
  name: () => Promise<String>;
  campus: () => Promise<String>;
  department: () => Promise<String>;
  dob: () => Promise<DateTimeOutput>;
  email: () => Promise<String>;
  level: () => Promise<Int>;
  id: () => Promise<ID_Output>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  username: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  campus: () => Promise<AsyncIterator<String>>;
  department: () => Promise<AsyncIterator<String>>;
  dob: () => Promise<AsyncIterator<DateTimeOutput>>;
  email: () => Promise<AsyncIterator<String>>;
  level: () => Promise<AsyncIterator<Int>>;
  id: () => Promise<AsyncIterator<ID_Output>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  username: () => Promise<String>;
  password: () => Promise<String>;
  name: () => Promise<String>;
  campus: () => Promise<String>;
  department: () => Promise<String>;
  dob: () => Promise<DateTimeOutput>;
  email: () => Promise<String>;
  level: () => Promise<Int>;
  id: () => Promise<ID_Output>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

export type Long = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Global",
    embedded: false
  },
  {
    name: "Branch",
    embedded: false
  },
  {
    name: "Tag",
    embedded: true
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
