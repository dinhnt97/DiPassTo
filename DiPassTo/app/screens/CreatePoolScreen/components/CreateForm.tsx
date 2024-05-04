import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {IPoolInfo} from '../../../types';
import {TextField} from './TextField';

import {FormDatePicker} from './FormDatePicker';

export function CreateForm() {
  const [createForm, setCreateForm] = useState<Partial<IPoolInfo>>({
    startTime: new Date(),
    endTime: new Date(),
  });

  const onChangeForm = (key: keyof IPoolInfo) => (value: any) => {
    setCreateForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  function onSubmit() {
    console.log('createForm', createForm);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Pool</Text>
      <View style={styles.formGroup}>
        <TextField
          value={createForm.title}
          onChangeText={onChangeForm('title')}
          label="Pool name"
          placeholder="Pool A"
        />
        <TextField
          value={createForm.ticketPrice}
          inputMode="numeric"
          onChangeText={onChangeForm('ticketPrice')}
          label="Total price"
          placeholder="1000"
          keyboardType="numeric"
        />
        <TextField
          keyboardType="url"
          value={createForm.imageUrl}
          onChangeText={onChangeForm('imageUrl')}
          label="Banner Url"
          placeholder="https://"
        />
        <FormDatePicker
          date={createForm.startTime as Date}
          onChange={onChangeForm('startTime')}
          label="Start Time"
          mode="datetime"
          minimumDate={new Date()}
        />
        <FormDatePicker
          date={createForm.endTime as Date}
          onChange={onChangeForm('endTime')}
          label="End Time"
          mode="datetime"
          minimumDate={createForm.startTime}
        />
      </View>
      <Button
        buttonStyle={{
          backgroundColor: '#6631FF',
        }}
        onPress={onSubmit}
        title="Submit"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    rowGap: 16,
    // flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  formGroup: {
    rowGap: 16,
    marginBottom: 8,
  },
  datepicker: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
