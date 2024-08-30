import { useQuery } from "@tanstack/react-query"
import * as ExamService from "@/service/exam.service"

export const useExamHooks = () => {
  const queryExamAvailable = () =>
    useQuery({
      queryKey: ["exam", "available"],
      queryFn: () => ExamService.getExamAvailable(),
    })

  return { queryExamAvailable }
}
