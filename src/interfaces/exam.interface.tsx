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

export interface ModuleExamItem {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  exam_id: number
  exam_uuid: string
  exam_tool_id: number
  exam_tool_uuid: string
  exam_type_name: string
  module_id: number
  module_uuid: string
  created_by: string
  tools_data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
    Uuid: string
    name: string
    created_by: string
  }
  module_data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
    Uuid: string
    exam_tool_id: number
    exam_tool_uuid: string
    exam_type_name: string
    exam_tool_model_id: number
    exam_tool_model_uuid: string
    module_code: string
    module_name: string
    module_alias: string
    created_by: string
    exam_tool: {
      ID: number
      CreatedAt: string
      UpdatedAt: string
      DeletedAt: string | null
      Uuid: string
      name: string
      created_by: string
    }
  }
}

export interface Exam {
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

export interface IModuleExamAvailableResponse {
  code: number
  data: ModuleExamItem[]
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_page: number
  }
}

export interface IModuleGetExamResponse {
  code: number
  data: Exam
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_page: number
  }
}
