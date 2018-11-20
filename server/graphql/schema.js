const { gql } = require('apollo-server-express');

exports.typeDefs = gql`

type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  joinDate: String
  favorites: [Car]
}

type Car {
  _id: ID
  plateNo: String!
  imageUrl: String!
  nationality: String!
  location: String!
  brand: String!
  likes: Int
  tags: String
  createdDate: String
}

type Query {
  getAllUsers: [User]
}

`;
