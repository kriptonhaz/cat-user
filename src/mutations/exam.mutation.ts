import { startExam, leftExamBeforeFinish, finishExam } from "@/service/exam.service"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export function useExamMutation() {
  const navigate = useNavigate()

  const startExamMutation = () => {
    return useMutation({
      mutationKey: ["exam", "startExam"],
      mutationFn: async ({ examUuid, moduleUuid }: { examUuid: string; moduleUuid: string }) => {
        const result = await startExam(examUuid, moduleUuid)
        return result
      },
      onSuccess: (data, variables, context) => {
        if (data) {
          navigate(`/lembar-ujian/${variables.examUuid}/module/${variables.moduleUuid}/activity/${data.activity.Uuid}`)
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

  return { startExamMutation, leftExamBeforeFinishMutation, finishExamMutation }
}
