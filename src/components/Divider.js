import React from 'react';
import { View } from 'react-native';

function Divider () {
  return (
    <View
      style={{
        borderBottomColor: 'rgba(208, 209, 213, 0.3)',
        borderBottomWidth: 1
      }}
    />
  );
}

export default React.memo(Divider);
