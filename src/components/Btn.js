import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Btn = ({onPress, bgColor, textColor, btnLabel}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: bgColor}]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{btnLabel}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    alignItems: 'center',
    width: '90%',
    paddingVertical: 12,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Btn;
