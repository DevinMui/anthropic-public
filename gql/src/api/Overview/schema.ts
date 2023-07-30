const typeDefs = `#graphql
    type Overview {
        notifications: [Notification!]!
        integrations: [IntegrationItem!]!
        summaries: [Summary!]!
    }

    type Notification {
        provider: String!
        number: Int!
    }
`;

export default typeDefs;
