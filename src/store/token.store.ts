import { STORAGE_USER } from "@/constants/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TokenStoreType {
  accessToken: string | null
  isLogin: boolean
  setAccessToken: (token: string | null) => void
  setIsLogin: (login: boolean) => void
  logout: () => void
}

const useTokenStore = create<TokenStoreType>()(
  persist(
    (set) => ({
      accessToken: null,
      isLogin: false,
      setAccessToken: (by) => {
        localStorage.setItem(STORAGE_USER.TOKEN, by || "")
        set((state) => ({ ...state, accessToken: by }))
      },
      setIsLogin: (by) => {
        set((state) => ({ ...state, isLogin: by }))
      },
      logout: () => {
        localStorage.removeItem(STORAGE_USER.TOKEN)
        localStorage.removeItem(STORAGE_USER.EMAIL)
        set((state) => ({ ...state, accessToken: null, isLogin: false }))
      },
    }),
    {
      name: STORAGE_USER.TOKEN,
    }
  )
)

export default useTokenStore
