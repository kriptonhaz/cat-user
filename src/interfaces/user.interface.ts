import { ApiResponse, PaginationMetadata, PaginationParams } from "./global.interface"

export enum UserType {
  Internal = 1,
  External = 2,
}

export enum UserRole {
  Admin = 1,
  Assesor = 2,
  User = 3,
}

export enum UserRegistrationForm {
  Admin = 1,
  PublicLink = 2,
}

export interface SatkerData {
  Uuid: string
  bkn_id: string
  unor_name: string
  position_name: string
  bkn_parent_id: string
  bkn_root_id: string
  row_level: number
  data_order: number
  status: string
  structure_order: string
  created_at: Date
  updated_at: Date
  deleted_at: null
}

export interface SubsatkerData {
  Uuid: string
  bkn_id: string
  unor_name: string
  position_name: string
  bkn_parent_id: string
  bkn_root_id: string
  row_level: number
  data_order: number
  status: string
  structure_order: string
  created_at: Date
  updated_at: Date
  deleted_at: null
}

export interface UkerData {
  Uuid: string
  bkn_id: string
  unor_name: string
  position_name: string
  bkn_parent_id: string
  bkn_root_id: string
  row_level: number
  data_order: number
  status: string
  structure_order: string
  created_at: Date
  updated_at: Date
  deleted_at: null
}

export interface UserEducation {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: null
  uuid: string
  user_id: number
  user_uuid: string
  title: string
  grade: string
  major: string
  tgl_lulus: string
  history_jabatan_id: number
}

export interface UserJob {
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
  active_date: string
  simpeg_jabatan_id: number
}

export interface User {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: null
  Uuid: string
  username: string
  password: string
  full_name: string
  email: string
  phone: string
  role: UserRole
  academic_grade: string
  nip: string
  pob: string
  dob: Date
  sex: number
  is_active: boolean
  user_type: UserType
  registration_from: UserRegistrationForm
  satker_data: SatkerData
  subsatker_data: SubsatkerData
  uker_data: UkerData
  education: UserEducation[]
  job: UserJob[]
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

export interface GetUserResponse extends PaginationMetadata, ApiResponse {
  data: User[]
}

export interface DeleteUserParams {
  id: string
}
export interface DeleteUserResponse extends ApiResponse {
  data: User
}
export interface DeleteUserMutationParams {
  onSuccess?: ((data: DeleteUserResponse, variables: DeleteUserParams, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: DeleteUserParams, context: unknown) => unknown) | undefined
}

export interface CreateUserForm {
  username: string
  password: string
  confirm_password: string
  full_name: string
  email: string
  phone: string
  role: UserRole
  academic_grade: string
  nip: string
  pob: string
  dob: Date
  sex: number
  is_active: boolean
  user_type: UserType
  registration_from: UserRegistrationForm
}

export interface CreateUserResponse extends ApiResponse {
  data: User
}

export interface CreateUserMutationParams {
  onSuccess?: ((data: CreateUserResponse, variables: CreateUserForm, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: CreateUserForm, context: unknown) => unknown) | undefined
}

export interface UploadBulkUserForm {
  document: File | Blob
}
export interface UploadBulkUserResponse extends ApiResponse {
  data: User[]
}

export interface UploadBulkUserMutationParams {
  onSuccess?: ((data: UploadBulkUserResponse, variables: UploadBulkUserForm, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: UploadBulkUserForm, context: unknown) => unknown) | undefined
}

export interface UpdateUserForm {
  uuid: string
  password: string
  confirm_password: string
  full_name: string
  phone: string
  role: UserRole
  academic_grade: string
  nip: string
  pob: string
  dob: Date
  sex: number
  is_active: boolean
  user_type: UserType
}
export interface UpdateUserResponse extends ApiResponse {
  data: User
}
export interface UpdateUserMutationParams {
  onSuccess?: ((data: UpdateUserResponse, variables: UpdateUserForm, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: UpdateUserForm, context: unknown) => unknown) | undefined
}

export interface GetUserByUUIDParams {
  uuid: string
}
export interface GetUserByUUIDResponse extends ApiResponse {
  data: User
}

export interface ForgotPasswordParams {
  email: string
}
export interface ForgotPasswordResponse extends ApiResponse {
  code: 200
  data: string
  message: string
}
export interface ForgotPasswordMutationParams {
  onSuccess?: ((data: ForgotPasswordResponse, variables: ForgotPasswordParams, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: ForgotPasswordParams, context: unknown) => unknown) | undefined
}
