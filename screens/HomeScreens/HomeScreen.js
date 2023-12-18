import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../../constants/style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Camera from "../../components/camera";
import { useSelector } from "react-redux";
import Card3By2 from "../../components/Card3By2";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FetchCategoryItems } from "../../api";
import CategoryContainer from "../../components/CategoryContainer";


const HomeScreen = () => {
  const navigate = useNavigation();
  const { uri } = useSelector((state) => (state.reducer));
  const [Catgory, setCategory] = useState({ productsCatgory: [], productsCatgoryLoader: false });
  const [fourCatgory, setfourCategory] = useState({ fourproductsCatgory: [], fourproductsCatgoryLoader: false });


  useFocusEffect(
    useCallback(() => {
      fetchCategory();
    }, [])
  );


  const fetchCategory = async () => {
    setCategory({ ...Catgory, productsCatgoryLoader: true });
    setfourCategory({ ...fourCatgory, fourproductsCatgoryLoader: true });
    const data = await FetchCategoryItems();
    if (data?.data?.data != undefined) {
      setCategory({ ...Catgory, productsCatgory: data.data.data });
      let items = data.data.data.slice(0, 4).map(i => {
        return i;
      });
      setfourCategory({ ...fourCatgory, fourproductsCatgory: items });
    }
    else {
      Alert.alert("Error", data);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white" style={{}}>
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

      {/* Scrool Container */}
      <ScrollView className='bg-white'>

        {/* Search Coantiner */}
        <TouchableOpacity className="flex-row items-center justify-between px-2 py-1 space-x-5" onPress={()=>navigate.push("Page not available")}>
          {/*Search Area*/}
          <View className="flex-1 flex flex-row space-x-2 items-center justify-between border border-gray-300 bg-neutral-100 p-1 rounded-md">
            <View className="flex flex-row space-x-2 items-center">
              <MaterialIcons name="search" size={20} color="gray" />
              <Pressable>
                <TextInput
                  className="text-neutral-500"
                  placeholder="Search for products"
                  style={{ fontSize: 12 }}
                ></TextInput>
              </Pressable>
            </View>
            <View className="flex flex-row space-x-2 items-center">
              <Ionicons name="ios-mic-outline" size={18} color="gray" />
              <Feather name="camera" size={18} color="gray" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Camera conatiner */}
        <Camera></Camera>

        {/* Catogry scrollview */}
        {
          Catgory.productsCatgoryLoader ?
            <View className="p-10">
              <ActivityIndicator size="large" color={colors.blue} />
            </View> :
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              className="mt-2 flex-1 flex-wrap flex-row  h-full border-b-4 border-gray-300 bg-white"

            >
              {Catgory.productsCatgory.map((item, index) => {
                return (<Pressable
                  key={index}
                  className="items-center justify-center  h-full"
                  style={{ height: wp(25), width: wp(20) }}
                  onPress={()=>navigate.push("Products Screen",{category:item})}
                >
                  <Image
                    className="h-[50%] w-[65%] rounded-full bg-blue-100 object-contain "
                    source={{ uri: item.uri }}
                  ></Image>
                  <Text className="font-bold w-full text-center text-[10px]">
                    {item?.name?.length >= 8
                      ? item?.name?.slice(0, 6) + " .."
                      : item.name}
                  </Text>
                </Pressable>);
              }
              )}
            </ScrollView>
        }


        {
          fourCatgory.fourproductsCatgoryLoader ?
            <View className="p-10">
              <ActivityIndicator size="large" color={colors.blue} />
            </View> :
            <View>
              {
                fourCatgory.fourproductsCatgory.map((item, index) => {
                  return (<CategoryContainer item={item} index={index} key={index} />);
                })
              }
            </View>
        }
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;
