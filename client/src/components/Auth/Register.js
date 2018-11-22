import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { RegisterForm, Input, Button } from '../Styles';
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
          <RegisterForm onSubmit={e => handleSubmit(e, registerUser)}>
            <Input 
              name="username"
              placeholder="Username"
              type="text"
              {...username}
              required
            />
            <Input 
              name="email"
              placeholder="Email address"
              type="email"
              {...email}
              required
            />
            <Input 
              type="password"
              name="password"
              placeholder="Password"
              {...password}
              required
            />
            <Input 
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              {...passwordConf}
              required
            />
          <Button
            type="submit"
            disabled={loading || !validate()}
            onSubmit={e => handleSubmit(e, registerUser)}
          >
            Register
          </Button>
          {error &&  <Error error={error} />}
        </RegisterForm>
      )}
    </Mutation>
  );
};

export default withRouter(Register);
