const initialState = {
  uri: "",
  deliveryType: "",
  cart: [],
  deliveryAddress: {}
};

const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_IMAGE_URI":
      return { ...state, uri: action.payload };

    case "REMOVE_IMAGE_URI":
      return { ...state, uri: "" };

    case "ADD_DELIVERY_TYPE":
      return { ...state, deliveryType: action.payload };

    case "REMOVE_DELIVERY_TYPE":
      return { ...state, deliveryType: "" };

    case "ADD_DELIVERY_ADDRESS":
      return { ...state, deliveryAddress: action.payload };

    case "REMOVE_DELIVERY_ADDRESS":
      return { ...state, deliveryAddress: {} };

    case "ADD_TO_CART":
      return {...state, cart: (() => {
        const isHave = state.cart.find((item) => item._id === action.payload._id);
        if (isHave) {
          isHave.quantity++;
        } else {
          state.cart.push({ ...action.payload, quantity: 1 });
        }
        return state.cart
      })()
    }

    default:
      return state;
  }
};

export default allReducer;
