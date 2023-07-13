import React, {useEffect, useState} from 'react';
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

const ViewSubCategoryItemsList = ({route, navigation}) => {
  const {category, subcategory, items, shopInventory, quantity} = route.params;

  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [soldQuantity, setSoldQuantity] = useState('');
    const [soldPrice, setSoldPrice] = useState(500);
    
    const currentUser = auth().currentUser;

  const handleAddTransaction = async (subcategory, item) => {
    if (!currentUser) {
      console.log('User not logged in');
      return;
      }
      
      console.log(item);
  

    if (!quantity || !soldPrice) {
      console.log('Please fill in all fields');
      return;
    }

    try {
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

        let soldQuantity  = 20
      const newTransactionItem = {
        id: itemId, // Add the generated auto ID to the item
        name: item.name,
        quantity: parseInt(soldQuantity),
        price: parseFloat(item.price),
        soldPrice: parseFloat(soldPrice),
        totalPrice: parseInt(soldQuantity) * parseFloat(item.price),
        totalSoldPrice: parseInt(soldQuantity) * parseFloat(soldPrice),
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

      Alert.alert('Item added successfully');
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (subcategory, item) => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        return;
      }

      const updatedSubcategoryItems = shopInventory[category][
        subcategory
      ].filter(subItem => subItem.id !== item.id);

      console.log(
        'ViewSubCategoryItemsList: handleDeleteItem: updatedSubcategoryItems: ',
        updatedSubcategoryItems,
      );

      const updatedInventory = {
        ...shopInventory[category],
        [subcategory]: updatedSubcategoryItems,
      };

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .update({
          [category]: updatedInventory,
        });

      Alert.alert('Success', 'Item deleted successfully.');
    } catch (error) {
      console.log('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item.');
    }
  };

  const handleEditItem = (subcategory, item) => {
    setSelectedItem({subcategory, item});
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
            quantity: parseInt(subItem.quantity) - parseInt(soldQuantity),
            totalPrice:
              parseInt(subItem.totalPrice) -
              parseInt(soldQuantity) * parseInt(subItem.price),
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
      setSoldQuantity('');

      Alert.alert('Success', 'Item updated successfully.');
    } catch (error) {
      console.log('Error updating item:', error);
      Alert.alert('Error', 'Failed to update item.');
    }
  };

  const handleSoldItem = (subcategory, item) => {
      setSelectedItem({ subcategory, item });
      handleAddTransaction(subcategory, item);
    setEditModalVisible(true);
  };

  const closeModal = () => {
    setEditModalVisible(false);
    setSelectedItem(null);
    setSoldQuantity('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.heading}>
          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Items
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {items.map((item, index) => (
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
              {' '}
              {item.name}
            </Text>
            <Text style={styles.itemsListText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemsListText}>Price: {item.price}</Text>
            <Text style={styles.itemsListText}>
              Total Price: {item.totalPrice}
            </Text>
            <Text style={styles.itemsListText}>Date Added : {item.date}</Text>
            <View style={styles.itemButtonsContainer}>
              <TouchableOpacity
                onPress={() => handleEditItem(subcategory, item)}>
                <Icon
                  name="edit"
                  size={20}
                  color="#05445E"
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
                  color="#FF6B6B"
                  style={styles.itemButton}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* Edit Item Modal */}
        {selectedItem && (
          <Modal
            isVisible={editModalVisible}
            onBackdropPress={closeModal}
            backdropOpacity={0.5}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            useNativeDriver
            style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Edit Item</Text>
              <Text style={styles.modalItemName}>{selectedItem.item.name}</Text>
              <Text style={styles.modalItemQuantity}>
                Current Quantity: {selectedItem.item.quantity}
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Sold Quantity"
                keyboardType="numeric"
                value={soldQuantity}
                onChangeText={setSoldQuantity}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleUpdateItem}>
                  <Text style={styles.modalButtonText}>Update Item</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
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
          onPress={() => console.log('Add Item')}>
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
  section: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#00ADB5',
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
    backgroundColor: '#EEEEEE',
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
    margin: 10,
  },
  modalContent: {
    backgroundColor: '#00ADB5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalItemName: {
    fontSize: 18,
    marginBottom: 8,
  },
  modalItemQuantity: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
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
});

export default ViewSubCategoryItemsList;
