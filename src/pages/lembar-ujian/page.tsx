import React, { useEffect, useState } from "react"
import { Grid, Box, Card, CardHeader, Button, CardContent, Typography, keyframes } from "@mui/material"
import Webcam from "react-webcam"
import { warning } from "@/theme/ts/colors"
import SoalPertanyaanPilgan from "./component/soalPertanyaanPilgan"
import SoalPertanyaanEssay from "./component/soalPertanyaanEssay"
import { FiberManualRecord, Mic } from "@mui/icons-material"

const LembarUjian = () => {
  const [remainingTime, setRemainingTime] = useState<number>(120 * 60)
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  const questionList = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    questionNo: index + 1,
  }))

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

  const vibrate = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            pt: 5,
            pl: 8,
          }}
        >
          <Box>
            <SoalPertanyaanPilgan />
            <SoalPertanyaanEssay />
          </Box>
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
                    <Box
                      sx={{
                        animation: `${vibrate} 1s infinite ease-in-out`,
                        color: "red",
                        fontSize: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FiberManualRecord />
                    </Box>
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
                <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.8rem" }}>
                    Keterangan:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0, fontSize: "0.75rem" }}>
                    Soal belum dikerjakan : <Button variant="outlined">1</Button>
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    Soal sudah dikerjakan : <Button variant="contained">1</Button>
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    maxHeight: 200,
                    width: "100%",
                  }}
                >
                  <Grid container spacing={3}>
                    {questionList.map((question) => {
                      return (
                        <Grid item key={question.id} xs={2} sm={1} sx={{ ml: 2 }}>
                          <Button
                            variant="outlined"
                            key={question.id}
                            sx={{
                              width: "100%",
                              minWidth: 30,
                              height: 30,
                              borderRadius: 0,
                              fontSize: "0.875rem",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {question.questionNo}
                          </Button>
                        </Grid>
                      )
                    })}
                  </Grid>
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
