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
  import { SimpleLineIcons } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import Highlights from "../components/Highlights";
  import { useRoute } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  
  const ProductScreen = () => {
    const route = useRoute();
    const [isAdded,setAdded] = useState(false);
    const disptach = useDispatch();
    const cart = useSelector(state => state.cart.cart)
  
    const addtocart = (item) =>
    {
        setAdded(true);
        // disptach(addToCart(item));
        disptach(addToCart(productDetail));
        setTimeout(()=>
        {
          setAdded(false);
        },5000)
  
        console.log(cart)
    }
  
    const productDetail = {
      // images:[require("")],
      name: "OnePlus Nord CE 2 Lite 5G (Blue Tide, 128 GB)  (6 GB RAM) ",
      images: [
       
      ],
      keyFeature: "Brown, In the Ear",
      totalratings: "14,628",
      category: "Earphone",
      originalPrice: "6,999",
      price: "1,499",
      rating: "4.1",
      delivery: "Free",
      assured: true,
      highLight: ["abc", "ghj", "efg", "jkl", "mynl", "not", "ybl"],
      index: 1,
    };
  
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
            <TouchableOpacity className="right-5 absolute top-5 z-10">
              <AntDesign name="hearto" size={18} color="black" />
            </TouchableOpacity>
  
            {/* Share */}
            <TouchableOpacity className="right-5 absolute top-12 z-10">
              <EvilIcons name="share-google" size={26} color="black" />
            </TouchableOpacity>
            {/* <MainCarasoul data={productDetail.images} screen="productDetail" /> */}
  
            {/* Details */}
            <TouchableOpacity className="right-5 absolute bottom-5 z-10 border bg-white border-gray-300 rounded-full p-1 flex flex-row space-x-1 items-center justify-center">
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
                <Text className="text-md flex-wrap text-xs">
                  {productDetail.name}
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
  
                {/* Pay Later section */}
                <Text className="mb-3 text-xs">
                  1cr+ users trust Buy Now Pay Later{" "}
                  <Text className="text-blue-700">Activate Now</Text>
                </Text>
              </View>
            )}
          </View>
  
          {/* Braker 😂*/}
          <View className="h-1 bg-gray-100"></View>
  
          {/* Delivery section */}
          <View className="p-3  flex items-center justify-between flex-row border-b-0.5 border-gray-300">
            {/* Left container */}
            <View>
              {/* Upper side  */}
              <View className="flex items-center flex-row space-x-2">
                <Text className="text-xs font-bold">
                  Deliver to: <Text className="">Mayank,136156</Text>
                </Text>
                <View className="p-1 bg-gray-100 rounded-md">
                  <Text className="text-gray-600 text-xs">Home</Text>
                </View>
              </View>
  
              {/* Loweer side  */}
              <View>
                <Text className="text-gray-500 text-xs">
                  Dhannani, Sunarion road, Kurukshetra District
                </Text>
              </View>
            </View>
  
            {/* Right container */}
            <View>
              <TouchableOpacity className=" py-1.5 px-2 border border-gray-300 rounded-md">
                <Text className="text-blue-600 text-xs font-bold">Change</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          {/* Expect Delivery */}
          <View className="p-3 flex items-center flex-row space-x-4">
            {/* Left container */}
            <View>
              <Feather name="truck" size={18} color="gray" />
            </View>
  
            {/* Right container */}
            <View className="flex items-start flex-col">
              {/* Upper part */}
              <View className="space-x-1 flex items-center flex-row">
                <Text className="text-green-500 text-xs font-bold">FREE Delivery</Text>
                <Text className="line-through text-gray-400 trext-xs ">₹40</Text>
                <View className="h-full w-0.5 bg-gray-300 text-xs"></View>
                <Text className="font-semibold text-xs">
                  Delivery in 2 Days , Sunday
                </Text>
              </View>
  
              {/* Lower Part */}
              <View className="flex items-center flex-row space-x-2">
                <Text className="text-xs">If ordered within</Text>
                <Text className="text-red-500 font-bold text-xs">
                  01h 48m 17s
                </Text>
              </View>
            </View>
          </View>
  
          {/* Braker 😂*/}
          <View className="h-1 bg-gray-200"></View>
  
          {/* All offer section */}
          <View className="p-3 flex items-center justify-between flex-row">
            <Text className="font-[900] text-xs">All Offers & Coupons</Text>
            <TouchableOpacity>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          </View>
  
          {/* Braker 😂*/}
          <View className="h-1 bg-gray-100"></View>
  
          {/* Orderd Peoples */}
          <View className="flex items-center p-3 space-x-2 flex-row">
            <View className="bg-green-100 p-1 rounded-full flex items-center justify-center">
              <SimpleLineIcons name="graph" size={18} color="green" />
            </View>
            <Text className="font-semibold text-xs">5,000+</Text>
            <Text className="text-xs">
              people ordered this in the last 7 days
            </Text>
          </View>
  
          {/* Braker 😂*/}
          <View className="h-1 bg-gray-200"></View>
  
          {/* Flipkart features */}
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
  
          {/* Flipkart condfition */}
          <View className="p-3">
            <Text className="text-xs">
              We offer a 12-month replacement warrenty on manufacturing defects to
              ensure the best customer experience. Please give us a missed call at
              our customer care number or scan the QR Code to activate your
              warranty. <Text className="text-blue-500">Know More</Text>
            </Text>
          </View>
  
          {/* Braker 😂*/}
          <View className="h-1 bg-gray-100"></View>
  
          {/* HightLight */}
          <View className="p-3">
            <Text className="text-xs font-[900]">Highlights</Text>
            <Highlights data={productDetail.highLight} />
          </View>
  
          {/* Braker 😂*/}
          <View className="h-1 bg-gray-100"></View>
  
          {/* All detail section */}
          <View className="p-3">
            <Pressable className="flex flex-row items-center justify-between">
              <Text className="text-xs font-[900]">All Details</Text>
              <AntDesign name="right" size={16} color="black" />
            </Pressable>
          </View>
        </ScrollView>
  
        {/* Bottom tab */}
        <View className="absolute bottom-0 w-full flex flex-row">
          <TouchableOpacity onPress={()=>addtocart(route?.params)} className="w-[50%] flex items-center justify-center p-3 bg-white">
            {
              isAdded ?
              <Text className="font-[900]">Added to cart</Text>
              :
              <Text className="font-[900]">Add to cart</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity className="w-[50%] flex items-center justify-center p-3 bg-yellow-400">
            <Text className="font-[900]">Buy now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ProductScreen;