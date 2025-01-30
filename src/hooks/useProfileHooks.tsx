import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as ProfileService from "@/service/profile.service"
import { SubmitVerifiedMutationParams } from "@/interfaces/profile.interface"

export const useProfileHooks = () => {
  const queryClient = useQueryClient()
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

  return { queryProfile, submitVerifyMutation, submitReviseMutation }
}
