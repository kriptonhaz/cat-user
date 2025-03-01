import { ApiResponse, MutationParams } from "./global.interface"
export interface Job {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: null
  uuid: string
  user_id: number
  user_uuid: string
  job_title: string
  grade: string
  work_department: string
  work_place: string
  city_code: string
}

export interface FormCreateJob {
  user_id: number
  user_uuid: string
  job_title: string
  grade: string
  work_department: string
  work_place: string
  city_code: string
}

export interface CreateJobResponse extends ApiResponse {
  data: Job
}
export interface CreateJobMutationParams extends MutationParams<CreateJobResponse, FormCreateJob> {}

export interface GetJobByUUIDParams {
  uuid: string
}
export interface GetJobByUUIDResponse extends ApiResponse {
  data: Job
}

export interface GetJobByUserUUIDParams {
  userUuid: string
}
export interface GetJobByUserUUIDResponse extends ApiResponse {
  data: Job[]
}

export interface UpdateJobForm {
  uuid: string
  user_id: number
  user_uuid: string
  job_title: string
  grade: string
  work_department: string
  work_place: string
  city_code: string
}
export interface UpdateJobResponse extends ApiResponse {
  data: Job
}
export interface UpdateJobMutationParams extends MutationParams<UpdateJobResponse, UpdateJobForm> {}

export interface DeleteJobParams {
  uuid: string
}
export interface DeleteJobResponse extends ApiResponse {
  data: Job
}
export interface DeleteJobMutationParams extends MutationParams<DeleteJobResponse, DeleteJobParams> {}
