import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Entypo } from "@expo/vector-icons";
import colors from '../../constants/style';
import { useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OrederSummaryScreen = () => {
  const state = useSelector((state) => state.reducer);
  return (
    <View className="flex-1 bg-white relative pt-5">

      <ScrollView>
      {state.uri != "" &&
        <View className="flex items-center justify-center">
          <Image source={{ uri: state.uri }}
            style={{ height: hp(50), width: wp(90) }}></Image>
        </View>
      }

      {/* Middle Container */}
      <View className="gap-y-2 pt-5 pb-4">
        <Text className="text-gray-500 px-3 py-2">Delivery Modes Choose:</Text>

        <View className="flex-row px-4 ">
          {
            state.deliveryType == "Shop"
              ?
              <View
                className="flex mr-2 flex-row items-center px-4 py-1  rounded-2xl border justify-center"
                style={{ borderColor: colors.blue }}
              >
                <Entypo
                  name="shop"
                  size={22}
                  color={colors.blue}
                />
                <Text
                  className="pl-2"
                  style={{ color: colors.blue }}
                >
                  Shop
                </Text>
              </View>
              :
              <View
                className="flex flex-row items-center px-4 py-1  rounded-2xl border justify-center"
                style={{ borderColor: colors.blue }}

              >
                <Entypo
                  name="home"
                  size={22}
                  color={colors.blue}
                />
                <Text
                  className="pl-2"
                  style={{ color: colors.blue }}
                >
                  Home
                </Text>
              </View>
          }
        </View>
      </View>

      {/* Price Conatiner */}

      <View className="border-t-2 px-3 py-2  border-gray-300">
        <Text className="font-bold text-md">Price Detail:</Text>
        <View className="flex-row items-end justify-between">
          <Text className="text-md pt-2">Total Price:</Text>
          <Text className="text-md pt-2">{state.deliveryType == "Shop" ? "Unavilable" : "Pta ni"}</Text>
        </View>
      </View>

      <View className="border-t-2 px-3 py-2  border-gray-300">
        <Text className="font-bold text-md">Estimated Time:</Text>
        <View className="flex-row items-end justify-between">
          <Text className="text-md pt-2">Estimated Time</Text>
          <Text className="text-md pt-2">{state.deliveryType == "Shop" ? "2h" : "3h"}</Text>
        </View>
      </View>

      </ScrollView>


      {/* Continue Btn */}

      <TouchableOpacity
        className="absolute bottom-0 w-full p-4 flex items-center justify-center"
        style={{ backgroundColor: colors.orange }}
      >
        <View>
          <Text className="text-lg text-white font-bold">Continue..</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default OrederSummaryScreen