import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import colors from '../../constants/style'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DeleteOrder, UpdateOrderStatus } from '../../api';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';


const OrderDetail = ({ item, key, fetchOrders, type = 'adminOrder' }) => {
    const [status, setStatus] = useState(item.orderStatus);
    const [loading, setLoading] = useState(false);


    const deleteHandler = async () => {
        setLoading(true);
        const data = await DeleteOrder({ _id: item._id });
        if (data.status == 200) {
            Alert.alert("Success", "Order delete successfully");
            await fetchOrders();
        }
        else
            Alert.alert("Error", "Something went wrong");
        setLoading(false);
    }

    const updateHandler = async () => {
        setLoading(true);
        const data = await UpdateOrderStatus({ _id: item._id, status: status });
        if (data.status == 200)
            Alert.alert("Success", "Status update successfully");
        else
            Alert.alert("Error", "Something went wrong");
        setLoading(false);
    }

    return (
        <View key={key} className=" bg-white p-4 pb-2 w-full border-b-4  border-gray-300">
            {/* Uppere name and mobile number container */}
            {
                loading ?
                    <ActivityIndicator size='large' color={colors.blue}></ActivityIndicator>
                    :
                    <View>
                        <View className="flex gap-1">
                            <Text className="text-lg font-bold">Name: {item.userName}</Text>
                            <Text>{item.phoneNumber}</Text>
                            <Text>Delivery type:{item.deliveryMethod}</Text>
                            {
                                item.deliveryMethod == "Home" &&
                                <Text className="font-bold">
                                    Delivery Address:
                                    {!!item.shippingAddress.houseNo && <Text>,{item.shippingAddress.houseNo} </Text>}
                                    {!!item.shippingAddress.landmark && <Text>{item.shippingAddress.landmark} </Text>}
                                    {!!item.shippingAddress.city && <Text>,{item.shippingAddress.city} </Text>}
                                    {!!item.shippingAddress.state && <Text>,{item.shippingAddress.state} </Text>}
                                    {!!item.shippingAddress.postalCode && <Text>,{item.shippingAddress.postalCode} </Text>}
                                </Text>
                            }
                        </View>

                        {/* Image conatiner */}
                        {
                            !!item.imageUri &&
                            <Image source={{ uri: item.imageUri }} style={{ height: hp(40), objectFit: "contain" }}>

                            </Image>
                        }

                        {/* Cart conatiner */}
                        <View>
                            {
                                item.products.length > 0 && item.products.map((cartItem, index) => {
                                    return (
                                        <View key={index}>
                                            <View key={index} className="p-2 gap-1">
                                                {/* Upper part */}
                                                <View className="flex-1 flex-row space-x-2">
                                                    {/* Left side */}
                                                    <View
                                                        className="p-1"
                                                        style={{ width: wp(25), height: wp(25) }}
                                                    >
                                                        {/* Image container */}
                                                        <Image
                                                            source={{ uri: cartItem.uri }}
                                                            style={{ objectFit: "contain" }}
                                                            className="w-full h-[100%]"
                                                        ></Image>
                                                    </View>

                                                    {/* Right side */}
                                                    <View className="space-y-2">
                                                        {/* Name of product */}
                                                        <Text>
                                                            {cartItem?.name.length > 40
                                                                ? cartItem?.name.slice(0, 40) + "..."
                                                                : cartItem?.name}
                                                        </Text>

                                                        {/* Category */}
                                                        <Text>{cartItem.category}</Text>

                                                        {/* Price discount */}
                                                        <View className=" flex-1 flex-row space-x-2">
                                                            <Text className="font-bold">₹{cartItem.price}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                {/* Middle one */}
                                                <View className="flex flex-row">
                                                    {/* {item?.delivery && (
                                                        <View className="p-2">
                                                            <Text className="text-green-700">
                                                                {item?.delivery === "Free"
                                                                    ? item?.delivery
                                                                    : "₹" + item.delivery}{" "}
                                                                Delivery
                                                            </Text>
                                                        </View>
                                                    )} */}
                                                    <View className="border border-gray-100 p-0 pl-2 pr-2 items-center justify-center">
                                                        <Text className='text-xs text-gray-600'>Qty :{cartItem.quantity}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </View>


                        {/* Order status */}
                        {
                            type !== "userOrder"
                                ?
                                <View className="flex flex-row items-center justify-start">
                                    <Text className="">Status: </Text>
                                    <Picker
                                        className="w-full border"
                                        style={{ width: "40%" }}
                                        mode='dropdown'
                                        processColor={colors.blue}
                                        selectedValue={status}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setStatus(itemValue)
                                        }
                                    >
                                        <Picker.Item label="Pending" value="Pending" />
                                        <Picker.Item label="Cancel" value="Cancel" />
                                        <Picker.Item label="Complete" value="Complete" />
                                    </Picker>
                                </View>
                                :
                                <View className="flex flex-row items-center justify-start">
                                    <Text className="text-lg">Status: <Text className=" font-extrabold" style={{ color: status === "Pending" ? "blue" : status === 'Cancel' ? 'red' : 'green' }}>{status}</Text></Text>
                                </View>
                        }

                        {/* Btn container */}
                        {
                            type !== "userOrder"
                            &&
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
                                    <Text className="text-white text-lg font-bold">Delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={updateHandler} className="bg-green-400 w-[49%] flex items-center justify-center p-1">
                                    <Text className="text-white text-lg font-bold">Update</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
            }
        </View>
    )
}

export default OrderDetail