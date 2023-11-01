const initialState = {
  uri: "",
};

const uriReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_IMAGE_URI":
      return { ...state, uri: action.payload };

    case "REMOVE_IMAGE_URI":
      return { ...state, uri: "" };

    default:
      return state;
  }
};

export default uriReducer;
