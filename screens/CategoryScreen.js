import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../constants/style";
import { FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FetchCategoryItems } from "../api";

const CategoryScreen = () => {
  const [Catgory, setCategory] = useState({ productsCatgory: [], productsCatgoryLoader: false });


  useEffect(() => {
    fetchCategory();
  },[])


  const fetchCategory = async () => {
    setCategory({ ...Catgory, productsCatgoryLoader: true });
    const data = await FetchCategoryItems();
    if (data?.data?.data != undefined) {
      setCategory({ ...Catgory, productsCatgory: data.data.data });
    }
    else {
      Alert.alert("Error", data);
    }
    // setCategory({ ...Catgory, productsCatgoryLoader: false });
  }

  const RecentlyViewStore = [
    {
      uri: require("../assests/image/Sponsered/BoultEar.webp"),
      name: "Boult Audio Z40 with Zen ENC Mic, 60H Battery Life, Low Latency Gaming, Made In India, 5.3 Bluetooth Headset",
      keyFeature: "Brown, In the Ear",
      category: "Earphone",
      originalPrice: "5,999",
      price: "1,499",
      index: 1,
    },
    {
      uri: require("../assests/image/Sponsered/BoatWatch.webp"),
      name: "boAt Storm call 1.69 inch HD display with bluetooth calling and 550 nits brightness Smartwatch",
      keyFeature: "Amoled + Calling",
      category: "Smart Watch",
      originalPrice: "10,999",
      price: "2,999",
      index: 2,
    },
    {
      uri: require("../assests/image/ItemsBackInStock/mobile.webp"),
      name: "realme Narzo 30 Pro 5G",
      keyFeature: "(Blade Silver, 128 GB)  (8 GB RAM)",
      category: "Mobile",
      originalPrice: "21,999",
      price: "20,890",
      index: 2,
    },
    {
      uri: require("../assests/image/Sponsered/realmeEarphone.webp"),
      name: "realme Buds Air 3 Neo with up to 30 hours Playback ",
      keyFeature: " Charge Bluetooth Headset",
      category: "True Wireless",
      originalPrice: "3,999",
      price: "1,199",
      index: 4,
    },
    {
      uri: require("../assests/image/Sponsered/OppoEarphone.webp"),
      name: "OPPO Enco Buds 2 with 28 hours Battery life",
      keyFeature: "Deep Noise Cancellation",
      category: "Ear Buds",
      originalPrice: "5,999",
      price: "1,699",
      index: 5,
    },
    {
      uri: require("../assests/image/Sponsered/FireBoultWatch.webp"),
      name: "Fire-Boltt Starlight 2.01'' HD Display Smart Watch Bluetooth Callin",
      keyFeature: "Stainless Steel Luxury Smartwatch",
      category: "Smart Watch",
      originalPrice: "14,999",
      price: "2,199",
      index: 6,
    },
  ];
  return (
    <SafeAreaView className="h-full">
      <StatusBar backgroundColor={colors.blue} style="light"></StatusBar>
      {/* Upper conatiner */}
      <View
        className=" p-2 justify-between flex flex-row items-center"
        style={{ backgroundColor: colors.blue }}
      >
        {/* Left side */}
        <Text className="text-white text-lg">All Categories</Text>

        {/* Right side */}
        <View className="flex flex-row space-x-5">
          <TouchableOpacity>
            <FontAwesome name="search" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome name="microphone" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Down container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        className="flex-1 h-full bg-white"
      >
        {/* Product conatiner */}
        {
          Catgory.productsCatgoryLoader ?
            <View className="h-full p-10">
              <ActivityIndicator size="large" color={colors.blue}></ActivityIndicator>
            </View> :
            <View className="flex-1 flex flex-row flex-wrap justify-center">
              {/* Product map */}
              {Catgory.productsCatgory.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    className="items-center justify-center "
                    style={{ height: wp(28), width: wp(25) }}
                  >
                    <Image
                      className="h-[60%] w-[70%] rounded-full bg-blue-100 object-contain "
                      style={{ objectFit: "contain" }}
                      source={{ uri: item.uri }}
                    ></Image>
                    <Text className=" w-full text-center text-md">
                      {item?.name?.length >= 10
                        ? item?.name?.slice(0, 9) + " .."
                        : item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
