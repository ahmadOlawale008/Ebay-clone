import axios, { AxiosError } from "axios"
import { getCookie, setCookie, deleteCookie } from "../utils/cookies"
import { toast } from "sonner"
export const baseURL = "http://127.0.0.1:8000/"
export const axiosInstance = axios.create({
    baseURL,
    timeout: 3000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})
export enum SignUpResponseErrors{
    SERVER_ERROR = "Error signing up user request. This might be due to server error"
}
axiosInstance.interceptors.request.use((config)=>{
    console.log("config: ", config)
    return config
}, (error)=>{
    console.log(error, "Request error")
})

axiosInstance.interceptors.response.use((res) => {
    console.log("Response received", res)
    return res
}, (error: AxiosError) => {
    if ((error.response?.status === 404 && error.response.statusText === "Not Found" )|| (error.message === "Network Error" && error.code === "ERR_NETWORK")) {
        toast.error("Server Error", { position: "bottom-center", duration: 2000, description: "Error signing up user request. This might be due to server error" })
        return
    }

    return Promise.reject(error)
})