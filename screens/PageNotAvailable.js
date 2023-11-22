import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../constants/style'

const PageNotAvailable = () => {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
        <View className='flex flex-row items-center justify-center w-[30%]'>
            <Text className="text-2xl font-bold mr-2" style={{color:colors.blue}}>
                Sorry
            </Text>
            <Text  className="font-bold">
                Currently, This page is not available.
            </Text>
        </View>
    </SafeAreaView>
  )
}

export default PageNotAvailable