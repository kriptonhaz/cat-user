import { useQuery } from "@tanstack/react-query"
import * as CMSService from "@/service/cms.service"

export const useCmsHooks = () => {
  const queryBannerPublic = () =>
    useQuery({
      queryKey: ["cms", "banner"],
      queryFn: () => CMSService.getBannerPublic(),
    })

  const queryContentPublic = () =>
    useQuery({
      queryKey: ["cms", "content"],
      queryFn: () => CMSService.getContentPublic(),
    })

  const queryFaqPublic = () =>
    useQuery({
      queryKey: ["cms", "faq"],
      queryFn: () => CMSService.getFaqPublic(),
    })

  const querySchedulePublic = () =>
    useQuery({
      queryKey: ["cms", "schedule"],
      queryFn: () => CMSService.getScheduleTestPublic(),
    })

  return {
    queryBannerPublic,
    queryContentPublic,
    queryFaqPublic,
    querySchedulePublic,
  }
}
