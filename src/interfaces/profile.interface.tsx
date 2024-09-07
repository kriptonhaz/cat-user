export interface IProfileResponse {
  code: number
  data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: null | string
    Uuid: string
    username: string
    password: string
    full_name: string
    email: string
    phone: string
    role: number
    academic_grade: string
    nip: string
    pob: string
    dob: string
    sex: number
    is_active: boolean
    user_type: number
    registration_from: number
    education: {
      ID: number
      CreatedAt: string
      UpdatedAt: string
      DeletedAt: string | null
      uuid: string
      user_id: number
      user_uuid: string
      title: string
      grade: string
      major: string
    }[]
    job: {
      ID: number
      CreatedAt: string
      UpdatedAt: string
      DeletedAt: string | null
      uuid: string
      user_id: number
      user_uuid: string
      job_title: string
      grade: string
      work_department: string
      work_place: string
      city_code: string
    }[]
  }
  message: string
}
