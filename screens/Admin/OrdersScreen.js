import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';
import { fetchAllOrders } from '../../api';
import Navbar from '../../components/Admin/Navbar';
import { getUserFromToken } from '../../constants';
import OrderDetail from '../../components/Admin/OrderDetail';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OrdersScreen = () => {
  const [user, setUser] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

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
      const data = getUserFromToken(undefined);
      setUser({ ...user, ...data.userId });
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
          <ScrollView className="flex-1" refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchOrders}
            />
          }>
            {
              orders.length > 0 ?
                orders.map((item, key) => {
                  return <OrderDetail item={item} index={key} fetchOrders={fetchOrders} />
                })
                :
                <View className="flex items-center justify-center w-[100%]" style={{ height: hp(90) }}>
                  <Text className="text-xl font-bold ">No Order.</Text>
                </View>
            }
          </ScrollView>
      }
    </SafeAreaView>
  )
}

export default OrdersScreen