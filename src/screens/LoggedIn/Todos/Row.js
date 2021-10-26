import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
  const [mutate, { loading }] = useMutation(mutation, {
    refetchQueries: ['todosByList'],
    variables: {
      id: item._id,
      data: {
        title: item.title,
        completed: !item.completed
      }
    }
  });

  const markAsComplete = React.useCallback(() => {
    mutate();
  }, [mutate]);

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
        disabled={loading}
      />
      <Text>{item.title}</Text>
    </View>
  );
}

export default React.memo(TodoRow);
