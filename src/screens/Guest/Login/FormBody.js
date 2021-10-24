import React from 'react';
import { Text, View } from 'react-native';
import Submit from 'components/Form/Submit';
import TextInput from 'components/Form/TextInput';

function LoginFormBody () {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Login</Text>
      <TextInput field="email" />
      <TextInput field="password" type="password" />
      <Submit />
    </View>
  );
}

export default React.memo(LoginFormBody);
