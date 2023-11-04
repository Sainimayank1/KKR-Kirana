import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../constants/style";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const [isNotification, setisNotification] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView className=" flex-1">
      <StatusBar backgroundColor="white" style="dark"></StatusBar>
      <View className="p-3 bg-white">
        {/* Upper side */}
        <View className="flex flex-col space-y-5">
          <Text className="text-lg">Notifications</Text>
          <View className="flex flex-row">
            <Text className="flex px-4 py-1 justify-center border-blue-600 border bg-blue-100 w-min rounded-2xl items-center text-blue-700">
              All
            </Text>
          </View>
        </View>
      </View>

      {/* DOwn side */}
      {isNotification ? (
        <View></View>
      ) : (
        <View className="flex-1 bg-white flex-row justify-center items-center">
          <View className="w-[50%] flex items-center justify-center space-y-3">
            <Text className="text-md text-black font-bold">
              No notification yet
            </Text>
            <Text className="text-gray-500 text-center">
              Simply browse, create a wishlist or make a purchase
            </Text>
            <TouchableOpacity style={{backgroundColor:colors.blue}} className="p-2 rounded-md" onPress={()=>
            {
                navigation.navigate("Home")
            }}>
              <Text className="text-white font-bold">Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
