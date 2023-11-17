import axios from "axios";
import { encode as base64 } from "base-64";

// Keys
const baseUrl = "https://kkr-kirana.onrender.com";
const CLOUD_NAME = "dqefnr7tr";
const API_KEY = "885932821376173";
const API_SECRET = "Ivkpu1zNS9lfGYETGlY-Gncdkow";

export const apiCall = async (endpoint, method, data) => {
  if (method == "POST") {
    try {
      const resp = await axios.post(endpoint, data);
      return resp;
    } catch (error) {
      return error.response.data.msg;
    }
  } else {
    try {
      const resp = axios.get(endpoint);
      return resp;
    } catch (error) {
      return error.response.data.msg;
    }
  }
};

export const sendImage = async (uri) => {
  const formData = new FormData();
  formData.append("file", {
    uri,
    type: "image/jpeg",
    name: "upload.jpg",
  });
  formData.append("upload_preset", "KKR-Kirana");

  const apiKeySecret = `${API_KEY}:${API_SECRET}`;
  const apiKeySecretBase64 = base64(apiKeySecret);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${apiKeySecretBase64}`,
        },
      }
    );

    return {title:"Success",msg:"Image uploaded!", url:response.data.secure_url,code:200}
  } catch (error) {
    return {title:"Error",msg : "Something went wrong during image uploading",error,code:400};
  }
};

export const postLogin = async (data) => {
  const endPoint = baseUrl + "/login";
  return await apiCall(endPoint, "POST", data);
};

export const postRegister = async (data) => {
  const endPoint = baseUrl + "/register";
  return await apiCall(endPoint, "POST", data);
};

export const addAdress = async (data) => {
  const endPoint = baseUrl + "/addAddress";
  return await apiCall(endPoint, "POST", data);
};

export const fetchAddress = async (data) => {
  const endPoint = baseUrl + "/addressFetcher";
  return await apiCall(endPoint, "POST", data);
};

export const orderByImage = async (data) => {
  const endPoint = baseUrl + "/orderByImage";
  return await apiCall(endPoint, "POST", data);
};

export const fetchAllOrders = async () => {
  const endPoint = baseUrl + "/getAllOrder";
  return await apiCall(endPoint, "GET");
};

export const AddItemInCategory = async (data) => {
  const endPoint = baseUrl + "/addCategoryItems";
  return await apiCall(endPoint, "POST" , data);
};

export const FetchCategoryItems = async () => {
  const endPoint = baseUrl + "/fetchAllCategory";
  return await apiCall(endPoint, "GET");
};

export const DeleteItemInCategory = async (data) => {
  const endPoint = baseUrl + "/deleteCategoryItem";
  return await apiCall(endPoint, "POST" , data);
};

export const AddProduct = async (data) => {
  const endPoint = baseUrl + "/addProduct";
  return await apiCall(endPoint, "POST" , data);
};

export const FetchAllProducts = async () => {
  const endPoint = baseUrl + "/fetchAllProducts";
  return await apiCall(endPoint, "GET");
};

export const DeleteProduct = async (data) => {
  const endPoint = baseUrl + "/deleteProduct";
  return await apiCall(endPoint, "POST" , data);
};