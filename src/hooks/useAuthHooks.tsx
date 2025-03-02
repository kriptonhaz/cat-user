import useMutationError from "@/utils/mutationOnError"
import useSnackbar from "@/store/snackbar.store"
import { useMutation } from "@tanstack/react-query"
import { forgotUser } from "@/service/auth.service"
import { ForgotPasswordMutationParams } from "@/interfaces/user.interface"

const useAuthHook = () => {
  const openSnackbar = useSnackbar((state) => state.open)
  const { onError: onMutationError } = useMutationError()

  const forgotMutation = (props?: ForgotPasswordMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["auth", "forgot-password"],
      mutationFn: forgotUser,
      onSuccess: (data, variables, context) => {
        openSnackbar({
          color: "success",
          message: "Silahkan cek email untuk reset password",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  return { forgotMutation }
}

export default useAuthHook
