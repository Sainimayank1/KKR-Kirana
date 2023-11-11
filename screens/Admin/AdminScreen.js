import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';
import { fetchAllOrders } from '../../api';


const AdminScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigation();



  const fetchOrders = async () => {
    setLoading(true);
    const data = await fetchAllOrders();
    if (data?.data?.data != undefined) {
      setOrders(data.data.data);
    }
    else {
      Alert.alert("Error", data);
    }
    setLoading(false);
  }


  useEffect(() => {
    const getItem = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const data = JWT.decode(token, "heymynameismayank!");
      setUser(data.userId);
      await fetchOrders();
    };
    getItem();
  }, [])



  const logout = async () => {
    await AsyncStorage.clear();
    navigate.replace("Login")
  }


  return (
    <SafeAreaView className="flex-1 relative">
      {/* Header */}
      <View className="w-full flex flex-row justify-between items-center p-5" style={{ backgroundColor: colors.blue }}>
        <Text className="text-lg ml-5 text-white">Admin Pannel</Text>
        <View className="flex flex-row items-center">
          {/* <Text className="text-md ml-5 text-white">Hello {user.name}</Text> */}
          <TouchableOpacity onPress={logout}><Text className="text-md ml-5 font-bold text-red-600">Logout</Text></TouchableOpacity>
        </View>
      </View>


      {/* Down Conatiner */}
      {
        loading ?
          <View className=" absolute flex-1 w-full flex h-full items-center justify-center" >
            <ActivityIndicator size="large" color={colors.blue} />
          </View>
          :
          <ScrollView className="flex-1">
            {
                orders.map((item,key)=>
                {
                  return <View key={key} className="w-full"></View>
                })
            }
          </ScrollView>
      }
    </SafeAreaView>
  )
}

export default AdminScreen