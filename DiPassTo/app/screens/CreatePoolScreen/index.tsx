import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {CreateForm} from './components/CreateForm';

export default function CreatePoolScreen() {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create Pool</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <CreateForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerContainer: {padding: 16},
});
