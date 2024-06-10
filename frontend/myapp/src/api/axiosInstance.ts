import axios, { AxiosError } from "axios"
export const baseURL = process.env.REACT_API_BASE_URL
export const axiosInstance = axios.create({
    baseURL,
})
axiosInstance.interceptors.request.use((res)=>{
    return res
}, (error: AxiosError)=>{
    
})