import { gql } from 'apollo-boost';

export const carFragments = {
  car: gql`
    fragment CompleteCar on Car {
      _id
      plateNo
      imageUrl
      nationality
      location
      brand
      likes
      tags
      createdDate
      username
    }
  `,
  like: gql`
    fragment LikeCar on Car {
      _id
      likes
    }
  `
};
