import {
  FormCreateJob,
  CreateJobResponse,
  GetJobByUUIDParams,
  GetJobByUUIDResponse,
  GetJobByUserUUIDParams,
  GetJobByUserUUIDResponse,
  UpdateJobForm,
  UpdateJobResponse,
  DeleteJobParams,
  DeleteJobResponse,
} from "@/interfaces/job.interface"
import API from "./base.service"

class JobService {
  public static async create(payload: FormCreateJob): Promise<CreateJobResponse> {
    const { data } = await API().request<CreateJobResponse>({
      url: "/v1/public+register/job",
      method: "POST",
      data: payload,
    })

    return data
  }

  public static async getByUuid(params: GetJobByUUIDParams): Promise<GetJobByUUIDResponse> {
    const { data } = await API().request<GetJobByUUIDResponse>({
      url: `/v1/public+register/job/${params.uuid}`,
      method: "GET",
    })

    return data
  }

  public static async getByUserUuid(params: GetJobByUserUUIDParams): Promise<GetJobByUserUUIDResponse> {
    const { data } = await API().request<GetJobByUserUUIDResponse>({
      url: `/v1/public+register/job/by_user/${params.userUuid}`,
      method: "GET",
    })

    return data
  }

  public static async update(payload: UpdateJobForm): Promise<UpdateJobResponse> {
    const { data } = await API().request<UpdateJobResponse>({
      url: `/v1/public+register/job/${payload.uuid}`,
      method: "PUT",
      data: payload,
    })

    return data
  }

  public static async destroy(params: DeleteJobParams): Promise<DeleteJobResponse> {
    const { data } = await API().request<DeleteJobResponse>({
      url: `/v1/public+register/job/${params.uuid}`,
      method: "DELETE",
    })

    return data
  }
}

export default JobService
