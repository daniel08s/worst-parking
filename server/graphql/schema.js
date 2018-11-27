const { gql } = require('apollo-server-express');

exports.typeDefs = gql`

type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  joinDate: String
  favorites: [Post]
}

type Post {
  _id: ID
  imageUrl: String!
  nationality: String
  description: String
  brand: String
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
  getAllPosts: [Post]
  getPost(_id: ID!): Post
  getRandomPost: Post
  searchPosts(searchTerm: String): [Post]
  getUserPosts(username: String!): [Post]
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

  addPost(
    imageUrl: String!,
    nationality: String,
    description: String,
    brand: String,
    tags: String,
    username: String!,
  ): Post

  likePost(
    _id: ID!,
    username: String!,
  ): Post

  unlikePost(
    _id: ID!,
    username: String!
  ): Post

  updateUserPost(
    _id: ID!,
    imageUrl: String!,
    nationality: String,
    description: String,
    brand: String,
    tags: String,
    username: String!,
  ): Post

  deleteUserPost(
    _id: ID!,
  ): Post
}

`;
