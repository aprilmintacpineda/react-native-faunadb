import { StackActions } from '@react-navigation/native';
import { updateStore } from 'fluxible-js';
import gql from 'graphql-tag';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigationRef } from 'App';
import useMutation from 'hooks/useMutation';

const mutation = gql`
  mutation {
    logout
  }
`;

function LogoutButton () {
  const { mutate, isSuccess, isLoading } = useMutation({
    mutation
  });

  React.useEffect(() => {
    if (!isSuccess) return;

    updateStore({
      token: null,
      user: null
    });

    navigationRef.current.dispatch(StackActions.replace('Guest'));
  }, [isSuccess]);

  const logout = React.useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <TouchableOpacity onPress={logout} disabled={isLoading}>
      <Ionicons name="ios-exit-outline" size={20} />
    </TouchableOpacity>
  );
}

export default React.memo(LogoutButton);
