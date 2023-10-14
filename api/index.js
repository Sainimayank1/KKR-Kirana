import axios from "axios"


const baseUrl = "https://kkr-kirana.onrender.com"
export const apiCall = async (endpoint,method,data) =>
{
    if(method == "POST")
    {
        try {
            const resp = await axios.post(endpoint,data);
            return resp
        } catch (error) {
            return error.response.data.msg
        }
    }
    else
    {
        try {
            const resp = axios.get(endpoint);
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }
}

export const postLogin = async (data) =>
{
    const endPoint = baseUrl+"/login";
    return await apiCall(endPoint,"POST",data)
}

export const postRegister = async (data) =>
{
    const endPoint = baseUrl+"/register";
    return await apiCall(endPoint,"POST",data);
}