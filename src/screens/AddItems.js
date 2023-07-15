// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import firestore from '@react-native-firebase/firestore';
// import Background from '../components/Background';
// const AddItemScreen = (props) => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubCategory, setSelectedSubCategory] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [pricePerItem, setPricePerItem] = useState('');
//   const [subCategories, setSubCategories] = useState([]);
//     const [newSubCategory, setNewSubCategory] = useState('');
//     const[isSubCategorySelected,setIsSubCategorySelected]=useState(false);
//   const [isSubCategoryAdded, setIsSubCategoryAdded] = useState(false);

//   const categories = ['pistols', 'guns', 'bullets'];

//   useEffect(() => {
//     fetchSubCategories();
//   }, [selectedCategory]);

//   const fetchSubCategories = async () => {
//     if (selectedCategory !== '') {
//       try {
//         const querySnapshot = await firestore()
//           .collection(selectedCategory)
//           .get();

//         const subCategories = querySnapshot.docs.map(doc => doc.id);

//         setSubCategories(subCategories);
//       } catch (error) {
//         console.log('Error fetching sub-categories:', error);
//         setSubCategories([]);
//       }
//     } else {
//       setSubCategories([]);
//     }
//   };

//   const handleAddItem = async () => {
//     if (selectedCategory !== '' && selectedSubCategory !== '' &&quantity!==''&&pricePerItem!=='') {
//       const itemData = {
//         subCategory: selectedSubCategory,
//         quantity: parseInt(quantity),
//         pricePerItem: parseFloat(pricePerItem),
//         totalPrice: parseInt(quantity) * parseFloat(pricePerItem),
//         date: new Date().toISOString().slice(0, 10),
//       };

//       try {
//         await firestore()
//           .collection(selectedCategory)
//           .doc(selectedSubCategory)
//           .update({items: firestore.FieldValue.arrayUnion(itemData)});

//           console.log('Item data stored successfully');
//           Alert.alert('Item data stored successfully');
//             clearFields();
//       } catch (error) {
//         console.log('Error storing item data:', error);
//       }
//     } else {
//       Alert.alert('Please fill all the fields');
//     }
//   };

//     const handleAddSubCategory = async () => {
//         if (selectedCategory !== '') {
//           if (newSubCategory !== '') {

//                 try {
//                     await firestore()
//                         .collection(selectedCategory)
//                         .doc(newSubCategory)
//                         .set({ name: newSubCategory });

//                     console.log('New sub-category added successfully');
//                     setIsSubCategoryAdded(true);
//                     fetchSubCategories(); // Fetch updated sub-categories
//                 } catch (error) {
//                     console.log('Error adding new sub-category:', error);
//                 }
//             }
//         } else {
//             Alert.alert('Please select a category');
//         }
//   };

//     const clearFields = () => {
//         setSelectedCategory('');
//         setSelectedSubCategory('');
//         setQuantity('');
//         setPricePerItem('');
//         setNewSubCategory('');
//         // setIsSubCategoryAdded(false);
//     };

//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Add Item</Text>

//         <Text style={styles.label}>Select Category:</Text>
//         <Picker
//           style={styles.picker}
//           selectedValue={selectedCategory}
//           onValueChange={value => setSelectedCategory(value)}>
//           <Picker.Item label="Select Category" value="" />
//           {categories.map(category => (
//             <Picker.Item key={category} label={category} value={category} />
//           ))}
//         </Picker>

//         {selectedCategory !== '' && (
//           <View>
//             <Text style={styles.label}>Select Sub-Category:</Text>
//             {subCategories.length > 0 ? (
//               <Picker
//                 style={styles.picker}
//                 selectedValue={selectedSubCategory}
//                 onValueChange={value => setSelectedSubCategory(value)}>
//                 <Picker.Item label="Select Sub-Category" value="" />
//                 {subCategories.map(subCategory => (
//                   <Picker.Item
//                     key={subCategory}
//                     label={subCategory}
//                     value={subCategory}
//                   />
//                 ))}
//               </Picker>
//             ) : (
//               <Text style={styles.noSubCategories}>
//                 No sub-categories available
//               </Text>
//             )}
//           </View>
//         )}

//         {!isSubCategoryAdded && selectedSubCategory === '' && (
//           <View>
//             <Text style={styles.label}>Add New Sub-Category (Optional):</Text>
//             <TextInput
//               style={styles.input}
//               value={newSubCategory}
//               onChangeText={text => setNewSubCategory(text)}
//             />
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={handleAddSubCategory}
//               disabled={newSubCategory === ''}>
//               <Text style={styles.buttonText}>Add Sub-Category</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {selectedSubCategory !== '' && (
//           <View>
//             <Text style={styles.label}>Enter Quantity:</Text>
//             <TextInput
//               style={styles.input}
//               value={quantity}
//               onChangeText={text => setQuantity(text)}
//               keyboardType="numeric"
//             />

