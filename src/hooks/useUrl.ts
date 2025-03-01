import { useLocation } from "react-router-dom"

const useUrl = () => {
  const location = useLocation()
  const isEdit = location.pathname.includes("edit")
  return {
    isEdit,
  }
}

export default useUrl
