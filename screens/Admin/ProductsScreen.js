import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput, Image , RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';
import { AddProduct, DeleteProduct, FetchAllProducts, FetchCategoryItems, fetchAllOrders, sendImage } from '../../api';
import Navbar from '../../components/Admin/Navbar';
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';


const ProductScreen = () => {
  const [user, setUser] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigation();



  const fetchProducts = async () => {
    setLoading(true);
    const data = await FetchAllProducts();
    if (data?.data?.data != undefined) {
      setProducts(data.data.data);
    }
    else {
      Alert.alert("Error", data);
    }
    setLoading(false);
  }


  const deleteHandler = async (_id) => {
    setLoading(true);
    const resp = await DeleteProduct({ _id: _id });
    if (resp.status == 200) {
      Alert.alert("Success", resp.data.msg)
      await fetchProducts();
    }
    setLoading(false)
  }

  useEffect(() => {
    const getItem = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const data = JWT.decode(token, "heymynameismayank!");
      setUser({ ...user, ...data.userId });
      await fetchProducts();
    };
    getItem();
  }, [])





  return (
    <SafeAreaView className="flex-1 relative">
      {/* Header */}
      <Navbar user={user} />

      {/* Upper side || Add Category */}
      <TouchableOpacity onPress={() => navigate.push("Add Product")} className=" mt-2" >
        <Text className="p-3 m-3 text-white text-center" style={{ backgroundColor: colors.blue }}>Add Item</Text>
      </TouchableOpacity>

      {/* Add Product Conatiner */}
      <ScrollView>
        {
          loading ?
            <View className="flex-1 w-full flex h-full items-center justify-center" style={{ height: hp(90) }} >
              <ActivityIndicator size="large" color={colors.blue} />
            </View>
            :
            <ScrollView className="flex-1"
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={async () => {
                    await fetchProducts();
                  }}
                />
              }>
              {
                products.length > 0 ?
                  products.map((item, key) => {
                    {/* console.log(item) */ }
                    return <View key={key} className="w-full bg-white p-3 flex-row flex items-start justify-around mt-3">
                      {/* Left section */}
                      <View className='w-[90%] flex gap-1 mb-2'>
                        <View className="flex flex-row gap-2">
                          <Text className="border-gray-400 border-2 rounded  p-1 font-bold">Name: {item.name}</Text>
                          <Text className="border-gray-400 border-2 rounded  p-1  font-bold">Category: {item.category}</Text>
                        </View>
                        <View className="flex flex-row gap-2">
                          <Text className="border-gray-400 border-2 rounded  p-1  font-bold">Key Feature: {item.keyFeature}</Text>
                          <Text className="border-gray-400 border-2 rounded  p-1 font-bold">Original Price: {item.originalPrice}</Text>
                        </View>
                        <View className="flex flex-row gap-2">
                          <Text className="border-gray-400 border-2 rounded  p-1  font-bold">Price: {item.price}</Text>
                          <Text className="border-gray-400 border-2 rounded  p-1  font-bold">Rating: {item.rating}</Text>
                        </View>
                        <View className="flex flex-row gap-2 pb-3">
                          <Text className="border-gray-400 border-2 rounded  p-1  font-bold">Total Ratings: {item.totalratings}</Text>
                          <Text className="border-gray-400 border-2 rounded  p-1  font-bold">Delivery: {item.delivery}</Text>
                        </View>
                        <Image source={{ uri: item.uri }} style={{ height: hp(20), objectFit: "contain" }}></Image>
                      </View>

                      {/* Right section */}
                      <View className="flex pr-4 ">
                        <TouchableOpacity>
                          <AntDesign name="edit" size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mt-5" onPress={() => deleteHandler(item._id)} >
                          <AntDesign name="delete" size={22} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>

                  })
                  :
                  <View className="flex-1  flex items-center justify-center" style={{ height: hp(50) }}>
                    <Text className="text-lg font-bold">No Item</Text>
                  </View>
              }
            </ScrollView>
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductScreen