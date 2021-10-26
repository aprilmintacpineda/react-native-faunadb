import { useQuery } from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View
} from 'react-native';
import Divider from './Divider';

function keyExtractor (item) {
  return item._id;
}

function DataFlatList ({
  emptyMessage,
  query,
  renderItem,
  variables = null
}) {
  const { data, refetch, loading } = useQuery(query, {
    variables
  });

  const queryName =
    query.definitions[0].selectionSet.selections[0].name.value;

  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      data={data[queryName].data}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        <View
          style={{
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>{emptyMessage}</Text>
        </View>
      }
    />
  );
}

export default React.memo(DataFlatList);
