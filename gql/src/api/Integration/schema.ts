const typeDefs = `#graphql
    type IntegrationItem {
        id: String! 
        provider: String!
        label: String!
        citation: String!
        created_at: Int!
        completed_at: Int
        ingester_item: IngesterItem
    }
`;

export default typeDefs;