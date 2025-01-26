import { LoadingScreen } from "@/ui/views/LoadingPage"
import { delayLoading } from "@/utils/delay-loading"
import React, { Suspense, lazy } from "react"

const ContentScreen = lazy(() => delayLoading(import("@/app/landing/Content")))

const ContentPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen sx={{ minHeight: "500px", height: "100%", maxHeight: "1200px" }} />}>
      <ContentScreen />
    </Suspense>
  )
}

export default ContentPage
