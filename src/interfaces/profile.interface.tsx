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
    education: any[]
    job: any[]
  }
  message: string
}
