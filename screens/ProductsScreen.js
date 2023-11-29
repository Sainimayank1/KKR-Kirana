import { View, Text, Alert, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FetchAllProductsUsingCategory } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchContainer from '../components/SearchContainer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import Colors from "../constants/style.js"
const ProductsScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    const getItem = async () => {
      await fetchAllProducts();
    }
    getItem();
  }, [])

  const fetchAllProducts = async () => {
    setLoading(true);
    let category = route.params.category;
    const data = await FetchAllProductsUsingCategory({ category: category.name });
    if (data.status != 200) {
      Alert.alert("Error", "Something went wrong.");
      return;
    }
    setData(data.data.data);
    setLoading(false);
  }


  return (
    <SafeAreaView className="relative h-full bg-white">
      {/* Search Container*/}
      <SearchContainer />

      <ScrollView className="flex flex-1 ">
        {
          loading ? 
          <View className="flex items-center justify-center" style={{height:hp(90)}}>
          <ActivityIndicator size="large" color={Colors.blue} ></ActivityIndicator>
          </View>
          :
          data.map((item,key) => {
            const original = parseInt(item.originalPrice);
            const price = parseInt(item.price);
            const discount = Math.round(((original - price) / original) * 100);
            return <TouchableOpacity key={key} className="border-b-2 border-gray-200 py-2" onPress={()=>navigate.push("Product Screen",{productDetail:item})}>
              {/* Upper section */}
              <View className="flex flex-row w-full px-4 py-2">
                {/* Left section */}
                <View>
                  <Image source={{ uri: item.uri }} style={{ height: hp(15), width: wp(20), objectFit:"cover" }}></Image>
                </View>

                {/* RIght section */}
                <View className="px-4">
                  {/* Product name*/}
                  <Text className="text-lg font-bold">{item.name}</Text>

                  {/* Key feature*/}
                  <Text className="text-gray-500">{item.keyFeature}</Text>

                  {/* Rating of Product */}
                  <View className="flex items-center justify-between flex-row py-1">
                    <Text className="text">
                      {item.rating}
                      <AntDesign name="star" size={12} color="green" />{" "}
                      <Text className="pl-3 text-blue-700">
                        {item.totalratings} ratings
                      </Text>
                    </Text>
                  </View>

                  {/* Price section */}
                  <View className="">
                    <Text className="text-[10px] text-green-700 font-[900]">Special price</Text>
                    <View className="flex items-center flex-row space-x-1">
                      <AntDesign name="caretdown" size={18} color="green" />
                      <Text className="text-green-700 text-lg font-bold">
                        {discount}%
                      </Text>
                      <Text className="line-through text-lg font-semibold text-gray-500">
                        {item.originalPrice}
                      </Text>
                      <Text className="pl-2 text-xl font-bold">
                        ₹{item.price}
                      </Text>
                    </View>
                  </View>

                  {/* Delivery section */}
                  <View className="flex flex-row space-x-1">
                  <Feather name="truck" size={16} color="gray" />
                  <Text className="text-gray-500">{item.delivery}</Text>
                  </View>

                </View>
              </View>

              {/* Down section */}
              <View className="flex flex-row flex-wrap">
                {
                  item.highLight.map((light)=>
                  {
                      return <Text className="border border-gray-200 px-2 py-1 mx-2 my-1 text-xs">{light}</Text>
                  })
                }
              </View>
            </TouchableOpacity>;
          })
        }

      </ScrollView>

    </SafeAreaView>
  )
}

export default ProductsScreen