import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const [active, setActive] = useState("flipkart");
  const [items, setItems] = useState(0);
  const cart = useSelector((state) => state.reducer.cart);
  const navigate = useNavigation();
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalOriginalPrice,setTotalOriginalPrice] = useState(0);

  useEffect(()=>
  {
    cart.map((val)=>
    {
          const original = parseInt(val.originalPrice);
          setTotalOriginalPrice(totalOriginalPrice+original);
          const price = parseInt(val.price);
          setTotalPrice(totalPrice+price);
    })
  },[])

  return (
    <SafeAreaView className="bg-white relative flex-1">
      <StatusBar style="dark" backgroundColor="white"></StatusBar>
      {/* Upper part */}
      <View className="p-3 pb-5 flex space-y-4 border-b-8 border-gray-100">
        {/* Title */}
        <Text className="text-lg">My Cart</Text>
      </View>

      {/* Middle Part */}
      <ScrollView>
        {cart.map((item, index) => {
          const original = parseInt(item.originalPrice);
          const price = parseInt(item.price);
          const discount = Math.round(((original - price) / original) * 100);
          return (
            <View className='border-b-4 border-gray-200' key={index}>
              <TouchableOpacity key={index} className="p-2 gap-1" onPress={()=>navigate.push("Product Screen",{productDetail:item})}>
                {/* Upper part */}
                <View className="flex-1 flex-row space-x-2">
                  {/* Left side */}
                  <View
                    className="p-1"
                    style={{ width: wp(25), height: wp(25) }}
                  >
                    {/* Image container */}
                    <Image
                      source={{uri:item.uri}}
                      style={{ objectFit: "contain" }}
                      className="w-full h-[100%]"
                    ></Image>
                  </View>

                  {/* Right side */}
                  <View className="space-y-2">
                    {/* Name of product */}
                    <Text>
                      {item?.name.length > 40
                        ? item?.name.slice(0, 40) + "..."
                        : item?.name}
                    </Text>

                    {/* Key feature */}
                    {item?.keyFeature && (
                      <Text className="text-gray-400">{item?.keyFeature}</Text>
                    )}

                    {/* Rating section */}
                    {item?.rating && (
                      <View className="flex items-center space-x-2 flex-row">
                        <Text className="text-green-700">
                          {item?.rating}
                          <AntDesign name="star" size={16} color="green" />
                        </Text>
                        <Text className="text-gray-600">
                          ({item.totalratings})
                        </Text>
                      </View>
                    )}

                    {/* Price discount */}
                    <View className=" flex-1 flex-row space-x-2">
                      <Text className="text-green-800 text-md">
                        <AntDesign name="caretdown" size={18} color="green" />
                        {discount}%
                      </Text>
                      <Text className="text-gray-500 line-through">
                        ₹{item.originalPrice}
                      </Text>
                      <Text className="font-bold">₹{item.price}</Text>
                    </View>
                  </View>
                </View>

                {/* Middle one */}
                <View className="flex flex-row">
                  {item?.delivery && (
                    <View className="p-2">
                      <Text className="text-green-700">
                        {item?.delivery === "Free"
                          ? item?.delivery
                          : "₹" + item.delivery}{" "}
                        Delivery
                      </Text>
                    </View>
                  )}
                  <View className="border border-gray-100 p-0 pl-2 pr-2 items-center justify-center">
                    <Text className='text-xs text-gray-600'>Qty :{item.quantity}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Bottom bar */}
              <View className="flex-1 flex-row">
                <Pressable className="flex-1 flex-row p-2 border-2 gap-1 border-gray-100 items-center justify-center">
                  <AntDesign name="delete" size={14} color="gray" />
                  <Text className="text-[16px] text-gray-600 ">Remove</Text>
                </Pressable>
                <Pressable className="flex-1 flex-row p-2 gap-1  border-2 border-gray-100 items-center justify-center">
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={14}
                    color="gray"
                  />
                  <Text className="text-[16px] text-gray-600">
                    Buy this now
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Checkout sidebar */}
      <View className="absolute bottom-0 p-2 bg-white border-t-2 border-gray-300 flex-1 w-full flex-row items-center justify-between">
        {/* Left side */}
        <View className="">
          <Text className="text-[12px] line-through text-gray-400">₹{totalOriginalPrice}</Text>
          <Text className="text-lg tracking-widest font-bold">₹{totalPrice}</Text>
        </View>

        {/* Right side */}
        <TouchableOpacity className="w-[40%] h-[90%] flex items-center justify-center rounded-md bg-yellow-400">
          <Text className="font-bold text-md">Place order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;