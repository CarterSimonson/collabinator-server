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
            const { action, userId, timestamp, data } = args;
            const interaction = { action, userId, timestamp, data };

            //Limit each session to 10 interactions
            if(session.interactions.length >= 10) {
                session.interactions = session.interactions.slice(0, 9);
            }

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