import { useProfileHooks } from "@/hooks/useProfileHooks"
import InputGroup from "@/ui/components/InputGroup"
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type ChangePasswordForm = {
  oldPassword: string
  newPassword: string
  verifyPassword: string
}
const SettingPage = () => {
  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required("Password lama wajib diisi"),
    newPassword: yup.string().required("Password baru wajib diisi"),
    verifyPassword: yup
      .string()
      .required("Verifikasi password wajib diisi")
      .oneOf([yup.ref("newPassword")], "Password tidak cocok"),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      verifyPassword: "",
    },
    resolver: yupResolver(validationSchema),
  })

  const { changePasswordMutation } = useProfileHooks()

  const mutation = changePasswordMutation()

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <Box>
      <Grid container sx={{ mt: 10, pl: 5, mb: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Pengaturan</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Update Password" />
            <form onSubmit={onSubmit}>
              <CardContent>
                <InputGroup
                  label="Password Lama"
                  type="password"
                  placeholder="masukan lama anda disini"
                  {...register("oldPassword")}
                  required
                  error={!!errors.oldPassword?.message}
                  helperText={errors.oldPassword?.message}
                />
                <InputGroup
                  label="Password Baru"
                  type="password"
                  placeholder="masukan baru anda disini"
                  {...register("newPassword")}
                  required
                  error={!!errors.newPassword?.message}
                  helperText={errors.newPassword?.message}
                />
                <InputGroup
                  label="Verifikasi Password Baru"
                  type="password"
                  placeholder="verifikasi password baru"
                  {...register("verifyPassword")}
                  required
                  error={!!errors.verifyPassword?.message}
                  helperText={errors.verifyPassword?.message}
                />
                <Button sx={{ mt: 2 }} fullWidth type="submit">
                  Simpan
                </Button>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingPage
