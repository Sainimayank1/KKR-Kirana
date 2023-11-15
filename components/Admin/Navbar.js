import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../constants/style'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const Navbar = ({user}) => {
    
    const navigate = useNavigation();
    const logout = async () => {
        await AsyncStorage.clear();
        navigate.replace("Login")
    }

  return (
    <View className="w-full flex flex-row justify-between items-center p-5" style={{ backgroundColor: colors.blue }}>
        <Text className="text-lg ml-5 text-white">Admin Pannel</Text>
        <View className="flex flex-row items-center">
          <Text className="text-md ml-5 text-white">Hello {user.name}</Text>
          <TouchableOpacity onPress={logout}><Text className="text-md ml-5 font-bold text-red-600">Logout</Text></TouchableOpacity>
        </View>
      </View>
  )
}

export default Navbar