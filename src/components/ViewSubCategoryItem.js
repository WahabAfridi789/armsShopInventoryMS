import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import Button from '../components/Btn';
import {darkGreen, green} from '../components/Constants';

const ViewSubCategoryItem = ({route}) => {
  const {subCategoryName, categoryName} = route.params;

  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection(categoryName)
        .doc(subCategoryName)
        .get();

      if (documentSnapshot.exists) {
        const subCategoryData = documentSnapshot.data();
        const items = subCategoryData.items || [];
        setItems(items);
        setIsFetching(false);
      } else {
        console.log('Sub-Category does not exist');
      }
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  const handleDeleteItem = async itemId => {
    try {
      await firestore()
        .collection(categoryName)
        .doc(subCategoryName)
        .update({
          items: firestore.FieldValue.arrayRemove(itemId),
        });

      Alert.alert('Success', 'Item deleted successfully');
      fetchItems();
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleUpdateItem = async (itemId, updatedData) => {
    if (modalQuantity > selectedItem.quantity) {
      Alert.alert(
        'Invalid Quantity',
        'Entered quantity is greater than the available quantity.',
      );
      return;
    }
    try {
      await firestore()
        .collection(categoryName)
        .doc(subCategoryName)
        .update({
          items: items.map(item => {
            if (item.id === itemId) {
              return {...item, ...updatedData};
            }
            return item;
          }),
        });

      Alert.alert('Success', 'Item updated successfully');
      closeModal();
      fetchItems();
    } catch (error) {
      console.log('Error updating item:', error);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.categoryName}>{categoryName}</Text>
      <Text style={styles.subCategoryName}>{subCategoryName}</Text>

      {isFetching ? (
        <Text>Loading items...</Text>
      ) : items.length > 0 ? (
        // Render the fetched items
        items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemDetailsContainer}>
              <Text style={styles.itemName}>Name: {item.subCategory}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemQuantity}>
                Price: {item.pricePerItem}
              </Text>
              <Text style={styles.itemQuantity}>
                Total Price: {item.quantity * item.pricePerItem}
              </Text>
              <Text style={styles.itemQuantity}>Date: {item.date}</Text>
            </View>
            <View style={styles.itemActionsContainer}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Icon
                  name="pencil"
                  size={20}
                  color="#000"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                <Icon
                  name="trash"
                  size={20}
                  color="#000"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>No items found</Text>
      )}

      <Button
        bgColor={green}
        textColor="white"
        btnLabel="Back"
        Press={() => navigation.goBack()}
      />

      {/* Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Item</Text>
          {selectedItem && (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Name: {selectedItem.subCategory}
              </Text>
              <Text style={styles.modalText}>
                Quantity: {selectedItem.quantity}
              </Text>
              <TextInput
                style={styles.modalText}
                placeholder="Enter Sold Quantity"
                onChangeText={text => {
                  const enteredQuantity = parseInt(text);
                  setModalQuantity(
                    enteredQuantity > selectedItem.quantity
                      ? Alert.alert(
                          'Error',
                          'Sold quantity cannot be greater than available quantity',
                        )
                      : enteredQuantity,
                  );
                }}
                keyboardType="numeric"></TextInput>

              {/* Add your update form components here */}

              <Button
                bgColor={darkGreen}
                textColor="white"
                btnLabel="Update"
                Press={() =>
                  handleUpdateItem(selectedItem.id, {quantity: modalQuantity})
                }
              />

              <Button
                bgColor="red"
                textColor="white"
                btnLabel="Close"
                Press={closeModal}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    backgroundColor: 'black',
    color: 'white',
  },
  subCategoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,

    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemActionsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
  },
  actionIcon: {
    marginBottom: 16,
    color: 'blue',
  },
  goBackButton: {
    marginTop: 16,
    alignSelf: 'center',
    padding: 8,
    color: 'blue',
  },
  goBackButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    fontSize: 16,
  },
});

export default ViewSubCategoryItem;
