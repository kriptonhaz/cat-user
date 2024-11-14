import {
  startExam,
  leftExamBeforeFinish,
  finishExam,
  submitJawaban,
  SubmitJawabanParams,
  updateExamActivity,
  IUpdateExamActivityParams,
} from "@/service/exam.service"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export function useExamMutation() {
  const navigate = useNavigate()

  const startExamMutation = () => {
    return useMutation({
      mutationKey: ["exam", "startExam"],
      mutationFn: async ({
        examUuid,
        moduleUuid,
        model,
        examToolUuid,
        examModelId,
      }: {
        examUuid: string
        moduleUuid: string
        model: string
        examToolUuid: string
        examModelId: number
      }) => {
        const result = await startExam(examUuid, moduleUuid, examModelId)
        return result
      },
      onSuccess: (data, variables, context) => {
        if (data) {
          if (variables.model === "TKK") {
            navigate(
              `/lembar-ujian-tkk/${variables.examUuid}/module/${variables.moduleUuid}/activity/${data.activity.Uuid}/model/${variables.model}/examTool/${variables.examToolUuid}`,
              {
                state: {
                  question_model_id: variables.examModelId,
                  question_model_uuid: variables.examToolUuid,
                },
              }
            )
          } else {
            navigate(
              `/lembar-ujian/${variables.examUuid}/module/${variables.moduleUuid}/activity/${data.activity.Uuid}/model/${variables.model}/examTool/${variables.examToolUuid}`,
              {
                state: {
                  question_model_id: variables.examModelId,
                  question_model_uuid: variables.examToolUuid,
                },
              }
            )
          }
        }
      },
    })
  }

  const updateExamActivityMutation = (params?: IUpdateExamActivityParams) => {
    return useMutation({
      mutationKey: ["exam", "updateExamActivity"],
      mutationFn: async (params: {
        last_question_filled: number
        last_question_subtest: string
        uuidActivity: string
        onSuccess?: () => void
      }) => {
        const result = await updateExamActivity(params)
        return result
      },
      onSuccess: (data, variables, context) => {
        if (variables?.onSuccess) {
          variables.onSuccess()
        }
      },
    })
  }

  const leftExamBeforeFinishMutation = () => {
    return useMutation({
      mutationKey: ["exam", "finishExamBeforeDone"],
      mutationFn: async ({ activityUuid }: { activityUuid: string }) => {
        await leftExamBeforeFinish(activityUuid)
      },
    })
  }

  const finishExamMutation = () => {
    return useMutation({
      mutationKey: ["exam", "finishExam"],
      mutationFn: async ({ activityUuid }: { activityUuid: string }) => {
        const finish = await finishExam(activityUuid)
        return finish
      },
      onSuccess: (data, variables, context) => {
        navigate(`/list-soal/${data.data.exam_uuid}`)
      },
    })
  }

  const submitJawabanMutation = (params?: SubmitJawabanParams) => {
    return useMutation({
      mutationKey: ["exam", "submitJawaban"],
      mutationFn: async ({ body }: { body: SubmitJawabanParams }) => {
        const finish = await submitJawaban({ body })
        return finish
      },
      onSuccess: (data, variables, context) => {
        if (params?.onSuccess) {
          params.onSuccess()
        }
      },
    })
  }

  return {
    startExamMutation,
    updateExamActivityMutation,
    leftExamBeforeFinishMutation,
    finishExamMutation,
    submitJawabanMutation,
  }
}
