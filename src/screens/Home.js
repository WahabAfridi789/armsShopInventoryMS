import React from 'react';
import {View, StyleSheet, Text,ImageBackground} from 'react-native';

import Btn from '../components/Btn';
import {darkGreen, green} from '../components/Constants';

const Home = props => {
  return (
    <ImageBackground
      source={require('../assets/home1.jpg')}
      style={{height: '100%'}}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginHorizontal: 40,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Btn
            bgColor={green}
            textColor="white"
            btnLabel="Login"
            Press={() => props.navigation.navigate('Login')}
          />
          <Btn
            bgColor="white"
            textColor={darkGreen}
            btnLabel="Signup"
            Press={() => props.navigation.navigate('Signup')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default Home;
