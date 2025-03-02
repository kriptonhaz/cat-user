import {
  FormCreateEducation,
  CreateEducationResponse,
  GetEducationByUUIDParams,
  GetEducationByUUIDResponse,
  GetEducationByUserUuidParams,
  GetEducationByUserUuidResponse,
  FormUpdateEducation,
  UpdateEducationResponse,
  DeleteEducationParams,
  DeleteEducationResponse,
} from "@/interfaces/education.interface"
import API from "./base.service"

class EducationService {
  public static async getByUuid(params: GetEducationByUUIDParams): Promise<GetEducationByUUIDResponse> {
    const { data } = await API().request<GetEducationByUUIDResponse>({
      url: `/v1/public+register/education/${params.uuid}`,
      method: "GET",
    })

    return data
  }

  public static async getByUserUuid(params: GetEducationByUserUuidParams): Promise<GetEducationByUserUuidResponse> {
    const { data } = await API().request<GetEducationByUserUuidResponse>({
      url: `/v1/public+register/education/by_user/${params.user_uuid}`,
      method: "GET",
    })

    return data
  }

  public static async create(payload: FormCreateEducation): Promise<CreateEducationResponse> {
    const { data } = await API().request<CreateEducationResponse>({
      url: "/v1/public+register/education",
      method: "POST",
      data: payload,
    })

    return data
  }

  public static async update(payload: FormUpdateEducation): Promise<UpdateEducationResponse> {
    const { data } = await API().request<UpdateEducationResponse>({
      url: `/v1/public+register/education/${payload.uuid}`,
      method: "PUT",
      data: payload,
    })

    return data
  }

  public static async destroy(params: DeleteEducationParams): Promise<DeleteEducationResponse> {
    const { data } = await API().request<DeleteEducationResponse>({
      url: `/v1/public+register/education/${params.uuid}`,
      method: "DELETE",
    })

    return data
  }
}

export default EducationService
