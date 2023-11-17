import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput, Image } from 'react-native'
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
  const [category, setCategory] = useState([]);
  const [selectedImg, setSelectedImg] = useState("");
  const [item, setItem] = useState({
    name: "",
    keyFeature: "",
    category: "",
    originalPrice: "",
    price: "",
    rating: "",
    delivery: "",
  });
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

  const fetchCategory = async () => {
    setLoading(true);
    const data = await FetchCategoryItems();
    if (data?.data?.data != undefined) {
      setCategory(data.data.data);
    }
    else {
      Alert.alert("Error", data);
    }
    setLoading(false);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (selectedImg === "") {
      Alert.alert("Error", "Please choose image");
      setLoading(false);
      return;
    }

    let image = await sendImage(selectedImg);
    if (image.code != 200) {
      Alert.alert("Error", "Something went wrong");
      setLoading(false);
      return;
    }

    const {url} = image
   
    const data = await AddProduct({...item,uri:url});
    if (data?.data?.msg != undefined) {
      Alert.alert("Succes", data.data.msg)
      await fetchProducts();
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
    fetchCategory();
  }, [])





  return (
    <SafeAreaView className="flex-1 relative">
      {/* Header */}
      <Navbar user={user} />


      {/* Add Product Conatiner */}
      <ScrollView>
        <View className="w-full p-4 border-b-4 border-gray-300">
          <Text className="font-bold text-lg">Add Product</Text>

          {/* Name container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Name:
            </Text>
            <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item.name} onChangeText={(e) => setItem({ ...item, name: e })}></TextInput>
          </View>

          {/* KeyFetaure container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Key Feature:
            </Text>
            <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item.keyFeature} onChangeText={(e) => setItem({ ...item, keyFeature: e })}></TextInput>
          </View>

          {/* Price container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Price:
            </Text>
            <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item.price} onChangeText={(e) => setItem({ ...item, price: e })}></TextInput>
          </View>

          {/* Original Price container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Original Price:
            </Text>
            <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item.originalPrice} onChangeText={(e) => setItem({ ...item, originalPrice: e })}></TextInput>
          </View>

          {/* Rating container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Rating:
            </Text>
            <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item.rating} onChangeText={(e) => setItem({ ...item, rating: e })}></TextInput>
          </View>

          {/* Delivery type container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Delivery type:
            </Text>
            <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item.delivery} onChangeText={(e) => setItem({ ...item, delivery: e })}></TextInput>
          </View>

          {/* Category container */}
          <View className="flex pt-3 flex-row items-center w-full">
            <Text className="flex">
              Category:
            </Text>
            {
              !loading &&
              <Picker
                className="w-full border"
                style={{ width: "90%" }}
                mode='dropdown'
                processColor={colors.blue}
                selectedValue={item.category}
                onValueChange={(itemValue, itemIndex) =>
                  setItem({ ...item, category: itemValue })
                }>
                {
                  category.map((item, ind) => <Picker.Item label={item.name} value={item.name} key={ind} />)
                }
              </Picker>
            }
          </View>

          {/* Select Image */}
          <View className="flex pt-3 flex-row items-center w-full">
            <TouchableOpacity className="flex-grow border border-gray-400  ml-2 p-1" onPress={pickImage}><Text>Select Image</Text></TouchableOpacity>
          </View>

          {/* submit btn */}
          <View className="pt-3">
            <TouchableOpacity onPress={submitHandler} className="p-2 flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
              <Text className="text-md font-bold text-white">{loading ? "loading..." : "Submit"}</Text>
            </TouchableOpacity>

          </View>
        </View>

        {
          loading ?
            <View className=" absolute flex-1 w-full flex h-full items-center justify-center" >
              <ActivityIndicator size="large" color={colors.blue} />
            </View>
            :
            <ScrollView className="flex-1">
              {
                products.length > 0 ?
                  products.map((item, key) => {
                    {/* console.log(item) */}
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