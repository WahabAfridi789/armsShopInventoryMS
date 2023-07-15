import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator ,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getUserName, getShopInventory} from '../services/firebaseServices';

const ViewCategoryItems = ({route, navigation}) => {
  const {category} = route.params;
  const currentUser = auth().currentUser;
  const [userName, setUserName] = useState('');
  const [shopInventory, setShopInventory] = useState({});
  const [loading, setLoading] = useState(true);


  const fetchUserName = useCallback(async () => {
    const name = await getUserName(currentUser.uid);
    setUserName(name);
  }, [currentUser]);

  const fetchShopInventoryData = useCallback(async () => {
     setLoading(true);
    const inventoryData = await getShopInventory(currentUser.uid);
    setShopInventory(inventoryData);
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserName();
      fetchShopInventoryData();
    });

    return unsubscribe;
  }, [navigation, fetchUserName, fetchShopInventoryData]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>
          {category.charAt(0).toUpperCase() + category.slice(1)} Category
        </Text>
      </View>

      {/* <ScrollView style={styles.section}>
        <Text style={styles.subheading}>
          {category.charAt(0).toUpperCase() + category.slice(1)} Inventory
        </Text>
        <View style={styles.categoryContainer}>
          <View style={styles.subcategoryContainer}>
            {Object.entries(shopInventory[category] || {}).map(
              ([subcategory, items]) => (
                <View key={subcategory}>
                  <TouchableOpacity
                    style={styles.subcategoryItem}
                    onPress={() =>
                      navigation.navigate('ViewSubCategoryItemsList', {
                        category,
                        subcategory,
                        items,
                        shopInventory,
                        quantity: items.reduce(
                          (acc, item) => acc + item.quantity,
                          0,
                        ),
                      })
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                      }}>
                      <Text style={styles.categoryText}>
                        View {subcategory}{' '}
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>
                      <View>
                        <Icon
                          name="arrow-circle-right"
                          size={30}
                          color="#EEEEEE"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.itemContainer}>
                    <Text style={styles.itemContainerText}>
                      Total{' '}
                      {subcategory.charAt(0).toUpperCase() +
                        subcategory.slice(1)}{' '}
                      Quantity:{' '}
                      {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </Text>

                    <Text style={styles.itemContainerText}>
                      Total{' '}
                      {subcategory.charAt(0).toUpperCase() +
                        subcategory.slice(1)}{' '}
                      Value:{' '}
                      {items.reduce((acc, item) => acc + item.totalPrice, 0)}
                      &nbsp; PKR
                    </Text>
                  </View>
                </View>
              ),
            )}
          </View>
        </View>
      </ScrollView> */}

      <ScrollView style={styles.section}>
        {loading ? (
          <ActivityIndicator size="large" color="
          #00ADB5
          " />
        ) : (
          <>
            <Text style={styles.subheading}>
              {category.charAt(0).toUpperCase() + category.slice(1)} Inventory
            </Text>
            <View style={styles.categoryContainer}>
              <View style={styles.subcategoryContainer}>
                {Object.entries(shopInventory[category] || {}).map(
                  ([subcategory, items]) => (
                    <View key={subcategory}>
                      <TouchableOpacity
                        style={styles.subcategoryItem}
                        onPress={() =>
                          navigation.navigate('ViewSubCategoryItemsList', {
                            category,
                            subcategory,
                            items,
                            shopInventory,
                            quantity: items.reduce(
                              (acc, item) => acc + item.quantity,
                              0,
                            ),
                          })
                        }>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 20,
                          }}>
                          <Text style={styles.categoryText}>
                            View {subcategory}{' '}
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </Text>
                          <View>
                            <Icon
                              name="arrow-circle-right"
                              size={30}
                              color="#EEEEEE"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>

                      <View style={styles.itemContainer}>
                        <Text style={styles.itemContainerText}>
                          Total{' '}
                          {subcategory.charAt(0).toUpperCase() +
                            subcategory.slice(1)}{' '}
                          Quantity:{' '}
                          {items.reduce((acc, item) => acc + item.quantity, 0)}
                        </Text>

                        <Text style={styles.itemContainerText}>
                          Total{' '}
                          {subcategory.charAt(0).toUpperCase() +
                            subcategory.slice(1)}{' '}
                          Value:{' '}
                          {items.reduce(
                            (acc, item) => acc + item.totalPrice,
                            0,
                          )}{' '}
                          &nbsp; PKR
                        </Text>
                      </View>
                    </View>
                  ),
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.logoutButtonText}>Back to Dashboard</Text>
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
    backgroundColor: '#222831',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#EEEEEE',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#EEEEEE',
    color: '#222831',
    borderRadius: 8,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#222831',
    color: '#EEEEEE',
    borderRadius: 8,
    padding: 16,
  },
  subcategoryContainer: {
    color: '#EEEEEE',
  },
  subcategoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#00ADB5',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  itemContainer: {
    backgroundColor: '#00ADB5',
    color: '#EEEEEE',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  itemContainerText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE',
    color: '#222831',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  itemButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  itemButton: {
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222831',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
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
});

export default ViewCategoryItems;

// useEffect(() => {
//   if (currentUser) {
//     const fetchUserName = async () => {
//       const userSnapshot = await firestore()
//         .collection('users')
//         .doc(currentUser.uid)
//         .get();

//       if (userSnapshot.exists) {
//         const userData = userSnapshot.data();
//         setUserName(userData.name);
//       }
//     };

//     const fetchShopInventory = async () => {
//       const shopInventorySnapshot = await firestore()
//         .collection('users')
//         .doc(currentUser.uid)
//         .collection('shopInventory')
//         .doc('inventory')
//         .get();

//       if (shopInventorySnapshot.exists) {
//         const inventoryData = shopInventorySnapshot.data();
//         setShopInventory(inventoryData);
//       }
//     };

//     fetchUserName();
//     fetchShopInventory();
//   }
// }, []);
