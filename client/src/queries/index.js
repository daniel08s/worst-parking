import { gql } from 'apollo-boost';

import { carFragments } from './fragments';

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
    }
  }
`;

export const GET_RANDOM_CAR = gql`
  query {
    getRandomCar {
      ...CompleteCar
    }
  }
  ${carFragments.car}
`;

export const SEARCH_CARS = gql`
  query($searchTerm: String) {
    searchCars(searchTerm: $searchTerm) {
      ...CompleteCar
    }
  }
  ${carFragments.car}
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
