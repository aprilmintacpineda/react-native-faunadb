import React from 'react';
import { View } from 'react-native';
import Submit from 'components/Form/Submit';
import TextInput from 'components/Form/TextInput';

function FormBody () {
  return (
    <View style={{ padding: 10 }}>
      <TextInput field="title" />
      <Submit />
    </View>
  );
}

export default React.memo(FormBody);
