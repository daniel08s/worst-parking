import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { SigninForm, Input, Button } from '../Styles';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  const validate = () => username && password ? true : false;

  return (
    <Mutation
      mutation={SIGNIN_USER}
      variables={{ username, password }}
    >
      {({ loading, data, error }) => (
        <SigninForm onSubmit={handleSubmit}>
          <Input 
            name="username"
            placeholder="Username"
            type="text"
            onChange={e => setUsername(e.target.value)}
            value={username}
            required
          />
          <Input 
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
          <Button
            type="submit"
            disabled={loading || !validate()}
            onSubmit={handleSubmit}
          >
            Login
          </Button>
          {error &&  <Error error={error} />}
        </SigninForm>
      )}
    </Mutation>
  );
};
