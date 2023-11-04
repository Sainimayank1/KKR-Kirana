import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Camera from "../../components/camera";
import axios from "axios";
import { encode as base64 } from 'base-64';
import { useSelector } from "react-redux";


const HomeScreen = () => {
  const navigate = useNavigation();
  const {uri} = useSelector((state) => (state.reducer));
  
  return (
    <SafeAreaView className="flex-1" style={{}}>
       <StatusBar color="light" backgroundColor="white"></StatusBar>
      {/* Upper conatiner*/}
      <View
        style={{ height: hp(5), backgroundColor: colors.blue }}
        className="p-7 flex items-center justify-center"
      >
        <Image
          source={require("../../assests/logo-no-background.png")}
          style={{ width: wp(30), height: wp(15), objectFit: "contain" }}
        ></Image>
      </View>

      {/* Bottom Container */}
      <ScrollView>
        {/* Camera conatiner */}
        <Camera></Camera>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {uri && (
            <Image
              source={{ uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      <TouchableOpacity onPress={()=>navigate.push("Order Summary")}><Text>Btn</Text></TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;
