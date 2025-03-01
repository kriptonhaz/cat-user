import {
  EImagePosition,
  EAnswerShowingPosition,
  ESex,
  SelectOptions,
  EAnswerType,
  EIntroType,
} from "@/interfaces/global.interface"
import { UserType, UserRole, UserRegistrationForm } from "@/interfaces/user.interface"
import { EducationGrade } from "@/interfaces/education.interface"

export const sexOptions: SelectOptions<ESex>[] = [
  { label: "Laki-laki", value: ESex.Male },
  { label: "Perempuan", value: ESex.Female },
]

export const userTypeOptions: SelectOptions<UserType>[] = [
  { label: "Internal", value: UserType.Internal },
  { label: "Eksternal", value: UserType.External },
]

export const userRoleOptions: SelectOptions<UserRole>[] = [
  { label: "Admin", value: UserRole.Admin },
  { label: "Asesor", value: UserRole.Assesor },
  { label: "Pengguna", value: UserRole.User },
]

export const userRegistrationFormOptions: SelectOptions<UserRegistrationForm>[] = [
  { label: "Admin", value: UserRegistrationForm.Admin },
  { label: "Link Publik", value: UserRegistrationForm.PublicLink },
]

export const userActiveStatusOptions: SelectOptions<boolean>[] = [
  { label: "Aktif", value: true },
  { label: "Tidak Aktif", value: false },
]

export const educationGradeOptions: SelectOptions<EducationGrade>[] = [
  { label: "S3", value: EducationGrade.S3 },
  { label: "S2", value: EducationGrade.S2 },
  { label: "D4/S1", value: EducationGrade.D4_S1 },
  { label: "D3", value: EducationGrade.D3 },
  { label: "D2", value: EducationGrade.D2 },
  { label: "D1", value: EducationGrade.D1 },
  { label: "SMA/Setara", value: EducationGrade.SMA_Setara },
  { label: "SMP/Setara", value: EducationGrade.SMP_Setara },
  { label: "SD/Setara", value: EducationGrade.SD_Setara },
]

export const normScoringOperatorOptions: SelectOptions<string>[] = [
  { label: "<", value: "<" },
  { label: "<=", value: "<=" },
  { label: "=", value: "=" },
  { label: ">", value: ">" },
  { label: ">=", value: ">=" },
]
export const verticalImagePositionOptions: SelectOptions<EImagePosition>[] = [
  { label: "Atas", value: EImagePosition.Top },
  { label: "Bawah", value: EImagePosition.Bottom },
]

export const imagePositionOptions: SelectOptions<EImagePosition>[] = [
  { label: "Atas", value: EImagePosition.Top },
  { label: "Bawah", value: EImagePosition.Bottom },
  { label: "Kiri", value: EImagePosition.Left },
  { label: "Kanan", value: EImagePosition.Right },
]

export const answerShowingPositionOptions: SelectOptions<EAnswerShowingPosition>[] = [
  { label: "Vertical", value: EAnswerShowingPosition.Vertical },
  { label: "Horizontal", value: EAnswerShowingPosition.Horizontal },
]

export const answerTypeOptions: SelectOptions<EAnswerType>[] = [
  { label: "Pilihan ganda dengan 1 jawaban benar", value: EAnswerType.SingleChoice },
  { label: "Pilihan ganda dengan lebih dari 1 jawaban benar", value: EAnswerType.MultipleChoice },
  { label: "Free Text", value: EAnswerType.FreeText },
]

export const introTypeOptions: SelectOptions<EIntroType>[] = [
  { label: "Halaman Soal", value: EIntroType.QuestionPage },
  { label: "Instruksi", value: EIntroType.Instruction },
]
