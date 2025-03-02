import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as ProfileService from "@/service/profile.service"
import { SubmitUpdatePasswordMutationParams, SubmitVerifiedMutationParams } from "@/interfaces/profile.interface"
import useTokenStore from "@/store/token.store"
import { useNavigate } from "react-router-dom"

export const useProfileHooks = () => {
  const queryClient = useQueryClient()
  const tokenStore = useTokenStore()
  const navigate = useNavigate()
  const queryProfile = () =>
    useQuery({
      queryKey: ["profile", "get"],
      queryFn: () => ProfileService.getProfile(),
    })
  const submitVerifyMutation = (params?: SubmitVerifiedMutationParams) => {
    const { onSuccess, onError } = params || {}
    return useMutation({
      mutationKey: ["user", "verified"],
      mutationFn: ProfileService.submitVerified,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["profile", "get"],
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => {
        if (onError) {
          onError(err, variables, context)
          return
        }
      },
    })
  }

  const submitReviseMutation = (params?: SubmitVerifiedMutationParams) => {
    const { onSuccess, onError } = params || {}
    return useMutation({
      mutationKey: ["user", "revised"],
      mutationFn: ProfileService.submitRevision,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["profile", "get"],
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => {
        if (onError) {
          onError(err, variables, context)
          return
        }
      },
    })
  }

  const changePasswordMutation = (params?: SubmitUpdatePasswordMutationParams) => {
    const { onSuccess, onError } = params || {}
    return useMutation({
      mutationKey: ["user", "change-password"],
      mutationFn: ProfileService.changePassword,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["profile", "get"],
        })
        tokenStore.logout()
        navigate("/login")
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => {
        if (onError) {
          onError(err, variables, context)
          return
        }
      },
    })
  }

  return { queryProfile, submitVerifyMutation, submitReviseMutation, changePasswordMutation }
}
