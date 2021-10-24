import gql from 'graphql-tag';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogoutButton from './LogoutButton';
import { navigationRef } from 'App';
import DataFlatList from 'components/DataFlatList';

const query = gql`
  query listByUser {
    listByUser {
      data {
        _id
        title
      }
    }
  }
`;

const refreshOn = ['CreatedList'];

function TodoLists ({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <LogoutButton />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigationRef.current.navigate('AddTodoList');
          }}
        >
          <Ionicons name="ios-add-outline" size={20} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigationRef.current.navigate('Todos', item);
        }}
      >
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <DataFlatList
      emptyMessage="You have no list yet."
      query={query}
      renderItem={renderItem}
      refreshOn={refreshOn}
    />
  );
}

export default React.memo(TodoLists);
