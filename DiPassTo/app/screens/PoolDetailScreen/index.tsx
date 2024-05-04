import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {PoolDetail} from './components/PoolDetail';

export function PoolDetailScreen() {
  const poolDetail = {
    id: '4',
    imageUrl: 'https://picsum.photos/200/300',
    createdAt: Date.now(),
    total: 200,
    remaining: 1,
    title: 'Adipisicing elit qui enim consectetur incididunt magna do.',
    createdBy: '0xDdf269bF44f86570beD9A7ef514620A31eB634D6',
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <PoolDetail data={poolDetail} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
});
