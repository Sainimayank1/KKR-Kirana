import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fetch6productsUsingCategory } from '../api';
import { AntDesign } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from '../constants/style';
import Card3By2 from './Card3By2';
import { useNavigation } from '@react-navigation/native';

const CategoryContainer = ({ item, index }) => {
    const navigate = useNavigation();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getItem = async () => {
            setLoading(true);
            const data = await Fetch6productsUsingCategory({ category: item.name });
            if (data.status == 200) {
                setProducts(data.data.data);
            }

            setLoading(false);
        }

        getItem();
    }, []);


    return (<View>
        {
            products.length > 0 ?
                <View className="p-3 border-b-4 border-gray-300 space-y-5" key={index} >
                    <View>
                        {/* Ttile & Icon */}
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-md font-[900] pb-2">{item.name}</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: colors.blue }}
                                className="p-[2px] rounded-full flex items-center justify-center"
                                onPress={()=>navigate.push("Products Screen",{category:item})}
                            >
                                <AntDesign name="right" size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                        {
                            loading ?
                                <ActivityIndicator size="large" color={colors.blue} style={{ height: hp(30) }}></ActivityIndicator>
                                :
                                <View className="flex flex-wrap flex-row space-y-4 space-x-4 items-center justify-around">
                                    {products &&
                                        products.map((data, index) => {
                                            return <Card3By2 type="suggested" data={data} key={index} />;
                                        })}
                                </View>
                        }
                    </View>
                </View >
                :
                <View></View>
        }
    </View>);

}

export default CategoryContainer