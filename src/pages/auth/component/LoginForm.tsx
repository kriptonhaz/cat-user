import { Box, Button, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form"
import InputGroup from "@/ui/components/InputGroup"
import { useLoginMutation } from "@/mutations/auth.mutation"
import { useEffect, useState } from "react"
import { getCaptcha, verifyCaptcha } from "@/service/auth.service"
import { ArrowClockwise } from "phosphor-react"
import ModalLoading from "@/ui/layouts/Modal/ui/ModalLoading"
import { useNavigate } from "react-router-dom"

interface LoginForm {
  username: string
  password: string
  captcha: string
  headerToken: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [ssoLoading, setSsoLoading] = useState(false)

  const { loginMutation } = useLoginMutation()
  const mutation = loginMutation()

  const onSubmit = handleSubmit((data) => {
    verifyCaptcha({ captcha: data.captcha, Token: data.headerToken })
      .then(() => {
        mutation.mutate(data)
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
        label="Nama Pengguna"
        placeholder="masukan nama pengguna anda disini"
        {...register("username")}
        required
      />
      <InputGroup
        label="Kata Sandi"
        type="password"
        placeholder="masukan kata sandi anda disini"
        {...register("password")}
        required
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
      <Button type="submit" sx={{ mt: 2 }} fullWidth>
        Masuk
      </Button>
      <Button sx={{ mt: 2, mb: 5 }} fullWidth variant="outlined" onClick={() => setSsoLoading(true)}>
        Masuk dengan SSO
      </Button>
      <hr />
      <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
        <Button fullWidth variant="outlined" color="secondary" onClick={() => navigate("/forgot-password")}>
          Lupa Password
        </Button>
        <Button fullWidth variant="outlined" color="primary" onClick={() => navigate("/signup")}>
          Daftar
        </Button>
      </Box>
      <ModalLoading open={ssoLoading} onClose={() => setSsoLoading(false)} isSso={true} />
    </form>
  )
}

export default LoginForm
