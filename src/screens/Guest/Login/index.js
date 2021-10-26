import { gql } from '@apollo/client';
import { StackActions } from '@react-navigation/native';
import { updateStore } from 'fluxible-js';
import React from 'react';
import { Alert } from 'react-native';
import FormBody from './FormBody';
import { apolloClient, navigationRef } from 'App';
import Form from 'components/Form';
import validate from 'libs/validate';

const formOptions = {
  initialFormValues: {
    email: '',
    password: ''
  },
  validators: {
    email: ({ email }) => validate(email, ['required', 'email']),
    password: ({ password }) => validate(password, ['required'])
  },
  onSubmit: async ({ formValues }) => {
    const result = await apolloClient.query({
      query: gql`
        query login($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `,
      variables: formValues
    });

    return result.data.login;
  },
  onSuccess: ({ data }) => {
    updateStore({ token: data });
    navigationRef.current.dispatch(StackActions.replace('LoggedIn'));
  },
  onFailed: () => {
    Alert.alert(null, 'Incorrect email or password');
  }
};

function Login () {
  return (
    <Form formOptions={formOptions}>
      <FormBody />
    </Form>
  );
}

export default React.memo(Login);
