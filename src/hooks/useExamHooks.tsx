import { useQuery } from "@tanstack/react-query"
import * as ExamService from "@/service/exam.service"
import { setRiwayatUjianParams } from "@/pages/riwayat-ujian"

export const useExamHooks = () => {
  const queryExamAvailable = () =>
    useQuery({
      queryKey: ["exam", "examAvailable"],
      queryFn: () => ExamService.getExamAvailable(),
    })

  const queryModuleExamAvailable = (uuid?: string) =>
    useQuery({
      queryKey: ["exam", "moduleAvailable", uuid],
      queryFn: () => ExamService.getModuleExamAvailable(uuid),
      enabled: !!uuid,
    })

  const queryGetExam = (uuid?: string) =>
    useQuery({
      queryKey: ["exam", "getExam", uuid],
      queryFn: () => ExamService.getExamByUuid(uuid),
      enabled: !!uuid,
    })

  const queryActivityExam = (uuidExam?: string, uuidModule?: string) =>
    useQuery({
      queryKey: ["exam", "activityExamByModule", uuidExam, uuidModule],
      queryFn: () => ExamService.getExamActivityByModule(uuidExam, uuidModule),
      enabled: !!uuidExam && !!uuidModule,
    })

  const queryStartExam = (uuidExam?: string, uuidModule?: string) =>
    useQuery({
      queryKey: ["exam", "startExam", uuidExam, uuidModule],
      queryFn: () => ExamService.startExam(uuidExam, uuidModule),
      enabled: !!uuidExam && !!uuidModule,
    })

  const queryGetSoalExamByModule = (uuidModule?: string) =>
    useQuery({
      queryKey: ["exam", "soalExam", uuidModule],
      queryFn: () => ExamService.getSoalExamByModule(uuidModule),
      enabled: !!uuidModule,
    })

  const queryGetRiwayatUjian = (params: setRiwayatUjianParams) =>
    useQuery({
      queryKey: ["exam", "riwayatUjian", params],
      queryFn: () => ExamService.getRiwayatUjian(params),
    })

  const queryGetTimerUjian = ({ model, examUuid }: { model?: string; examUuid?: string }) =>
    useQuery({
      queryKey: ["exam", "timerUjian", model, examUuid],
      queryFn: () => ExamService.getTimerUjian({ model, examUuid }),
      enabled: !!model && !!examUuid,
    })

  const queryGetQuestionResponseByActivity = (activityUuid?: string) =>
    useQuery({
      queryKey: ["exam", "questionResponseByActivity", activityUuid],
      queryFn: () => ExamService.getQuestionResponseByActivity(activityUuid),
      enabled: !!activityUuid,
    })

  const queryGetInstructionByTestModule = (testModule: string) =>
    useQuery({
      queryKey: ["exam", "instruction", testModule],
      queryFn: () => ExamService.getInstructionByTestModule(testModule),
      enabled: !!testModule,
    })

  return {
    queryExamAvailable,
    queryModuleExamAvailable,
    queryGetExam,
    queryActivityExam,
    queryStartExam,
    queryGetSoalExamByModule,
    queryGetRiwayatUjian,
    queryGetTimerUjian,
    queryGetQuestionResponseByActivity,
    queryGetInstructionByTestModule,
  }
}
