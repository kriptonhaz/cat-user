export interface ExamItem {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  exam_id: number
  exam_uuid: string
  user_id: number
  user_uuid: string
  user_data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
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
  }
  exam_data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
    Uuid: string
    code: string
    name: string
    location: string
    start_time: string
    end_time: string
    batch: string
    purpose_id: number
    purpose_uuid: string
    position_purpose_id: number
    position_purpose_uuid: string
    is_bkn_report: boolean
    CreatedBy: string
    purpose_data: {
      ID: number
      CreatedAt: string
      UpdatedAt: string
      DeletedAt: string | null
      Uuid: string
      purpose_type: number
      name: string
      CreatedBy: string
    }
    position_purpose_data: {
      ID: number
      CreatedAt: string
      UpdatedAt: string
      DeletedAt: string | null
      Uuid: string
      purpose_type: number
      name: string
      CreatedBy: string
    }
  }
}

export interface IExamAvailableResponse {
  code: number
  data: ExamItem[]
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_page: number
  }
}
