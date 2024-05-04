import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import PoolList from './components/PoolList';

export default function HomeScreen() {
  return (
    <SafeAreaView
    // style={styles.container}
    >
      <View style={styles.container}>
        <PoolList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    paddingBottom: 10,
    // flex: 1,
  },
});
