import { View, Text,TouchableOpacity, StyleSheet , Button, Image, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native'
import colors from '../constants/style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Camera from '../components/camera';

const HomeScreen = () => {
  const navigate = useNavigation();
  return (
  <SafeAreaView className="flex-1" style={{  }}>
    <StatusBar style="black" />
      {/* Upper conatiner*/}
      <View
        style={{ height: hp(5) ,backgroundColor: colors.blue}}
        className="p-7 flex items-center justify-center"
      >
        <Image
          source={require("../assests/logo-no-background.png")}
          style={{ width: wp(30), height: wp(15), objectFit: "contain" }}
        ></Image>
      </View>


      {/* Bottom Container */}
      <ScrollView>

      {/* Camera conatiner */}
      <Camera></Camera>
      </ScrollView>
  </SafeAreaView>
  )
}

export default HomeScreen