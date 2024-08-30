import { useQuery } from "@tanstack/react-query"
import * as ProfileService from "@/service/profile.service"

export const useProfileHooks = () => {
  const queryProfile = () =>
    useQuery({
      queryKey: ["profile", "get"],
      queryFn: () => ProfileService.getProfile(),
    })

  return { queryProfile }
}
