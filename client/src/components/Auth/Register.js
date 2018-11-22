import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { RegisterForm, Input, Button } from '../Styles';
import { REGISTER_USER } from '../../queries';
import Error from '../Error';

export default () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
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
      {({ loading, data, error }) => (
          <RegisterForm>
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
            onSubmit={handleSubmit}
          >
            Register
          </Button>
          {error &&  <Error error={error} />}
        </RegisterForm>
      )}
    </Mutation>
  );
};
