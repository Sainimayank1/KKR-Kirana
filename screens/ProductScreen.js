import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchContainer from "../components/SearchContainer";
import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Highlights from "../components/Highlights";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AddToCart, FetchAllCart } from "../constants";

const ProductScreen = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const [isAdded, setAdded] = useState(false);
  const disptach = useDispatch();
  const { productDetail } = route.params;

  const addtocart = async (item) => {
    setAdded(true);
    await AddToCart(item);
    setTimeout(() => {
      setAdded(false);
    }, 5000)
  }
  
  const original = parseInt(productDetail.originalPrice);
  const price = parseInt(productDetail.price);
  const discount = Math.round(((original - price) / original) * 100);

  return (
    <SafeAreaView className="relative h-full bg-white">
      {/* Search Container*/}
      <SearchContainer />

      {/* All Deatils */}
      <ScrollView className="mb-10" showsVerticalScrollIndicator={false}>
        {/* Image Container */}
        <View className="relative space-y-5">
          {/* Heart */}
          <TouchableOpacity className="right-5 absolute top-5 z-10" onPress={() => navigate.push("Page not available")}>
            <AntDesign name="hearto" size={18} color="black" />
          </TouchableOpacity>

          {/* Share */}
          <TouchableOpacity className="right-5 absolute top-12 z-10" onPress={() => navigate.push("Page not available")}>
            <EvilIcons name="share-google" size={26} color="black" />
          </TouchableOpacity>
          {/* <MainCarasoul data={productDetail.images} screen="productDetail" /> */}
          <Image style={{ height: hp(60), width: wp(100), objectFit: "contain" }} source={{ uri: productDetail.uri }}></Image>

          {/* Details */}
          <TouchableOpacity className="right-5 absolute bottom-5 z-10 border bg-white border-gray-300 rounded-full p-1 flex flex-row space-x-1 items-center justify-center" onPress={() => navigate.push("Page not available")}>
            <View className="flex bg-blue-500 rounded-full">
              <AntDesign name="exclamationcircleo" size={18} color="white" />
            </View>
            <Text className="text-xs font-[900] text-blue-600">Details</Text>
          </TouchableOpacity>
          <View className="h-1 bg-gray-100"></View>
        </View>

        {/* Name , price and rating section */}
        <View className="p-3">
          {productDetail && (
            <View className="space-y-1">
              {/* Name of Product */}
              <Text className="text-md flex-wrap text-sm font-bold">
                {productDetail.name}
              </Text>

              <Text className="text-md flex-wrap text-xs">
                {productDetail.keyFeature}
              </Text>

              {/* Rating of Product */}
              <View className="flex items-center justify-between flex-row">
                <Text className="text-xs">
                  {productDetail.rating}
                  <AntDesign name="star" size={12} color="green" />{" "}
                  <Text className="pl-3 text-blue-700">
                    {productDetail.totalratings} ratings
                  </Text>
                </Text>
              </View>

              {/* Price section */}
              <View className="bg-green-100 p-2">
                <Text className="text-[10px] text-green-700 font-[900]">Special price</Text>
                <View className="flex items-center flex-row space-x-1">
                  <AntDesign name="caretdown" size={18} color="green" />
                  <Text className="text-green-700 text-xl font-bold">
                    {discount}%
                  </Text>
                  <Text className="line-through text-xl font-semibold text-gray-500">
                    {productDetail.originalPrice}
                  </Text>
                  <Text className="pl-2 text-xl font-bold">
                    ₹{productDetail.price}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Braker 😂*/}
        <View className="h-1 bg-gray-100"></View>

        {/* KKR features */}
        <View className=" flex items-center justify-around flex-row p-3">
          {/* Replacement */}
          <View className="flex items-center justify-around space-y-1">
            <View className="bg-yellow-500 w-min flex flex-row p-1 rounded-full">
              <FontAwesome name="exchange" size={18} color="white" />
            </View>
            <Text className="text-gray-600 text-xs font-bold">7 Days Replacement</Text>
          </View>

          {/* Cash on Delivery */}
          <View className="flex items-center justify-around space-y-1">
            <View className="bg-green-500 w-min flex flex-row p-1 rounded-full">
              <MaterialCommunityIcons name="cash" size={18} color="white" />
            </View>
            <Text className="text-gray-600 text-xs font-bold">Cash On Delivery</Text>
          </View>
        </View>

        {/* Braker 😂*/}
        <View className="h-1 bg-gray-100"></View>

        {/* KKR condfition */}
        <View className="p-3">
          <Text className="text-xs">
            We offer a 7 days replacement warrenty on manufacturing defects to
            ensure the best customer experience.
          </Text>
          <TouchableOpacity onPress={() => navigate.push("Page not available")}><Text className="text-blue-500 text-xs">Know More</Text></TouchableOpacity>
        </View>

        {/* Braker 😂*/}
        <View className="h-1 bg-gray-100"></View>

        {/* HightLight */}
        {
          productDetail?.highLight.length>0 &&
          <View className="p-3">
            <Text className="text-xs font-[900]">Highlights</Text>
            <Highlights data={productDetail.highLight} />
          </View>
        }

        {/* Braker 😂*/}
        <View className="h-1 bg-gray-100"></View>

        {/* All detail section
        <View className="p-3">
          <Pressable className="flex flex-row items-center justify-between">
            <Text className="text-xs font-[900]">All Details</Text>
            <AntDesign name="right" size={16} color="black" />
          </Pressable>
        </View> */}
      </ScrollView>

      {/* Bottom tab */}
      <View className="absolute bottom-0 w-full flex flex-row">
        <TouchableOpacity onPress={() => addtocart(productDetail)} className="w-full flex items-center justify-center p-3 bg-yellow-400">
          {
            isAdded ?
              <Text className="font-[900]">Added to cart</Text>
              :
              <Text className="font-[900]">Add to cart</Text>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;