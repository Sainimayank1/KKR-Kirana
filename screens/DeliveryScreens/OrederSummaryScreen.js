import { View, Text, TouchableOpacity, Image, ScrollView, Button, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/style";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { sendImage, Order } from "../../api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import JWT from 'expo-jwt';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RemoveDeliveryAddress, RemoveDeliveryType, RemoveImage } from "../../context/actions/action";
import { AddToCart, ClearCart, DeleteFromCart, FetchAllCart, RemoveFromCart } from "../../constants";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";


const OrederSummaryScreen = () => {
  const state = useSelector((state) => state.reducer);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigation();
  const disptach = useDispatch();
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState({ orignal: 0, price: 0 });

  useEffect(() => {
    const getItem = async () => {
      let token = await AsyncStorage.getItem("authToken");
      const data = JWT.decode(token, "heymynameismayank!");
      setUser(data.userId);
    };
    getItem();
    fetchCartData();
  }, [])

  const fetchCartData = async () => {
    setLoading(true);
    const data = await FetchAllCart();
    if (!data) {
      setLoading(false);
      return;
    }
    let obj = { price: 0, original: 0 };
    data.map((val) => {
      obj.price += parseInt(val.price) * parseInt(val.quantity);
      obj.original += parseInt(val.originalPrice) * parseInt(val.quantity);
    })
    setAmount({ orignal: obj.original, price: obj.price });
    setCart(data);
    setLoading(false);
  }

  const uploadHandler = async () => {
    setLoading(true);
    if (state.uri != "" || cart.length > 0) {
      let data = null;
      if (state.uri != "") {
        data = await sendImage(state.uri);
        if (data.code == 400) {
          Alert.alert(data.title, data.msg);
        }
      }

      let val = { userName: user.name, phoneNumber: user.phone, user: user._id, deliveryMethod: state.deliveryType };
      if (data != null)
        val.imageUri = data.url;
      if (cart.length > 0) {
        let newCart = cart.map(val => {
          let obj = {};
          obj.name = val.name;
          obj._id = val._id;
          obj.category = val.category;
          obj.quantity = val.quantity;
          obj.price = val.price;
          obj.uri = val.uri;
          return obj;
        })
        val.products = newCart;
        val.totalPrice = amount.price;
      }

      if (state.deliveryType == "Home") {
        val.shippingAddress = state.deliveryAddress;
      }
      const resp = await Order(val);
      if (!!resp?.data?.msg) {
        Alert.alert("Success", resp.data.msg);
        disptach(RemoveImage());
        disptach(RemoveDeliveryType());
        disptach(RemoveDeliveryAddress());
        navigate.navigate("Home");
      }
      else
        Alert.alert("Error", resp);
    }
    else
      Alert.alert("Error", "Please select Image or Add item in cart");
    setLoading(false);
  }



  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="mb-20">
        {state.uri != "" && (
          <View className="flex items-center justify-center relative">
            <Image
              source={{ uri: state.uri }}
              style={{ height: hp(50), width: wp(90) }}
            ></Image>
            <TouchableOpacity className="absolute top-3 right-8" onPress={() => disptach(RemoveImage())}>
              <Entypo name="circle-with-cross" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}

        {/* Cart conatiner */}
        <View>
          {
            cart.map((item, index) => {
              const original = parseInt(item?.originalPrice);
              const price = parseInt(item?.price);
              const discount = Math.round(((original - price) / original) * 100);
              return (
                <View className='border-b-4 border-gray-200' key={index}>
                  <TouchableOpacity key={index} className="p-2 gap-1" onPress={() => navigate.push("Product Screen", { productDetail: item })}>
                    {/* Upper part */}
                    <View className="flex-1 flex-row space-x-2">
                      {/* Left side */}
                      <View
                        className="p-1"
                        style={{ width: wp(25), height: wp(25) }}
                      >
                        {/* Image container */}
                        <Image
                          source={{ uri: item.uri }}
                          style={{ objectFit: "contain" }}
                          className="w-full h-[100%]"
                        ></Image>
                      </View>

                      {/* Right side */}
                      <View className="space-y-2">
                        {/* Name of product */}
                        <Text className="flex-wrap">
                          {item?.name.length > 40
                            ? item?.name.slice(0, 40) + "..."
                            : item?.name}
                        </Text>

                        {/* Key feature */}
                        {item?.keyFeature && (
                          <Text className="text-gray-400 flex-wrap"> {item?.keyFeature.length > 40
                            ? item?.keyFeature.slice(0, 40) + "..."
                            : item?.keyFeature}</Text>
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
                </View>
              );
            })
          }
        </View>


        {/* Middle Container */}
        <View className="gap-y-2 pt-5 pb-4" >
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

        {/* Address Conatiner */}
        {
          state.deliveryType == "Home" &&
          <View className="w-full bg-white p-4 mb-2 border-t-2 px-3 py-2  border-gray-300" >
            <Text className="text-md font-bold mb-3">Delivery Address</Text>
            <View>{!!state.deliveryAddress.name && <Text className="font-bold text-md">{state.deliveryAddress.name}</Text>}</View>
            <View>
              <Text>
                {!!state.deliveryAddress.houseNo && <Text>,{state.deliveryAddress.houseNo} </Text>}
                {!!state.deliveryAddress.landmark && <Text>{state.deliveryAddress.landmark} </Text>}
                {!!state.deliveryAddress.city && <Text>,{state.deliveryAddress.city} </Text>}
                {!!state.deliveryAddress.state && <Text>,{state.deliveryAddress.state} </Text>}
                {!!state.deliveryAddress.postalCode && <Text>,{state.deliveryAddress.postalCode} </Text>}
              </Text>
            </View>
            <View>{!!state.deliveryAddress.mobileNo && <Text className="font-bold text-md">{state.deliveryAddress.mobileNo}</Text>}</View>
          </View>
        }

        {/* Price Conatiner */}

        <View className="border-t-2 px-3 py-2  border-gray-300">
          <Text className="font-bold text-md">Price Detail:</Text>
          <View className="flex-row items-end justify-between">
            <Text className="text-md pt-2">Total Price:</Text>
            <Text className="text-md pt-2">
              {amount.orignal == 0 ? "unavailable" : "₹" + amount.orignal}
            </Text>
          </View>
          {
            amount.orignal != 0 && <View className="flex-row items-end justify-between">
              <Text className="text-md pt-2">After Discount:</Text>
              <Text className="text-md pt-2">
                {"₹" + amount.price}
              </Text>
            </View>
          }
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
    </SafeAreaView>
  );
};

export default OrederSummaryScreen;
