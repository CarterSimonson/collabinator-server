const { gql } = require('apollo-server');

const types = gql`
    scalar JSON

    type Query {
        session: Session
    }

    type Mutation {
        pushInteraction(userId: ID!, timestamp: String!, data: JSON!): Interaction!
    }

    type Subscription {
        newInteraction: Interaction!
    }

    type Session {
        interactions: [Interaction]
    }

    type Interaction {
        userId: ID!,
        timestamp: String!,
        data: JSON!
    }
`;

module.exports = types;