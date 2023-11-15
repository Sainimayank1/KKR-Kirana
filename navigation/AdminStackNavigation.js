import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminBottomNavigation from "./AdminBottomNavigation"


const AdminStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="AdminBottomScreen"
    >
      <Stack.Screen name="AdminBottomScreen" component={AdminBottomNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigation;