import {
    View,
    Text,
    Dimensions,
    Platform,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/style";

var { height, width } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const SearchScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [Result, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSearchData = async () => {
        setLoading(true);
        const data = await fetchSearchData(search)
        setResults(data.results)
        setLoading(false)
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            {/* // SearchBar */}
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full">
                <TextInput onChangeText={(value) => setSearch(value)}
                    placeholder="Search Product"
                    placeholderTextColor={"gray"}
                    className="pb-1 pl-6 flex-1 font-semibold text-base text-neutral-800 tracking-wider"
                ></TextInput>

                <TouchableOpacity
                    className="rounded-full p-3 m-1 "
                    style={{backgroundColor:colors.blue}}
                >
                    <Text className="text-white">Search</Text>
                </TouchableOpacity>
            </View>

            {/* // Results  */}
            {loading ? (
                <View className="flex-1">
                    <ActivityIndicator size="large" color={colors.blue}></ActivityIndicator>
                </View>
            ) : Result.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className="space-y-3"
                >
                    <Text className="font-semibold text-white ml-1">
                        Results({Result.length})
                    </Text>
                    <View className="flex-row flex-wrap justify-between">
                        {Result.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate("Product Screen", { productDetail: item });
                                    }}
                                >
                                    <View className="space-y-2 mb-4 rounded-xl">

                                        <Text className="text-neutral-700 ml-1">
                                            {item.original_title.length > 27
                                                ? item.original_title.slice(0, 22) + "...."
                                                : item.original_title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </ScrollView>
            ) : (
                <View className="flex-row justify-center">

                </View>
            )}
        </SafeAreaView>
    );
};

export default SearchScreen;