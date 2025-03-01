import { educationGradeOptions } from "@/constants/options"
import useEducation from "@/hooks/useEducation"
import { Education, FormCreateEducation, FormUpdateEducation } from "@/interfaces/education.interface"
import InputGroup from "@/ui/components/InputGroup"
import SelectGroup from "@/ui/components/SelectGroup"
import { Modal } from "@/ui/layouts/Modal"
import EducationValidation from "@/validations/education.validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, CircularProgress, Grid } from "@mui/material"
import { Briefcase } from "phosphor-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

export interface ModalAddEducationProps {
  open: boolean
  onClose: () => void
  userId: number | null
  userUuid: string
  education: Education | null
}
const ModalAddEducation: React.FC<ModalAddEducationProps> = (props) => {
  const { createMutation, updateMutation } = useEducation()
  const { onClose, open, userId, userUuid, education } = props
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormCreateEducation | FormUpdateEducation>({
    mode: "onChange",
    // @ts-ignore
    resolver: yupResolver(EducationValidation.create),
    defaultValues: {
      user_id: userId!,
      user_uuid: userUuid,
    },
  })

  useEffect(() => {
    setValue("user_id", userId!)
    setValue("user_uuid", userUuid)
    if (education) {
      reset(education)
    }
  }, [education])

  const handleClose = () => {
    onClose()
    reset()
    setValue("user_id", 0)
    setValue("user_uuid", "")
    setValue("title", "")
    setValue("grade", "")
    setValue("major", "")
  }

  const create = createMutation({
    onSuccess: handleClose,
  })

  const update = updateMutation({
    onSuccess: handleClose,
  })

  const onSubmit = handleSubmit((data) => {
    if (!education) {
      create.mutate(data as FormCreateEducation)
    } else {
      update.mutate(data as FormUpdateEducation)
    }
  })

  return (
    <Modal containerProps={{ sx: { maxWidth: "528px !important" } }} open={open} onClose={handleClose}>
      <Modal.Header
        icon={{ icon: <Briefcase weight="bold" />, color: "primary", variant: "contained" }}
        divider
        title="Tambah Pekerjaan Baru"
      />
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <Grid container columnSpacing={4}>
            <Grid item xs={12}>
              <InputGroup
                label="Gelar"
                {...register("title")}
                error={!!errors?.title}
                helperText={errors?.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectGroup
                key={watch("grade")}
                label="Pendidikan Terakhir"
                {...register("grade")}
                // defaultValue={watch("grade")}
                // error={!!errors?.grade}
                helperText={errors?.grade?.message}
                options={educationGradeOptions}
              />
            </Grid>
            <Grid item xs={12}>
              <InputGroup
                label="Program Studi"
                {...register("major")}
                error={!!errors?.major}
                helperText={errors?.major?.message}
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
            {!education ? "Tambah" : "Ubah"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ModalAddEducation
