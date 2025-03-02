export interface IBannerPublicResponse {
  code: number
  data: {
    uuid: string
    image: string
    created_at: string
    updated_at: string
    deleted_at: string | null
  }[]

  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_showing_data: number
    total_page: number
  }
}

export interface IContentPublicRespose {
  code: number
  data: {
    uuid: string
    title: string
    subtitle: string
    content: string
    content_type: number
    image: string
    createBy: string
    created_at: string
    updated_at: string
    deleted_at: null | string
  }[]
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_showing_data: number
    total_page: number
  }
}

export interface IFaqPublicResponse {
  code: number
  data: {
    uuid: string
    question: string
    answer: string
    createBy: string
    created_at: string
    updated_at: string
    deleted_at: null | string
  }[]
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_showing_data: number
    total_page: number
  }
}

export interface IScheduleTestPublicResponse {
  code: number
  data: {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: null | string
    Uuid: string
    exam_id: number
    exam_uuid: string
    user_id: number
    user_uuid: string
    user_data: {
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
      is_verified_by_user: boolean
      is_revision_requested: boolean
      is_active: boolean
      user_type: number
      registration_from: number
      is_simpeg_user: boolean
      pegawai_id: number
      pns_id: string
      nrpnip: string
      nopeg: string
      foto_depan: string
      nama_lengkap: string
      gelar_depan: string
      gelar_belakang: string
      jabatan_tmt: string
      jabatan_sk_no: string
      jabatan_sk_tanggal: string
      jenis_jabatan_id: string
      jabatan_kode: string
      jabatan_nama: string
      pangkat_kode: number
      pangkat_nama: string
      lokasi_kerja: string
      uo_kode: string
      satker_kode: string
      subsatker_kode: string
      uker_kode: string
      angkatan_id: number
      angkatan_kode: string
      angkatan_nama: string
    }
    exam_data: {
      ID: number
      CreatedAt: string
      UpdatedAt: string
      DeletedAt: null | string
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
        DeletedAt: null | string
        Uuid: string
        purpose_type: number
        name: string
        CreatedBy: string
      }
      position_purpose_data: {
        ID: number
        CreatedAt: string
        UpdatedAt: string
        DeletedAt: null | string
        Uuid: string
        purpose_type: number
        name: string
        CreatedBy: string
      }
      test_module_data: Array<{
        ID: number
        CreatedAt: string
        UpdatedAt: string
        DeletedAt: null | string
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
          DeletedAt: null | string
          Uuid: string
          name: string
          created_by: string
        }
        module_data: {
          ID: number
          CreatedAt: string
          UpdatedAt: string
          DeletedAt: null | string
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
            DeletedAt: null | string
            Uuid: string
            name: string
            created_by: string
          }
        }
      }>
    }
  }[]
  message: string
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_showing_data: number
    total_page: number
  }
}
