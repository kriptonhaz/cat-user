import { CreateUserMutationParams } from "@/interfaces/user.interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as AuthService from "@/service/auth.service"
import useMutationError from "@/utils/mutationOnError"
import useSnackbar from "@/store/snackbar.store"

const useUser = () => {
  const queryClient = useQueryClient()
  const openSnackbar = useSnackbar((state) => state.open)
  const { onError: onMutationError } = useMutationError()

  const createMutation = (props?: CreateUserMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["user", "create"],
      mutationFn: AuthService.createUser,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
        openSnackbar({
          color: "success",
          message: "Data pengguna berhasil disimpan",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  return {
    createMutation,
  }
}

export default useUser
