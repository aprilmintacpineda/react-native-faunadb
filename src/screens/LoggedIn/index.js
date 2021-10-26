import { gql, useQuery } from '@apollo/client';
import { StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { updateStore } from 'fluxible-js';
import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { ActivityIndicator, View } from 'react-native';
import AddTodo from './AddTodo';
import AddTodoList from './AddTodoList';
import TodoLists from './TodoLists';
import Todos from './Todos';
import { navigationRef } from 'App';

const StackNavigation = createNativeStackNavigator();

function mapStates ({ user }) {
  return { user };
}

const query = gql`
  query getUserData {
    getUserData {
      _id
      email
      name
    }
  }
`;

function setUser (result) {
  updateStore({ user: result.getUserData });
}

function forceLogout () {
  updateStore({
    token: null,
    user: null
  });

  navigationRef.current.dispatch(StackActions.replace('Guest'));
}

function LoggedIn () {
  const { user } = useFluxibleStore(mapStates);

  useQuery(query, {
    onCompleted: setUser,
    onError: forceLogout
  });

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
        options={{
          title: user.name
        }}
      />
      <StackNavigation.Screen
        name="Todos"
        component={Todos}
        options={{ title: '' }}
      />
      <StackNavigation.Screen
        name="AddTodoList"
        component={AddTodoList}
        options={{
          title: 'Add List'
        }}
      />
      <StackNavigation.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          title: 'Add Todo'
        }}
      />
    </StackNavigation.Navigator>
  );
}

export default React.memo(LoggedIn);
