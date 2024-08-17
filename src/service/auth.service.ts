import { API_URL } from "@/constants/api"
import axios from "axios"

export async function login(loginData: { username: string; password: string }) {
  const login = await axios.post(`${API_URL}/v1/cat+apps/login`, loginData)

  if (login.status === 200 && login.data.data.role === 3) {
    localStorage.setItem("name", login.data.data.full_name)

    return login
  }
}
