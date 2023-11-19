import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/style'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from 'expo-jwt';

const SplashScreen = () => {
  const navigation = useNavigation();

  setTimeout(()=>
  {
    const checkUser = async () => {
      const resp = await AsyncStorage.getItem("authToken");
      if(resp)
      {
        const data = JWT.decode(resp,"heymynameismayank!");
        if(data.userId.isAdmin)
          navigation.replace("Select Screen");
        else
          navigation.replace("AllScreen");
      }
      else
        navigation.replace("Login");
    }
    checkUser();

  },2000)

  return (
    <SafeAreaView className="flex-1 flex items-center justify-around" style={{backgroundColor:colors.blue}}>
      <View className="w-full h-[90%] items-center justify-center ">
        <Image source={require("../../assests/logo-no-background.png")}  style={{width:wp(70),objectFit:"contain"}}></Image>
      </View>
      <View>
        <Text className="text-white">Version: 1.0.2</Text>
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen