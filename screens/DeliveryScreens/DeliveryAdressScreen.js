import { View, Text, TouchableOpacity, ScrollView,RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/style";
import { useNavigation } from "@react-navigation/native";
import { fetchAddress } from "../../api";
import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { AddDeliveryAddress } from "../../context/actions/action";

const DeliveryAdressScreen = () => {
  const [delivery, setDelivery] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigation();
  const [selected,setSelected] = useState(0);
  const [Loading,setLoading] = useState(false);
  const disptach = useDispatch();

  const getItem = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const data = JWT.decode(token,"heymynameismayank!");
    return data.userId._id;
  };

  useEffect(()=>{
    dataFetcher();
  },[])

  

  const dataFetcher = async () =>
  {
     setRefreshing(true);
     setLoading(true);
     let id = await getItem();
     const data = await fetchAddress({userId:id});
     if(data.status == 200)
      setDelivery(data.data.data);
     setLoading(false);
     setRefreshing(false);
  }


  const SummaryHandler = async () =>
  {
      if(selected == 0)
      {
        Alert.alert("Error","Please select address");
        return;
      }
      disptach(AddDeliveryAddress(selected));
      navigate.push("Order Summary")
  }

  


  return (
    <SafeAreaView className="flex-1 relative">
      {/* //   Upper container */}

      <TouchableOpacity className="m-0 top-[-20] w-full flex-row items-center p-3 bg-white border-2 border-gray-200 ">
        <Entypo name="plus" size={20} color={colors.blue} />
        <Text className="text-lg ml-2" style={{ color: colors.blue }} onPress={() => navigate.push("Add delivery address")}>
          Add a new address
        </Text>
      </TouchableOpacity>

      {/* Middle part */}
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={dataFetcher} />
        }>
      {!!delivery && delivery.map((data, key) => {
        return <TouchableOpacity onPress={()=>setSelected(data)} className={selected._id == data._id ? "w-full  bg-white p-4 mb-1  border border-blue-300" : "w-full border border-white  bg-white p-4 mb-1 "} key={key}>
          <View>{!!data.name && <Text  className="font-bold text-md">{data.name}</Text>}</View>
          <View><Text>{!!data.landmark && <Text>{data.landmark} </Text>}{!!data.houseNo && <Text>,{data.houseNo} </Text>}{!!data.city && <Text>,{data.city} </Text>}{!!data.state && <Text>,{data.state} </Text>}{!!data.postalCode && <Text>,{data.postalCode} </Text>}</Text></View>
          <View>{!!data.mobileNo && <Text  className="font-bold text-md">{data.mobileNo}</Text>}</View>
        </TouchableOpacity>;
      })}
      </ScrollView>

      {/* Down Conatiner */}
      <TouchableOpacity className="absolute bottom-0 w-full p-4 flex items-center justify-center" style={{ backgroundColor: colors.orange }} onPress={SummaryHandler}>
        <Text className="font-bold text-lg text-white">{Loading ? "Loading..." : "DELIVERY HERE"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeliveryAdressScreen;
