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
