const { gql } = require('apollo-server');

const types = gql`
    scalar JSON

    type Query {
        session: Session
    }

    type Mutation {
        addInteraction(timestamp: String!, data: JSON!): Interaction!
    }

    type Subscription {
        newInteraction: Interaction!
    }

    type Session {
        interactions: [Interaction]
    }

    type Interaction {
        timestamp: String!,
        data: JSON!
    }
`;

module.exports = types;