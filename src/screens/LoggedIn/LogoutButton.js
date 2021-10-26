import { gql, useLazyQuery } from '@apollo/client';
import { StackActions } from '@react-navigation/native';
import { updateStore } from 'fluxible-js';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigationRef } from 'App';

const query = gql`
  query logout {
    logout
  }
`;

function loggedOut () {
  updateStore({
    token: null,
    user: null
  });

  navigationRef.current.dispatch(StackActions.replace('Guest'));
}

function LogoutButton () {
  const [logout, { loading }] = useLazyQuery(query, {
    onCompleted: loggedOut
  });

  const onPress = React.useCallback(() => {
    logout();
  }, [logout]);

  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <Ionicons name="ios-exit-outline" size={20} />
    </TouchableOpacity>
  );
}

export default React.memo(LogoutButton);
