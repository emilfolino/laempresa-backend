const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const WineType = require("./wine.js");

const wines = require("../models/wines.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        wines: {
            type: new GraphQLList(WineType),
            description: 'List of all wines',
            resolve: async function() {
                const allWines = await wines.getAllWines();
                
                return allWines;
            }
        }
    })
});

module.exports = RootQueryType;
