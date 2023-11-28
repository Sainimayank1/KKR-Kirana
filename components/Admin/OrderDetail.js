import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import colors from '../../constants/style'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DeleteOrder, UpdateOrderStatus } from '../../api';


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


                        {/* Order status */}
                        {
                            type !== "userOrder"
                                ?
                                <View className="flex flex-row items-center justify-start">
                                    <Text>Status: </Text>
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
                                    <Text className="text-md">Status: <Text className=" font-extrabold" style={{color:status === "Pending" ? "blue" : status === 'Cancel' ? 'red' : 'green'}}>{status}</Text></Text>
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