import { View, Text } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const Highlights = ({data}) => {
  return (
    <View className="text-xs flex flex-wrap">
    {
      data.map((item,index)=>
      {
          return <View className="flex items-center flex-row">
          <Entypo name="dot-single" size={12} color="black" className="flex items-center flex-row"/>
          <Text key={index} >{item}</Text>
          </View>
      })
    }
    </View>
  )
}

export default Highlights