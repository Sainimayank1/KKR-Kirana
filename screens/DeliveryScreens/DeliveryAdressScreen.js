import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/style";
import { useNavigation } from "@react-navigation/native";

const DeliveryAdressScreen = () => {
  const delivery = [];
  const navigate = useNavigation();
  return (
    <SafeAreaView className="flex-1 relative">
      {/* //   Upper container */}

      <TouchableOpacity className="m-0 top-[-30] w-full flex-row items-center p-3 bg-white border-2 border-gray-200 ">
        <Entypo name="plus" size={20} color={colors.blue} />
        <Text className="text-lg ml-2" style={{ color: colors.blue }} onPress={()=>navigate.push("Add delivery address")}>
          Add a new address
        </Text>
      </TouchableOpacity>

      {/* Middle part */}
      {delivery.map((data) => {
        return <TouchableOpacity className="w-full"></TouchableOpacity>;
      })}

      {/* Down Conatiner */}
      <TouchableOpacity className="absolute bottom-0 w-full p-4 flex items-center justify-center" style={{backgroundColor:colors.orange}} onPress={()=>navigate.push("Order Summary")}>
        <Text className="font-bold text-lg text-white">DELIVERY HERE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeliveryAdressScreen;
