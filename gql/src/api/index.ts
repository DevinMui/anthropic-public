import IngesterSchema from './Ingester/schema';
import ClassifySchema from './Classify/schema';
import CallActionSchema from './CallAction/schema';
import IntegrationSchema from './Integration/schema';
import OverviewSchema from './Overview/schema';
import SummarySchema from './Summary/schema';

import ClassifyResolvers from './Classify/resolver';
import CallActionResolvers from './CallAction/resolver';
import OverviewResolvers from './Overview/resolver';

import IngesterResolvers from './Ingester/resolver';
import IntegrationResolvers from './Integration/resolver';
import SummaryResolvers from './Summary/resolver';

export const Query = `#graphql
  type Query {
    overview: Overview!
  }
`;

export const Mutation = `#graphql
  type Mutation {
    classify(input: ClassifyInput!): ClassifyOutput!
    callAction(input: CallActionInput!): CallAction!
  }
`;

export const resolvers = {
  Query: {
    ...OverviewResolvers,
  },
  Mutation: {
    ...ClassifyResolvers,
    ...CallActionResolvers,
  },
  IntegrationItem: IntegrationResolvers,
  IngesterItem: IngesterResolvers,
  Summary: SummaryResolvers,
};

export const typeDefs = [
  IntegrationSchema,
  IngesterSchema,
  ClassifySchema,
  CallActionSchema,
  OverviewSchema,
  SummarySchema,
  Query,
  Mutation,
];
