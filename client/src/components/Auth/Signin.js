import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { SigninForm, Input, Button } from '../Styles';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const Signin = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearState = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token);
      await props.refetch();
      clearState();
      props.history.push('/');
    });
  };

  const validate = () => username && password ? true : false;

  return (
    <Mutation
      mutation={SIGNIN_USER}
      variables={{ username, password }}
    >
      {(signinUser, { loading, data, error }) => (
        <SigninForm onSubmit={e => handleSubmit(e, signinUser)}>
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
            onSubmit={e => handleSubmit(e, signinUser)}
          >
            Login
          </Button>
          {error &&  <Error error={error} />}
        </SigninForm>
      )}
    </Mutation>
  );
};

export default withRouter(Signin);
