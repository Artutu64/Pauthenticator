import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// INCLUSION DES SCREENS
import HomeScreen from '../screens/Home_screen';
import ScannerScreen from '../screens/Scanner_screen';

//
const Stack = createStackNavigator();



/////   FONCTION PRINCIPALE   /////
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
