import { View, Text , Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const MainCarasoul = ({data,screen}) => {
  const height = screen === 'home' ? hp(30) : hp(70);
  return (
    <View style={{ height }} className="flex-1">
          <SwiperFlatList
            autoplay
            autoplayDelay={10}
            autoplayLoop
            index={2}
            // showPagination
            data={data}
            paginationStyleItem={{}}
            renderItem={({ item , index}) => (
              <View
                style={{ width: wp(100), height }}
                className="mt-2 justify-center flex-1 items-center"
                key={index}
              >
                <Image
                  style={{ width: wp(100), height , objectFit:"contain"}}
                  source={item.uri}
                  key={index}
                ></Image>
              </View>
            )}
          />
        </View>
  )
}

export default MainCarasoul