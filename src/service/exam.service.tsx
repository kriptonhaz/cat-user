import {
  IExamAvailableResponse,
  IModuleExamAvailableResponse,
  IModuleGetExamResponse,
  IExamActivityResponse,
  IExamStartResponse,
  IExamFinishBeforeDoneResponse,
  ISoalExamByModuleResponse,
  IExamFinishResponse,
  IRiwayatExamResponse,
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

export const getExamActivityByModule = async (
  uuidExam?: string,
  uuidModule?: string
): Promise<IExamActivityResponse> => {
  const { data } = await API().request<IExamActivityResponse>({
    url: `/v1/cat+apps/exam/activity/by+exam/${uuidExam}/and+module/${uuidModule}`,
    method: "GET",
  })

  return data
}

export const startExam = async (
  uuidExam?: string,
  uuidModule?: string
): Promise<{ activity: IExamActivityResponse["data"]; startExam: IExamStartResponse } | void> => {
  const allowedToResumeExamStage = [1, 2, 3, 4]

  const activity = (await getExamActivityByModule(uuidExam, uuidModule)).data

  if (allowedToResumeExamStage.includes(activity.activity_stage)) {
    ///hit redoing test
    const { data } = await API().request<IExamStartResponse>({
      url: `/v1/cat+apps/exam/activity/redoing/${activity.Uuid}`,
      method: "PUT",
    })

    return {
      activity,
      startExam: data,
    }
  } else if (activity.activity_stage === 0) {
    //hit start test
    const { data } = await API().request<IExamStartResponse>({
      url: `/v1/cat+apps/exam/activity/start/${activity.Uuid}`,
      method: "PUT",
    })

    return {
      activity,
      startExam: data,
    }
  } else {
    alert("Ujian sudah selesai !")
  }
}

export const leftExamBeforeFinish = async (activityUuid?: string): Promise<IExamFinishBeforeDoneResponse> => {
  const { data } = await API().request<IExamFinishBeforeDoneResponse>({
    url: `/v1/cat+apps/exam/activity/logged+out/${activityUuid}`,
    method: "PUT",
  })

  return data
}

export const finishExam = async (activityUuid?: string): Promise<IExamFinishResponse> => {
  const { data } = await API().request<IExamFinishResponse>({
    url: `/v1/cat+apps/exam/activity/finish/${activityUuid}`,
    method: "PUT",
  })

  return data
}

export const getSoalExamByModule = async (uuidModule?: string): Promise<ISoalExamByModuleResponse> => {
  const { data } = await API().request<ISoalExamByModuleResponse>({
    url: `/v1/cat+apps/exam/question/by+module/${uuidModule}`,
    method: "GET",
  })

  return data
}

export const getRiwayatUjian = async (): Promise<IRiwayatExamResponse> => {
  const { data } = await API().request<IRiwayatExamResponse>({
    url: "/v1/cat+apps/exam/passed",
    method: "GET",
  })

  return data
}
