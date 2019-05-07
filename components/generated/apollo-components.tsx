type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  token: Scalars["String"];
  user: User;
};

export type Item = Node & {
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  largeImage?: Maybe<Scalars["String"]>;
  price: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum ItemOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  ImageAsc = "image_ASC",
  ImageDesc = "image_DESC",
  LargeImageAsc = "largeImage_ASC",
  LargeImageDesc = "largeImage_DESC",
  PriceAsc = "price_ASC",
  PriceDesc = "price_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC",
  UpdatedAtAsc = "updatedAt_ASC",
  UpdatedAtDesc = "updatedAt_DESC"
}

export type ItemWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<ItemWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<ItemWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<ItemWhereInput>>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  title_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  title_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  title_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  title_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  title_not_ends_with?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  description_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  description_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  description_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  description_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  description_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  description_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  description_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  description_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  description_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  description_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  description_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  description_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  description_not_ends_with?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  image_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  image_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  image_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  image_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  image_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  image_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  image_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  image_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  image_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  image_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  image_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  image_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  image_not_ends_with?: Maybe<Scalars["String"]>;
  largeImage?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  largeImage_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  largeImage_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  largeImage_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  largeImage_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  largeImage_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  largeImage_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  largeImage_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  largeImage_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  largeImage_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  largeImage_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  largeImage_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  largeImage_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  largeImage_not_ends_with?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
  /** All values that are not equal to given value. */
  price_not?: Maybe<Scalars["Int"]>;
  /** All values that are contained in given list. */
  price_in?: Maybe<Array<Scalars["Int"]>>;
  /** All values that are not contained in given list. */
  price_not_in?: Maybe<Array<Scalars["Int"]>>;
  /** All values less than the given value. */
  price_lt?: Maybe<Scalars["Int"]>;
  /** All values less than or equal the given value. */
  price_lte?: Maybe<Scalars["Int"]>;
  /** All values greater than the given value. */
  price_gt?: Maybe<Scalars["Int"]>;
  /** All values greater than or equal the given value. */
  price_gte?: Maybe<Scalars["Int"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
};

export type Mutation = {
  signup: AuthPayload;
  login: AuthPayload;
  createDraft: Post;
  publish: Post;
  deletePost: Post;
  createItem: Item;
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateDraftArgs = {
  title: Scalars["String"];
  content: Scalars["String"];
};

export type MutationPublishArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
};

export type MutationCreateItemArgs = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
  image?: Maybe<Scalars["String"]>;
  largeImage?: Maybe<Scalars["String"]>;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars["ID"];
};

export type Post = {
  id: Scalars["ID"];
  published: Scalars["Boolean"];
  title: Scalars["String"];
  content: Scalars["String"];
  author: User;
};

export type Query = {
  items: Array<Maybe<Item>>;
  feed: Array<Post>;
  drafts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<User>;
};

export type QueryItemsArgs = {
  where?: Maybe<ItemWhereInput>;
  orderBy?: Maybe<ItemOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
};

export type QueryPostArgs = {
  id: Scalars["ID"];
};

export type Subscription = {
  feedSubscription?: Maybe<Post>;
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
  posts: Array<Post>;
};
export type CreateItemMutationVariables = {
  title: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Int"];
  image?: Maybe<Scalars["String"]>;
  largeImage?: Maybe<Scalars["String"]>;
};

export type CreateItemMutation = { __typename?: "Mutation" } & {
  createItem: { __typename?: "Item" } & Pick<Item, "id">;
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthPayload" } & Pick<AuthPayload, "token"> & {
      user: { __typename?: "User" } & Pick<User, "id" | "name" | "email">;
    };
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

export const CreateItemDocument = gql`
  mutation createItem(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export function useCreateItemMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateItemMutation,
    CreateItemMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateItemMutation,
    CreateItemMutationVariables
  >(CreateItemDocument, baseOptions);
}
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
