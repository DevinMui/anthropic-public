const typeDefs = `#graphql
    input ClassifyInput {
        provider: String!
        message: String!
        link: String!
        metadata: String
    }

    type ClassifyOutput {
        ingester_item: IngesterItem!
        integration_item: IntegrationItem
    }
`;

export default typeDefs;