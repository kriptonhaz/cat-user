import { API_URL } from "@/constants/api"
import useTokenStore from "@/store/token.store"
import axios from "axios"
import API from "./base.service"
import { LoginForm, LoginFormResponse } from "@/interfaces/auth.interface"

export const submitLoginForm = async (payload: LoginForm): Promise<LoginFormResponse> => {
  const { data } = await API().request<LoginFormResponse>({
    url: "/v1/cat+apps/login",
    method: "POST",
    data: payload,
  })

  if (data.code === 200) {
    const profile = await axios.get(`${API_URL}/v1/cat+apps/profile`, {
      headers: {
        Authorization: `Bearer ${data.data.token}`,
      },
    })

    localStorage.setItem("nip", profile.data.data.nip)
    localStorage.setItem("name", data.data.full_name)
    localStorage.setItem("gender", profile.data.data.sex === 1 ? "Laki - laki" : "Perempuan")
  }

  return data
}
