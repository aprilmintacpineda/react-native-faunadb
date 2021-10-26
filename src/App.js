import 'fluxible/initStore';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from 'fluxible-js';
import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { SafeAreaView } from 'react-native';
import config from 'react-native-config';
import Guest from 'screens/Guest';
import LoggedIn from 'screens/LoggedIn';

export const navigationRef = React.createRef();

const link = createHttpLink({
  uri: 'https://graphql.us.fauna.com/graphql'
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${store.token || config.guestToken}`
    }
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

const StackNavigation = createNativeStackNavigator();

function mapStates ({ token }) {
  return { token };
}

export default function App () {
  const { token } = useFluxibleStore(mapStates);

  return (
    <NavigationContainer ref={navigationRef}>
      <ApolloProvider client={apolloClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <StackNavigation.Navigator
            initialRouteName={token ? 'LoggedIn' : 'Guest'}
          >
            <StackNavigation.Screen
              name="Guest"
              component={Guest}
              options={{
                headerShown: false
              }}
            />
            <StackNavigation.Screen
              name="LoggedIn"
              component={LoggedIn}
              options={{
                headerShown: false
              }}
            />
          </StackNavigation.Navigator>
        </SafeAreaView>
      </ApolloProvider>
    </NavigationContainer>
  );
}
