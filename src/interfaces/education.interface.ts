import { ApiResponse, MutationParams } from "./global.interface"

export enum EducationGrade {
  S3 = "S3",
  S2 = "S2",
  D4_S1 = "D4/S1",
  D3 = "D3",
  D2 = "D2",
  D1 = "D1",
  SMA_Setara = "SMA/Setara",
  SMP_Setara = "SMP/Setara",
  SD_Setara = "SD/Setara",
}

export interface Education {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: null
  uuid: string
  user_id: number
  user_uuid: string
  title: string
  grade: EducationGrade
  major: string
}

export interface FormCreateEducation {
  user_id: number
  user_uuid: string
  title: string
  grade: EducationGrade
  major: string
}

export interface CreateEducationResponse extends ApiResponse {
  data: Education
}

export interface CreateEducationMutationParams extends MutationParams<CreateEducationResponse, FormCreateEducation> {}

export interface GetEducationByUUIDParams {
  uuid: string
}

export interface GetEducationByUUIDResponse extends ApiResponse {
  data: Education
}

export interface GetEducationByUserUuidParams {
  user_uuid: string
}

export interface GetEducationByUserUuidResponse extends ApiResponse {
  data: Education[]
}

export interface FormUpdateEducation {
  uuid: string
  user_id: string
  user_uuid: string
  title: string
  grade: EducationGrade | ""
  major: string
}

export interface UpdateEducationResponse extends ApiResponse {
  data: Education
}

export interface UpdateEducationMutationParams extends MutationParams<UpdateEducationResponse, FormUpdateEducation> {}

export interface DeleteEducationParams {
  uuid: string
}

export interface DeleteEducationResponse extends ApiResponse {
  data: Education
}

export interface DeleteEducationMutationParams extends MutationParams<DeleteEducationResponse, DeleteEducationParams> {}
