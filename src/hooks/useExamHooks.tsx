import { useQuery } from "@tanstack/react-query"
import * as ExamService from "@/service/exam.service"

export const useExamHooks = () => {
  const queryExamAvailable = () =>
    useQuery({
      queryKey: ["exam", "examAvailable"],
      queryFn: () => ExamService.getExamAvailable(),
    })

  const queryModuleExamAvailable = (uuid?: string) =>
    useQuery({
      queryKey: ["exam", "moduleAvailable"],
      queryFn: () => ExamService.getModuleExamAvailable(uuid),
    })

  const queryGetExam = (uuid?: string) =>
    useQuery({
      queryKey: ["exam", "getExam"],
      queryFn: () => ExamService.getExamByUuid(uuid),
    })

  const queryActivityExam = (uuidExam?: string, uuidModule?: string) =>
    useQuery({
      queryKey: ["exam", "activityExamByModule"],
      queryFn: () => ExamService.getExamActivityByModule(uuidExam, uuidModule),
    })

  const queryStartExam = (uuidExam?: string, uuidModule?: string) =>
    useQuery({
      queryKey: ["exam", "startExam"],
      queryFn: () => ExamService.startExam(uuidExam, uuidModule),
    })

  const queryGetSoalExamByModule = (uuidModule?: string) =>
    useQuery({
      queryKey: ["exam", "soalExam"],
      queryFn: () => ExamService.getSoalExamByModule(uuidModule),
    })

  const queryGetRiwayatUjian = () =>
    useQuery({
      queryKey: ["exam", "riwayatExam"],
      queryFn: () => ExamService.getRiwayatUjian(),
    })

  return {
    queryExamAvailable,
    queryModuleExamAvailable,
    queryGetExam,
    queryActivityExam,
    queryStartExam,
    queryGetSoalExamByModule,
    queryGetRiwayatUjian,
  }
}
