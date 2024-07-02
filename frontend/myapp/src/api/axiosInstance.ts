import axios, { AxiosError } from "axios"
import { getCookie, setCookie, deleteCookie } from "../utils/cookies"
import { toast } from "sonner"
export const baseURL = "http://127.0.0.1:8000/"
export const axiosInstance = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json"
        // Authorization: ""
    }
})

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
    if (error.hasOwnProperty("code") && error.code === "ERR_NETWORK") {
        toast.error("Network error occured.", { position: "bottom-center", duration: 2000, description: "Error signing up user request. This might be due to server error" })

    }
    if (error.response?.status === 404 && error.response.statusText === "Not Found") {
        toast.error("Server Error", { position: "bottom-center", duration: 2000, description: "Error signing up user request. This might be due to server error" })
    }
    return Promise.reject(error)
})