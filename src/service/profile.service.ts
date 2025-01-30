import { IProfileResponse } from "@/interfaces/profile.interface"
import API from "./base.service"

export const getProfile = async (): Promise<IProfileResponse> => {
  const { data } = await API().request<IProfileResponse>({
    url: "/v1/cat+apps/profile",
    method: "GET",
  })

  return data
}

export const submitVerified = async (): Promise<IProfileResponse> => {
  const { data } = await API().request<IProfileResponse>({
    url: "/v1/verify+me",
    method: "PUT",
  })

  return data
}

export const submitRevision = async (): Promise<IProfileResponse> => {
  const { data } = await API().request<IProfileResponse>({
    url: "/v1/revised+me",
    method: "PUT",
  })

  return data
}
