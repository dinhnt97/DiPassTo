import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PoolList from './components/PoolList';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Game Center</Text>
      </View>
      <View style={styles.container}>
        <PoolList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
    // flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerContainer: {padding: 16},
});
