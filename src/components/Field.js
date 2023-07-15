import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { black} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={black}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 50,
    color: black,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '90%',
    backgroundColor: 'rgb(220, 220, 220)',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default Field;
