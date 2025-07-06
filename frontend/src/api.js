import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"

const apiUrl = "https://note-app-backend-r6bq.onrender.com"
const api = axios.create({
  baseURL: apiUrl
  //baseURL: import.meta.env.VITE_API_URL // Uncomment this line if you want to use the environment variable
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api