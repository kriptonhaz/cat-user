import InputGroup from "@/ui/components/InputGroup"
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

type ChangePasswordForm = {
  oldPassword: string
  newPassword: string
  verifyPassword: string
}
const SettingPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordForm>()

  const onSubmit = handleSubmit((data) => {
    // TODO: wiring update password
    console.log(data)
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
                <Button sx={{ mt: 2 }} fullWidth>
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
