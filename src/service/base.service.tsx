import useTokenStore from "@/store/token.store"
import axios, { AxiosInstance } from "axios"
import { jwtDecode } from "jwt-decode"
import { IJwtToken } from "@/interfaces/auth.interface"

type CATAPIParams = {
  cookie?: string
}

let API: AxiosInstance

const setupAPIClient = () => {
  API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  API.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        console.error(
          JSON.stringify({
            name: "[cat-api][error]",
            detail: error.response?.data,
          })
        )
      } else {
        console.error("[error]", error)
      }

      return Promise.reject(error)
    }
  )
}

export const initialize = (params?: CATAPIParams, anonymous?: boolean): AxiosInstance => {
  // always create new axios instance when cookie changed
  if (params?.cookie || !API || anonymous) {
    setupAPIClient()
  }

  // add auth header
  const tokenStore = useTokenStore.getState()
  API.interceptors.request.use(
    // @ts-ignore
    async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      const accessToken = tokenStore.accessToken
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken) as IJwtToken
        const dateNow = Math.floor(new Date().getTime() / 1000)
        if (dateNow > decodedToken.exp) {
          tokenStore.setAccessToken("")
          tokenStore.setIsLogin(false)
        } else {
          if (config.headers) {
            config.headers["Authorization"] = `Bearer ${accessToken}`
          }
        }
      }
      return config
    }
  )

  return API
}

export default initialize
