import React, { useEffect } from "react"
import { Box, Container } from "@mui/material"
import BannerImage from "./BannerImage"
import About from "./About"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import FAQ from "./FAQ"
import { useLocation } from "react-router-dom"
import CourseSchedule from "./CourseSchedule"

const LandingScreen: React.FC = () => {
  const { queryBannerPublic, queryFaqPublic } = useCmsHooks()
  const { data: dataBanner } = queryBannerPublic()
  const { data: dataFaq } = queryFaqPublic()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [location.hash, dataFaq])

  return (
    <Box sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
      {dataBanner && <BannerImage dataBanner={dataBanner.data.map((item) => item.image)} />}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <About />
        <CourseSchedule />
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
