import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';

const StackNavigation = createNativeStackNavigator();

function Guest () {
  return (
    <StackNavigation.Navigator initialRouteName="Login">
      <StackNavigation.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
    </StackNavigation.Navigator>
  );
}

export default React.memo(Guest);
