import React, { useEffect, useState } from "react"
import { Grid, Box, Card, CardHeader, Button, CardContent, Typography, keyframes } from "@mui/material"
import Webcam from "react-webcam"
import { warning } from "@/theme/ts/colors"
import SoalPertanyaanPilgan from "./component/soalPertanyaanPilgan"
import SoalPertanyaanEssay from "./component/soalPertanyaanEssay"
import { FiberManualRecord, Mic } from "@mui/icons-material"
import { useExamHooks } from "@/hooks/useExamHooks"
import { useParams } from "react-router-dom"
import { useStartExamMutation } from "@/mutations/exam.mutation"
import { ISoalExam, ISoalExamByModuleResponse, SoalExam } from "@/interfaces/exam.interface"

const LembarUjian = () => {
  const [soal, setSoal] = useState<SoalExam | null>(null)

  const params = useParams()
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  const questionList = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    questionNo: index + 1,
  }))

  const { leftExamBeforeFinishMutation } = useStartExamMutation()
  const examMutation = leftExamBeforeFinishMutation()

  const { queryGetSoalExamByModule } = useExamHooks()
  const { data: soalExamAvailable } = queryGetSoalExamByModule(params.moduleId)

  useEffect(() => {
    if (soalExamAvailable?.data && soalExamAvailable.data.length > 0) {
      setSoal(soalExamAvailable.data[0])
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (params.activityId) {
        examMutation.mutate({ activityUuid: params.activityId })
      }

      event.preventDefault()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [soalExamAvailable])

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
          <Box>{soal && <SoalPertanyaanPilgan soal={soal} />}</Box>
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
                  <Box sx={{ display: "flex", mt: 5, justifyContent: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        mt: 5,
                        justifyContent: "center",
                        position: "relative",
                        width: 320,
                        height: 170,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />
                      <Box
                        sx={{
                          animation: "vibrate 1s infinite ease-in-out",
                          color: "red",
                          fontSize: 20,
                          position: "absolute",
                          top: 5,
                          left: 5,
                          zIndex: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FiberManualRecord />
                        Recording
                      </Box>
                      <Webcam
                        audio={false}
                        height={170}
                        screenshotFormat="image/jpeg"
                        width={400}
                        videoConstraints={videoConstraints}
                        style={{ position: "absolute", zIndex: 0, borderRadius: "15px" }}
                      />
                    </Box>
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
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.8rem" }}>
                    Keterangan:
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="body2" sx={{ mb: 0, fontSize: "0.75rem" }}>
                      Soal belum dikerjakan :{" "}
                      <Button
                        variant="outlined"
                        size="sm"
                        sx={{
                          width: "1%",
                          minWidth: 5,
                          borderRadius: 0,
                          fontSize: "0.875rem",
                        }}
                      >
                        1
                      </Button>
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      Soal sudah dikerjakan :{" "}
                      <Button
                        variant="contained"
                        size="sm"
                        sx={{
                          width: "1%",
                          minWidth: 5,
                          borderRadius: 0,
                          fontSize: "0.875rem",
                        }}
                      >
                        1
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
                <CardContent
                  sx={{
                    width: "100%",
                  }}
                >
                  <Grid container spacing={3}>
                    {soalExamAvailable?.data.map((question) => {
                      return (
                        <Grid item key={question.Uuid} xs={2} sm={1} sx={{ ml: 2 }}>
                          <Button
                            variant="outlined"
                            key={question.Uuid}
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
                            onClick={() => setSoal(soalExamAvailable.data[question.question_order - 1])}
                          >
                            {question.question_order}
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
