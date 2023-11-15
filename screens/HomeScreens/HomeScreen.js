import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Camera from "../../components/camera";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Card3By2 from "../../components/Card3By2";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FetchCategoryItems } from "../../api";


const HomeScreen = () => {
  const navigate = useNavigation();
  const { uri } = useSelector((state) => (state.reducer));
  const [Catgory, setCategory] = useState({ productsCatgory: [], productsCatgoryLoader: false });


  useEffect(() => {
    fetchCategory();
  }, [])


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




  const todayDeal = [
    {
      uri: require("../../assests/image/TodayDeal/trimmer.webp"),
      name: "Best of Trimmers",
      price: "399",
      index: 1,
    },
    {
      uri: require("../../assests/image/TodayDeal/monitor.webp"),
      name: "Monitor",
      price: "6599",
      index: 2,
    },
    {
      uri: require("../../assests/image/CatCarasoul/fashion.webp"),
      name: "Projector",
      price: "6990",
      index: 3,
    },
  ];

  const ItemsBackInStock = [
    {
      uri: require("../../assests/image/ItemsBackInStock/watch.webp"),
      name: "Noise Colorfit Icon 2 1.8'' Display with Bluetooth Calling, AI Voice Assistant Smartwatch  ",
      keyFeature: "(Black Strap, Regular)",
      originalPrice: "5,999",
      price: "1,599",
      id: 1,
    },
    {
      uri: require("../../assests/image/ItemsBackInStock/mobile.webp"),
      name: "realme Narzo 30 Pro 5G",
      keyFeature: "(Blade Silver, 128 GB)  (8 GB RAM)",
      originalPrice: "21,999",
      price: "20,890",
      id: 2,
    },
    {
      uri: require("../../assests/image/ItemsBackInStock/earbuds.webp"),
      name: "Boult Audio Z40 with Zen ENC Mic, 60H Battery Life, Low Latency Gaming, Made In India, 5.3 Bluetooth Headset",
      keyFeature: " (White, In the Ear)",
      originalPrice: "4,999",
      price: "1,199",
      id: 3,
    },
  ];

  const SponserdData = [
    {
      uri: require("../../assests/image/Sponsered/BoultEar.webp"),
      name: "Boult Audio Z40 with Zen ENC Mic, 60H Battery Life, Low Latency Gaming, Made In India, 5.3 Bluetooth Headset",
      keyFeature: "Brown, In the Ear",
      originalPrice: "5,999",
      price: "1,499",
      index: 1,
    },
    {
      uri: require("../../assests/image/Sponsered/BoatWatch.webp"),
      name: "boAt Storm call 1.69 inch HD display with bluetooth calling and 550 nits brightness Smartwatch",
      keyFeature: "Amoled + Calling",
      originalPrice: "10,999",
      price: "2,999",
      index: 2,
    },
    {
      uri: require("../../assests/image/Sponsered/NoiseWatch.webp"),
      name: "Noise Colorfit Icon 2 1.8'' Display with Bluetooth Calling, AI Voice Assistant Smartwatch",
      keyFeature: "Deep Wine Strap, Regular",
      originalPrice: "5,999",
      price: "1,599",
      index: 3,
    },
    {
      uri: require("../../assests/image/Sponsered/realmeEarphone.webp"),
      name: "realme Buds Air 3 Neo with up to 30 hours Playback ",
      keyFeature: "Fast Charge Bluetooth Headset",
      originalPrice: "3,999",
      price: "1,199",
      index: 4,
    },
    {
      uri: require("../../assests/image/Sponsered/OppoEarphone.webp"),
      name: "OPPO Enco Buds 2 with 28 hours Battery life",
      keyFeature: "Deep Noise Cancellation",
      originalPrice: "5,999",
      price: "1,699",
      index: 5,
    },
    {
      uri: require("../../assests/image/Sponsered/FireBoultWatch.webp"),
      name: "Fire-Boltt Starlight 2.01'' HD Display Smart Watch Bluetooth Callin",
      keyFeature: "Stainless Steel Luxury Smartwatch",
      originalPrice: "14,999",
      price: "2,199",
      index: 6,
    },
  ];

  const RecentlyViewStore = [
    {
      uri: require("../../assests/image/Sponsered/BoultEar.webp"),
      name: "Boult Audio Z40 with Zen ENC Mic, 60H Battery Life, Low Latency Gaming, Made In India, 5.3 Bluetooth Headset",
      keyFeature: "Brown, In the Ear",
      category: "Earphone",
      originalPrice: "5,999",
      price: "1,499",
      index: 1,
    },
    {
      uri: require("../../assests/image/Sponsered/BoatWatch.webp"),
      name: "boAt Storm call 1.69 inch HD display with bluetooth calling and 550 nits brightness Smartwatch",
      keyFeature: "Amoled + Calling",
      category: "Smart Watch",
      originalPrice: "10,999",
      price: "2,999",
      index: 2,
    },
    {
      uri: require("../../assests/image/ItemsBackInStock/mobile.webp"),
      name: "realme Narzo 30 Pro 5G",
      keyFeature: "(Blade Silver, 128 GB)  (8 GB RAM)",
      category: "Mobile",
      originalPrice: "21,999",
      price: "20,890",
      index: 2,
    },
    {
      uri: require("../../assests/image/Sponsered/realmeEarphone.webp"),
      name: "realme Buds Air 3 Neo with up to 30 hours Playback ",
      keyFeature: " Charge Bluetooth Headset",
      category: "True Wireless",
      originalPrice: "3,999",
      price: "1,199",
      index: 4,
    },
    {
      uri: require("../../assests/image/Sponsered/OppoEarphone.webp"),
      name: "OPPO Enco Buds 2 with 28 hours Battery life",
      keyFeature: "Deep Noise Cancellation",
      category: "Ear Buds",
      originalPrice: "5,999",
      price: "1,699",
      index: 5,
    },
    {
      uri: require("../../assests/image/Sponsered/FireBoultWatch.webp"),
      name: "Fire-Boltt Starlight 2.01'' HD Display Smart Watch Bluetooth Callin",
      keyFeature: "Stainless Steel Luxury Smartwatch",
      category: "Smart Watch",
      originalPrice: "14,999",
      price: "2,199",
      index: 6,
    },
  ];

  const SuggestedData = [
    {
      uri: require("../../assests/image/Sponsered/BoultEar.webp"),
      name: "Boult Audio Z40 with Zen ENC Mic, 60H Battery Life, Low Latency Gaming, Made In India, 5.3 Bluetooth Headset",
      keyFeature: "Brown, In the Ear",
      category: "Earphone",
      originalPrice: "5,999",
      price: "1,499",
      rating: "4.1",
      delivery: "Free",
      index: 1,
    },
    {
      uri: require("../../assests/image/Sponsered/BoatWatch.webp"),
      name: "boAt Storm call 1.69 inch HD display with bluetooth calling and 550 nits brightness Smartwatch",
      keyFeature: "Amoled + Calling",
      category: "Smart Watch",
      originalPrice: "10,999",
      price: "2,999",
      rating: "4.1",
      delivery: "Free",
      index: 2,
    },
    {
      uri: require("../../assests/image/ItemsBackInStock/mobile.webp"),
      name: "realme Narzo 30 Pro 5G",
      keyFeature: "(Blade Silver, 128 GB)  (8 GB RAM)",
      category: "Mobile",
      originalPrice: "21,999",
      price: "20,890",
      rating: "3.9",
      delivery: "Free",
      index: 2,
    },
    {
      uri: require("../../assests/image/Sponsered/realmeEarphone.webp"),
      name: "realme Buds Air 3 Neo with up to 30 hours Playback ",
      keyFeature: " Charge Bluetooth Headset",
      category: "True Wireless",
      originalPrice: "3,999",
      price: "1,199",
      rating: "4.1",
      delivery: "Free",
      index: 4,
    },
    {
      uri: require("../../assests/image/Sponsered/OppoEarphone.webp"),
      name: "OPPO Enco Buds 2 with 28 hours Battery life",
      keyFeature: "Deep Noise Cancellation",
      category: "Ear Buds",
      originalPrice: "5,999",
      price: "1,699",
      rating: "4.4",
      delivery: "Free",
      index: 5,
    },
    {
      uri: require("../../assests/image/Sponsered/FireBoultWatch.webp"),
      name: "Fire-Boltt Starlight 2.01'' HD Display Smart Watch Bluetooth Callin",
      keyFeature: "Stainless Steel Luxury Smartwatch",
      category: "Smart Watch",
      originalPrice: "14,999",
      price: "2,199",
      rating: "4",
      delivery: "Free",
      index: 6,
    },
  ];


  return (
    <SafeAreaView className="flex-1" style={{}}>
      <StatusBar color="light" backgroundColor="white"></StatusBar>
      {/* Upper conatiner*/}
      <View
        style={{ height: hp(5), backgroundColor: colors.blue }}
        className="p-7 flex items-center justify-center"
      >
        <Image
          source={require("../../assests/logo-no-background.png")}
          style={{ width: wp(30), height: wp(15), objectFit: "contain" }}
        ></Image>
      </View>

      {/* Scrool Container */}
      <ScrollView>

        {/* Search Coantiner */}
        <View className="flex-row items-center justify-between px-2 py-1 space-x-5">
          {/*Search Area*/}
          <View className="flex-1 flex flex-row space-x-2 items-center justify-between border border-gray-300 bg-neutral-100 p-1 rounded-md">
            <View className="flex flex-row space-x-2 items-center">
              <MaterialIcons name="search" size={20} color="gray" />
              <Pressable>
                <TextInput
                  className="text-neutral-500"
                  placeholder="Search for products"
                  style={{ fontSize: 12 }}
                ></TextInput>
              </Pressable>
            </View>
            <View className="flex flex-row space-x-2 items-center">
              <Ionicons name="ios-mic-outline" size={18} color="gray" />
              <Feather name="camera" size={18} color="gray" />
            </View>
          </View>
        </View>

        {/* Camera conatiner */}
        <Camera></Camera>

        {/* Catogry scrollview */}
        {
          Catgory.productsCatgoryLoader ?
            <View className="p-10">
              <ActivityIndicator size="large" color={colors.blue} />
            </View> :
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              className="mt-2 flex-1 flex-wrap flex-row  h-full"

            >
              {Catgory.productsCatgory.map((item, index) =>
              {
                return (<Pressable
                  key={index}
                  className="items-center justify-center  h-full"
                  style={{ height: wp(25), width: wp(20) }}
                >
                  <Image
                    className="h-[50%] w-[65%] rounded-full bg-blue-100 object-contain "
                    source={{ uri: item.uri }}
                  ></Image>
                  <Text className="font-bold w-full text-center text-[10px]">
                    {item?.name?.length >= 8
                      ? item?.name?.slice(0, 6) + " .."
                      : item.name}
                  </Text>
                </Pressable>);
              }
              )}
            </ScrollView>
        }

        {/* Today Deal Container */}
        <View className="flex flex-wrap items-center flex-row justify-around">
          {todayDeal.map((item, index) => {
            return (
              <Pressable
                key={index}
                className="w-[30%] border-gray-100 pb-1 border-2 flex items-center space-y-1 rounded-md"
              >
                <Image
                  className="w-[100%] object-fill bg-blue-200 "
                  style={{ height: hp(12) }}
                  source={item.uri}
                ></Image>
                <Text className="text-xs">
                  {item?.name?.length > 12
                    ? item?.name?.slice(0, 10) + ".."
                    : item?.name}
                </Text>
                <Text className="font-[900] ">From ₹{item.price}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Items back in stock */}
        <Text className="p-3 text-md font-[900]">Items Back in Stock</Text>
        <View className="flex flex-col border-b-2 border-gray-200">
          {ItemsBackInStock.map((item, index) => {
            const original = parseInt(item.originalPrice);
            const price = parseInt(item.price);
            const discount = Math.round(((original - price) / original) * 100);
            return (
              <Pressable
                onPress={() => {
                  navigation.push("ProductDetail", item);
                }}
                className="flex-1 flex flex-row p-2 py-3 border-t-2 border-gray-200  space-x-2"
                key={index}
              >
                {/* Image Section */}
                <View className="w-[20%] h-full ">
                  <Image
                    source={item.uri}
                    className="w-full h-[100%]"
                    style={{ objectFit: "contain" }}
                  ></Image>
                </View>

                {/* Detail section */}
                <View>
                  <Text className="text-xs font-bold">
                    {item?.name?.length > 40
                      ? item?.name?.slice(0, 40) + "..."
                      : item?.name}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {item.keyFeature}
                  </Text>
                  <View className="flex flex-row space-x-1">
                    <Text className="line-through text-gray-400 text-xs">
                      {item.originalPrice}{" "}
                    </Text>
                    <Text className="font-bold text-xs">₹{item.price} </Text>
                    <Text className="text-green-700 font-bold text-xs">
                      {discount + "% off"}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Sponserd section */}
        <View className="p-3 border-b-4 border-gray-200">
          <Text className="text-md font-[900] pb-2">Sponsored</Text>
          <View className="flex flex-wrap flex-row space-y-4 space-x-4 items-center justify-around">
            {SponserdData &&
              SponserdData.map((data, index) => {
                return <Card3By2 type="sponsored" data={data} key={index} />;
              })}
          </View>
        </View>

        {/* Recently View And Suggested for you */}
        <View className="p-3 border-b-4 border-gray-300 space-y-5">
          {/* Upper section */}
          <View>
            <Text className="text-md font-[900] pb-2">
              Recently Viewed Stores
            </Text>
            {/* Recently scrollView */}
            <ScrollView
              horizontal
              className="space-x-3"
              showsHorizontalScrollIndicator={false}
            >
              {RecentlyViewStore &&
                RecentlyViewStore.map((data, index) => {
                  return (
                    <View
                      key={index}
                      style={{ height: wp(35), width: wp(25) }}
                      className="flex-col items-center border border-gray-300 rounded-md p-2"
                    >
                      <Image
                        source={data.uri}
                        className="w-full h-[80%]"
                        style={{ objectFit: "contain" }}
                      ></Image>
                      <Text className="text-xs">{data.category}</Text>
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          {/* Lower Section */}
          <View>
            {/* Ttile & Icon */}
            <View className="flex flex-row items-center justify-between">
              <Text className="text-md font-[900] pb-2">Suggested for You</Text>
              <TouchableOpacity
                style={{ backgroundColor: colors.blue }}
                className="p-[2px] rounded-full flex items-center justify-center"
              >
                <AntDesign name="right" size={14} color="white" />
              </TouchableOpacity>
            </View>

            {/* Card3by2 */}
            <View className="flex flex-wrap flex-row space-y-4 space-x-4 items-center justify-around">
              {SuggestedData &&
                SuggestedData.map((data, index) => {
                  return <Card3By2 type="suggested" data={data} key={index} />;
                })}
            </View>
          </View>
        </View>

        {/* Image section */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {uri && (
            <Image
              source={{ uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <TouchableOpacity onPress={() => navigate.push("Order Summary")}><Text>Btn</Text></TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;
