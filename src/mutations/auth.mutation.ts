import { submitLoginForm } from "@/service/auth.service"
import React from "react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import useTokenStore from "@/store/token.store"
import { LoginMutationParams } from "@/interfaces/auth.interface"

export function useLoginMutation() {
  const toastId = React.useId()
  const navigate = useNavigate()

  const loginMutation = (params?: LoginMutationParams) => {
    const { onSuccess, onError } = params || {}
    const tokenStore = useTokenStore()
    return useMutation({
      mutationKey: ["auth", "login"],
      mutationFn: submitLoginForm,
      onSuccess: (data, variables, context) => {
        tokenStore.setAccessToken(data.data?.token)
        tokenStore.setAccessToken(data.data?.token)
        tokenStore.setIsLogin(true)
        navigate("/home")
        if (onSuccess) {
          // onSuccess(data, variables, context)
          return
        }
      },
      onError: (err: Error, variables, context) => {
        toast.error("Username atau password salah", {
          id: toastId,
        })
      },
    })
  }

  return { loginMutation }

  // TODO: REMOVE THIS
  // return useMutation({
  //   async mutationFn(loginData: { username: string; password: string }) {
  //     return await login(loginData)
  //   },
  //   onMutate() {
  //     toast.loading("Mencoba masuk...", {
  //       id: toastId,
  //     })
  //   },
  //   onSuccess() {
  //     toast.success("Berhasil masuk", {
  //       id: toastId,
  //     })
  //     navigate("/home")
  //   },
  //   onError() {
  //     toast.error("Username atau password salah", {
  //       id: toastId,
  //     })
  //   },
  // })
}
