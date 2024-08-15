import { login } from "@/service/auth.service"
import React from "react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useRoutes } from "react-router-dom"

export function useLoginMutation() {
  const toastId = React.useId()
  const navigate = useNavigate()

  return useMutation({
    async mutationFn(loginData: { username: string; password: string }) {
      return await login(loginData)
    },
    onMutate() {
      toast.loading("Mencoba masuk...", {
        id: toastId,
      })
    },
    onSuccess() {
      toast.success("Berhasil masuk", {
        id: toastId,
      })
      navigate("/home")
    },
    onError() {
      toast.error("Username atau password salah", {
        id: toastId,
      })
    },
  })
}
