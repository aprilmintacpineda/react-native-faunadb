import { StackActions } from '@react-navigation/native';
import { updateStore } from 'fluxible-js';
import gql from 'graphql-tag';
import React from 'react';
import { Alert } from 'react-native';
import FormBody from './FormBody';
import { navigationRef } from 'App';
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
  mutation: gql`
    mutation login($data: LoginInput!) {
      login(data: $data)
    }
  `,
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
