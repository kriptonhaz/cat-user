import API from "./base.service"
import {
  IBannerPublicResponse,
  IContentPublicRespose,
  IFaqPublicResponse,
  IScheduleTestPublicResponse,
} from "@/interfaces/cms.interface"

export const getBannerPublic = async (): Promise<IBannerPublicResponse> => {
  const { data } = await API().request<IBannerPublicResponse>({
    url: "/v1/banner/public",
    method: "GET",
  })

  return data
}

export const getContentPublic = async (): Promise<IContentPublicRespose> => {
  const { data } = await API().request<IContentPublicRespose>({
    url: "/v1/home+content/public",
    method: "GET",
  })

  return data
}

export const getFaqPublic = async (): Promise<IFaqPublicResponse> => {
  const { data } = await API().request<IFaqPublicResponse>({
    url: "/v1/faq/public",
    method: "GET",
  })

  return data
}

export const getScheduleTestPublic = async (): Promise<IScheduleTestPublicResponse> => {
  const { data } = await API().request<IScheduleTestPublicResponse>({
    url: "/v1/public-exam",
    method: "GET",
  })

  return data
}
