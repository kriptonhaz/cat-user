import React from "react"
import { Box, Container } from "@mui/material"
import BannerImage from "./BannerImage"
import About from "./About"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import FAQ from "./FAQ"

const LandingScreen: React.FC = () => {
  const { queryBannerPublic, queryFaqPublic } = useCmsHooks()
  const { data: dataBanner } = queryBannerPublic()
  const { data: dataFaq } = queryFaqPublic()
  return (
    <Box>
      {dataBanner && <BannerImage dataBanner={dataBanner.data.map((item) => item.image)} />}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <About />
        {dataFaq && (
          <FAQ
            faqItem={dataFaq?.data.map((item) => {
              return {
                question: item.question,
                answer: item.answer,
              }
            })}
          />
        )}
      </Container>
    </Box>
  )
}

export default LandingScreen
