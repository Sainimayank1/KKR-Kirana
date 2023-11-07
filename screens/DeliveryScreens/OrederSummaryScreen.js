import { View, Text, TouchableOpacity, Image, ScrollView, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/style";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { sendImage } from "../../api"

const OrederSummaryScreen = () => {
  const state = useSelector((state) => state.reducer);
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState(null);

  const getItem = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const data = JWT.decode(token,"heymynameismayank!");
    setUser(data.userId);
  };

  getItem();

  const uploadHandler = async () => {
    setLoading(true);
    const data = await sendImage(state.uri);
    console.log(data)

    if(data.code == 400)
    {
        Alert.alert(data.title,data.msg);
    }
    else{
      
      

    } 
    setLoading(false);
  }



  return (
    <View className="flex-1 bg-white relative pt-5">
      <ScrollView>
        {state.uri != "" && (
          <View className="flex items-center justify-center">
            <Image
              source={{ uri: state.uri }}
              style={{ height: hp(50), width: wp(90) }}
            ></Image>
          </View>
        )}

        {/* Middle Container */}
        <View className="gap-y-2 pt-5 pb-4">
          <Text className="text-gray-500 px-3 py-2">
            Delivery Modes Choose:
          </Text>

          <View className="flex-row px-4 ">
            {state.deliveryType == "Shop" ? (
              <View
                className="flex mr-2 flex-row items-center px-4 py-1  rounded-2xl border justify-center"
                style={{ borderColor: colors.blue }}
              >
                <Entypo name="shop" size={22} color={colors.blue} />
                <Text className="pl-2" style={{ color: colors.blue }}>
                  Shop
                </Text>
              </View>
            ) : (
              <View
                className="flex flex-row items-center px-4 py-1  rounded-2xl border justify-center"
                style={{ borderColor: colors.blue }}
              >
                <Entypo name="home" size={22} color={colors.blue} />
                <Text className="pl-2" style={{ color: colors.blue }}>
                  Home
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Price Conatiner */}

        <View className="border-t-2 px-3 py-2  border-gray-300">
          <Text className="font-bold text-md">Price Detail:</Text>
          <View className="flex-row items-end justify-between">
            <Text className="text-md pt-2">Total Price:</Text>
            <Text className="text-md pt-2">
              {state.deliveryType == "Shop" ? "Unavilable" : "Pta ni"}
            </Text>
          </View>
        </View>

        <View className="border-t-2 px-3 py-2  border-gray-300">
          <Text className="font-bold text-md">Estimated Time:</Text>
          <View className="flex-row items-end justify-between">
            <Text className="text-md pt-2">Estimated Time</Text>
            <Text className="text-md pt-2">
              {state.deliveryType == "Shop" ? "2h" : "3h"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Btn */}

      <TouchableOpacity
        onPress={uploadHandler}
        className="absolute bottom-0 w-full p-4 flex items-center justify-center"
        style={{ backgroundColor: colors.orange }}
      >
        <View>
          <Text className="text-lg text-white font-bold">{loading ? "Loading.." : "Continue.."}</Text>
        </View>
      </TouchableOpacity>
    </View>
      );
};

      export default OrederSummaryScreen;
