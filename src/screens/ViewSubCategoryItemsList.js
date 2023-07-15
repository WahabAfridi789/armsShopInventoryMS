import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

import {deleteItem} from '../services/firebaseServices';

const ViewSubCategoryItemsList = ({route, navigation}) => {
  const {category, subcategory, items, shopInventory, quantity} = route.params;

  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalQuantity, setModalQuantity] = useState('');
  const [modalPrice, setModalPrice] = useState('');

  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [transactionQuantity, setTransactionQuantity] = useState('');

  const currentUser = auth().currentUser;

  const handleTransaction = async () => {
    if (!selectedItem) {
      return;
    }

    // Check if the quantity entered is valid
    if (parseInt(transactionQuantity) > parseInt(selectedItem.item.quantity)) {
      Alert.alert(
        'Invalid Quantity',
        `Only ${selectedItem.item.quantity} items are available.`,
      );
      return;
    }

    const {subcategory, item} = selectedItem;

    if (!transactionQuantity || !item.price) {
      console.log('Please fill in all fields');
      return;
    }

    const updatedSubcategoryItems = shopInventory[category][subcategory].map(
      subItem => {
        if (subItem.id === item.id) {
          return {
            ...subItem,
            quantity:
              parseInt(subItem.quantity) - parseInt(transactionQuantity),
            totalPrice:
              parseInt(subItem.totalPrice) -
              parseInt(transactionQuantity) * parseInt(item.price),
          };
        }
        return subItem;
      },
    );

    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        return;
      }

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .update({
          [category]: {
            ...shopInventory[category],
            [subcategory]: updatedSubcategoryItems,
          },
        });

      const inventorySnapshot = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('transactionInventory')
        .doc('inventory')
        .get();

      const transactionInventory = inventorySnapshot.exists
        ? inventorySnapshot.data()
        : {};

      const itemId = firestore().collection('users').doc().id;

      const newTransactionItem = {
        id: itemId, // Add the generated auto ID to the item
        name: item.name,
        quantity: parseInt(transactionQuantity),
        price: parseFloat(item.price),
        soldPrice: parseFloat(item.price), // Assuming sold price is the same as the item price
        totalPrice: parseInt(transactionQuantity) * parseFloat(item.price),
        totalSoldPrice: parseInt(transactionQuantity) * parseFloat(item.price),
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toISOString().slice(11, 19),
      };

      const updatedTransactionInventory = {
        ...transactionInventory,
        [category]: {
          ...(transactionInventory[category] || {}),
          [subcategory]: [
            ...(transactionInventory[category]?.[subcategory] || []),
            newTransactionItem,
          ],
        },
      };

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('transactionInventory')
        .doc('inventory')
        .set(updatedTransactionInventory);

      setTransactionModalVisible(false);
      setSelectedItem(null);
      setTransactionQuantity('');

      Alert.alert('Success', 'Item sold successfully.');
    } catch (error) {
      console.log('Error selling item:', error);
      Alert.alert('Error', 'Failed to sell item.');
    }
  };

  const handleDeleteItem = async (subcategory, item) => {
    try {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to delete this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteItem(category, subcategory, item, shopInventory);
                Alert.alert('Success', 'Item deleted successfully.');
              } catch (error) {
                Alert.alert('Error', 'Failed to delete item.');
              }
            },
          },
        ],
      );
    } catch (error) {
      console.log('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item.');
    }
  };

  const handleEditItem = (subcategory, item) => {
    console.log('Edit Item');
    setSelectedItem({subcategory, item});
    setModalName(item.name);
    setModalQuantity(item.quantity.toString());
    setModalPrice(item.price.toString());
    setEditModalVisible(true);
  };

  const handleUpdateItem = async () => {
    if (!selectedItem) {
      return;
    }

    const {subcategory, item} = selectedItem;

    const updatedSubcategoryItems = shopInventory[category][subcategory].map(
      subItem => {
        if (subItem.id === item.id) {
          return {
            ...subItem,
            quantity: parseInt(modalQuantity),
            name: modalName,
            price: modalPrice,
            totalPrice: parseInt(modalQuantity) * parseInt(modalPrice),
          };
        }
        return subItem;
      },
    );

    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        return;
      }

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .update({
          [category]: {
            ...shopInventory[category],
            [subcategory]: updatedSubcategoryItems,
          },
        });

      setEditModalVisible(false);
      setSelectedItem(null);

      Alert.alert('Success', 'Item updated successfully.');
    } catch (error) {
      console.log('Error updating item:', error);
      Alert.alert('Error', 'Failed to update item.');
    }
  };

  const handleSoldItem = (subcategory, item) => {
    setSelectedItem({subcategory, item});
    setTransactionModalVisible(true);
  };

  const closeModal = () => {
    setEditModalVisible(false);
    setSelectedItem(null);
    setModalName('');
    setModalQuantity('');
    setModalPrice('');
    setTransactionModalVisible(false);
    setSelectedItem(null);
    setTransactionQuantity('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.heading}>
          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Items
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {items.length === 0 ? (
          <Text style={styles.noItemsText}>No items in this category</Text>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text
                style={[
                  styles.itemsListText,
                  {
                    fontSize: 20,
                    backgroundColor: '#222831',
                    color: '#EEEEEE',
                  },
                ]}>
                {item.name}
              </Text>
              <Text style={styles.itemsListText}>
                Quantity: {item.quantity}
              </Text>
              <Text style={styles.itemsListText}>Price: {item.price}</Text>
              <Text style={styles.itemsListText}>
                Total Price: {item.totalPrice}
              </Text>
              <Text style={styles.itemsListText}>Date Added: {item.date}</Text>
              <View style={styles.itemButtonsContainer}>
                <TouchableOpacity
                  onPress={() => handleEditItem(subcategory, item)}>
                  <Icon
                    name="edit"
                    size={20}
                    color="#EEEEEE"
                    style={styles.itemButton}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(subcategory, item)}>
                  <Icon
                    name="trash"
                    size={20}
                    color="#FF6B6B"
                    style={styles.itemButton}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSoldItem(subcategory, item)}>
                  <Icon
                    name="check-circle"
                    size={20}
                    color="#EEEEEE"
                    style={styles.itemButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Edit/Transaction Item Modal */}
        {selectedItem && (
          <Modal
            visible={editModalVisible || transactionModalVisible}
            transparent={true}
            animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalHeader}>
                  {editModalVisible ? 'Edit Item' : 'Sell Item'}
                </Text>

                {editModalVisible && (
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter Name"
                    value={modalName}
                    onChangeText={setModalName}
                  />
                )}

                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter Quantity"
                  keyboardType="numeric"
                  value={editModalVisible ? modalQuantity : transactionQuantity}
                  onChangeText={
                    editModalVisible ? setModalQuantity : setTransactionQuantity
                  }
                />

                {editModalVisible && (
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter Price"
                    keyboardType="numeric"
                    value={modalPrice}
                    onChangeText={setModalPrice}
                  />
                )}

                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={
                      editModalVisible ? handleUpdateItem : handleTransaction
                    }>
                    <Text style={styles.modalButtonText}>
                      {editModalVisible ? 'Update Item' : 'Sell Item'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, {backgroundColor: '#FF6B6B'}]}
                    onPress={closeModal}>
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {
              backgroundColor: '#EEEEEE',
            },
          ]}
          onPress={() => navigation.goBack()}>
          <Text
            style={[
              styles.bottomButtonText,
              {
                color: '#222831',
              },
            ]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('AddSubCategoryItem', {
              category: category,
              subcategory: subcategory,
            });
          }}>
          <Text style={styles.bottomButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    backgroundColor: '#222831',
    textDecorationLine: 'underline',
    color: '#EEEEEE',
    padding: 10,
    borderRadius: 8,
  },
  scrollViewContainer: {
    marginBottom: 70,
  },
  centered: {
    alignItems: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subcategoryContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  itemsListText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#EEEEEE',
    color: '#222831',
    padding: 10,
    borderRadius: 8,
  },
  subcategoryItem: {
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#00ADB5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  itemButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 8,
  },
  itemButton: {
    marginLeft: 10,
    backgroundColor: '#222831',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#222831',
    width: '80%',

    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#EEEEEE',
    padding: 10,
    borderWidth: 1,

    borderRadius: 8,
    borderColor: '#EEEEEE',
  },
  modalItemName: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  modalItemQuantity: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalInput: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#222831',
    backgroundColor: '#EEEEEE',
    paddingVertical: 8,
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#05445E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#222831',
    margin: 15,
    borderRadius: 15,
    paddingVertical: 12,
  },
  bottomButton: {
    backgroundColor: '#00ADB5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bottomButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#EEEEEE',
  },
});

export default ViewSubCategoryItemsList;
