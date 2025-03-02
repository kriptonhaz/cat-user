import { useProfileHooks } from "@/hooks/useProfileHooks"
import InputGroup from "@/ui/components/InputGroup"
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { IUpdatePasswordPayload } from "@/interfaces/profile.interface"

const SettingPage = () => {
  const validationSchema = yup.object().shape({
    old_password: yup.string().required("Password lama wajib diisi"),
    new_password: yup.string().required("Password baru wajib diisi"),
    confirm_new_password: yup
      .string()
      .required("Verifikasi password wajib diisi")
      .oneOf([yup.ref("new_password")], "Password tidak cocok"),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUpdatePasswordPayload>({
    mode: "onChange",
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
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
                  {...register("old_password")}
                  required
                  error={!!errors.old_password?.message}
                  helperText={errors.old_password?.message}
                />
                <InputGroup
                  label="Password Baru"
                  type="password"
                  placeholder="masukan baru anda disini"
                  {...register("new_password")}
                  required
                  error={!!errors.new_password?.message}
                  helperText={errors.new_password?.message}
                />
                <InputGroup
                  label="Verifikasi Password Baru"
                  type="password"
                  placeholder="verifikasi password baru"
                  {...register("confirm_new_password")}
                  required
                  error={!!errors.confirm_new_password?.message}
                  helperText={errors.confirm_new_password?.message}
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
