import { gql } from 'apollo-boost';

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
