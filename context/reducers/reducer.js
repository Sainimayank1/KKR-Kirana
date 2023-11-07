const initialState = {
  uri: "",
  deliveryType: "",
  cart: [],
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

    case "ADD_TO_CART":
      return () => {
        const isHave = state.cart.find((item) => item.id === action.payload.id);
        if (isHave) {
          isHave.quantity++;
        } else {
          state.cart.push({ ...action.payload, quantity: 1 });
        }
      }

    default:
      return state;
  }
};

export default allReducer;
