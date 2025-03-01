import useSnackbar from "@/store/snackbar.store"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import JobService from "@/service/job.service"
import {
  CreateJobMutationParams,
  GetJobByUUIDParams,
  GetJobByUserUUIDParams,
  UpdateJobMutationParams,
  DeleteJobMutationParams,
} from "@/interfaces/job.interface"
import useMutationError from "@/utils/mutationOnError"

const useJob = () => {
  const queryClient = useQueryClient()
  const openSnackbar = useSnackbar((state) => state.open)
  const { onError: onMutationError } = useMutationError()

  const getJobByUuidQuery = (params: GetJobByUUIDParams) =>
    useQuery({
      queryKey: ["jobs", "getJobByUuid", params],
      queryFn: () => JobService.getByUuid(params),
      enabled: !!params.uuid,
    })

  const getJobByUserUuidQuery = (params: GetJobByUserUUIDParams) =>
    useQuery({
      queryKey: ["jobs", "by_user", params],
      queryFn: () => JobService.getByUserUuid(params),
      enabled: !!params.userUuid,
    })

  const createMutation = (props?: CreateJobMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["job", "create"],
      mutationFn: JobService.create,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] })
        openSnackbar({
          color: "success",
          message: "Data pekerjaan berhasil disimpan",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  const updateMutation = (props?: UpdateJobMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["job", "update"],
      mutationFn: JobService.update,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] })
        openSnackbar({
          color: "success",
          message: "Data pekerjaan berhasil diperbarui",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  const deleteMutation = (props?: DeleteJobMutationParams) => {
    const { onSuccess, onError } = props || {}
    return useMutation({
      mutationKey: ["job", "delete"],
      mutationFn: JobService.destroy,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] })
        openSnackbar({
          color: "success",
          message: "Data pekerjaan berhasil di hapus",
        })
        if (onSuccess) {
          onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => onMutationError(err, variables, context, onError),
    })
  }

  return { getJobByUuidQuery, getJobByUserUuidQuery, createMutation, updateMutation, deleteMutation }
}

export default useJob
