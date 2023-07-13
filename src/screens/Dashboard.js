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

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CategoryItem from '../components/CategoryItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Dashboard = () => {
  const currentUser = auth().currentUser;
  const [userName, setUserName] = useState('');
  const [shopInventory, setShopInventory] = useState({});
  const navigation = useNavigation();

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
  }, [currentUser]);

  // Fetch data when the Dashboard screen gains focus
  useFocusEffect(
    useCallback(() => {
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

      fetchShopInventory();
    }, [currentUser]),
  );

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {})
      .catch(error => {
        console.log('Error signing out:', error);
      });
  };

  const calculateCategoryQuantity = category => {
    let quantity = 0;

    if (shopInventory[category]) {
      const subcategories = Object.values(shopInventory[category]);
      subcategories.forEach(subcategory => {
        if (subcategory && Array.isArray(subcategory)) {
          subcategory.forEach(item => {
            if (item && typeof item === 'object' && item.quantity) {
              quantity += item.quantity;
            }
          });
        }
      });
    }

    return quantity;
  };

  const email = currentUser ? currentUser.email : '';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Welcome to the Dashboard!</Text>
      </View>
      <View style={styles.centered}>
        <View style={styles.userInfo}>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          {Object.keys(shopInventory).map(category => (
            <CategoryItem
              key={category}
              category={category}
              calculateCategoryQuantity={calculateCategoryQuantity}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('AddItems')}>
          <Text style={styles.logoutButtonText}>Add </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: '#EEEEEE',
            },
          ]}
          onPress={handleLogout}>
          <Text
            style={[
              styles.logoutButtonText,
              {
                color: '#222831',
              },
            ]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  centered: {
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#222831',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#00ADB5',
    textTransform: 'uppercase',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
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
    backgroundColor: '#00ADB5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Dashboard;
