const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const WineType = new GraphQLObjectType({
    name: 'Wine',
    description: 'This represents a wine/product',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLString },
        region: { type: GraphQLString },
        vintage: { type: GraphQLString },
        price: { type: GraphQLInt },
        amount: { type: GraphQLInt },
        tasting: { type: GraphQLString },
    })
})

module.exports = WineType;
