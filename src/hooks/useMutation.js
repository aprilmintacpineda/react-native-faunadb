import { emitEvent } from 'fluxible-js';
import React, { useState } from 'react';
import {
  getGraphqlOperationName,
  graphqlMutation
} from 'libs/graphql';

function useMutation ({ mutation }) {
  const [{ data, status }, updateState] = useState({
    status: 'initial',
    data: null
  });

  const isInitial = status === 'initial';
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isFailed = status === 'failed';

  const mutate = React.useCallback(
    async (variables = null) => {
      try {
        updateState({ status: 'loading' });

        const data = await graphqlMutation({
          mutation,
          variables
        });

        updateState({
          status: 'success',
          data
        });

        emitEvent(getGraphqlOperationName(mutation), data);
      } catch (error) {
        console.log(error);
        updateState({ status: 'failed' });
      }
    },
    [updateState, mutation]
  );

  return {
    mutate,
    status,
    data,
    isInitial,
    isLoading,
    isSuccess,
    isFailed
  };
}

export default useMutation;
