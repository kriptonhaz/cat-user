import React, { useEffect } from "react"
import { Container, Typography } from "@mui/material"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import { useParams } from "react-router-dom"

const ContentScreen: React.FC = () => {
  const { queryContentPublic } = useCmsHooks()
  const { data: dataContent } = queryContentPublic()
  const { contentId } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <>
      <Container sx={{ width: "100%", mx: "auto", paddingTop: 20 }}>
        <div style={{ height: "18vh", width: "100%" }} />
        {dataContent && contentId && (
          <>
            <Typography variant="h4" fontWeight={500} mb={2} textAlign={"center"} sx={{ marginTop: 100 }}>
              {dataContent?.data.filter((ar) => ar.uuid === contentId)[0]?.title}
            </Typography>
            <Typography variant="h6" fontWeight={500} mb={7} textAlign={"left"} ml={9}>
              {dataContent?.data.filter((ar) => ar.uuid === contentId)[0]?.subtitle}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: dataContent?.data.filter((ar) => ar.uuid === contentId)[0]?.content ?? "",
              }}
              style={{
                paddingLeft: 50,
                paddingRight: 50,
                textAlign: "justify",
              }}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default ContentScreen
