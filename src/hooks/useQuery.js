import React from 'react';
import useState from './useState';
import { graphqlQuery } from 'libs/graphql';

function useQuery ({ prefetch = true, query, variables = null }) {
  const [{ data, before, after, status }, updateState] = useState({
    data: null,
    before: null,
    after: null,
    status: 'initial'
  });

  const isFetching = status === 'fetching';
  const isInitial =
    status === 'initial' || (status === 'fetching' && !data);
  const isSuccess = status === 'success';
  const isFailed = status === 'failed';
  const isRefreshing = status === 'refreshing';

  const fetchData = React.useCallback(
    async isRefresh => {
      try {
        updateState({
          status: isRefresh === true ? 'refreshing' : 'fetching'
        });

        const data = await graphqlQuery({ query, variables });

        updateState(oldState => ({
          status: 'success',
          data: isRefresh ? data : (oldState.data || []).concat(data)
        }));
      } catch (error) {
        console.log(error);
        updateState({ status: 'failed' });
      }
    },
    [query, variables]
  );

  const refreshData = React.useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  React.useEffect(() => {
    if (prefetch && isInitial) fetchData();
  }, [prefetch, isInitial, fetchData]);

  return {
    data,
    before,
    after,
    status,
    isFetching,
    isInitial,
    isSuccess,
    isFailed,
    isRefreshing,
    refreshData,
    updateState
  };
}

export default useQuery;
