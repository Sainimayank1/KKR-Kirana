import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomNavigation.js"
import CameraScreen from "../screens//HomeScreens/CameraScreen.js";
import DeliveryAdressScreen from "../screens/DeliveryScreens/DeliveryAdressScreen.js";
import OrederSummaryScreen from "../screens/DeliveryScreens/OrederSummaryScreen.js";
import AddDeliveryAddressScreen from "../screens/DeliveryScreens/AddDeliveryAddressScreen.js";
import DeliverySelectionScreen from "../screens/DeliveryScreens/DeliverySelectionScreen.js";
import AdminBottomNavigation from "./AdminBottomNavigation.js";
import PageNotAvailable from "../screens/PageNotAvailable.js";
import ProductScreen from "../screens/ProductScreen.js";
import SearchScreen from "../screens/SearchScreen.js";
import OrderScreen from "../screens/OrderScreen.js";
import ProductsScreen from "../screens/ProductsScreen.js";

const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={BottomNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="Product Screen" component={ProductScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Products Screen" component={ProductsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminScreen" component={AdminBottomNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Delivery" component={DeliveryAdressScreen} />
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen name="Add delivery address" component={AddDeliveryAddressScreen} />
      <Stack.Screen name="Select delivery Type" component={DeliverySelectionScreen} />
      <Stack.Screen name="Order Summary" component={OrederSummaryScreen} />
      <Stack.Screen name="Page not available" component={PageNotAvailable} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;