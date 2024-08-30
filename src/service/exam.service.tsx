import {
  IExamAvailableResponse,
  IModuleExamAvailableResponse,
  IModuleGetExamResponse,
} from "@/interfaces/exam.interface"
import API from "./base.service"

export const getExamAvailable = async (): Promise<IExamAvailableResponse> => {
  const { data } = await API().request<IExamAvailableResponse>({
    url: "/v1/cat+apps/exam/available",
    method: "GET",
  })

  return data
}

export const getModuleExamAvailable = async (uuid?: string): Promise<IModuleExamAvailableResponse> => {
  const { data } = await API().request<IModuleExamAvailableResponse>({
    url: `/v1/cat+apps/exam/module/${uuid}`,
    method: "GET",
  })

  return data
}

export const getExamByUuid = async (uuid?: string): Promise<IModuleGetExamResponse> => {
  const { data } = await API().request<IModuleGetExamResponse>({
    url: `/v1/cat+apps/exam/${uuid}`,
    method: "GET",
  })

  return data
}
