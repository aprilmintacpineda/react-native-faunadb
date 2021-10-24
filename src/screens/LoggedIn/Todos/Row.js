import gql from 'graphql-tag';
import React from 'react';
import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useMutation from 'hooks/useMutation';

const mutation = gql`
  mutation updateTodo($id: ID!, $data: TodoInput!) {
    updateTodo(id: $id, data: $data) {
      _id
      title
      completed
    }
  }
`;

function TodoRow ({ item }) {
  const { isLoading, mutate } = useMutation({ mutation });

  const markAsComplete = React.useCallback(() => {
    mutate({
      id: item._id,
      data: {
        title: item.title,
        completed: !item.completed
      }
    });
  }, [mutate, item]);

  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <BouncyCheckbox
        isChecked={item.completed}
        disableBuiltInState
        onPress={markAsComplete}
        useNativeDriver
        disabled={isLoading}
      />
      <Text>{item.title}</Text>
    </View>
  );
}

export default React.memo(TodoRow);
