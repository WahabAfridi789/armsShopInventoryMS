import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';

import Btn from '../components/Btn';
import {darkWhite, green, black} from '../components/Constants';

const Home = props => {
  return (
    <ImageBackground source={require('../assets/home1.jpg')} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Btn
            bgColor={`${green}99`}
            textColor="white"
            btnLabel="Login"
            onPress={() => props.navigation.navigate('Login')}
          />
          <Btn
            bgColor={`${darkWhite}99`}
            textColor={black}
            btnLabel="Signup"
            onPress={() => props.navigation.navigate('Signup')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default Home;
