import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreens/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons"
import CategoryScreen from "../screens/CategoryScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from "../screens/CartScreen";
import colors from "../constants/style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
// import { MaterialIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home-outline" size={22} color={colors.blue} />
            ) : (
              <Ionicons name="home-outline" size={22} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="category" size={22} color={colors.blue} />
            ) : (
              <MaterialIcons name="category" size={22} color="black" />
            ),
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.blue}
              />
            ) : (
              <Ionicons name="notifications-outline" size={22} color="black" />
            ),
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={22}
                color={colors.blue}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={22}
                color="black"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="cart-outline"
                size={22}
                color={colors.blue}
              />
            ) : (
              <MaterialCommunityIcons
                name="cart-outline"
                size={22}
                color="black"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation;