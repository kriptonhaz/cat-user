import { useQuery } from "@tanstack/react-query"
import * as ExamService from "@/service/exam.service"

export const useExamHooks = () => {
  const queryExamAvailable = () =>
    useQuery({
      queryKey: ["exam", "available"],
      queryFn: () => ExamService.getExamAvailable(),
    })

  const queryModuleExamAvailable = (uuid?: string) =>
    useQuery({
      queryKey: ["moduleExam", "available"],
      queryFn: () => ExamService.getModuleExamAvailable(uuid),
    })

  const queryGetExam = (uuid?: string) =>
    useQuery({
      queryKey: ["exam", "getExam"],
      queryFn: () => ExamService.getExamByUuid(uuid),
    })

  return { queryExamAvailable, queryModuleExamAvailable, queryGetExam }
}
