import { store } from 'fluxible-js';
import { print } from 'graphql/language/printer';
import config from 'react-native-config';

export function getGraphqlOperationName (gqlStatement) {
  return gqlStatement.definitions[0].selectionSet.selections[0].name
    .value;
}

async function graphqlRequest ({ query, variables }) {
  let result = await fetch('https://graphql.us.fauna.com/graphql', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${store.token || config.guestToken}`
    },
    body: JSON.stringify({
      query: print(query),
      variables
    })
  });

  if (result.status !== 200) throw result;

  result = await result.json();

  if (result.errors) throw result.errors;

  result = result.data[getGraphqlOperationName(query)];

  if (result.data) return result.data;
  return result;
}

export function graphqlQuery ({ query, variables }) {
  return graphqlRequest({ query, variables });
}

export function graphqlMutation ({ mutation, variables }) {
  return graphqlRequest({ query: mutation, variables });
}
