import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../screens/Admin/AdminScreen.js"

const AdminStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="AdminScreen"
    >
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigation;