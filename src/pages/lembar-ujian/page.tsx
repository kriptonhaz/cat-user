import React, { useEffect, useState } from "react"
import { Grid, Box, Card, CardHeader, Button, CardContent, Typography } from "@mui/material"
import Webcam from "react-webcam"
import { warning } from "@/theme/ts/colors"

const LembarUjian = () => {
  const [remainingTime, setRemainingTime] = useState<number>(120 * 60)
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return [
      hours > 0 ? String(hours).padStart(2, "0") : null,
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":")
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box>Soal Section</Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <Grid
              sx={{
                pt: 5,
              }}
            >
              <Card
                sx={{
                  width: "95%",
                  border: "0.5px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                  },
                  mb: 5,
                }}
              >
                <CardContent>
                  <Typography variant="h6">Sisa Waktu : 00:00:00</Typography>
                  <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                    <Button color="warning">Instruksi</Button>
                    <Button color="info">Simpan dan Lanjutkan</Button>
                  </Box>
                  <Box sx={{ display: "flex", mt: 5, justifyContent: "center", border: "0.5px solid #ccc" }}>
                    <Webcam
                      audio={false}
                      height={150}
                      screenshotFormat="image/jpeg"
                      width={300}
                      videoConstraints={videoConstraints}
                    />
                  </Box>
                  <Box sx={{ display: "flex", mt: 5, justifyContent: "right" }}>
                    <Typography variant="subtitle1">Waktu yang digunakan : 00:00:00</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default LembarUjian
