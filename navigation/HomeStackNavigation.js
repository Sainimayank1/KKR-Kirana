import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomNavigation.js"
import CameraScreen from "../screens//HomeScreens/CameraScreen.js";
import DeliveryAdressScreen from "../screens/DeliveryScreens/DeliveryAdressScreen.js";
import OrederSummaryScreen from "../screens/DeliveryScreens/OrederSummaryScreen.js";
import AddDeliveryAddressScreen from "../screens/DeliveryScreens/AddDeliveryAddressScreen.js";
import DeliverySelectionScreen from "../screens/DeliveryScreens/DeliverySelectionScreen.js";
import ProductScreen from "../screens/ProductScreen.js";
import AdminScreen from "../screens/Admin/AdminScreen.js"

const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={BottomNavigation} options={{ headerShown: false }} />
      {/* <Stack.Screen name="ProductDetail" component={ProductScreen} /> */}
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Delivery" component={DeliveryAdressScreen} />
      <Stack.Screen name="Add delivery address" component={AddDeliveryAddressScreen} />
      <Stack.Screen name="Select delivery Type" component={DeliverySelectionScreen} />
      <Stack.Screen name="Order Summary" component={OrederSummaryScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;