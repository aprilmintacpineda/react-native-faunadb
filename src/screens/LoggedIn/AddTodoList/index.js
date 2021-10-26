import { gql } from '@apollo/client';
import { store } from 'fluxible-js';
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
    mutation createList($data: ListInput!) {
      createList(data: $data) {
        _id
        title
      }
    }
  `,
  onSuccess: () => {
    navigationRef.current.goBack();
  },
  modifyInput: input => {
    return {
      ...input,
      user: {
        connect: store.user._id
      }
    };
  },
  refetchQueries: ['listByUser']
};

function AddTodoList () {
  return (
    <Form formOptions={formOptions}>
      <FormBody />
    </Form>
  );
}

export default React.memo(AddTodoList);
