import React from "react"
import { Box, Container } from "@mui/material"
import BannerImage from "./BannerImage"
import About from "./About"

const LandingScreen: React.FC = () => {
  return (
    <Box>
      <BannerImage />
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <About />
      </Container>
    </Box>
  )
}

export default LandingScreen
