import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from 'expo-jwt';
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const navigation  = useNavigation();
  const [name, setName] = useState("");
  const getItem = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const data = JWT.decode(token,"heymynameismayank!");
    setName(data.userId.name);
  };

  getItem();

  const logout = async () =>
  { 
      await AsyncStorage.clear();
      navigation.navigate("Login")
  }

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <StatusBar backgroundColor="black"></StatusBar>

      {/* Upper name section */}
      <View className="p-2">
        <Text className="font-bold text-lg">Hey! {name}</Text>
        <Text>
          Explore <Text className="text-blue-700 font-bold">KKR Kirana</Text>
        </Text>
      </View>

      {/* Down section */}
      <ScrollView className="mb-16" showsVerticalScrollIndicator={false}>
        {/* 4 option section */}
        <View className="border-b-4 border-gray-300 pb-2">
          {/* Upper one */}
          <View className="flex-1 p-2 flex-row space-x-2">
            <TouchableOpacity onPress={()=>{navigation.push("Orders")}} className="flex-1 flex-row items-center space-x-2 border border-gray-400 rounded-md p-2">
              <Feather name="box" size={22} color="blue" />
              <Text className="font-semibold">Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center space-x-2 border border-gray-400 rounded-md p-2" onPress={()=>navigation.push("Page not available")}>
              <AntDesign name="hearto" size={22} color="blue" />
              <Text className="font-semibold">Wishlist</Text>
            </TouchableOpacity>
          </View>

          {/* Down One */}
          <View className="flex-1 p-2 flex-row space-x-2">
            <TouchableOpacity className="flex-1 flex-row items-center space-x-2 border border-gray-400 rounded-md p-2" onPress={()=>navigation.push("Page not available")}>
              <AntDesign name="gift" size={22} color="blue" />
              <Text className="font-semibold">Coupons</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center space-x-2 border border-gray-400 rounded-md p-2">
              <Feather name="headphones" size={22} color="blue" />
              <Text className="font-semibold">Help Center</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Accounts settings section */}
        <View className="p-2 border-b-4 border-gray-300">
          {/* Title */}
          <Text className="text-lg font-bold">Account Settings</Text>

          {/* OPtion section */}
          <View className="space-y-5 pb-2 pt-2">

            {/* OPtion-2 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <AntDesign name="user" size={22} color="blue" />
                <Text>Edit Profile</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>

            {/* OPtion-3 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <AntDesign name="wallet" size={20} color="blue" />
                <Text>Saved Cards & Wallet</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>

            {/* OPtion-4 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <EvilIcons name="location" size={22} color="blue" />
                <Text>Saved Addresses</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>

            {/* OPtion-5 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <Ionicons name="language" size={22} color="blue" />
                <Text>Saved Language</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>

            {/* OPtion-6 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <Ionicons name="notifications-outline" size={22} color="blue" />
                <Text>Notification Settings</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/*Feedback section */}
        <View className="p-2 ">
          {/* Title */}
          <Text className="text-lg font-bold">Feedback</Text>

          {/* OPtion section */}
          <View className="space-y-5 pb-2 pt-2">
            {/* Option-1 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <Ionicons name="newspaper-outline" size={22} color="blue" />
                <Text>Terms, Policies and Licenses</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>

            {/* OPtion-2 */}
            <TouchableOpacity className="flex flex-row items-center justify-between">
              <View className="space-x-2 flex flex-row items-center">
                <Octicons name="question" size={22} color="blue" />
                <Text>Browse FAQs</Text>
              </View>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
        {/* Logout section */}
        <View className="items-center justify-center flex bg-gray-200 p-4 bottom-0 absolute w-full">
          <TouchableOpacity className="bg-white w-[100%] items-center p-2 rounded-md border border-gray-300" onPress={()=>logout()}>
            <Text className="text-blue-700 font-bold">Log Out</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
