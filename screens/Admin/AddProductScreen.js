import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import colors from '../../constants/style';
import { AddProduct, FetchCategoryItems, sendImage } from '../../api';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddProductScreen = () => {
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
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [ImageName,setImageName] = useState("Select Image");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageName(result.assets[0].uri)
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

    const { url } = image

    const data = await AddProduct({ ...item, uri: url });
    if (data?.data?.msg != undefined) {
      Alert.alert("Succes", data.data.msg)
    }
    else {
      console.log(data)
      Alert.alert("Error", "something went wrong");
    }
    setLoading(false);
  }

  const fetchCategory = async () => {
    setLoading(true);
    const data = await FetchCategoryItems();
    if (data?.data?.data != undefined) {
      setCategory(data.data.data);
      setItem({ ...item, category: data.data.data[0].name })
    }
    else {
      console.log(data)
      Alert.alert("Error", "something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await fetchCategory();
    })();
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 relative flex-1">
        <ScrollView>
          {/* Name container */}
          <View className="relative pb-4 mt-2">
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Name:
            </Text>
            <TextInput style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" value={item.name} onChangeText={(e) => setItem({ ...item, name: e })}>
            </TextInput>
          </View>

          {/* KeyFetaure container */}
          <View className="relative pb-4">
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Key Feature:
            </Text>
            <TextInput style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" value={item.keyFeature} onChangeText={(e) => setItem({ ...item, keyFeature: e })}></TextInput>
          </View>

          {/* Price container */}
          <View className="relative pb-4">
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Price:
            </Text>
            <TextInput style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" value={item.price} onChangeText={(e) => setItem({ ...item, price: e })}></TextInput>
          </View>

          {/* Original Price container */}
          <View className="relative pb-4">
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Original Price:
            </Text>
            <TextInput style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" value={item.originalPrice} onChangeText={(e) => setItem({ ...item, originalPrice: e })}></TextInput>
          </View>

          {/* Rating container */}
          <View className="relative pb-4">
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Rating:
            </Text>
            <TextInput style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" value={item.rating} onChangeText={(e) => setItem({ ...item, rating: e })}></TextInput>
          </View>

          {/* Delivery type container */}
          <View className="relative pb-4">
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Delivery type:
            </Text>
            <TextInput style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" value={item.delivery} onChangeText={(e) => setItem({ ...item, delivery: e })}></TextInput>
          </View>

          {/* Category container */}
          <View className="relative pb-4" style={{
            borderColor: colors.blue,
            borderWidth: 2,
            borderRadius: 5,
          }}>
            <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
              Category:
            </Text>
            {
              !loading &&
              <Picker
                style={{
                  borderColor: colors.blue,
                  borderWidth: 2,
                  borderRadius: 5,
                }} 
                className="flex py-2 px-3 w-full"
                mode='dropdown'
                processColor={colors.blue}
                selectedValue={item.category}
                onValueChange={(itemValue, itemIndex) => {
                  setItem({ ...item, category: itemValue })
                }
                }>
                {
                  category.map((item, ind) => <Picker.Item label={item.name} value={item.name} key={ind} />)
                }
              </Picker>
            }
          </View>

          {/* Select Image */}
          <View className="relative pb-4 pt-4">
            <TouchableOpacity style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" onPress={pickImage}><Text style={{ color: colors.blue }}>{ImageName}</Text></TouchableOpacity>
          </View>

         {/* Image container */}
         {
          !!selectedImg &&
          <View className="relative border border-gray-400 m-2 p-1 flex items-center justify-center mb-5">
            <TouchableOpacity className="absolute top-0 right-0" onPress={() => {setSelectedImg(""),setImageName("Select Image")}}><Entypo name="cross" size={30} color="black" /></TouchableOpacity>
            <Image style={{ width: wp(85), height: hp(50), objectFit: "contain" }} source={{ uri: selectedImg }}></Image>
          </View>
        }

        </ScrollView>

        {/* submit btn */}
        <View className="absolute bottom-0 w-full flex items-center justify-center" style={{ width: wp(100) }}>
          <TouchableOpacity onPress={submitHandler} className="w-[95%] p-2 flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
            <Text className="text-md font-bold text-white">{loading ? "loading..." : "Submit"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddProductScreen