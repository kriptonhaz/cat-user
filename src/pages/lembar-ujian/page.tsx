import React, { act, useEffect, useState } from "react"
import { Grid, Box, Card, Button, CardContent, Typography, keyframes } from "@mui/material"
import Webcam from "react-webcam"
import { warning } from "@/theme/ts/colors"
import SoalPertanyaanPilgan, { answer } from "./component/soalPertanyaanPilgan"
import SoalPertanyaanEssay from "./component/soalPertanyaanEssay"
import { useExamHooks } from "@/hooks/useExamHooks"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useExamMutation } from "@/mutations/exam.mutation"
import { SoalExam, TimerUjian } from "@/interfaces/exam.interface"
import TimerAndWebcam from "./component/timerAndWebcam"

const LembarUjian = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [soal, setSoal] = useState<SoalExam | null>(null)
  const [finalQuestion, setFinalQuestion] = useState(false)
  const [timer, setTimer] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Add state to track current question index
  const [selectedAnswer, setSelectedAnswer] = useState<{ content: string; value: number } | null>(null)

  const params = useParams()

  const { leftExamBeforeFinishMutation } = useExamMutation()
  const examMutation = leftExamBeforeFinishMutation()

  const { finishExamMutation } = useExamMutation()
  const finishMutation = finishExamMutation()

  const { submitJawabanMutation } = useExamMutation()
  const submitMutation = submitJawabanMutation()

  const { queryActivityExam } = useExamHooks()
  const { data: activityExam, isLoading: isLoadingActivity } = queryActivityExam(params.examId, params.moduleId)

  const { queryGetSoalExamByModule } = useExamHooks()
  const { data: soalExamAvailable, isLoading: isLoadingSoal } = queryGetSoalExamByModule(params.moduleId)

  const { queryGetTimerUjian } = useExamHooks()
  const { data: timerUjian, isLoading: isLoadingTimer } = queryGetTimerUjian({
    model: params.model,
    examUuid: params.examToolId,
  })

  useEffect(() => {
    if (soalExamAvailable?.data && soalExamAvailable.data.length > 0 && currentQuestionIndex === 0 && timerUjian) {
      console.log(soalExamAvailable)
      setSoal(soalExamAvailable.data[0])
      setCurrentQuestionIndex(0)
      setFinalQuestion(false)

      if (timerUjian.data.timer_type === 1) {
        setTimer(soalExamAvailable.data[0].timer)
      } else {
        setTimer(timerUjian?.data.total_time)
      }
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
  }, [soalExamAvailable, soal])

  const handleNextQuestion = () => {
    if (soalExamAvailable?.data) {
      const nextIndex = currentQuestionIndex + 1
      if (nextIndex < soalExamAvailable.data.length) {
        setSoal(soalExamAvailable.data[nextIndex])
        setCurrentQuestionIndex(nextIndex)
        setFinalQuestion(nextIndex === soalExamAvailable.data.length - 1)

        if (timerUjian?.data.timer_type === 1) {
          setTimer(soalExamAvailable.data[nextIndex].timer)
        }
      }

      if (timerUjian?.data.timer_type === 1 && nextIndex === soalExamAvailable.data.length && params.activityId) {
        finishMutation.mutate({ activityUuid: params.activityId })
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (soalExamAvailable?.data) {
      const nextIndex = currentQuestionIndex - 1
      if (nextIndex < soalExamAvailable.data.length) {
        setSoal(soalExamAvailable.data[nextIndex])
        setCurrentQuestionIndex(nextIndex)
        setFinalQuestion(nextIndex === soalExamAvailable.data.length - 1)

        if (timerUjian?.data.timer_type === 1) {
          setTimer(soalExamAvailable.data[nextIndex].timer)
        }
      }
    }
  }

  // const handleJawab = (
  //   {questionModelId, questionModelUuid, questionId, questionUuid}:
  //     {questionModelId: number, questionModelUuid: string, questionId: number, questionUuid: string }) => {
  const handleJawab = ({ responseAt, totalConsume }: { responseAt: number; totalConsume: number }) => {
    if (activityExam && selectedAnswer && soal) {
      const body = {
        activity_id: activityExam.data.ID,
        activity_uuid: activityExam.data.Uuid,
        question_model_id: location.state.question_model_id,
        question_model_uuid: location.state.question_model_uuid,
        question_id: soal.ID,
        question_uuid: soal.Uuid,
        question_order: soal.question_order,
        user_response_content: selectedAnswer.content,
        user_response_value: selectedAnswer.value,
        user_response_at_second: totalConsume,
        total_consume_time:
          activityExam.data.user_response_at === 0 ? responseAt : responseAt + activityExam.data.user_response_at,
      }

      submitMutation.mutate({ body })

      handleNextQuestion()
    }
  }

  if (!soalExamAvailable) {
    return <>Loading...</>
  }

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
            {soal && params.activityId && (
              <>
                {
                  <SoalPertanyaanPilgan
                    soal={soal}
                    isFinalQuestion={finalQuestion}
                    activityId={params.activityId}
                    setAnswer={(answer: answer) => setSelectedAnswer(answer)}
                  />
                }
                {timerUjian?.data.timer_type === 2 && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", width: "98%" }}>
                    <Button
                      onClick={() => handlePreviousQuestion()}
                      disabled={currentQuestionIndex === 0}
                      sx={{ mr: 2 }}
                    >
                      Sebelumnya
                    </Button>
                    <Button onClick={() => handleNextQuestion()} disabled={finalQuestion}>
                      Selanjutnya
                    </Button>
                  </Box>
                )}
              </>
            )}
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
                  {!isLoadingSoal && timerUjian?.data.timer_type === 1 && (
                    <TimerAndWebcam
                      tipeTimer={1}
                      waktu={timer}
                      nextQuestion={() => handleNextQuestion()}
                      questionIndex={currentQuestionIndex}
                      isLoadingTimer={isLoadingSoal}
                      handleJawab={(responseAt, totalConsume) => handleJawab({ responseAt, totalConsume })}
                    />
                  )}
                  {!isLoadingSoal && timerUjian?.data.timer_type === 2 && (
                    <TimerAndWebcam
                      tipeTimer={2}
                      waktu={timer}
                      nextQuestion={() => handleNextQuestion()}
                      questionIndex={currentQuestionIndex}
                      isLoadingTimer={isLoadingSoal}
                      handleJawab={(responseAt, totalConsume) => handleJawab({ responseAt, totalConsume })}
                    />
                  )}
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
                    {soalExamAvailable?.data &&
                      soalExamAvailable?.data.map((question) => {
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
                              onClick={() => {
                                if (timerUjian?.data.timer_type !== 1) {
                                  setSoal(soalExamAvailable.data[question.question_order - 1])
                                  setCurrentQuestionIndex(question.question_order - 1) // Update current question index

                                  if (question.question_order === soalExamAvailable.data.length) {
                                    setFinalQuestion(true)
                                  } else {
                                    setFinalQuestion(false)
                                  }
                                }
                              }}
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
