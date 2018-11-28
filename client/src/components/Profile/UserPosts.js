import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { GET_USER_POSTS } from '../../queries';

const Img = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imgUrl});
  background-size: cover;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns};
  border: 1px solid white;
  margin-bottom: 5px;
`;

const formatDate = date => {
  const newDate = new Date(parseInt(date)).toLocaleDateString('pt-PT');
  return `${newDate}`;
};

const UserPosts = ({ username }) => {
  
  return (
    <>
      <h2>Your posts:</h2>
      <Query
        query={ GET_USER_POSTS }
        variables={{ username }}
      >
        {({ loading, data, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          return (
            <>
              {data.getUserPosts.map(post => (
                <Grid columns={`1fr 1fr`} key={post._id} >
                  <Img imgUrl={post.imageUrl} />
                  <div style={{ paddingLeft: `5px` }} >
                    <p>Created on: {formatDate(post.createdDate)}</p>
                    <p>Description: {post.description}</p>
                    <p>{post.likes} <span role="img" aria-label="Heart">❤</span></p>
                  </div>
                </Grid>
              ))}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default UserPosts;
