import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';
import { fetchAllOrders } from '../../api';
import Navbar from '../../components/Admin/Navbar';


const OrdersScreen = () => {
  const [user, setUser] = useState({name:""});
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
      setUser({...user,...data.userId});
      await fetchOrders();
    };
    getItem();
  }, [])



  


  return (
    <SafeAreaView className="flex-1 relative">
      {/* Header */}
      <Navbar user={user} />


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

export default OrdersScreen