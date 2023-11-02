import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { DeliveryType } from "../../context/actions/action";

const DeliverySelectionScreen = () => {
  const [selectMode, setSelectMode] = useState("Shop");
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const continueHandler = () => {
    dispatch(DeliveryType(selectMode));
    if (selectMode == "Home") {
      navigate.push("Delivery");
    }
    else
    {
        navigate.push("Order Summary")
    }
  };
  return (
    <View className="flex-1 bg-white relative">
      {/* Container */}
      <View className="gap-y-2 pt-5">
        <Text className="text-gray-500 px-3 py-2">Type of Delivery Modes</Text>

        <View className="flex-row px-4 ">
          <TouchableOpacity
            onPress={() =>
              setSelectMode((state) => (state == "Shop" ? "Home" : "Shop"))
            }
            className="flex mr-2 flex-row items-center px-4 py-1  rounded-2xl border justify-center"
            style={{ borderColor: selectMode == "Shop" ? colors.blue : "gray" }}
          >
            <Entypo
              name="shop"
              size={22}
              color={selectMode == "Shop" ? colors.blue : "gray"}
            />
            <Text
              className="pl-2"
              style={{ color: selectMode == "Shop" ? colors.blue : "gray" }}
            >
              Shop
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row items-center px-4 py-1  rounded-2xl border justify-center"
            style={{ borderColor: selectMode == "Home" ? colors.blue : "gray" }}
            onPress={() =>
              setSelectMode((state) => (state == "Shop" ? "Home" : "Shop"))
            }
          >
            <Entypo
              name="home"
              size={22}
              color={selectMode == "Home" ? colors.blue : "gray"}
            />
            <Text
              className="pl-2"
              style={{ color: selectMode == "Home" ? colors.blue : "gray" }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="absolute bottom-0 w-full p-4 flex items-center justify-center"
        style={{ backgroundColor: colors.orange }}
        onPress={continueHandler}
      >
        <View>
          <Text className="text-lg text-white font-bold">Continue..</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeliverySelectionScreen;
