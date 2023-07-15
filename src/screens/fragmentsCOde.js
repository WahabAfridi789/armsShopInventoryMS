//working code
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
// }, [props.navigation]);


//Dashboard.js

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const Dashboard = props => {
//   const currentUser = auth().currentUser;
//   const [userName, setUserName] = useState('');
//   const [shopInventory, setShopInventory] = useState({});

//   useEffect(() => {
//     if (currentUser) {
//       const fetchUserName = async () => {
//         const userSnapshot = await firestore()
//           .collection('users')
//           .doc(currentUser.uid)
//           .get();

//         if (userSnapshot.exists) {
//           const userData = userSnapshot.data();
//           setUserName(userData.name);
//         }
//       };

//       const fetchShopInventory = async () => {
//         const shopInventorySnapshot = await firestore()
//           .collection('users')
//           .doc(currentUser.uid)
//           .collection('shopInventory')
//           .doc('inventory')
//           .get();

//         if (shopInventorySnapshot.exists) {
//           const inventoryData = shopInventorySnapshot.data();
//           setShopInventory(inventoryData);
//         }
//       };

//       fetchUserName();
//       fetchShopInventory();
//     }
//   }, [props.navigation]);

//   const handleLogout = () => {
//     auth()
//       .signOut()
//       .then(() => {
//         // Redirect to the Login screen
//         props.navigation.navigate('Login');
//       })
//       .catch(error => {
//         console.log('Error signing out:', error);
//       });
//   };

//   const email = currentUser ? currentUser.email : '';

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity
//         style={styles.logoutButton}
//         onPress={() => props.navigation.navigate('AddItems')}>
//         <Text style={styles.logoutButtonText}>Add Item</Text>
//       </TouchableOpacity>

//       <View style={styles.section}>
//         <Text style={styles.heading}>Welcome to the Dashboard!</Text>
//       </View>
//       <View style={styles.centered}>
//         <View style={styles.userInfo}>
//           <View style={styles.avatarBanner}>
//             {/* Place your avatar component here */}
//             {/* Example: <AvatarComponent /> */}
//           </View>
//           <View style={styles.userDetails}>
//             <Text style={styles.userName}>{userName}</Text>
//             <Text style={styles.email}>{email}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subheading}>Shop Inventory:</Text>
//         {Object.entries(shopInventory).map(([category, subcategories]) => (
//           <View key={category} style={styles.categoryContainer}>
//             <Text style={styles.categoryText}>{category}</Text>
//             <View style={styles.subcategoryContainer}>
//               {Object.entries(subcategories).map(([subcategory, items]) => (
//                 <View key={subcategory} style={styles.subcategoryItem}>
//                   <Text>{subcategory}</Text>
//                   {items.map((item, index) => (
//                     <View key={index} style={styles.itemContainer}>
//                       <Text>Name: {item.name}</Text>
//                       <Text>Quantity: {item.quantity}</Text>
//                       <Text>Price: {item.price}</Text>
//                       <Text>Total Price: {item.totalPrice}</Text>
//                       <Text>Date: {item.date}</Text>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           </View>
//         ))}
//       </View>
//       <View style={styles.section}>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => props.navigation.navigate('AddItems')}>
//           <Text style={styles.logoutButtonText}>Add </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#05445E',
//   },
//   section: {
//     marginBottom: 20,
//     borderRadius: 8,
//     padding: 16,
//     backgroundColor: '#D4F1F4',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     color: '#05445E',
//   },
//   centered: {
//     alignItems: 'center',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#D4F1F4',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatarBanner: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: '#ebebeb',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 30,
//   },
//   userDetails: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   email: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   subheading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   categoryContainer: {
//     marginBottom: 10,
//   },
//   categoryText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textTransform: 'capitalize',
//   },
//   subcategoryContainer: {
//     marginLeft: 20,
//     marginTop: 10,
//   },
//   subcategoryItem: {
//     marginBottom: 10,
//   },
//   itemContainer: {
//     backgroundColor: '#F4F4F4',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   logoutButton: {
//     backgroundColor: '#ff6b6b',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default Dashboard;






   {
     /* Category quantity section */
   }
   {
     /* <View style={styles.section}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Pistols</Text>
            <Text style={styles.categoryQuantity}>
              {calculateCategoryQuantity('pistols')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Guns</Text>
            <Text style={styles.categoryQuantity}>
              {calculateCategoryQuantity('guns')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Bullets</Text>
            <Text style={styles.categoryQuantity}>
              {calculateCategoryQuantity('bullets')}
            </Text>
          </TouchableOpacity>
        </View>
      </View> */
   }





   //ViewAllItems.js

   // import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const ViewAllItemsScreen = (props) => {
//   const [bullets, setBullets] = useState({});

//   useEffect(() => {
//     fetchSubCategoryData();
//   }, []);

//   const fetchSubCategoryData = async () => {
//     try {
//       const querySnapshot = await firestore()
//         .collection('bullets')
//         .doc('9mm')
//         .get();

//       if (querySnapshot.exists) {
//         const subCategoryData = querySnapshot.data();
//         console.log('Sub-Category Data:', subCategoryData);
//         setBullets(subCategoryData);
//       } else {
//         console.log('Sub-Category does not exist');
//       }
//     } catch (error) {
//       console.log('Error fetching sub-category data:', error);
//     }
//   };

//   const totalQuantity =
//     bullets?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>View All Items</Text>

//       {/* Pistols Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Pistols</Text>

//         <View style={styles.subSectionRow}>
//           {/* Sub Section 1 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>7 Shots</Text>
//             <Text style={styles.subSectionText}>Quantity: 10</Text>
//           </View>

//           {/* Sub Section 2 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>14 Shots</Text>
//             <Text style={styles.subSectionText}>Quantity: 5</Text>
//           </View>
//         </View>

//         <View style={styles.subSectionRow}>
//           {/* Sub Section 3 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>Custom</Text>
//             <Text style={styles.subSectionText}>Quantity: 2</Text>
//           </View>
//         </View>
//       </View>

//       {/* Guns Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Guns</Text>

//         <View style={styles.subSectionRow}>
//           {/* Sub Section 1 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>MP5</Text>
//             <Text style={styles.subSectionText}>Quantity: 8</Text>
//           </View>

//           {/* Sub Section 2 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>Repeater</Text>
//             <Text style={styles.subSectionText}>Quantity: 4</Text>
//           </View>
//         </View>
//       </View>

//       {/* Bullets Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeader}>Bullets</Text>

//         <View style={styles.subSectionRow}>
//           {/* Sub Section 1 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>9mm</Text>
//             <Text style={styles.subSectionText}>Quantity: {totalQuantity}</Text>
//           </View>

//           {/* Sub Section 2 */}
//           <View style={styles.subSection}>
//             <Text style={styles.subSectionHeader}>12mm</Text>
//             <Text style={styles.subSectionText}>Quantity: 50</Text>
//           </View>
//         </View>
//       </View>

//       {/* Back to Dashboard Button */}
//           <TouchableOpacity style={styles.button}
//             onPress={() => props.navigation.navigate('Dashboard')}
//           >
//         <Text style={styles.buttonText}>Back to Dashboard</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f8f8f8',
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   subSectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   subSection: {
//     flex: 0.48,
//     backgroundColor: '#ffffff',
//     borderRadius: 4,
//     padding: 16,
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   subSectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subSectionText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   button: {
//     backgroundColor: '#e91e63',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

// export default ViewAllItemsScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const ViewAllItemsScreen = props => {
//   const [categoriesData, setCategoriesData] = useState([]);

//   useEffect(() => {
//     fetchCategoriesData();
//   }, []);

//   const fetchCategoriesData = async () => {
//     try {
//       const categories = ['pistols', 'guns', 'bullets'];
//       const promises = categories.map(async category => {
//         const querySnapshot = await firestore().collection(category).get();
//         const subCategoriesData = querySnapshot.docs.map(doc => {
//           const subCategoryData = doc.data();
//           const quantity =
//             subCategoryData.items?.reduce(
//               (total, item) =>
//                 parseInt(total)+parseInt(item.quantity) || 0,
//               0,
//             ) || 0;
//           return {
//             name: doc.id,
//             quantity,
//           };
//         });
//          const categoryQuantity = subCategoriesData.reduce(
//            (total, subCategory) => total + subCategory.quantity,
//            0,
//          );
//         return {category, subCategoriesData, categoryQuantity};
//       });
//       const data = await Promise.all(promises);
//       setCategoriesData(data);
//     } catch (error) {
//       console.log('Error fetching categories data:', error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = props.navigation.addListener('focus', () => {
//       fetchCategoriesData();
//     });

//     return unsubscribe;
//   }, [props.navigation]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>View All Items
        
      
//       </Text>

//       {categoriesData.map(categoryData => (
//         <View key={categoryData.category} style={styles.section}>
//           <Text style={styles.sectionHeader}>{categoryData.category}</Text>

//           <View style={styles.subSectionRow}>
//             {categoryData.subCategoriesData.map(subCategoryData => (
//               <View key={subCategoryData.name} style={styles.subSection}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     props.navigation.navigate('ViewSubCategoryItem', {
//                       categoryName: categoryData.category,
//                       subCategoryName: subCategoryData.name,
//                     })
//                   }>
//                   <Text style={styles.subSectionHeader}>
//                     {subCategoryData.name}
//                   </Text>
//                   <Text style={styles.subSectionText}>
//                     Quantity: {subCategoryData.quantity}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         </View>
//       ))}

//       {/* Back to Dashboard Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => props.navigation.navigate('Dashboard')}>
//         <Text style={styles.buttonText}>Back to Dashboard</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f8f8f8',
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   subSectionRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   subSection: {
//     width: '48%',
//     backgroundColor: '#ffffff',
//     borderRadius: 4,
//     padding: 16,
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   subSectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subSectionText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   button: {
//     backgroundColor: '#e91e63',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

// export default ViewAllItemsScreen;



//working code for CategoryItem.js

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Dashboard = ({route, navigation}) => {
  const {category} = route.params;
  const currentUser = auth().currentUser;
  const [userName, setUserName] = useState('');
  const [shopInventory, setShopInventory] = useState({});

  useEffect(() => {
    if (currentUser) {
      const fetchUserName = async () => {
        const userSnapshot = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          setUserName(userData.name);
        }
      };

      const fetchShopInventory = async () => {
        const shopInventorySnapshot = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('shopInventory')
          .doc('inventory')
          .get();

        if (shopInventorySnapshot.exists) {
          const inventoryData = shopInventorySnapshot.data();
          setShopInventory(inventoryData);
        }
      };

      fetchUserName();
      fetchShopInventory();
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>
          Viewing {category.charAt(0).toUpperCase() + category.slice(1)}{' '}
          Category
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>
          {category.charAt(0).toUpperCase() + category.slice(1)} Inventory:
        </Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={styles.subcategoryContainer}>
            {Object.entries(shopInventory[category] || {}).map(
              ([subcategory, items]) => (
                <View key={subcategory} style={styles.subcategoryItem}>
                  <Text>
                    Total {subcategory}{' '}
                    {category.charAt(0).toUpperCase() + category.slice(1)} :
                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                  </Text>
                  {items.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>Name: {item.name}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>Price: {item.price}</Text>
                      <Text>Total Price: {item.totalPrice}</Text>
                    </View>
                  ))}
                </View>
              ),
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.logoutButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#05445E',
  },
  section: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#D4F1F4',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#05445E',
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
    marginBottom: 10,
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
  subcategoryItem: {
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#F4F4F4',
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
});

export default Dashboard;






// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import firestore from '@react-native-firebase/firestore';

// const Dashboard = () => {
//   const currentUser = auth().currentUser;
//   const [userName, setUserName] = useState('');
//   const navigation = useNavigation();

//   const [categoriesData, setCategoriesData] = useState([]);

//   useEffect(() => {
//     fetchCategoriesData();
//   }, []);

//   const fetchCategoriesData = async () => {
//     try {
//       const categories = ['pistols', 'guns', 'bullets'];
//       const promises = categories.map(async category => {
//         const querySnapshot = await firestore().collection(category).get();
//         const subCategoriesData = querySnapshot.docs.map(doc => {
//           const subCategoryData = doc.data();
//           const quantity =
//             subCategoryData.items?.reduce(
//               (total, item) => total + parseInt(item.quantity),
//               0,
//             ) || 0;
//           return {
//             name: doc.id,
//             quantity,
//           };
//         });
//         const categoryQuantity = subCategoriesData.reduce(
//           (total, subCategory) => total + subCategory.quantity,
//           0,
//         );
//         return {category, subCategoriesData, categoryQuantity};
//       });
//       const data = await Promise.all(promises);
//       setCategoriesData(data);
//     } catch (error) {
//       console.log('Error fetching categories data:', error);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       const fetchUserName = async () => {
//         const userSnapshot = await firestore()
//           .collection('users')
//           .doc(currentUser.uid)
//           .get();

//         if (userSnapshot.exists) {
//           const userData = userSnapshot.data();
//           console.log('User data: ', userData);
//           setUserName(userData.name);
//         }
//       };

//       fetchUserName();
//     }
//   }, []); // Empty dependency array to run only once

//   const handleLogout = () => {
//     auth()
//       .signOut()
//       .then(() => {
//         // Redirect to the Login screen
//         navigation.navigate('Login');
//       })
//       .catch(error => {
//         console.log('Error signing out:', error);
//       });
//   };

//   const handleAddItem = () => {
//     navigation.navigate('AddItems');
//   };

//   const viewAllItems = () => {
//     navigation.navigate('ViewAllItems');
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchCategoriesData();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   // Retrieve the user's email and user ID
//   const email = currentUser ? currentUser.email : '';

//   return (
//     <View style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.heading}>Welcome to the Dashboard!</Text>
//       </View>
//       {/* First Section */}
//       <View style={styles.centered}>
//         <View style={styles.userInfo}>
//           <View style={styles.avatarBanner}>
//             {/* Place your avatar component here */}
//             {/* Example: <AvatarComponent /> */}
//           </View>
//           <View style={styles.userDetails}>
//             <Text style={styles.userName}>{userName}</Text>
//             <Text style={styles.email}>{email}</Text>
//           </View>
//         </View>
//       </View>
//       {/* Quantities Section */}
//       <View style={styles.section}>
//         <View style={styles.row}>
//           {categoriesData.map(categoryData => (
//             <TouchableOpacity
//               key={categoryData.category}
//               style={styles.categoryContainer}>
//               <Text style={styles.categoryText}>
//                 {`Total ${categoryData.category}: `}
//               </Text>
//               <Text style={styles.categoryQuantity}>
//                 {categoryData.categoryQuantity}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       {/* Second Section */}
//       <View style={styles.section}>
//         <View style={styles.row}>
//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={handleAddItem}>
//             <Icon name="plus-circle" size={24} color="green" />
//             <Text style={styles.optionText}>Add Item</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.optionContainer}>
//             <Icon name="minus-circle" size={24} color="red" />
//             <Text style={styles.optionText}>Remove Item</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.optionContainer}>
//             <Icon name="edit" size={24} color="blue" />
//             <Text style={styles.optionText}>Update Item</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={viewAllItems}>
//             <Icon name="list" size={24} color="purple" />
//             <Text style={styles.optionText}>View All Items</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* Third Section */}
//       <View style={styles.section}>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#05445E',
//   },
//   section: {
//     marginBottom: 20,
//     borderRadius: 8,
//     padding: 16,
//     backgroundColor: '#D4F1F4',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     color: '#05445E',
//   },
//   centered: {
//     alignItems: 'center',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#D4F1F4',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatarBanner: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: '#ebebeb',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 30,
//   },
//   userDetails: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   email: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 5,
//     width: '100%',
//     backgroundColor: '#75E6DA',
//     marginBottom: 10,
//     justifyContent: 'space-between',
//   },
//   categoryText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#05445E',
//     textTransform: 'capitalize',
//   },
//   categoryQuantity: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 5,
//     width: '48%',
//     backgroundColor: '#75E6DA',
//   },
//   optionText: {
//     marginLeft: 5,
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   logoutButton: {
//     backgroundColor: '#ff6b6b',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default Dashboard;
