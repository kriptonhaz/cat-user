import { Box, Grid, Stack, SxProps, Typography } from "@mui/material"
import React, { useState } from "react"
import BtnArrow from "./BtnArrow"
import { useNavigate } from "react-router"

const styles: { card: SxProps } = {
  card: {
    backgroundColor: "#F2F2F2",
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

  return (
    <Grid container spacing={3} sx={{ my: 8 }}>
      <Grid md={4}>
        <Box sx={{ ...styles.card, height: "100%" }}>
          <Typography variant="h6" fontWeight={"bold"} color={"#474A6C"}>
            Lorem Ipsum
          </Typography>
          <Box
            sx={{
              // backgroundImage: `url(${import.meta.env.VITE_API_URL + "/laporan/files/" + item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px 152px 152px 20px",
              width: "100%",
              my: 4,
            }}
          ></Box>
          <Typography color="text.secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci inventore delectus unde, accusantium
            earum tenetur assumenda ad fugit atque{" "}
          </Typography>
          <Box sx={{ height: "80px" }}>
            <BtnArrow className="btn-lg bottom-right" onClick={() => ""} />
          </Box>
        </Box>
      </Grid>
      <Grid md={4}>
        <Box sx={{ ...styles.card, height: "100%", flex: 1, mb: 5 }}>
          <Typography variant="h6" fontWeight={"bold"} color={"#474A6C"} mb={4}>
            Lorem Ipsum
          </Typography>
          <Typography color="text.secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci inventore delectus unde, accusantium
            earum tenetur assumenda ad fugit atque{" "}
          </Typography>
          <Box sx={{ height: "80px" }}>
            <BtnArrow className="btn-lg bottom-right" onClick={() => ""} />
          </Box>
        </Box>
      </Grid>
      <Grid md={4}>
        <Box sx={{ ...styles.card, height: "100%", flex: 1 }}>
          <Typography variant="h6" fontWeight={"bold"} color={"#474A6C"} mb={4}>
            Hubungi Helpdesk
          </Typography>
          <Typography color="text.secondary">Untuk informasi dan/atau pengaduan terkait laporan</Typography>
          <Box sx={{ height: "80px" }}>
            <BtnArrow className="btn-lg bottom-right" onClick={() => ""} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default About
