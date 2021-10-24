import { emitEvent, store } from 'fluxible-js';
import gql from 'graphql-tag';
import React from 'react';
import FormBody from './FormBody';
import { navigationRef } from 'App';
import Form from 'components/Form';
import validate from 'libs/validate';

const formOptions = {
  initialFormValues: {
    title: ''
  },
  validators: {
    title: ({ title }) => validate(title, ['required'])
  },
  mutation: gql`
    mutation createTodo($data: TodoInput!) {
      createTodo(data: $data) {
        _id
        title
        completed
      }
    }
  `,
  userId: true,
  onSuccess: () => {
    emitEvent('CreatedTodo');
    navigationRef.current.goBack();
  },
  modifyInput: input => {
    const { params } = navigationRef.current.getCurrentRoute();

    return {
      ...input,
      completed: false,
      list: {
        connect: params._id
      },
      user: {
        connect: store.user._id
      }
    };
  }
};

function AddTodo () {
  return (
    <Form formOptions={formOptions}>
      <FormBody />
    </Form>
  );
}

export default React.memo(AddTodo);
