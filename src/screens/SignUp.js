import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import {darkGreen} from '../components/Constants';
import Field from '../components/Field';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //working code
  // const handleSignup = async () => {
  //   // ...

  //   try {
  //     // Create user account
  //     const userCredential = await auth().createUserWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     const user = userCredential.user;

  //     // Create shop inventory document
  //     const shopInventory = {
  //       pistols: {
  //         // '7-shots': [
  //         //   {
  //         //     name: '7-shots',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   {
  //         //     name: '7-shots',
  //         //     quantity: 5,
  //         //     price: 14.99,
  //         //     totalPrice: 74.95,
  //         //   },
  //         //   // ... add more items for '7-shots' subcategory
  //         // ],
  //         // '14-shots': [
  //         //   {
  //         //     name: '14-shots',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for '14-shots' subcategory
  //         // ],
  //         // '10-shots': [
  //         //   {
  //         //     name: '10-shots',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for '10-shots' subcategory
  //         // ],
  //       },
  //       guns: {
  //         // AK47: [
  //         //   {
  //         //     name: 'AK47',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for 'AK47' subcategory
  //         // ],
  //         // Repeater: [
  //         //   {
  //         //     name: 'Repeater',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for 'Repeater' subcategory
  //         // ],
  //         // MP5: [
  //         //   {
  //         //     name: 'MP5',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for 'MP5' subcategory
  //         // ],
  //       },
  //       bullets: {
  //         // '9mm': [
  //         //   {
  //         //     name: '9mm',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for '9mm' subcategory
  //         // ],
  //         // '12mm': [
  //         //   {
  //         //     name: '12mm',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for '12mm' subcategory
  //         // ],
  //         // '32-bore': [
  //         //   {
  //         //     name: '32-bore',
  //         //     quantity: 10,
  //         //     price: 9.99,
  //         //     totalPrice: 99.9,
  //         //   },
  //         //   // ... add more items for '32-bore' subcategory
  //         // ],
  //       },
  //     };

  //     await firestore()
  //       .collection('users')
  //       .doc(user.uid)
  //       .collection('shopInventory')
  //       .doc('inventory')
  //       .set(shopInventory);

  //     // ...
  //   } catch (error) {
  //     // ...
  //   }
  // };

  //working code 2
  // const handleSignup = async () => {
  //   try {
  //     // Create user account
  //     const userCredential = await auth().createUserWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     const user = userCredential.user;

  //     // Create shop inventory document
  //     const shopInventory = {
  //       pistols: {},
  //       guns: {},
  //       bullets: {},
  //     };

  //     // Save user data to Firestore
  //     const userData = {
  //       name: name,
  //       email: email,
  //     };

  //     await firestore().collection('users').doc(user.uid).set(userData);
  //     await firestore()
  //       .collection('users')
  //       .doc(user.uid)
  //       .collection('shopInventory')
  //       .doc('inventory')
  //       .set(shopInventory);

  //     // ...
  //   } catch (error) {
  //     // ...
  //   }
  // };

  const handleSignup = async () => {
    //checking fields are not empty
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    console.log('a');

    if (password !== confirmPassword) {
      Alert.alert('Password and Confirm Password do not match.');
      return;
    }

    try {
      // Create user account

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      console.log('b');

      // Create shop inventory document
      const shopInventory = {
        pistols: {
          '7-shots': [],
        },
        guns: {
          MP5: [],
        },
        bullets: {
          '9mm': [],
        },
      };

      // Create transaction inventory document
      const transactionInventory = {
        pistols: {},
        guns: {},
        bullets: {},
      };

      // Save user data to Firestore
      const userData = {
        name: name,
        email: email,
      };

      await firestore().collection('users').doc(user.uid).set(userData);

      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('shopInventory')
        .doc('inventory')
        .set(shopInventory);

      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('transactionInventory')
        .doc('inventory')
        .set(transactionInventory);

      // ...
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email address is already in use.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password is too weak.');
      } else {
        Alert.alert('Error', 'Failed to create an account.');
      }
    }
  };

  // const handleSignup =async () => {
  //   if (!email || !password || !confirmPassword || !name) {
  //     alert('Please fill in all fields.');
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     alert('Password and Confirm Password do not match.');
  //     return;
  //   }

  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       alert('User account created & signed in!');

  //       const userData = {
  //         id: auth().currentUser.uid,
  //         name: name,
  //         email: email,
  //       }

  //       addUserData(userData);
  //       props.navigation.navigate('Home');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         alert('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         alert('That email address is invalid!');
  //       }

  //       alert(error);
  //     });
  // };

  const addUserData = async userData => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set(userData);
    console.log('User added!');
    alert('User added!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Welcome</Text>
        <Text style={styles.description}>Register to an App</Text>
        <Field placeholder="Name" onChangeText={text => setName(text)} />
        <Field
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <Field
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Field
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
        />

        <Btn
          textColor="white"
          bgColor={darkGreen}
          btnLabel="Signup"
          onPress={handleSignup}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#393E46',
  },
  title: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  subtitle: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'grey',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
    width: width - 40,
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  loginLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Signup;
