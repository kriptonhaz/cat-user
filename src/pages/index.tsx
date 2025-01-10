import { LoadingScreen } from "@/ui/views/LoadingPage"
import { delayLoading } from "@/utils/delay-loading"
import React, { Suspense, lazy } from "react"

const LandingScreen = lazy(() => delayLoading(import("@/app/landing/LandingScreen")))

const LandingPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen sx={{ minHeight: "500px", height: "100%", maxHeight: "1200px" }} />}>
      <LandingScreen />
    </Suspense>
  )
}

export default LandingPage
