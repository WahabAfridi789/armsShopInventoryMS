import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Appearance,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddSubCategoryItem = ({route, navigation}) => {
  const {category, subcategory} = route.params;
  const currentUser = auth().currentUser;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = async () => {
    if (!currentUser) {
      console.log('User not logged in');
      return;
    }

    if (!category || !subcategory || !name || !quantity || !price) {
      console.log('Please fill in all fields');
      return;
    }

    try {
      const inventorySnapshot = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .get();

      const shopInventory = inventorySnapshot.exists
        ? inventorySnapshot.data()
        : {};

      const itemId = firestore().collection('users').doc().id;

      const newItem = {
        id: itemId, // Add the generated auto ID to the item
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        totalPrice: parseInt(quantity) * parseFloat(price),
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toISOString().slice(11, 19),
      };

      const updatedShopInventory = {
        ...shopInventory,
        [category]: {
          ...(shopInventory[category] || {}),
          [subcategory]: [
            ...(shopInventory[category]?.[subcategory] || []),
            newItem,
          ],
        },
      };

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .set(updatedShopInventory);

        Alert.alert('Added', 'Item added successfully');
        
        navigation.goBack();
      // Clear input fields

      setName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const isFormValid = category && subcategory && name && quantity && price;

  const placeholderTextColor =
    Appearance.getColorScheme() === 'dark' ? '#222831' : '#222831';

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Add {subcategory + ' '}
        {category}
      </Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, {width: '100%'}]}
          placeholder="Name"
          value={name}
          placeholderTextColor={placeholderTextColor}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, {width: '100%'}]}
          placeholder="Quantity"
          keyboardType="numeric"
          placeholderTextColor={placeholderTextColor}
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextInput
          style={[styles.input, {width: '100%'}]}
          placeholder="Price"
          placeholderTextColor={placeholderTextColor}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity
          style={[styles.addButton, !isFormValid && styles.addButtonDisabled]}
          onPress={handleAddItem}
          disabled={!isFormValid}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>

        {/* Back to Dashboard */}
        <TouchableOpacity
          style={[styles.addButton, styles.backToDashboardButton]}
          onPress={() => navigation.goBack()}>
          <Text
            style={[
              styles.addButtonText,
              {
                color: '#222831',
              },
            ]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#393E46',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#EEEEEE',
    backgroundColor: '#222831',
    borderRadius: 8,
    padding: 16,
  },
  form: {
    backgroundColor: '#222831',
    borderRadius: 8,
    padding: 16,
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    justifyContent: 'space-between',
    alignSelf: 'center',

    position: 'absolute',
    top: windowHeight * 0.2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#00ADB5',
    marginBottom: 10,
    paddingLeft: 8,
    color: 'black',
    backgroundColor: '#EEEEEE',
  },
  addButton: {
    backgroundColor: '#00ADB5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonDisabled: {
    backgroundColor: 'gray',
  },
  backToDashboardButton: {
    backgroundColor: '#EEEEEE',
    color: '#222831',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
  },
});

export default AddSubCategoryItem;
