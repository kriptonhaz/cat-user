import { MutationParams } from "./global.interface"

export interface LoginForm {
  username: string
  password: string
}

export interface LoginFormResponse {
  code: number
  data: {
    id: number
    uuid: string
    username: string
    full_name: string
    email: string
    role: number
    token: string
  }
  message: string
}

export type LoginMutationParams = MutationParams<LoginFormResponse, LoginForm>

export interface IJwtToken {
  id: number
  uuid: string
  username: string
  password: string
  full_name: string
  email: string
  role: number
  exp: number
}

export interface ICaptchaResponse {
  imageData: Blob
  headers: {
    token: string
    xToken: string
  }
}

export interface IParamCaptchaVerify {
  captcha: string
  Token: string
}

export interface IVerifyCaptchaResponse {
  code: number
  data: null
  message: string
}
