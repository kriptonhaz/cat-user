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
  ITimerUjianResponse,
  ISubmitAnswerResponse,
  IQuestionResponseByActivityResponse,
  IQuestionInstructionByModuleResponse,
  ITkkDataResponse,
} from "@/interfaces/exam.interface"
import API from "./base.service"
import { setRiwayatUjianParams } from "@/pages/riwayat-ujian"

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

export interface IUpdateExamActivityParams {
  last_question_filled: number
  last_question_subtest: string
  uuidActivity: string
  onSuccess?: () => void
}

export const updateExamActivity = async (params: IUpdateExamActivityParams): Promise<IExamActivityResponse> => {
  const { data } = await API().request<IExamActivityResponse>({
    url: `/v1/cat+apps/exam/activity/${params.uuidActivity}`,
    method: "PUT",
    data: params,
  })

  return data
}

export const startExam = async (
  uuidExam?: string,
  uuidModule?: string,
  examModelId?: number
): Promise<{ activity: IExamActivityResponse["data"]; startExam: IExamStartResponse } | void> => {
  const allowedToResumeExamStage = [1, 2, 3, 4]

  const activity = (await getExamActivityByModule(uuidExam, uuidModule)).data

  if (allowedToResumeExamStage.includes(activity.activity_stage)) {
    ///hit redoing test
    console.log("Redoing")
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

export interface SubmitJawabanParams {
  activity_id: number
  activity_uuid: string
  question_model_id: number
  question_model_uuid: string
  question_id: number
  question_uuid: string
  question_order: number
  user_response_content: string
  user_response_value: number
  user_response_at_second: number
  total_consume_time: number
  onSuccess?: () => void
}

export const submitJawaban = async ({ body }: { body: SubmitJawabanParams }): Promise<ISubmitAnswerResponse> => {
  const { data } = await API().request<ISubmitAnswerResponse>({
    url: "/v1/cat+apps/exam/question/response",
    method: "POST",
    data: body,
    // data: {
    //   "activity_id": body.activity_id,
    //   "activity_uuid": body.activity_uuid,
    //   "question_model_id": body.question_model_id,
    //   "question_model_uuid": body.question_model_uuid,
    //   "question_id": body.question_id,
    //   "question_uuid": body.question_uuid,
    //   "question_order": body.question_order,
    //   "user_response_content": body.user_response_content,
    //   "user_response_value": body.user_response_value,
    //   "user_response_at_second": body.user_response_at_second,
    //   "total_consume_time": body.total_consume_time
    // }
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

export const getRiwayatUjian = async (params: setRiwayatUjianParams): Promise<IRiwayatExamResponse> => {
  const { data } = await API().request<IRiwayatExamResponse>({
    url: `/v1/cat+apps/exam/passed?page=${params.page}&per_page=${params.per_page}`,
    method: "GET",
  })

  return data
}

export const getTimerUjian = async ({
  model,
  examUuid,
}: {
  model?: string
  examUuid?: string
}): Promise<ITimerUjianResponse> => {
  const { data } = await API().request<ITimerUjianResponse>({
    url: `/v1/cat+apps/exam/model/by+tool/${model}/and+model/${examUuid}`,
    method: "GET",
  })

  return data
}

export const getDataTkk = async ({
  model,
  examUuid,
}: {
  model?: string
  examUuid?: string
}): Promise<ITkkDataResponse> => {
  const { data } = await API().request<ITkkDataResponse>({
    url: `/v1/cat+apps/exam/model/by+tool/${model}/and+model/${examUuid}`,
    method: "GET",
  })

  return data
}

export const getQuestionResponseByActivity = async (
  activityUuid?: string
): Promise<IQuestionResponseByActivityResponse> => {
  const { data } = await API().request<IQuestionResponseByActivityResponse>({
    url: `/v1/cat+apps/exam/question/response/by+activity/${activityUuid}`,
    method: "GET",
  })

  return data
}

export const getInstructionByTestModule = async (testModule: string): Promise<IQuestionInstructionByModuleResponse> => {
  const { data } = await API().request<IQuestionInstructionByModuleResponse>({
    url: `/v1/cat+apps/exam/instruction/${testModule}`,
    method: "GET",
  })

  return data
}
