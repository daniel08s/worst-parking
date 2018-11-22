import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { GET_ALL_USERS } from '../queries';
import Error from './Error';

const UserList = styled.ul`
  list-style-type: none;
  padding: 0px 10px;
  width: 200px;
`;

const UserInfo = styled.li`
  
`;

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_USERS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <Error error={error}/>
        return (
          <>
            <h2>Users:</h2>
            <UserList>
              {data.getAllUsers.map(user => (
                <UserInfo key={user._id} >
                  {user.username} - {user.email}
                </UserInfo>
              ))}
            </UserList>
          </>
        );
      }}
    </Query>
  </div>
);

export default App;
