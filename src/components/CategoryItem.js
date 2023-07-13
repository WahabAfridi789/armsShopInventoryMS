import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import  {useNavigation} from '@react-navigation/native';

const CategoryItem = ({ category, calculateCategoryQuantity }) => {
  const navigation = useNavigation();
  const handleCategoryPress = () => {
    navigation.navigate('ViewCategoryItems', {category});
  };

  return (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={handleCategoryPress}>
      <Text style={styles.categoryText}>{category}</Text>
      <Text style={styles.categoryQuantity}>
        {calculateCategoryQuantity(category)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    width: '100%',
    backgroundColor: '#00ADB5',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  categoryQuantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default CategoryItem;
