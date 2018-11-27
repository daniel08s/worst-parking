import { gql } from 'apollo-boost';

export const PostFragments = {
  Post: gql`
    fragment CompletePost on Post {
      _id
      imageUrl
      nationality
      description
      brand
      likes
      tags
      createdDate
      username
    }
  `,
  like: gql`
    fragment LikePost on Post {
      _id
      likes
    }
  `
};
