const typeDefs = `#graphql
    type IngesterItem {
        provider: String!
        created_at: Int!
        message: String!
        link: String!
        id: String!
        metadata: String
    }
`;

export default typeDefs;