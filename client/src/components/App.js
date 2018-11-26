import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import { GET_RANDOM_CAR } from '../queries';

const StyledApp = styled.div`
  padding-left: 20px;
  display: grid;
  grid-template-areas:
    ". . . ." 
    ". s . ." 
    ". s . .";
`;

const Spotlight = styled.div`
  grid-area: s;
  /* background: rgb(255, 255, 255) none repeat scroll 0% 0% !important; */
  background: rgb(30, 30, 30) none repeat scroll 0% 0%;
  border-radius: 5px;
  padding: 32px 32px 24px;
  width: 440px;
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 16px 40px !important; */
  box-shadow: rgb(0, 0, 0) 0px 16px 40px;
  margin-top: 100px;
  color: white;

  .spotlight-image {
    min-height: 325px;
    width: 100%;
  }
`;

const App = () => (
  <StyledApp className="App">
    <Query query={GET_RANDOM_CAR} >
      {({ data, loading, error }) => {
        console.log(data);
        if (loading) return <div>Loading...</div>
        if (error) return <div>{error.message}</div>
        return (
          <Spotlight>
            <div
              className="spotlight-image"
              style={{ background: `url(${data.getRandomCar.imageUrl}) center center / cover no-repeat` }}  
            >
            </div>
            <div className="spotlight-header">
              <h2>
                <strong>{data.getRandomCar.plateNo}</strong>
              </h2>
              <h5>
                <strong>{data.getRandomCar.nationality}</strong>
              </h5>
              <p>
                Created by <strong>
                {data.getRandomCar.username}
                </strong>
              </p>
              <p>
                {data.getRandomCar.likes} <span role="img" aria-label="Heart">❤</span>
              </p>
            </div>
          </Spotlight>
        );
      }}
    </Query>
  </StyledApp>
);

export default App;
