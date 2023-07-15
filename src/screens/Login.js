import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Btn from '../components/Btn';
import {darkGreen,black} from '../components/Constants';
import Field from '../components/Field';
import auth from '@react-native-firebase/auth';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Logged in successfully!');
        // Navigate to the desired screen after login
        props.navigation.navigate('Dashboard');
      })
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          alert('Invalid email or password.');
        }

        alert(error);
      });
  };

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>Welcome Back</Text>
          <Text style={styles.description}>Login to your account</Text>
          <Field
            placeholder="Email / Username"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => console.log('Forgot Password?')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            onPress={handleLogin}
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Signup</Text>
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
  subtitle: {
    color: black,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '78%',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  signupLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
