import { StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { updateStore } from 'fluxible-js';
import gql from 'graphql-tag';
import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { ActivityIndicator, View } from 'react-native';
import AddTodo from './AddTodo';
import AddTodoList from './AddTodoList';
import TodoLists from './TodoLists';
import Todos from './Todos';
import { navigationRef } from 'App';
import { graphqlQuery } from 'libs/graphql';

const StackNavigation = createNativeStackNavigator();

function mapStates ({ user }) {
  return { user };
}

function LoggedIn () {
  const { user } = useFluxibleStore(mapStates);

  React.useEffect(() => {
    (async () => {
      try {
        const user = await graphqlQuery({
          query: gql`
            query getUserData {
              getUserData {
                _id
                email
                name
              }
            }
          `
        });

        if (!user) throw new Error('User is null');

        updateStore({ user });
      } catch (error) {
        console.log(error);

        updateStore({
          token: null,
          user: null
        });

        navigationRef.current.dispatch(
          StackActions.replace('Guest')
        );
      }
    })();
  }, []);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <StackNavigation.Navigator initialRouteName="TodoLists">
      <StackNavigation.Screen
        name="TodoLists"
        component={TodoLists}
      />
      <StackNavigation.Screen name="Todos" component={Todos} />
      <StackNavigation.Screen
        name="AddTodoList"
        component={AddTodoList}
      />
      <StackNavigation.Screen name="AddTodo" component={AddTodo} />
    </StackNavigation.Navigator>
  );
}

export default React.memo(LoggedIn);
