import { useSelector } from "react-redux"

export const AddImage = (val) => ({
    type: 'ADD_IMAGE_URI',
    payload: val
})

export const RemoveImage = () => ({
    type: 'REMOVE_IMAGE_URI'
})


export const DeliveryType = (val) => ({
    type: 'ADD_DELIVERY_TYPE',
    payload: val
})

export const RemoveDeliveryType = () => ({
    type: 'REMOVE_DELIVERY_TYPE'
})

export const AddDeliveryAddress  = (val) => ({
    type:'ADD_DELIVERY_ADDRESS',
    payload: val
})

export const RemoveDeliveryAddress  = () => ({
    type:'REMOVE_DELIVERY_ADDRESS'
})

export const AddToCart = "ADD_TO_CART";
