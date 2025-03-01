import { AlertColor } from "@mui/material"
import { create } from "zustand"

type TVertical = "top" | "bottom"
type THorizontal = "left" | "right"
export interface IUseSnackbarState {
  show: boolean
  vertical: TVertical
  horizontal: THorizontal
  color: AlertColor
  message: string
  open: (params: { message: string; vertical?: TVertical; horizontal?: THorizontal; color?: AlertColor }) => void
  close: () => void
}

const useSnackbar = create<IUseSnackbarState>((set) => ({
  show: false,
  vertical: "bottom",
  horizontal: "right",
  color: "success",
  message: "",
  open: ({ message, vertical = "bottom", horizontal = "right", color = "success" }) => {
    set((state) => ({
      ...state,
      show: true,
      message,
      vertical,
      horizontal,
      color,
    }))
  },
  close: () => {
    set((state) => ({ ...state, show: false }))
  },
}))

export default useSnackbar
