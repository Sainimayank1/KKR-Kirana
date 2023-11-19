import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from '../../constants/style';
import { useNavigation } from '@react-navigation/native';

const SelectScreen = () => {

    const [selected,setSelected] = useState("admin");
    const navigate = useNavigation();

    const handleSubmit = async => 
    {
        if(selected == 'admin')
            navigate.replace("AdminStackNavigation");
        else    
            navigate.replace("AllScreen");
    }

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.blue }}>
            <StatusBar style="black" />
            {/* Upper conatiner*/}
            <View
                style={{ height: hp(5) }}
                className="p-7 flex items-center justify-center"
            >
                <Image
                    source={require("../../assests/logo-no-background.png")}
                    style={{ width: wp(30), height: wp(15), objectFit: "contain" }}
                ></Image>
            </View>

            <KeyboardAvoidingView
                style={{ height: hp(100) }}
                className="bg-white rounded-t-xl flex-1 items-center justify-center relative"
            >

                {/* select container */}
                <Text className="text-center text-2xl mb-10"> Select mode</Text>
                <View className="w-full flex flex-row items-center justify-around">
                    <TouchableOpacity onPress={()=>setSelected(selected == "admin" ? "user" : "admin")} className={selected == "admin" ? "flex flex-row items-center justify-around w-[40%] rounded-xl p-4 border-2 border-blue-100 " : "flex flex-row items-center justify-around w-[40%] rounded-xl p-4 border-2 border-gray-300"}>
                            <Text className={selected == "admin" ? "text-xl font-bold text-blue-400 " : "text-xl text-gray-300"}>Admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelected(selected == "admin" ? "user" : "admin")} className={selected == "user" ? "flex flex-row items-center justify-around w-[40%] rounded-xl p-4 border-2 border-blue-100 " : "flex flex-row items-center justify-around w-[40%] rounded-xl p-4 border-2 border-gray-300"}>
                            <Text className={selected == "user" ? "text-xl font-bold text-blue-400 " : "text-xl text-gray-300"}>User</Text>
                    </TouchableOpacity>
                </View>


                {/* Submit Btn conatiner */}
                <View className="border border-neutral-300 p-2 absolute bottom-0 w-full">
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="flex items-center justify-center p-2"
                        style={{ backgroundColor:colors.blue }}
                    >
                        <Text className="text-lg text-white">Continue</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default SelectScreen