import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ConfigStoreType {
  fontSize: number
  setFontSize: (fontSize: number) => void
}

const useConfigStore = create<ConfigStoreType>()(
  persist(
    (set) => ({
      fontSize: 20,
      setFontSize: (fontSize: number) => {
        set({ fontSize })
      },
    }),
    {
      name: "config-store",
    }
  )
)

export default useConfigStore
