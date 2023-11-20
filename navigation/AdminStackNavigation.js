import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminBottomNavigation from "./AdminBottomNavigation"
import AddCategoryScreen from "../screens/Admin/AddCategoryScreen";
import AddProductScreen from "../screens/Admin/AddProductScreen";


const AdminStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="AdminBottomScreen"
    >
      <Stack.Screen name="AdminBottomScreen" component={AdminBottomNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="Add Item" component={AddCategoryScreen} />
      <Stack.Screen name="Add Product" component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigation;