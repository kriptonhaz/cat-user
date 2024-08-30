import { Button, Card } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import InputGroup from "@/ui/components/InputGroup"
import { useLoginMutation } from "@/mutations/auth.mutation"

interface LoginForm {
  username: string
  password: string
}

const LoginForm = () => {
  const { handleSubmit, register } = useForm<LoginForm>()

  const { loginMutation } = useLoginMutation()
  const mutation = loginMutation()

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutation.mutate(data)
  }

  return (
    <Card
      sx={{
        border: "0.5px solid #ccc",
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" sx={{ mt: 2 }}>
          Masuk
        </Button>
      </form>
    </Card>
  )
}

export default LoginForm
