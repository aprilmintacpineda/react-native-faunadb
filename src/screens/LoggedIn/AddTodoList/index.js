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
    mutation createList($data: ListInput!) {
      createList(data: $data) {
        _id
        title
      }
    }
  `,
  onSuccess: () => {
    emitEvent('CreatedList');
    navigationRef.current.goBack();
  },
  modifyInput: input => {
    return {
      ...input,
      user: {
        connect: store.user._id
      }
    };
  }
};

function AddTodoList () {
  return (
    <Form formOptions={formOptions}>
      <FormBody />
    </Form>
  );
}

export default React.memo(AddTodoList);
