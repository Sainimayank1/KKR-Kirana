import { View, Text,TouchableOpacity, StyleSheet , Button} from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigate = useNavigation();
  return (
  <View className="bg-white">
      <Button onPress={()=>navigate.push("CameraScreen")} title='Camera'></Button>
  </View>
  )
}

export default HomeScreen