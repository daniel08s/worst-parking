import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { RegisterForm, Input, Button } from '../Styles';
import { REGISTER_USER } from '../../queries';
import Error from '../Error';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const clearState = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConf('');
  };

  const handleSubmit = (event, registerUser) => {
    event.preventDefault();
    registerUser().then(async ({ data }) => {
      localStorage.setItem('token', data.registerUser.token);
      await props.refetch();
      clearState();
      props.history.push('/');
    });
  };

  const validate = () => {
    const required = username && email && password && password === passwordConf;
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i);
    return required && emailValid;
  };

  return (
    <Mutation
      mutation={REGISTER_USER}
      variables={{ username, email, password }}
    >
      {(registerUser, { loading, data, error }) => (
          <RegisterForm onSubmit={e => handleSubmit(e, registerUser)}>
            <Input 
              name="username"
              placeholder="Username"
              type="text"
              onChange={e => setUsername(e.target.value)}
              required
            />
            <Input 
              name="email"
              placeholder="Email address"
              type="email"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input 
              type="password"
              name="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Input 
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              onChange={e => setPasswordConf(e.target.value)}
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
