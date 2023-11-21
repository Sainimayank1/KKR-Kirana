import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import colors from '../../constants/style';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DeleteProduct, UpdateProductDetails } from '../../api';

const SingleProduct = ({ item, index }) => {
    const [product, setProduct] = useState({ ...item });
    const [loading, setLoading] = useState(false);

    const updateHandler = async () => {
        setLoading(true);
        const data = await UpdateProductDetails(product);
        if(data.status == 200)
        {
            Alert.alert("Success","Update Successfully")
        }
        else
        {
            Alert.alert("Error","Something went wrong");
        }
        setLoading(false);
    }

    const deleteHandler = async () => {
        setLoading(true);
        const data = await DeleteProduct({_id:product._id});
        if(data.status == 200)
        {
            Alert.alert("Success","Delete Successfully")
        }
        else
        {
            Alert.alert("Error","Something went wrong");
        }
        setLoading(false);
    }

    return (<View className="border-b-8 border-gray-300 p-4 gap-2 flex items-center justify-center" key={index + 2000}>
        <Text className="text-lg font-bold pb-2" style={{ color: colors.blue }}>Product :{item.name}</Text>
        <View>
            <View className="relative pb-2 w-full" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Name
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.name} onChangeText={(e) => setProduct({ ...product, name: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.name}</Text> */}
            </View>
            <View className="relative pb-2 w-full" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Key Feature
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.keyFeature} onChangeText={(e) => setProduct({ ...product, keyFeature: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.keyFeature}</Text> */}
            </View>
            <View className="relative pb-2 w-full" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Price
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.price} onChangeText={(e) => setProduct({ ...product, price: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.price}</Text> */}
            </View>
            <View className="relative pb-2 w-full" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Original Price
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.originalPrice} onChangeText={(e) => setProduct({ ...product, originalPrice: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.originalPrice}</Text> */}
            </View>
            <View className="relative pb-2 w-full" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Rating
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.rating} onChangeText={(e) => setProduct({ ...product, rating: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.rating}</Text> */}
            </View>
            <View className="relative pb-2" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Delivery
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.delivery} onChangeText={(e) => setProduct({ ...product, delivery: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.delivery}</Text> */}
            </View>
            <View className="relative pb-2 w-full" style={{ width: wp(90) }}>
                <Text style={{ color: colors.blue }} className="absolute bg-white left-3 -top-2 z-10 px-1">
                    Category
                </Text>
                <TextInput style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full" value={product.category} onChangeText={(e) => setProduct({ ...product, category: e })}></TextInput>
                {/* <Text style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                }} className="flex py-2 px-3 w-full">{product.category}</Text> */}
            </View>
        </View>
        <Image source={{ uri: item.uri }} style={{ width: wp(70), height: hp(30), objectFit: "contain" }}></Image>
        <View className="w-full flex flex-row items-center justify-around">
            <TouchableOpacity onPress={() => {
                Alert.alert(
                    '',
                    'Are you sure you want to delete?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK', onPress: async () => await deleteHandler() },
                    ],
                    { cancelable: false }
                )
            }} className="bg-red-400 w-[49%] flex items-center justify-center p-1">
                <Text className="text-white text-lg font-bold">{loading ? "Loading..." : "Delete"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={updateHandler} className="bg-green-400 w-[49%] flex items-center justify-center p-1">
                <Text className="text-white text-lg font-bold">{loading ? "Loading..." : "Update"}</Text>
            </TouchableOpacity>
        </View>
    </View>);
}

export default SingleProduct