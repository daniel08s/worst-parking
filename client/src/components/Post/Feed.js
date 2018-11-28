import React from 'react';
import { Query } from 'react-apollo';
import { GoHeart } from 'react-icons/go'
import styled from 'styled-components';

import withAuth from '../withAuth';
import { GET_ALL_POSTS } from '../../queries';
import { StyledContainer } from '../Styles';

const FeedPost = styled.div`
  background: rgb(30, 30, 30) none repeat scroll 0% 0%;
  padding: 32px 32px 24px;
  width: 500px;
  box-shadow: rgb(0, 0, 0) 0px 40px 20px;
  color: white;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const PostImage = styled.div`
  /* grid-area: i; */
  width: 100%;
  height: 250px;
  background-image: url(${props => props.source});
  background-size: cover;
`;

const PostDesc = styled.div`
  /* grid-area: d; */
  
`;

const PostActions = styled.div`
  /* grid-area: a; */
`;

const HeartIcon = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  svg {
    fill: none;
    stroke: #f44336;
    stroke-width: 1px;
    stroke-linejoin: round;
  }

  :disabled svg {
    fill: #f44336;
    opacity: 0.25;
  }
`;

const Feed = ({ session }) => {

  return (
    <StyledContainer>
      <Query query={ GET_ALL_POSTS } >
        {({ loading, data, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;

          return (
            <div>
              {data.getAllPosts.map(post => (
                  <FeedPost>
                    <PostImage source={post.imageUrl} />
                    <PostActions>
                      <HeartIcon>
                        <GoHeart size="30" color="#f44336" />
                      </HeartIcon>
                    </PostActions>
                    <PostDesc>
                      <strong>{post.username}</strong>
                      <span style={{ paddingLeft: `5px` }}>{post.description}</span>
                    </PostDesc>
                  </FeedPost>
              ))}
            </div>
          );
        }}
      </Query>
    </StyledContainer>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Feed);
