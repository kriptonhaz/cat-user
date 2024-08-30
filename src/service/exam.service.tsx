import { IExamAvailableResponse } from "@/interfaces/exam.interface"
import API from "./base.service"

export const getExamAvailable = async (): Promise<IExamAvailableResponse> => {
  const { data } = await API().request<IExamAvailableResponse>({
    url: `/v1/cat+apps/exam/available`,
    method: "GET",
  })

  return data
}
