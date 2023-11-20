import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import colors from '../../constants/style';
import { AddItemInCategory, sendImage } from '../../api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddCategoryScreen = () => {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [ImageName,setImageName] = useState("Select Image");


  const submitHandler = async () => {
    setLoading(true);
    if (selectedImg === "") {
      Alert.alert("Error", "Please choose image");
      return;
    }

    let uri = await sendImage(selectedImg);
    if (uri.code != 200) {
      Alert.alert("Error", "Something went wrong");
      return;
    }
    const data = await AddItemInCategory({ name: item, uri: uri.url });
    if (data?.data?.msg != undefined) {
      Alert.alert("Succes", data.data.msg)
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
      setImageName(result.assets[0].uri)
      setSelectedImg(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4 border-b-4 border-gray-300 flex-1 relative" >
        {/* Name container */}
        <View className="relative pb-4 mt-2">
          <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
            Name:
          </Text>
          <TextInput style={{
            borderColor: colors.blue,
            borderWidth: 2,
            borderRadius: 5,
          }} className="flex py-2 px-3 w-full" value={item} onChangeText={(e) => setItem(e)}></TextInput>
        </View>

        {/* Select Image */}
        <View className="relative pb-4 pt-4">
          <TouchableOpacity style={{
              borderColor: colors.blue,
              borderWidth: 2,
              borderRadius: 5,
            }} className="flex py-2 px-3 w-full" onPress={pickImage}><Text  style={{ color: colors.blue }}>{ImageName}</Text></TouchableOpacity>
        </View>

        {/* Image container */}
        {
          !!selectedImg &&
          <View className="relative border border-gray-400 m-2 p-1 flex items-center justify-center">
            <TouchableOpacity className="absolute top-0 right-0" onPress={() => {setSelectedImg(""),setImageName("Select Image")}}><Entypo name="cross" size={30} color="black" /></TouchableOpacity>
            <Image style={{ width: wp(85), height: hp(50), objectFit: "contain" }} source={{ uri: selectedImg }}></Image>
          </View>
        }

        {/* submit btn */}
        <View className="absolute bottom-0 flex items-center justify-center " style={{ width: wp(100) }}>
          <TouchableOpacity onPress={submitHandler} className="p-3 w-[95%] flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
            <Text className="text-md font-bold text-white">{loading ? "loading..." : "Submit"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddCategoryScreen