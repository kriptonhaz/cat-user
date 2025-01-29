import { Box, Button, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form"
import InputGroup from "@/ui/components/InputGroup"
import { useEffect, useState } from "react"
import { getCaptcha, verifyCaptcha } from "@/service/auth.service"
import { ArrowClockwise } from "phosphor-react"
import { useNavigate } from "react-router-dom"

interface IForgotPasswordForm {
  username: string
  email: string
  captcha: string
  headerToken: string
}

const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IForgotPasswordForm>()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const onSubmit = handleSubmit((data) => {
    verifyCaptcha({ captcha: data.captcha, Token: data.headerToken })
      .then(() => {
        // TODO: wiring forgot password
      })
      .catch(() => {
        setError("captcha", { message: "Captcha tidak sesuai silahkan coba lagi" })
      })
  })

  const fetchCaptcha = async () => {
    try {
      const captcha = await getCaptcha()
      const url = URL.createObjectURL(captcha.imageData)
      setImageUrl(url)
      setValue("headerToken", captcha.headers.token)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaptcha()
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <InputGroup
        label="NRP / NIP"
        placeholder="Masukan NRP / NIP anda disini"
        {...register("username")}
        required
        sx={{ width: "400px" }}
      />
      <InputGroup
        label="Email"
        placeholder="Masukan Email anda disini"
        {...register("email")}
        required
        sx={{ width: "400px" }}
      />
      <Box sx={{ border: "1px solid rgb(179, 178, 177)", padding: 4, borderRadius: 2, mt: 2, mb: 2 }}>
        <Box
          sx={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {imageUrl && <img src={imageUrl} alt="Captcha" />}
          {loading && <CircularProgress />}
          <Button
            data-shape="icon"
            size="lg"
            variant="text"
            onClick={fetchCaptcha}
            sx={{ position: "relative", top: 0, right: 0 }}
          >
            <ArrowClockwise size={24} />
          </Button>
        </Box>
        <InputGroup
          label="Captcha"
          placeholder="masukan captcha disini"
          {...register("captcha")}
          required
          error={!!errors.captcha?.message}
          helperText={errors.captcha?.message}
        />
      </Box>
      <Button type="submit" sx={{ mb: 5 }} fullWidth>
        Kirim
      </Button>
      <hr />
      <Button sx={{ mt: 5 }} fullWidth variant="outlined" color="secondary" onClick={() => navigate("/login")}>
        Kembali ke Login
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
