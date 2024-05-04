import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

type Props = {
  label: string;
} & TextInputProps;
export function TextField({label, ...rest}: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        style={[styles.input]}
        {...rest}
        placeholderTextColor="#444444"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 6,
    // color: '#333333',
  },
  input: {
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 8,
    backgroundColor: '#DCDCDC',
    borderColor: '#666666',
  },
  label: {
    fontSize: 14,
    color: '#DCDCDC',
  },
});
