const GraphQLJSON = require('graphql-type-json');

let session = {
    interactions: []
};

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        session: () => session,
    },
    Mutation: {
        pushInteraction: (parent, args, context, info) => {
            const { userId, timestamp, data } = args;
            const interaction = { userId, timestamp, data };

            session.interactions.push(interaction);
            context.pubsub.publish("NEW_INTERACTION", interaction);
            return interaction;
        }
    },
    Subscription: {
        newInteraction: {
            subscribe: (parent, args, context, info) => context.pubsub.asyncIterator("NEW_INTERACTION"),
            resolve: (payload) => payload
        }
    }
};

module.exports = resolvers;