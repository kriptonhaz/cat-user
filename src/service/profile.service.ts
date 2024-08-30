import { IProfileResponse } from "@/interfaces/profile.interface"
import API from "./base.service"

export const getProfile = async (): Promise<IProfileResponse> => {
  const { data } = await API().request<IProfileResponse>({
    url: `/v1/cat+apps/profile`,
    method: "GET",
  })

  return data
}
