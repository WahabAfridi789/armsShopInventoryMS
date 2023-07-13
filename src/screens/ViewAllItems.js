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
// import auth from '@react-native-firebase/auth';

// const ViewAllItemsScreen = ({route, navigation}) => {
//   const {category} = route.params;
//   const [subCategoriesData, setSubCategoriesData] = useState([]);
//   const currentUser = auth().currentUser;
//   // console.log('Current User:', currentUser);
// console.log('Category:', category);
//   useEffect(() => {
//     fetchSubCategoriesData();
//   }, []);

//   const fetchSubCategoriesData = async () => {
//     try {
//       const subCategoriesSnapshot = await firestore()
//         .collection('users')
//         .doc(currentUser.uid)
//         .collection('shopInventory')
//         .doc('inventory')
//         .collection(category)
//         .get();
      
//       console.log('Subcategories Snapshot:', subCategoriesSnapshot.empty);

//       const data = subCategoriesSnapshot.docs.map(doc => {
//         const subCategoryData = doc.data();
//         const quantity =
//           subCategoryData.items?.reduce(
//             (total, item) => total + item.quantity,
//             0,
//           ) || 0;
//         return {
//           name: doc.id,
//           quantity,
//         };
//       });
//       setSubCategoriesData(data);
//     } catch (error) {
//       console.log('Error fetching subcategories data:', error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchSubCategoriesData();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>View All Items</Text>

//       {subCategoriesData.map(subCategoryData => (
//         <View key={subCategoryData.name} style={styles.subSection}>
//           <TouchableOpacity
//             onPress={() =>
//               Alert.alert('Subcategory Clicked', subCategoryData.name)
//             }
//             style={styles.subCategoryContainer}>
//             <Text style={styles.subCategoryHeader}>{subCategoryData.name}</Text>
//             <Text style={styles.subCategoryQuantity}>
//               Quantity: {subCategoryData.quantity}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       {/* Back to Dashboard Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Dashboard')}>
//         <Text style={styles.buttonText}>Back to Dashboard</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   subSection: {
//     backgroundColor: '#D4F1F4',
//     borderRadius: 8,
//     marginBottom: 10,
//     padding: 16,
//   },
//   subCategoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   subCategoryHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textTransform: 'capitalize',
//     color: '#05445E',
//   },
//   subCategoryQuantity: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#05445E',
//   },
//   button: {
//     backgroundColor: '#05445E',
//     borderRadius: 8,
//     paddingVertical: 12,
//     marginTop: 20,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default ViewAllItemsScreen;


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
                    {category.charAt(0).toUpperCase() + category.slice(1)} :{
                       items.reduce((acc, item) => acc + item.quantity, 0)
                    }
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
