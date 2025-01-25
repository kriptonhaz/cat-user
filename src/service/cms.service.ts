import API from "./base.service"
import { IBannerPublicResponse, IContentPublicRespose } from "@/interfaces/cms.interface"

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
