import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ProductScreen from "../screens/ProductScreen";
import BottomNavigation from "./BottomNavigation.js"
import CameraScreen from "../screens/CameraScreen.js";

const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={BottomNavigation} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      {/* <Stack.Screen name="ProductDetail" component={ProductScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;