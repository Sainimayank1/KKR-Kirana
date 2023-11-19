import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserFromToken = async (token) => {
    if(token == undefined || token == null)
         token = await AsyncStorage.getItem("authToken");
    const data = await JWT.decode(token, "heymynameismayank!");
    return data;
};

export {getUserFromToken};