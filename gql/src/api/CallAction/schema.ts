const typeDefs = `#graphql
    input CallActionInput {
        provider: String!
        label: String!
        integration_item_id: ID!
    }

    type CallAction {
        content: String!
    }
`;

export default typeDefs;
