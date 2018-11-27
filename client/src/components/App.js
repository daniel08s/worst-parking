import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import { GET_RANDOM_POST } from '../queries';

const StyledApp = styled.div`
  padding-left: 20px;
  display: grid;
  grid-template-areas:
    ". . . ." 
    ". s . ." 
    ". s . ."
    ". m . .";
`;

const Spotlight = styled.div`
  grid-area: s;
  /* background: rgb(255, 255, 255) none repeat scroll 0% 0% !important; */
  background: rgb(30, 30, 30) none repeat scroll 0% 0%;
  border-radius: 5px;
  padding: 32px 32px 24px;
  width: 400px;
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 16px 40px !important; */
  box-shadow: rgb(0, 0, 0) 0px 16px 40px;
  margin-top: 100px;
  color: white;

  .spotlight-image {
    min-height: 320px;
    width: 100%;
  }
`;

const Slogan = styled.div`
  grid-area: m;
  color: #FFF;
  padding: 10px;
  text-shadow: 3px 3px 4px #000;
  font-weight: 600; 
  text-decoration: snow;
`;

const App = () => (
  <StyledApp className="App">
    <Query query={GET_RANDOM_POST} >
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>{error.message}</div>
        if (!data.getRandomPost) return <div>null</div>
        return (
          <>
          <Spotlight>
            <a
              href={data.getRandomPost.imageUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div 
                className="spotlight-image"
                style={{ background: `url(${data.getRandomPost.imageUrl}) center center / cover no-repeat` }}  
              />
            </a>
            <div className="spotlight-header">
              <h2>
                <strong>{data.getRandomPost.description}</strong>
              </h2>
              <h5>
                <strong>{data.getRandomPost.nationality}</strong>
              </h5>
              <p>
                Created by <strong>
                {data.getRandomPost.username}
                </strong>
              </p>
              <p>
                {data.getRandomPost.likes} <span role="img" aria-label="Heart">❤</span>
              </p>
            </div>
          </Spotlight>
          <Slogan>
            Find the best pictures of the <strong>worst parkings</strong>!
          </Slogan>
          </>
        );
      }}
    </Query>
  </StyledApp>
);

export default App;
