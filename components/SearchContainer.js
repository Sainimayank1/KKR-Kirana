import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchContainer = () => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row p-2 items-center justify-around">
      {/* Arrow */}
      <TouchableOpacity onPress={()=>navigation.pop()}>
        <AntDesign name="arrowleft" size={18} color="black" />
      </TouchableOpacity>

      {/* TextInput */}
      <View className="bg-gray-200 w-[80%] items-center flex flex-row py-1.5 px-2 justify-between rounded-md">
        <View className="flex flex-row items-center  w-[90%]">
          {/* Search Icon */}
          <AntDesign name="search1" size={18} color="gray" />
          {/* TextInput */}
          <TextInput
            placeholder="Search for products"
            className="w-[90%] px-2 text-xs"

          ></TextInput>
        </View>

        {/* Mic */}
        <TouchableOpacity className="flex items-center">
          <Feather name="mic" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Cart */}
      <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
        <AntDesign name="shoppingcart" size={18} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchContainer;
