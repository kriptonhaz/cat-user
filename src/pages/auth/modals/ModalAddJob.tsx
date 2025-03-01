import useJob from "@/hooks/useJob"
import { FormCreateJob, Job, UpdateJobForm } from "@/interfaces/job.interface"
import InputGroup from "@/ui/components/InputGroup"
import { Modal } from "@/ui/layouts/Modal"
import JobValidation from "@/validations/job.validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, CircularProgress, Grid } from "@mui/material"
import { Briefcase } from "phosphor-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

export interface ModalAddJobProps {
  open: boolean
  onClose: () => void
  userId: number | null
  userUuid: string
  job: Job | null
}
const ModalAddJob: React.FC<ModalAddJobProps> = (props) => {
  const { createMutation, updateMutation } = useJob()
  const { onClose, open, userId, userUuid, job } = props
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormCreateJob | UpdateJobForm>({
    mode: "onChange",
    // @ts-ignore
    resolver: yupResolver(JobValidation.create),
    defaultValues: {
      user_id: userId!,
      user_uuid: userUuid,
    },
  })

  useEffect(() => {
    setValue("user_id", userId!)
    setValue("user_uuid", userUuid)
    if (job) {
      reset(job)
    }
  }, [job, open])

  const handleClose = () => {
    onClose()
    reset()
    setValue("user_id", 0)
    setValue("user_uuid", "")
    setValue("job_title", "")
    setValue("grade", "")
    setValue("work_department", "")
    setValue("work_place", "")
    setValue("city_code", "")
  }

  const create = createMutation({
    onSuccess: handleClose,
  })
  const update = updateMutation({
    onSuccess: handleClose,
  })

  const onSubmit = handleSubmit((data) => {
    if (!job) {
      create.mutate(data)
    } else {
      update.mutate(data as UpdateJobForm)
    }
  })

  return (
    <Modal containerProps={{ sx: { maxWidth: "528px !important" } }} open={open} onClose={handleClose}>
      <Modal.Header
        icon={{ icon: <Briefcase weight="bold" />, color: "primary", variant: "contained" }}
        divider
        title={`${!job ? "Tambah" : "Ubah"} Pekerjaan Baru`}
      />
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <Grid container columnSpacing={4}>
            <Grid item xs={12}>
              <InputGroup
                label="Jabatan"
                {...register("job_title")}
                error={!!errors?.job_title}
                helperText={errors?.job_title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <InputGroup
                label="Grade"
                {...register("grade")}
                error={!!errors?.grade}
                helperText={errors?.grade?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <InputGroup
                label="Departemen"
                {...register("work_department")}
                error={!!errors?.work_department}
                helperText={errors?.work_department?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <InputGroup
                label="Tempat Kerja"
                {...register("work_place")}
                error={!!errors?.work_place}
                helperText={errors?.work_place?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <InputGroup
                label="Kode Wilayah"
                {...register("city_code")}
                error={!!errors?.city_code}
                helperText={errors?.city_code?.message}
              />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer onCancel={handleClose} divider>
          <Button
            type="submit"
            disabled={create.isPending || update.isPending}
            startIcon={(!!create.isPending || !!update.isPending) && <CircularProgress />}
          >
            {!job ? "Tambah" : "Ubah"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ModalAddJob
