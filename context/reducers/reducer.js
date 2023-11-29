const initialState = {
  uri: "",
  deliveryType: "",
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

    default:
      return state;
  }
};

export default allReducer;
