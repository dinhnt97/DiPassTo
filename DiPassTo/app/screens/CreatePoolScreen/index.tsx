import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CreateForm} from './components/CreateForm';

export default function CreatePoolScreen() {
  return (
    <SafeAreaView>
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
});
