import React, { useEffect } from "react"
import { Box, Container } from "@mui/material"
import BannerImage from "./BannerImage"
import About from "./About"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import FAQ from "./FAQ"

const LandingScreen: React.FC = () => {
  const { queryBannerPublic, queryFaqPublic } = useCmsHooks()
  const { data: dataBanner } = queryBannerPublic()
  const { data: dataFaq } = queryFaqPublic()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    if (dataFaq && location.hash === "#faq") {
      const faqElement = document.getElementById("faq")
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [dataFaq, location.hash])

  return (
    <Box sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
      {dataBanner && <BannerImage dataBanner={dataBanner.data.map((item) => item.image)} />}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <About />
        {dataFaq && (
          <Box id="faq">
            <FAQ
              faqItem={dataFaq?.data.map((item) => {
                return {
                  question: item.question,
                  answer: item.answer,
                }
              })}
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default LandingScreen
