// services/FirestoreService.js

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function updateShopInventory(
  category,
  subcategory,
  updatedInventory,
) {
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
        [category]: updatedInventory,
      });

    return true; // Success
  } catch (error) {
    console.log('Error updating shop inventory:', error);
    throw new Error('Failed to update shop inventory');
  }
}

export async function updateTransactionInventory(
  category,
  subcategory,
  updatedTransactionInventory,
) {
  try {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      return;
    }

    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactionInventory')
      .doc('inventory')
      .set(updatedTransactionInventory);

    return true; // Success
  } catch (error) {
    console.log('Error updating transaction inventory:', error);
    throw new Error('Failed to update transaction inventory');
  }
}


export async function deleteItem(category, subcategory, item,shopInventory) {
  try {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      return;
    }

    const updatedSubcategoryItems = shopInventory[category][subcategory].filter(
      subItem => subItem.id !== item.id,
    );

    const updatedInventory = {
      ...shopInventory[category],
      [subcategory]: updatedSubcategoryItems,
    };

    await updateShopInventory(category, subcategory, updatedInventory);

    return true; // Success
  } catch (error) {
    console.log('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
}


export const getUserName = async uid => {
  try {
    const userSnapshot = await firestore().collection('users').doc(uid).get();
    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      return userData.name;
    }
  } catch (error) {
    console.log('Error fetching user name:', error);
  }
  return '';
};

export const getShopInventory = async uid => {
  try {
    const shopInventorySnapshot = await firestore()
      .collection('users')
      .doc(uid)
      .collection('shopInventory')
      .doc('inventory')
      .get();

    if (shopInventorySnapshot.exists) {
      const inventoryData = shopInventorySnapshot.data();
      return inventoryData;
    }
  } catch (error) {
    console.log('Error fetching shop inventory:', error);
  }
  return {};
};