import { API_URL } from "@/constants/api"
import axios from "axios"
import API from "./base.service"
import {
  ICaptchaResponse,
  IParamCaptchaVerify,
  IVerifyCaptchaResponse,
  LoginForm,
  LoginFormResponse,
} from "@/interfaces/auth.interface"

export const submitLoginForm = async (payload: LoginForm): Promise<LoginFormResponse> => {
  const { data } = await API().request<LoginFormResponse>({
    url: "/v1/cat+apps/login",
    method: "POST",
    data: payload,
  })

  if (data.code === 200) {
    const profile = await axios.get(`${import.meta.env.VITE_API_URL}/v1/cat+apps/profile`, {
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

export const getCaptcha = async (): Promise<ICaptchaResponse> => {
  const response = await API().request({
    url: "/v1/captcha/generate",
    method: "GET",
    responseType: "blob",
  })

  const token = response.headers["token"]
  const xToken = response.headers["x-token"]

  return {
    imageData: response.data,
    headers: {
      token,
      xToken,
    },
  }
}

export const verifyCaptcha = async (props: IParamCaptchaVerify): Promise<IVerifyCaptchaResponse> => {
  const { data } = await API().request<IVerifyCaptchaResponse>({
    url: "/v1/captcha/verify",
    method: "POST",
    data: {
      captcha: props.captcha,
    },
    headers: {
      Token: props.Token,
    },
  })

  return data
}
