import gql from 'graphql-tag';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Row from './Row';
import { navigationRef } from 'App';
import DataFlatList from 'components/DataFlatList';

const query = gql`
  query todosByList($listId: ID!) {
    todosByList(listId: $listId) {
      data {
        _id
        title
        completed
      }
    }
  }
`;

const refreshOn = ['CreatedTodo'];

function Todos ({ navigation, route: { params: list } }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigationRef.current.navigate('AddTodo', list);
          }}
        >
          <Ionicons name="ios-add-outline" size={20} />
        </TouchableOpacity>
      )
    });
  }, [navigation, list]);

  const renderItem = React.useCallback(
    ({ item }) => <Row item={item} />,
    []
  );

  return (
    <DataFlatList
      emptyMessage="There are no todos in this list yet."
      query={query}
      renderItem={renderItem}
      refreshOn={refreshOn}
      updateMutationName="updateTodo"
      variables={{
        listId: list._id
      }}
    />
  );
}

export default React.memo(Todos);
