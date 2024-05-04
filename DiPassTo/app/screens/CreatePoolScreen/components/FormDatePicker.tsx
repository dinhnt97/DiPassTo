import React, {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';

type Props = {
  label: string;
  onChange: (value: Date) => void;
} & DatePickerProps;
export function FormDatePicker({label, onChange, date, ...rest}: Props) {
  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {/* <TextInput
        style={styles.input}
        {...rest}
        editable={false}
        placeholderTextColor="#B3B3B3"
      /> */}
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={styles.input}>
          <Text style={{fontSize: 16}}>{date?.toDateString() || ''}</Text>
        </View>
      </TouchableWithoutFeedback>

      <DatePicker
        {...rest}
        modal
        open={open}
        date={date}
        onConfirm={value => {
          setOpen(false);
          onChange(value);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
    color: '#333333',
  },
  input: {
    fontSize: 16,
    // height: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 8,
    backgroundColor: '#F4F4F4',
    borderColor: '#666666',
  },
  label: {
    fontSize: 14,
    color: '#DCDCDC',
  },
});
