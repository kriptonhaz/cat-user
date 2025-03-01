import useSnackbar from "@/store/snackbar.store"
import { AxiosError } from "axios"

type TError = Error | AxiosError
const useMutationError = () => {
  const openSnackbar = useSnackbar((state) => state.open)
  const onError = <TVariables, TContext = unknown>(
    err: TError,
    variables: TVariables,
    context: TContext,
    onError?: (err: TError, variables: TVariables, context: TContext) => void
  ) => {
    if (onError) return onError(err, variables, context)
    if (err instanceof AxiosError) {
      return openSnackbar({
        color: "error",
        message: err.response?.data?.message ?? err.message,
      })
    }
    openSnackbar({
      color: "error",
      message: err.message,
    })
  }
  return {
    onError,
  }
}

export default useMutationError
