import React from "react"
import { Box, Container } from "@mui/material"
import BannerImage from "./BannerImage"
import About from "./About"
import { useCmsHooks } from "@/hooks/useCmsHooks"

const LandingScreen: React.FC = () => {
  const { queryBannerPublic } = useCmsHooks()
  const { data: dataBanner } = queryBannerPublic()
  return (
    <Box>
      {dataBanner && <BannerImage dataBanner={dataBanner.data.map((item) => item.image)} />}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <About />
      </Container>
    </Box>
  )
}

export default LandingScreen
