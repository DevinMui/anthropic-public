/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CallAction = {
  __typename?: 'CallAction';
  content: Scalars['String']['output'];
};

export type CallActionInput = {
  integration_item_id: Scalars['ID']['input'];
  label: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};

export type ClassifyInput = {
  link: Scalars['String']['input'];
  message: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
};

export type ClassifyOutput = {
  __typename?: 'ClassifyOutput';
  ingester_item: IngesterItem;
  integration_item?: Maybe<IntegrationItem>;
};

export type IngesterItem = {
  __typename?: 'IngesterItem';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  link: Scalars['String']['output'];
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
};

export type IntegrationItem = {
  __typename?: 'IntegrationItem';
  citation: Scalars['String']['output'];
  completed_at?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ingester_item?: Maybe<IngesterItem>;
  label: Scalars['String']['output'];
  provider: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  callAction: CallAction;
  classify: ClassifyOutput;
};


export type MutationCallActionArgs = {
  input: CallActionInput;
};


export type MutationClassifyArgs = {
  input: ClassifyInput;
};

export type Notification = {
  __typename?: 'Notification';
  number: Scalars['Int']['output'];
  provider: Scalars['String']['output'];
};

export type Overview = {
  __typename?: 'Overview';
  integrations: Array<IntegrationItem>;
  notifications: Array<Notification>;
  summaries: Array<Summary>;
};

export type Query = {
  __typename?: 'Query';
  overview: Overview;
};

export type Summary = {
  __typename?: 'Summary';
  citation: Scalars['String']['output'];
  message: Scalars['String']['output'];
  provider: Scalars['String']['output'];
};

export type GetOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOverviewQuery = { __typename?: 'Query', overview: { __typename?: 'Overview', integrations: Array<{ __typename?: 'IntegrationItem', id: string, provider: string, label: string, citation: string, completed_at?: number | null, ingester_item?: { __typename?: 'IngesterItem', provider: string, message: string, link: string, metadata?: string | null } | null }>, summaries: Array<{ __typename?: 'Summary', provider: string, message: string, citation: string }>, notifications: Array<{ __typename?: 'Notification', number: number, provider: string }> } };

export type CallActionMutationVariables = Exact<{
  input: CallActionInput;
}>;


export type CallActionMutation = { __typename?: 'Mutation', callAction: { __typename?: 'CallAction', content: string } };


export const GetOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"integrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"citation"}},{"kind":"Field","name":{"kind":"Name","value":"completed_at"}},{"kind":"Field","name":{"kind":"Name","value":"ingester_item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"citation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<GetOverviewQuery, GetOverviewQueryVariables>;
export const CallActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CallAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CallActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<CallActionMutation, CallActionMutationVariables>;