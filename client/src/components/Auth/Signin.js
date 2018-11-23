import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { StyledSigninForm, StyledInput, StyledButton } from '../Styles';
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
        <StyledSigninForm onSubmit={e => handleSubmit(e, signinUser)}>
          <StyledInput 
            name="username"
            placeholder="Username"
            type="text"
            {...username}
            required
          />
          <StyledInput 
            type="password"
            name="password"
            placeholder="Password"
            {...password}
            required
          />
          <StyledButton
            type="submit"
            disabled={loading || !validate()}
            onSubmit={e => handleSubmit(e, signinUser)}
          >
            Login
          </StyledButton>
          {error &&  <Error error={error} />}
        </StyledSigninForm>
      )}
    </Mutation>
  );
};

export default withRouter(Signin);
