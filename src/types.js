const { gql } = require('apollo-server');

const types = gql`
    scalar JSON

    type Query {
        session: Session
    }

    type Mutation {
        pushInteraction(action: InteractionAction!, userId: ID!, timestamp: String!, data: JSON!): Interaction!
    }

    type Subscription {
        newInteraction: Interaction!
    }

    type Session {
        interactions: [Interaction]
    }

    enum InteractionAction {
        ADD,
        UNDO,
        REDO
    }

    type Interaction {
        action: InteractionAction!,
        userId: ID!,
        timestamp: String!,
        data: JSON!
    }
`;

module.exports = types;