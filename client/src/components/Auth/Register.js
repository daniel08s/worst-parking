import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { StyledRegisterForm, StyledInput, StyledButton } from '../Styles';
import { REGISTER_USER } from '../../queries';
import Error from '../Error';
import { useFormInput } from '../../hooks';

const Register = (props) => {
  const username = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const passwordConf = useFormInput('');

  const handleSubmit = (event, registerUser) => {
    event.preventDefault();
    registerUser().then(async ({ data }) => {
      localStorage.setItem('token', data.registerUser.token);
      await props.refetch();
      props.history.push('/');
    });
  };

  const validate = () => {
    const required = username.value && email.value && password.value && password.value === passwordConf.value;
    const emailValid = email.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i);
    return required && emailValid;
  };

  return (
    <Mutation
      mutation={REGISTER_USER}
      variables={{
        username: username.value,
        email: email.value,
        password: password.value,
      }}
    >
      {(registerUser, { loading, data, error }) => (
          <StyledRegisterForm onSubmit={e => handleSubmit(e, registerUser)}>
            <StyledInput 
              name="username"
              placeholder="Username"
              type="text"
              {...username}
              required
            />
            <StyledInput 
              name="email"
              placeholder="Email address"
              type="email"
              {...email}
              required
            />
            <StyledInput 
              type="password"
              name="password"
              placeholder="Password"
              {...password}
              required
            />
            <StyledInput 
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              {...passwordConf}
              required
            />
          <StyledButton
            type="submit"
            disabled={loading || !validate()}
            onSubmit={e => handleSubmit(e, registerUser)}
          >
            Register
          </StyledButton>
          {error &&  <Error error={error} />}
        </StyledRegisterForm>
      )}
    </Mutation>
  );
};

export default withRouter(Register);
