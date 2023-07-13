import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from '@react-native-firebase/auth';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/SignUp';
import Dashboard from './src/screens/Dashboard';
import AddItems from './src/screens/AddItems';
import ViewAllItems from './src/screens/ViewAllItems';
import ViewSubCategoryItem from './src/components/ViewSubCategoryItem';
import ViewCategoryItems from './src/screens/ViewCategoryItems';
import ViewSubCategoryItemsList from './src/screens/ViewSubCategoryItemsList';

const Stack = createStackNavigator();

function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  Auth().onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  })


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {isAuthenticated ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )
        }
        <Stack.Screen name="AddItems" component={AddItems} />
        <Stack.Screen name="ViewAllItems" component={ViewAllItems} />
        <Stack.Screen name="ViewSubCategoryItem" component={ViewSubCategoryItem} />
        <Stack.Screen name="ViewCategoryItems" component={ViewCategoryItems} />
        <Stack.Screen name="ViewSubCategoryItemsList" component={ViewSubCategoryItemsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
