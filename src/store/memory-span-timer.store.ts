import { SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createJSONStorage } from "zustand/middleware"
type TSoal = SoalExam | SoalExamLS1 | SoalExamPPI
interface MemorySpanDataItem {
  soal: TSoal
  startAnswer: boolean
}
interface MemorySpanTimerStore {
  data: MemorySpanDataItem[]
  getStartAnswer: (soal: TSoal) => boolean // true = start, false = not start
  getMemorySpanData: (soal: TSoal) => MemorySpanDataItem | undefined // undefined = not found, else = found, startAnswer = true = start, false = not start
  setMemorySpanData: (item: MemorySpanDataItem) => void
  setStartAnswer: (soal: TSoal, startAnswer: boolean) => void
}

const useMemorySpanTimerStore = create<MemorySpanTimerStore>()(
  persist(
    (set, get) => ({
      data: [],
      getStartAnswer(soal) {
        const data = get().data
        const index = data.findIndex((item) => item.soal.Uuid === soal.Uuid)
        if (index === -1) {
          return false
        }
        return data[index].startAnswer
      },
      getMemorySpanData(soal) {
        const data = get().data
        const index = data.findIndex((item) => item.soal.Uuid === soal.Uuid)
        if (index === -1) {
          return undefined
        }
        return data[index]
      },
      setMemorySpanData: (item: MemorySpanDataItem) => {
        set((state) => {
          const index = state.data.findIndex((d) => d.soal.Uuid === item.soal.Uuid)
          if (index === -1) {
            return { data: [...state.data, item] }
          }
          const newData = [...state.data]
          newData[index] = item
          return { data: newData }
        })
      },
      setStartAnswer: (soal: TSoal, startAnswer: boolean) => {
        set((state) => {
          const index = state.data.findIndex((item) => item.soal.Uuid === soal.Uuid)
          if (index === -1) {
            return {
              data: [
                ...state.data,
                {
                  soal,
                  startAnswer: startAnswer,
                },
              ],
            }
          }
          const newData = [...state.data]
          newData[index] = {
            ...newData[index],
            startAnswer: startAnswer,
          }
          return { data: newData }
        })
      },
    }),
    {
      name: "memory-span-timer-store",
      storage: createJSONStorage(() => sessionStorage), // Configure storage to use sessionStorage
    }
  )
)

export default useMemorySpanTimerStore
