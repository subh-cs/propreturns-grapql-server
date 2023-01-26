const graphql = require("graphql");
const House = require("../model");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const HouseType = new GraphQLObjectType({
  name: "House",
  fields: () => ({
    id: { type: GraphQLID },
    address: { type: GraphQLString },
    price: { type: GraphQLString },
    noOfBed: { type: GraphQLString },
    noOfBathTub: { type: GraphQLString },
    noOfToilet: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    house: {
      type: HouseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return House.findById(args.id);
      },
    },
    houses: {
      type: new GraphQLList(HouseType),
      resolve(parent, args) {
        return House.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addHouse: {
      type: HouseType,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        noOfBed: { type: new GraphQLNonNull(GraphQLString) },
        noOfBathTub: { type: new GraphQLNonNull(GraphQLString) },
        noOfToilet: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let house = new House({
          address: args.address,
          price: args.price,
          noOfBed: args.noOfBed,
          noOfBathTub: args.noOfBathTub,
          noOfToilet: args.noOfToilet,
        });
        return house.save();
      },
    },
    deleteHouse: {
      type: HouseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return House.findByIdAndRemove(args.id);
      },
    },
    updateHouse: {
      type: HouseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        address: { type: GraphQLString },
        price: { type: GraphQLString },
        noOfBed: { type: GraphQLString },
        noOfBathTub: { type: GraphQLString },
        noOfToilet: { type: GraphQLString },
      },
      resolve(parent, args) {
        return House.findByIdAndUpdate(
          args.id,
          {
            $set: {
              address: args.address,
              price: args.price,
              noOfBed: args.noOfBed,
              noOfBathTub: args.noOfBathTub,
              noOfToilet: args.noOfToilet,
            },
          },
          { new: true }
        );
      },
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
