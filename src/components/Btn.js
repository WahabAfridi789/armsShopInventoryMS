import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Btn = ({Press, bgColor, textColor, btnLabel}) => {
  return (
    <TouchableOpacity
      onPress={Press}
      style={[styles.button, {backgroundColor: bgColor}]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{btnLabel}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    width: 350,
    paddingVertical: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Btn;
