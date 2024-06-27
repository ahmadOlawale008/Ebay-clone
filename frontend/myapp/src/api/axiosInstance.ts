import axios, { AxiosError } from "axios"
import { getCookie, setCookie, deleteCookie } from "../utils/cookies"
export const baseURL = process.env.REACT_API_BASE_URL
export const axiosInstance = axios.create({
    baseURL,
    headers: {
        // Authorization: ""
    }
})
axiosInstance.interceptors.request.use((res) => {
    return res
}, (error: AxiosError) => {

})