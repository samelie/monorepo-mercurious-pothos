import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Human = {
  __typename?: 'Human';
  id: Scalars['ID']['output'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginResponse>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type ProfileInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getHumans: Array<Human>;
  getMedia: Array<Human>;
};


export type QueryGetHumansArgs = {
  input: ProfileInput;
};


export type QueryGetMediaArgs = {
  input: ProfileInput;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', token: string } | undefined };

export type GetHumansQueryVariables = Exact<{
  input: ProfileInput;
}>;


export type GetHumansQuery = { __typename?: 'Query', getHumans: Array<{ __typename?: 'Human', id: string }> };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const GetHumansDocument = gql`
    query GetHumans($input: ProfileInput!) {
  getHumans(input: $input) {
    id
  }
}
    `;

export function useGetHumansQuery(options: Omit<Urql.UseQueryArgs<never, GetHumansQueryVariables>, 'query'>) {
  return Urql.useQuery<GetHumansQuery, GetHumansQueryVariables>({ query: GetHumansDocument, ...options });
};