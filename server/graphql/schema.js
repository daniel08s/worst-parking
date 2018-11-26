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
  plateNo: String
  imageUrl: String!
  nationality: String!
  location: String
  brand: String!
  likes: Int
  tags: String
  createdDate: String
  username: String!
}

type Token {
  token: String!
}

type Query {
  getAllUsers: [User]
  getUser(username: String!): User
  getCurrentUser: User
  getAllCars: [Car]
  getCar(_id: ID!): Car
  getRandomCar: Car
  searchCars(searchTerm: String): [Car]
  getUserCars(username: String!): [Car]
}

type Mutation {
  registerUser(
    username: String!,
    email: String!,
    password: String!,
  ): Token

  signinUser(
    username: String!,
    password: String!,
  ): Token

  addCar(
    plateNo: String,
    imageUrl: String!,
    nationality: String,
    location: String,
    brand: String,
    tags: String,
    username: String!,
  ): Car

  likeCar(
    _id: ID!,
    username: String!,
  ): Car

  unlikeCar(
    _id: ID!,
    username: String!
  ): Car

  updateUserCar(
    _id: ID!,
    plateNo: String,
    imageUrl: String!,
    nationality: String,
    location: String,
    brand: String,
    tags: String,
  ): Car

  deleteUserCar(
    _id: ID!,
  ): Car
}

`;
