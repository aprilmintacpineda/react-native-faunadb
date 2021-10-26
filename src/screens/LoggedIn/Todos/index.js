import { gql } from '@apollo/client';
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

function Todos ({
  navigation: { setOptions },
  route: { params: list }
}) {
  React.useEffect(() => {
    setOptions({
      title: list.title,
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
  }, [setOptions, list]);

  const renderItem = React.useCallback(
    ({ item }) => <Row item={item} />,
    []
  );

  return (
    <DataFlatList
      emptyMessage="There are no todos in this list yet."
      query={query}
      renderItem={renderItem}
      variables={{
        listId: list._id
      }}
    />
  );
}

export default React.memo(Todos);
