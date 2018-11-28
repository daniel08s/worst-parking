import { gql } from 'apollo-boost';

import { PostFragments } from './fragments';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      _id
      username
      email
      joinDate
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      joinDate
      favorites {
        _id
        description
        imageUrl
      }
    }
  }
`;

export const GET_RANDOM_POST = gql`
  query {
    getRandomPost {
      ...CompletePost
    }
  }
  ${PostFragments.Post}
`;

export const GET_USER_POSTS = gql`
  query($username: String!) {
    getUserPosts(username: $username) {
      ...CompletePost
    }
  }
  ${PostFragments.Post}
`;

export const SEARCH_POSTS = gql`
  query($searchTerm: String) {
    searchPosts(searchTerm: $searchTerm) {
      ...CompletePost
    }
  }
  ${PostFragments.Post}
`;

export const SIGNIN_USER = gql`
  mutation(
    $username: String!
    $password: String!
  ) {
    signinUser(
      username: $username
      password: $password
    ) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const ADD_POST = gql`
  mutation(
    $imageUrl: String!
    $nationality: String
    $description: String
    $brand: String
    $tags: String
    $username: String!
  ) {
    addPost(
      imageUrl: $imageUrl
      nationality: $nationality
      description: $description
      brand: $brand
      tags: $tags
      username: $username
    ) {
      ...CompletePost
    }
  }
  ${PostFragments.Post}
`;
