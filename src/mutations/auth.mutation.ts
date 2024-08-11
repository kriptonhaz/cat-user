import { login } from "@/service/auth.service"
import React from "react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

export function useLoginMutation() {
  const toastId = React.useId()
  return useMutation({
    async mutationFn(loginData: { username: string; password: string }) {
      return await login(loginData)
    },
    onMutate() {
      toast.loading("Authenticating...", {
        id: toastId,
      })
    },
    onSuccess() {
      toast.success("Logged in", {
        id: toastId,
      })
      //todo : redirect ke home
    },
    onError() {
      toast.error("Wrong email or password", {
        id: toastId,
      })
    },
  })
}
