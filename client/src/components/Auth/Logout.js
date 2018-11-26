import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

import { LogoutButton } from '../Styles';

const handleLogout = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
};

const Logout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <LogoutButton onClick={() => handleLogout(client, history)}>
          Logout
        </LogoutButton>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Logout);
