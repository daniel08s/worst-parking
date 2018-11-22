import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { SigninForm, Input, Button } from '../Styles';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import { useFormInput } from '../../hooks';

const Signin = (props) => {
  const username = useFormInput('');
  const password = useFormInput('');

  const handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token);
      await props.refetch();
      props.history.push('/');
    });
  };

  const validate = () => username.value && password.value ? true : false;

  return (
    <Mutation
      mutation={SIGNIN_USER}
      variables={{ username: username.value, password: password.value }}
    >
      {(signinUser, { loading, data, error }) => (
        <SigninForm onSubmit={e => handleSubmit(e, signinUser)}>
          <Input 
            name="username"
            placeholder="Username"
            type="text"
            {...username}
            required
          />
          <Input 
            type="password"
            name="password"
            placeholder="Password"
            {...password}
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
