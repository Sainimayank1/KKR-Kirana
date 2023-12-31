import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/AuthScreens/SplashScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import HomeStackNavigation from './HomeStackNavigation';
import AdminStackNavigation from './AdminStackNavigation';
import SelectScreen from '../screens/Admin/SelectScreen';


const Stack = createNativeStackNavigator();

const InitialStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AllScreen" component={HomeStackNavigation} />
        <Stack.Screen name="Select Screen" component={SelectScreen} />
        <Stack.Screen name="AdminStackNavigation" component={AdminStackNavigation} />
        
    </Stack.Navigator>
  )
}

export default InitialStackNavigation