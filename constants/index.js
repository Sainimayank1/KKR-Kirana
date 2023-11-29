import JWT from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserFromToken = async (token) => {
    if (token == undefined || token == null)
        token = await AsyncStorage.getItem("authToken");
    const data = await JWT.decode(token, "heymynameismayank!");
    return data;
};

const AddToCart = async (item) => {
    let cart = await AsyncStorage.getItem("cart");
    if (!cart) {
        let newCart = [];
        newCart.push(item);
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
        return;
    }
    else {
        cart = JSON.parse(cart);
        let found = false;
        const newCart = cart.filter(cartItem => {
            if (cartItem._id === item._id) {
                cartItem.quantity++;
                found = true;
            }
            return cartItem;
        });
        if (!found) {
            newCart.push({ ...item, quantity: 1 });
        }
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    }
}

const DeleteFromCart = async (item) => {
    let cart = await AsyncStorage.getItem("cart");
    if (!cart) 
        return;
    else {
        cart = JSON.parse(cart);
        const newCart = cart.filter(cartItem => {
            if (cartItem._id === item._id && cartItem.quantity >= 1) 
                cartItem.quantity--;
            if((cartItem._id !== item._id) || (cartItem._id === item._id && cartItem.quantity >= 1))
                return cartItem;
        });
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    }
}

const RemoveFromCart = async (item) => {
    let cart = await AsyncStorage.getItem("cart");
    if (!cart) 
        return;
    else {
        cart = JSON.parse(cart);
        const newCart = cart.filter(cartItem => {
            if (cartItem._id !== item._id) 
                return cartItem;
        });
        console.log(newCart)
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    }
}




const FetchAllCart = async () => {
    let cart = await AsyncStorage.getItem("cart");
    return JSON.parse(cart);
}

const ClearCart = async () => await AsyncStorage.removeItem("cart");

export { getUserFromToken, AddToCart, FetchAllCart, ClearCart, DeleteFromCart, RemoveFromCart };