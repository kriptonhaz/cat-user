import { Box, Grid, SxProps, Typography } from "@mui/material"
import React from "react"
import BtnArrow from "./BtnArrow"
import { useNavigate } from "react-router"
import { useCmsHooks } from "@/hooks/useCmsHooks"

const styles: { card: SxProps } = {
  card: {
    backgroundColor: "#f2f2f2",
    margin: "0px 40px",
    padding: "32px 20px",
    borderRadius: "30px",
    boxSizing: "border-box",
    width: "95%",
    height: "100%",
    position: "relative",
  },
}

const About: React.FC = () => {
  const navigate = useNavigate()
  const { queryContentPublic } = useCmsHooks()
  const { data: dataContent } = queryContentPublic()
  return (
    <Grid
      container
      spacing={3}
      sx={{
        justifyContent: "center",
        margin: "0 auto",
        width: "100%",
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {dataContent &&
        dataContent.data
          .filter((ar) => ar.content_type === 1)
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.uuid}>
              <Box sx={{ ...styles.card, height: "100%", margin: 0 }}>
                <Typography variant="h6" fontWeight={"bold"} color={"#474A6C"}>
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "20px 152px 152px 20px",
                    width: "100%",
                    my: 4,
                  }}
                ></Box>
                <Typography color="text.secondary">{item.subtitle}</Typography>
                <Box sx={{ height: "80px" }}>
                  <BtnArrow className="btn-lg bottom-right" onClick={() => navigate(`/content/${item.uuid}`)} />
                </Box>
              </Box>
            </Grid>
          ))}
    </Grid>
  )
}

export default About
