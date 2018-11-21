import React from 'react';
import { Formik } from 'formik';

import { SigninForm, Input } from '../Styles';

const initialValues = {
  username: "",
  password: "",
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
          <SigninForm>
            <Input 
              name="username"
              placeholder="Username"
              type="text"
              onChange={handleChange}
            />
            <Input 
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </SigninForm>
        );
      }}
    </Formik>
  );
};
