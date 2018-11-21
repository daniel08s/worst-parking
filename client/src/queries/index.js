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