//             <Text style={styles.label}>Enter Price per Item:</Text>
//             <TextInput
//               style={styles.input}
//               value={pricePerItem}
//               onChangeText={text => setPricePerItem(text)}
//               keyboardType="numeric"
//             />

//             <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
//               <Text style={styles.buttonText}>Add Item</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         {/* Back to Dashboard */}
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => props.navigation.navigate('Dashboard')}>
//           <Text style={styles.buttonText}>Back to Dashboard</Text>
//         </TouchableOpacity>
//       </View>
//     );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#807884',
//     width: '100%',
//     height: '100%',
//     padding: 16,
//     borderRadius: 4,
//         flex: 1,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//       marginBottom: 24,
//     color: '#ffffff',
//   },
//   label: {
//     fontSize: 16,
//       marginBottom: 8,
//     color: '#ffffff',
//   },
//   picker: {
//     backgroundColor: '#ffffff',
//     marginBottom: 16,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#cccccc',
//   },
//   noSubCategories: {
//     fontStyle: 'italic',
//     marginBottom: 16,
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     marginBottom: 16,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   addButton: {
//     backgroundColor: '#e91e63',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

// export default AddItemScreen;

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
import {Picker} from '@react-native-picker/picker';

const AddItem = props => {
  const currentUser = auth().currentUser;
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [showNewSubcategory, setShowNewSubcategory] = useState(false);

  useEffect(() => {
    if (category) {
      fetchSubcategories();
    }
  }, [category]);

  const fetchSubcategories = async () => {
    try {
      const subcategoriesSnapshot = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .get();

      const shopInventory = subcategoriesSnapshot.data();
      const subcategoryList = shopInventory?.[category]
        ? Object.keys(shopInventory[category])
        : [];
      setSubcategories(subcategoryList);
    } catch (error) {
      console.log('Error fetching subcategories:', error);
    }
  };

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
      // Clear input fields
      setCategory('');
      setSubcategory('');
      setNewSubcategory('');
      setName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const handleAddSubcategory = async () => {
    if (!currentUser || !category || !newSubcategory) {
      console.log('Invalid input');
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

      const updatedShopInventory = {
        ...shopInventory,
        [category]: {
          ...(shopInventory[category] || {}),
          [newSubcategory]: [],
        },
      };

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shopInventory')
        .doc('inventory')
        .set(updatedShopInventory);

      console.log('Subcategory added successfully');
      setNewSubcategory('');
      setShowNewSubcategory(false);
      fetchSubcategories();
    } catch (error) {
      console.log('Error adding subcategory:', error);
    }
  };

  const handleSubcategoryChange = value => {
    if (value === 'add_new') {
      setShowNewSubcategory(true);
    } else {
      setShowNewSubcategory(false);
      setSubcategory(value);
    }
  };

  const isFormValid = category && subcategory && name && quantity && price;

  const placeholderTextColor =
    Appearance.getColorScheme() === 'dark' ? '#222831' : '#222831';

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Items</Text>
      <View style={styles.form}>
        <Picker
          style={styles.input}
          prompt="Category"
          selectedValue={category}
          onValueChange={setCategory}>
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Guns" value="guns" />
          <Picker.Item label="Pistols" value="pistols" />
          <Picker.Item label="Bullets" value="bullets" />
        </Picker>
        {category && (
          <>
            <Picker
              style={styles.input}
              prompt="Subcategory"
              selectedValue={showNewSubcategory ? 'add_new' : subcategory}
              onValueChange={handleSubcategoryChange}>
              <Picker.Item label="Select a subcategory" value="" />
              {subcategories.map(subcat => (
                <Picker.Item key={subcat} label={subcat} value={subcat} />
              ))}
              <Picker.Item label="Add New Subcategory" value="add_new" />
            </Picker>
            {showNewSubcategory && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="New Subcategory"
                  value={newSubcategory}
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={setNewSubcategory}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddSubcategory}
                  disabled={!newSubcategory}>
                  <Text style={styles.addButtonText}>Add Subcategory</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
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
          onPress={() => props.navigation.navigate('Dashboard')}>
          <Text style={[styles.addButtonText, {
            color: '#222831',
          }]}>Back to Dashboard</Text>
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
    color: '#00ADB5',
  },
  form: {
    backgroundColor: '#222831',
    borderRadius: 8,
    padding: 16,
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
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

export default AddItem;

