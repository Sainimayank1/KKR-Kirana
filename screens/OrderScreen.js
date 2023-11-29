import { View, Text, Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { getUserFromToken } from '../constants'
import { useState } from 'react'
import { FetchAllUserOrders } from '../api'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../constants/style'
import OrderDetail from '../components/Admin/OrderDetail'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      const data = await getUserFromToken();
      setUser(data);
      await fetchallorder(data);
      setLoading(false);
    }
    getItem();
  }, [])


  const fetchallorder = async () => {
    const item = await FetchAllUserOrders({ _id: user?.userId?._id });
    if (item.status == 200)
      setOrders(item.data.data);
    else
      Alert.alert("Error", "Something went wrong");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView refreshControl={
           <RefreshControl refreshing={loading} onRefresh={fetchallorder} />
      } 
      className="bg-white -mt-10">
        {
          loading ? <View className="flex-1 w-full h-full flex items-center justify-center" style={{width:wp(100),height:hp(90)}}>

          <ActivityIndicator size="large" color={colors.blue}></ActivityIndicator> 
          </View>
          :
            orders.length > 0 ? 
            orders.map((item,key)=>
            {
                return <OrderDetail item={item} key={key} fetchOrders={fetchallorder} type="userOrder" />
            })
            :
            <View className="flex-1 items-center justify-center" style={{height:hp(90)}}>
                <Text>No orders</Text>
            </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrderScreen