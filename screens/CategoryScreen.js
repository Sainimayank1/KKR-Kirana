import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../constants/style";
import { FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FetchCategoryItems } from "../api";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const [Catgory, setCategory] = useState({ productsCatgory: [], productsCatgoryLoader: false });
  const navigate = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchCategory();
    }, [])
  );


  const fetchCategory = async () => {
    setCategory({ ...Catgory, productsCatgoryLoader: true });
    const data = await FetchCategoryItems();
    if (data?.data?.data != undefined) {
      setCategory({ ...Catgory, productsCatgory: data.data.data });
    }
    else {
      Alert.alert("Error", data);
    }
    // setCategory({ ...Catgory, productsCatgoryLoader: false });
  }
  return (
    <SafeAreaView className="h-full">
      <StatusBar backgroundColor={colors.blue} style="light"></StatusBar>
      {/* Upper conatiner */}
      <View
        className=" p-2 justify-between flex flex-row items-center"
        style={{ backgroundColor: colors.blue }}
      >
        {/* Left side */}
        <Text className="text-white text-lg">All Categories</Text>

        {/* Right side */}
        <View className="flex flex-row space-x-5">
          <TouchableOpacity onPress={()=>navigate.push("Page not available")}>
            <FontAwesome name="search" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate.push("Page not available")}>
            <FontAwesome name="microphone" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Down container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        className="flex-1 bg-white"
      >
        {/* Product conatiner */}
        {
          Catgory.productsCatgoryLoader ?
            <View className="h-full p-10 flex items-center justify-center" style={{height:hp(90)}}>
              <ActivityIndicator size="large" color={colors.blue}></ActivityIndicator>
            </View> :
            <View className="flex-1 flex flex-row flex-wrap justify-center">
              {/* Product map */}
              {Catgory.productsCatgory.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    className="items-center justify-center "
                    style={{ height: wp(28), width: wp(25) }}
                    onPress={()=>navigate.push("Products Screen",{category:item})}
                  >
                    <Image
                      className="h-[60%] w-[70%] rounded-full bg-blue-100 object-contain "
                      style={{ objectFit: "contain" }}
                      source={{ uri: item.uri }}
                    ></Image>
                    <Text className=" w-full text-center text-md">
                      {item?.name?.length >= 10
                        ? item?.name?.slice(0, 9) + " .."
                        : item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
