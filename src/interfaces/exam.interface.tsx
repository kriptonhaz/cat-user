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

interface ExamActivity {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  exam_id: number
  exam_uuid: string
  module_id: number
  module_uuid: string
  exam_tool_id: number
  exam_tool_uuid: string
  exam_type_name: string
  user_id: number
  user_uuid: string
  exam_attendance_id: number
  exam_attendance_uuid: string
  last_question_filled: number
  last_question_showed: number
  total_consume_time: number
  activity_stage: number
  activity_status: number
  last_stage_at: string
  start_exam_at: string
  end_exam_at: string
  user_finger_print: string
}

interface FinishExambeforeDone {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  exam_id: number
  exam_uuid: string
  module_id: number
  module_uuid: string
  exam_tool_id: number
  exam_tool_uuid: string
  exam_type_name: string
  user_id: number
  user_uuid: string
  exam_attendance_id: number
  exam_attendance_uuid: string
  last_question_filled: number
  last_question_showed: number
  total_consume_time: number
  activity_stage: number
  activity_status: number
  last_stage_at: string
  start_exam_at: string
  end_exam_at: string
  user_finger_print: string
}

interface FinishExam {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  exam_id: number
  exam_uuid: string
  module_id: number
  module_uuid: string
  exam_tool_id: number
  exam_tool_uuid: string
  exam_type_name: string
  user_id: number
  user_uuid: string
  exam_attendance_id: number
  exam_attendance_uuid: string
  last_question_filled: number
  last_question_showed: number
  total_consume_time: number
  activity_stage: number
  activity_status: number
  last_stage_at: string
  start_exam_at: string
  end_exam_at: string
  user_finger_print: string
}
export interface SoalExam {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  question_type: number
  question_order: number
  question_content: string
  timer: number
  answer_data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
    Uuid: string
    question_id: number
    question_uuid: string
    answer_mapping: string
    answer_mapping_reader: {
      content: string
      value: number
    }[]
  }
}

export interface RiwayatUjian {
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

export interface TimerUjian {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  Uuid: string
  code: string
  name: string
  timer_type: number
  total_time: number
  is_must_fill_all_question: boolean
  added_time: number
  can_go_back: boolean
  create_by: string
}

// ========================================

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

export interface IExamActivityResponse {
  code: number
  data: ExamActivity
  message: string
}

export interface IExamStartResponse {
  code: number
  data: ExamActivity
  message: string
}

export interface IExamFinishBeforeDoneResponse {
  code: number
  data: FinishExambeforeDone
  message: string
}

export interface IExamFinishResponse {
  code: number
  data: FinishExam
  message: string
}

export interface ISoalExamByModuleResponse {
  code: number
  data: SoalExam[]
  message: string
}

export interface ISoalExam {
  SoalExam: SoalExam
}

export interface IRiwayatExamResponse {
  code: number
  data: RiwayatUjian[]
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_page: number
  }
}

export interface ITimerUjianResponse {
  data: TimerUjian
  message: string
  code: number
}
