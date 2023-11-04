import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Card3By2 = ({ data, type }) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={()=>{navigation.push("ProductDetail")}}
      className="flex flex-col border border-gray-200 rounded-md items-center justify-around mt-4 overflow-hidden px-1 py-2 space-y-2"
      style={{ width: wp(30), height: wp(40) }}
    >
      {/* Image Container */}
      <View className="w-[100%] h-[70%] relative ">
        <Image
          source={data.uri}
          className="w-[100%] h-[100%] "
          style={{ objectFit: "contain" }}
        ></Image>

        {/* Rating section */}
        {type === "suggested" && (
          <View className="absolute rounded-sm bottom-0 left-0 bg-green-600 px-1 py-0.5">
            <Text className="text-white font-[900] text-xs">{data.rating} <AntDesign name="star" size={10} color="white" /></Text>
          </View>
        )}
      </View>

      {/* sponsored KeyFeature section  */}
      {type === "sponsored" && (
        <Text className="text-md">
          {data.keyFeature.length > 12
            ? data.keyFeature.slice(0, 12) + ".."
            : data.keyFeature}
        </Text>
      )}

      {/* sponsored Price section */}
      {type === "sponsored" && (
        <Text className="font-[900] text-md">Just ₹{data.price}</Text>
      )}

      {/* suggested Name Section */}
      {type === "suggested" && (
        <Text className="text-xs">
          {data.name.length > 15 ? data.name.slice(0, 12) + ".." : data.name}
        </Text>
      )}

      {/* suggested Price section */}
      {type === "suggested" && (
        <Text>
          <Text className="line-through text-gray-400 text-xs">
            {data.originalPrice}
          </Text>
          <Text className="text-xs font-bold"> ₹{data.price}</Text>
        </Text>
      )}

      {/* suggested Price section */}
      {type === "suggested" && (
        <Text className="font-bold text-xs">{data.delivery} delivery</Text>
      )}
    </Pressable>
  );
};

export default Card3By2;
