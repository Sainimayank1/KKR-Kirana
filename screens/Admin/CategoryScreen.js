import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';
import { DeleteItemInCategory, FetchCategoryItems } from '../../api';
import Navbar from '../../components/Admin/Navbar';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from '@expo/vector-icons';


const CategoryScreen = () => {
    const [user, setUser] = useState({ name: "" });
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

    const deleteHandler = async (_id) => {
        setLoading(true);
        const resp = await DeleteItemInCategory({ _id: _id });
        if (resp.status == 200) {
            Alert.alert("Success", resp.data.msg)
            await fetchItems();
        }
        setLoading(false)
    }


    return (
        <SafeAreaView className="flex-1 relative">
            {/* Header */}
            <Navbar user={user} />


            {/* Upper side || Add Category */}
            <TouchableOpacity onPress={() => navigate.push("Add Item")} className=" mt-2" >
                <Text className="p-3 m-3 text-white text-center" style={{ backgroundColor: colors.blue }}>Add Item</Text>
            </TouchableOpacity>


            {/* Down Conatiner */}
            {
                loading ?
                    <View className="flex-1 w-full flex h-full items-center justify-center" >
                        <ActivityIndicator size="large" color={colors.blue} />
                    </View>
                    :
                    <ScrollView className="flex-1"
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={async() => {
                                    await fetchItems();
                                }}
                            />
                        }>
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
        </SafeAreaView>
    )
}

export default CategoryScreen