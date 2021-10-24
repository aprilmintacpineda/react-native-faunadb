import 'fluxible/initStore';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { SafeAreaView } from 'react-native';
import Guest from 'screens/Guest';
import LoggedIn from 'screens/LoggedIn';

export const navigationRef = React.createRef();

const StackNavigation = createNativeStackNavigator();

function mapStates ({ token }) {
  return { token };
}

export default function App () {
  const { token } = useFluxibleStore(mapStates);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
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
      </NavigationContainer>
    </SafeAreaView>
  );
}
