import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';
import { AddItemInCategory, DeleteItemInCategory, FetchCategoryItems, sendImage } from '../../api';
import Navbar from '../../components/Admin/Navbar';
import * as ImagePicker from "expo-image-picker";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from '@expo/vector-icons';


const CategoryScreen = () => {
    const [user, setUser] = useState({ name: "" });
    const [item, setItem] = useState("");
    const [selectedImg, setSelectedImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const navigate = useNavigation();

    useEffect(() => {
        const getItem = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const data = JWT.decode(token, "heymynameismayank!");
            setUser({ ...user, ...data.userId });
            await fetchItems();
        };
        getItem();
    }, [])


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

    const fetchItems = async () => {
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
            await fetchItems();
        }
        else {
            Alert.alert("Error", data);
        }
        setLoading(false);
    }


    const deleteHandler = async (_id) =>
    {
        setLoading(true);
        const resp = await DeleteItemInCategory({_id:_id});
        if(resp.status == 200)
        {
            Alert.alert("Success",resp.data.msg)
            await fetchItems();
        }
        console.log(resp);
        setLoading(false)
    }




    return (
        <SafeAreaView className="flex-1 relative">
            {/* Header */}
            <Navbar user={user} />


            {/* Adding items container */}
            <View className="w-full p-4 border-b-4 border-gray-300">
                <Text className="text-lg font-bold">Add Item</Text>

                {/* Name container */}
                <View className="flex pt-3 flex-row items-center w-full">
                    <Text className="flex">
                        Name:
                    </Text>
                    <TextInput className="flex-grow border border-gray-400  ml-2 p-1" value={item} onChangeText={(e) => setItem(e)}></TextInput>
                </View>

                {/* Select Image */}
                <View className="flex pt-3 flex-row items-center w-full">
                    <TouchableOpacity className="flex-grow border border-gray-400  ml-2 p-1" onPress={pickImage}><Text>Select Image</Text></TouchableOpacity>
                </View>

                {/* Uri container */}
                {/* <View  className="flex pt-3 flex-row items-center w-full">
                    <Text className="flex">
                        Uri:
                    </Text>
                    <TextInput className="border flex-grow border-gray-400  p-1 ml-2" value={item.uri} onChangeText={(e) => setItem({...item,uri:e})}></TextInput>
                </View> */}

                {/* submit btn */}
                <View className="pt-3">
                    <TouchableOpacity onPress={submitHandler} className="p-2 flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
                        <Text className="text-md font-bold text-white">{loading ? "loading..." : "Submit"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Down Conatiner */}
            {
                loading ?
                    <View className="flex-1 w-full flex h-full items-center justify-center" >
                        <ActivityIndicator size="large" color={colors.blue} />
                    </View>
                    :
                    <ScrollView className="flex-1">
                        {
                            category.length > 0 ?
                                category.map((item, key) => {
                                    return <View key={key} className="w-full bg-white p-3 flex-row flex items-start justify-around mt-3">
                                        {/* Left section */}
                                        <View className='w-[90%] flex gap-2'>
                                            <Text className="text-lg font-bold">{item.name}</Text>
                                            <Image source={{ uri: item.uri }} style={{ height: hp(20), objectFit: "contain" }}></Image>
                                        </View>

                                        {/* Right section */}
                                        <View className="flex pr-4 ">
                                            <TouchableOpacity>
                                                <AntDesign name="edit" size={22} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity className="mt-5" onPress={()=>deleteHandler(item._id)} >
                                                <AntDesign name="delete" size={22} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                })
                                :
                                <View className="flex-1 border flex items-center justify-center" style={{height:"100%"}}>
                                    <Text className="text-lg font-bold">No Item</Text>
                                </View>
                        }
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default CategoryScreen