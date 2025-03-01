import { sexOptions } from "@/constants/options"
import { CreateUserForm, UserRegistrationForm, UserRole, UserType } from "@/interfaces/user.interface"
import InputGroup from "@/ui/components/InputGroup"
import SelectGroup from "@/ui/components/SelectGroup"
import InputDate from "@/ui/elements/InputDate"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, CircularProgress, Divider, Grid, Stack } from "@mui/material"
import dayjs from "dayjs"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { ArrowCircleLeft, FloppyDisk } from "phosphor-react"
import useUser from "@/hooks/useUser"
import * as Yup from "yup"

export interface FormUserProps {
  prevStep: () => void
  nextStep: (userId: number, userUuid: string) => void
}

const UserValidation = {
  create: Yup.object().shape({
    password: Yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password dan konfirmasi password tidak sama")
      .required("Konfirmasi password harus diisi"),
    full_name: Yup.string().required("Nama Lengkap harus diisi"),
    email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
    phone: Yup.string().required("Nomor telepon harus diisi"),
    role: Yup.mixed().oneOf([1, 2, 3], "Peran harus diisi").required("Peran harus diisi"),
    academic_grade: Yup.string().required("Grade Akademik harus diisi"),
    nip: Yup.string().required("NIP harus diisi"),
    pob: Yup.string().required("Tempat lahir harus diisi"),
    dob: Yup.date().required("Tanggal lahir harus diisi").typeError("Tangal lahir harus diisi"),
    sex: Yup.mixed().oneOf([1, 2], "Jenis kelamin harus diisi").required("Jenis kelamin harus diisi"),
    is_active: Yup.boolean().required("Status harus diisi"),
    user_type: Yup.mixed().oneOf([1, 2], "Jenis harus diisi").required("Jenis harus diisi"),
    registration_from: Yup.mixed()
      .oneOf([1, 2], "Form Pendaftaran harus diisi")
      .required("Form Pendaftaran harus diisi"),
  }),
}

const UserForm: React.FC<FormUserProps> = (props) => {
  const { prevStep, nextStep } = props
  const { createMutation } = useUser()
  const mutation = createMutation({
    onSuccess: (data) => nextStep(data.data.ID, data.data.Uuid),
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
  } = useForm<CreateUserForm>({
    mode: "onChange",
    // @ts-ignore
    resolver: yupResolver(UserValidation.create),
    defaultValues: {
      is_active: true,
      user_type: UserType.External,
      role: UserRole.User,
      registration_from: UserRegistrationForm.PublicLink,
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  useEffect(() => {
    console.log(watch())
  }, [watch()])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <form onSubmit={onSubmit}>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} md={6}>
          <InputGroup
            label="Nama Lengkap"
            {...register("full_name")}
            error={!!errors?.full_name}
            helperText={errors?.full_name?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputGroup
            label="Email"
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputGroup
            label="Kata Sandi"
            type="password"
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputGroup
            label="Konfirmasi Kata Sandi"
            type="password"
            {...register("confirm_password")}
            error={!!errors?.confirm_password}
            helperText={errors?.confirm_password?.message}
          />
        </Grid>
        <Divider />
        <Grid item xs={12} md={6}>
          <InputGroup
            label="Nomor Telepon"
            {...register("phone")}
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputGroup
            label="Grade Akademik"
            {...register("academic_grade")}
            error={!!errors?.academic_grade}
            helperText={errors?.academic_grade?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputGroup label="NIP" {...register("nip")} error={!!errors?.nip} helperText={errors?.nip?.message} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputGroup
            label="Tempat Lahir"
            {...register("pob")}
            error={!!errors?.pob}
            helperText={errors?.pob?.message}
          />
        </Grid>
        <Grid item xs={12} md={6} mt={2}>
          <Controller
            control={control}
            name="dob"
            render={({ field: { onChange, value } }) => (
              <InputDate
                label="Tanggal Lahir"
                value={!!value ? dayjs(value) : null}
                onChange={(value) => onChange(value?.format("YYYY-MM-DD"))}
                error={!!errors?.dob}
                helperText={errors.dob?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectGroup
            label="Jenis Kelamin"
            {...register("sex")}
            // error={!!errors?.sex}
            helperText={errors?.sex?.message}
            options={sexOptions}
          />
        </Grid>
        <Grid item xs={12} sx={{ pt: 4 }}>
          <Stack direction="row" justifyContent="flex-end" spacing={4}>
            <Button
              variant="text"
              type="button"
              color="inherit"
              onClick={prevStep}
              startIcon={<ArrowCircleLeft size={20} />}
            >
              Kembali
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              startIcon={(mutation.isPending && <CircularProgress />) || <FloppyDisk size={20} />}
            >
              Selanjutnya
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}

export default UserForm
