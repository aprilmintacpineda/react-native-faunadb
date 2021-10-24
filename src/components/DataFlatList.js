import { addEvent, addEvents } from 'fluxible-js';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View
} from 'react-native';
import Divider from './Divider';
import useQuery from 'hooks/useQuery';

function keyExtractor (item) {
  return item._id;
}

function DataFlatList ({
  emptyMessage,
  query,
  renderItem,
  refreshOn = null,
  updateMutationName = null,
  variables = null
}) {
  const { isInitial, isRefreshing, refreshData, data, updateState } =
    useQuery({
      query,
      variables
    });

  React.useEffect(() => {
    if (!refreshOn) return;
    return addEvents(refreshOn, refreshData);
  }, [refreshOn, refreshData]);

  React.useEffect(() => {
    if (!updateMutationName) return;

    return addEvent(updateMutationName, newDocument => {
      updateState(({ data }) => ({
        data: data.map(oldDocument => {
          if (oldDocument._id !== newDocument._id)
            return oldDocument;

          return {
            ...oldDocument,
            ...newDocument
          };
        })
      }));
    });
  }, [updateMutationName, updateState]);

  if (isInitial) {
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
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshData}
        />
      }
      data={data}
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
