export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error"
export enum ExamTool {
  PPS = "PPS",
  PPI = "PPI",
  LS1 = "LS1",
  LS2 = "LS2",
  LS3 = "LS3",
}

export interface PaginationParams {
  page: number
  per_page: number
  search: string
}

export interface PaginationMetadata {
  meta: {
    page: number
    per_page: number
    offset: number
    total_data: number
    total_page: number
  }
}

export interface ApiResponse {
  code: number
  message: string
}

export enum ESex {
  Male = 1,
  Female = 2,
}

export interface SelectOptions<T> {
  label: string
  value: T
}

export interface useQueryParams {
  enabled?: boolean
}

export interface MutationParams<TData, TVariables> {
  onSuccess?: ((data: TData, variables: TVariables, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: TVariables, context: unknown) => unknown) | undefined
}

export enum EImagePosition {
  Top = 1,
  Bottom = 2,
  Left = 3,
  Right = 4,
}

export enum EAnswerShowingPosition {
  Vertical = 1,
  Horizontal = 2,
}

export enum EAnswerType {
  SingleChoice = 1,
  MultipleChoice = 2,
  FreeText = 3,
}

export enum EIntroType {
  QuestionPage = 1,
  Instruction = 2,
}
