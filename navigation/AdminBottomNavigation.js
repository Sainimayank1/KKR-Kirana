import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import CategoryScreen from "../screens/Admin/CategoryScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { FontAwesome } from '@expo/vector-icons';
import colors from "../constants/style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import OrdersScreen from "../screens/Admin/OrdersScreen"
import ProductsScreen from "../screens/Admin/ProductsScreen"

const Tab = createBottomTabNavigator();

function AdminBottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="customerservice" size={22} color={colors.blue} />
            ) : (
              <AntDesign name="customerservice" size={22} color="black" />
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
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="sitemap" size={22} color={colors.blue} />
            ) : (
              <FontAwesome name="sitemap" size={22} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AdminBottomNavigation;