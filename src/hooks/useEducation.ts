import useMutationError from "@/utils/mutationOnError"
import useSnackbar from "@/store/snackbar.store"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import EducationService from "@/service/education.service"
import {
  GetEducationByUUIDParams,
  GetEducationByUserUuidParams,
  CreateEducationMutationParams,
  UpdateEducationMutationParams,
  DeleteEducationMutationParams,
} from "@/interfaces/education.interface"

const useEducation = () => {
  const queryClient = useQueryClient()
  const openSnackbar = useSnackbar((state) => state.open)
  const { onError: onMutationError } = useMutationError()

  const getByUuidQuery = (params: GetEducationByUUIDParams) =>
    useQuery({
      queryKey: ["educations", params],
      queryFn: () => EducationService.getByUuid(params),
    })

  const getByUserUuidQuery = (params: GetEducationByUserUuidParams) =>
    useQuery({
      queryKey: ["educations", "by_user", params],
      queryFn: () => EducationService.getByUserUuid(params),
      enabled: !!params.user_uuid,
    })

  const createMutation = (props?: CreateEducationMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["educations", "create"],
      mutationFn: EducationService.create,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["educations"] })
        openSnackbar({
          color: "success",
          message: "Data pendidikan berhasil disimpan",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  const updateMutation = (props?: UpdateEducationMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["educations", "update"],
      mutationFn: EducationService.update,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["educations"] })
        openSnackbar({
          color: "success",
          message: "Data pendidikan berhasil diperbarui",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  const deleteMutation = (props?: DeleteEducationMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["educations", "delete"],
      mutationFn: EducationService.destroy,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["educations"] })
        openSnackbar({
          color: "success",
          message: "Data pendidikan berhasil di hapus",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  return { getByUuidQuery, getByUserUuidQuery, createMutation, updateMutation, deleteMutation }
}

export default useEducation
