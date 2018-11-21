import React from 'react';
import { Formik } from 'formik';

import { RegisterForm, Input } from '../Styles';

const initialValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

export default () => {
  return (
    <Formik
      initialValues={initialValues}
      /* validate={{}}
      onSubmit={} */
    >
      {props => {
        const {
          isSubmitting,
          errors,
          handleChange,
          handleSubmit,
        } = props;

        return (
          <RegisterForm>
            <Input 
              name="username"
              placeholder="Username"
              type="text"
              onChange={handleChange}
            />
            <Input 
              name="email"
              placeholder="Email address"
              type="email"
              onChange={handleChange}
            />
            <Input 
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Input 
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </RegisterForm>
        );
      }}
    </Formik>
  );
};
