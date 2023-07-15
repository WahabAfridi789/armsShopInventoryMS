// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import CategoryItem from '../components/CategoryItem';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';

// const Dashboard = () => {
//   const currentUser = auth().currentUser;
//   const [userName, setUserName] = useState('');
//   const [shopInventory, setShopInventory] = useState({});
//   const [loading, setLoading] = useState(true); // State for activity indicator
//   const navigation = useNavigation();

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
//         setLoading(false); // Data fetching complete, stop activity indicator
//       };

//       fetchUserName();
//       fetchShopInventory();
//     }
//   }, [currentUser]);

//   // Fetch data when the Dashboard screen gains focus
//   useFocusEffect(
//     useCallback(() => {
//       const fetchShopInventory = async () => {
//         setLoading(true); // Start activity indicator when data fetching begins

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
//         setLoading(false); // Data fetching complete, stop activity indicator
//       };

//       fetchShopInventory();
//     }, [currentUser]),
//   );

//   const handleLogout = () => {
//     auth()
//       .signOut()
//       .then(() => {})
//       .catch(error => {
//         console.log('Error signing out:', error);
//       });
//   };

//   const calculateCategoryQuantity = category => {
//     let quantity = 0;

//     if (shopInventory[category]) {
//       const subcategories = Object.values(shopInventory[category]);
//       subcategories.forEach(subcategory => {
//         if (subcategory && Array.isArray(subcategory)) {
//           subcategory.forEach(item => {
//             if (item && typeof item === 'object' && item.quantity) {
//               quantity += item.quantity;
//             }
//           });
//         }
//       });
//     }

//     return quantity;
//   };

//   const email = currentUser ? currentUser.email : '';

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.heading}>Welcome to the Dashboard!</Text>
//       </View>
//       <View style={styles.centered}>
//         <View style={styles.userInfo}>
//           <View style={styles.userDetails}>
//             <Text style={styles.userName}>{userName}</Text>
//             <Text style={styles.email}>{email}</Text>
//           </View>
//         </View>
//       </View>

//       {loading ? ( // Render activity indicator when loading is true
//         <ActivityIndicator
//           style={styles.activityIndicator}
//           color="#00ADB5"
//           size="large"
//         />
//       ) : (
//         <View style={styles.section}>
//           <View style={styles.row}>
//             {Object.keys(shopInventory).map(category => (
//               <CategoryItem
//                 key={category}
//                 category={category}
//                 calculateCategoryQuantity={calculateCategoryQuantity}
//               />
//             ))}
//           </View>
//         </View>
//       )}

//       <View style={styles.section}>
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => navigation.navigate('AddItems')}>
//           <Text style={styles.logoutButtonText}>Add </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.logoutButton,
//             {
//               backgroundColor: '#EEEEEE',
//             },
//           ]}
//           onPress={handleLogout}>
//           <Text
//             style={[
//               styles.logoutButtonText,
//               {
//                 color: '#222831',
//               },
//             ]}>
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#393E46',
//   },
//   section: {
//     marginBottom: 20,
//     borderRadius: 8,
//     padding: 16,
//     backgroundColor: '#222831',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     color: '#EEEEEE',
//   },
//   centered: {
//     alignItems: 'center',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#222831',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userDetails: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     textAlign: 'center',
//     color: '#00ADB5',
//     textTransform: 'uppercase',
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
//     backgroundColor: '#00ADB5',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   logoutButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   activityIndicator: {
//     marginTop: 20,
//   },
// });

// export default Dashboard;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CategoryItem from '../components/CategoryItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Dashboard = () => {
  const currentUser = auth().currentUser;
  const [userName, setUserName] = useState('');
  const [shopInventory, setShopInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
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
      setLoading(false);
    };

    if (currentUser) {
      fetchUserName();
      fetchShopInventory();
    }
  }, [currentUser]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchShopInventory = async () => {
        setLoading(true);

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
        setLoading(false);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={styles.activityIndicator}
          color="#00ADB5"
          size="large"
        />
      </View>
    );
  }

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
  activityIndicator: {
    marginTop: 20,
  },
});

export default Dashboard;
