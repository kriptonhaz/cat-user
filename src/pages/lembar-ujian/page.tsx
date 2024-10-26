import React, { useEffect, useState } from "react"
import { Grid, Box, Card, Button, CardContent, Typography, keyframes } from "@mui/material"
import SoalPertanyaanPilgan, { answer } from "./component/soalPertanyaanPilgan"
import ExamInstruction from "./component/examInstruction"
import SoalPertanyaanEssay from "./component/soalPertanyaanEssay"
import { useExamHooks } from "@/hooks/useExamHooks"
import { useLocation, useParams } from "react-router-dom"
import { useExamMutation } from "@/mutations/exam.mutation"
import { SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import TimerAndWebcam from "./component/timerAndWebcam"
import ExamExample from "./component/examExample"
import ModalInstruction from "./component/ModalInstruction"

const LembarUjian = () => {
  const location = useLocation()
  const params = useParams()

  const [soal, setSoal] = useState<SoalExam | SoalExamLS1 | SoalExamPPI | null>(null)
  const [finalQuestion, setFinalQuestion] = useState(false)
  const [timer, setTimer] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Add state to track current question index
  const [selectedAnswer, setSelectedAnswer] = useState<{ content: string; value: number } | null>(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [timerSoal, setTimerSoal] = useState(0)
  const [modalInstruction, setModalInstruction] = useState({
    open: false,
    onClose: () => null,
    title: "",
    message: "",
    onConfirm: () => null,
  })

  const { leftExamBeforeFinishMutation, finishExamMutation, submitJawabanMutation } = useExamMutation()
  const examMutation = leftExamBeforeFinishMutation()
  const finishMutation = finishExamMutation()
  const submitMutation = submitJawabanMutation()

  const {
    queryActivityExam,
    queryGetSoalExamByModule,
    queryGetTimerUjian,
    queryGetQuestionResponseByActivity,
    queryGetInstructionByTestModule,
  } = useExamHooks()
  const { data: activityExam, isLoading: isLoadingActivity } = queryActivityExam(params.examId, params.moduleId)
  const { data: soalExamAvailable, isLoading: isLoadingSoal } = queryGetSoalExamByModule(params.moduleId)
  const { data: timerUjian, isLoading: isLoadingTimer } = queryGetTimerUjian({
    model: params.model,
    examUuid: params.examToolId,
  })
  const {
    data: questionResponseByActivity,
    refetch: refetchQuestionResponseByActivity,
    isLoading: isLoadingQuestionResponse,
  } = queryGetQuestionResponseByActivity(params.activityId)
  const { data: moduleInstruction } = queryGetInstructionByTestModule(params.model || "")

  const isSoalExamLS1 = (soal: SoalExam | SoalExamLS1 | SoalExamPPI | null): soal is SoalExamLS1 => {
    return soal !== null && "image_path_cat" in soal
  }

  const isSoalExamPPI = (soal: SoalExam | SoalExamLS1 | SoalExamPPI | null): soal is SoalExamPPI => {
    return soal !== null && "answer_data" in soal && "option_one_value" in soal.answer_data
  }

  const questionType: "SoalExamLS1" | "SoalExam" | "SoalExamPPI" = isSoalExamLS1(soal)
    ? "SoalExamLS1"
    : isSoalExamPPI(soal)
    ? "SoalExamPPI"
    : "SoalExam"

  useEffect(() => {
    refetchQuestionResponseByActivity()
  }, [currentQuestionIndex])

  useEffect(() => {
    if (soalExamAvailable?.data && soalExamAvailable.data.length > 0 && currentQuestionIndex === 0 && timerUjian) {
      if (activityExam?.data) {
        if (activityExam?.data.last_question_filled === 0) {
          setSoal(soalExamAvailable.data[0])
          setCurrentQuestionIndex(0)
        } else {
          setSoal(soalExamAvailable.data[activityExam?.data.last_question_filled])
          setCurrentQuestionIndex(activityExam?.data.last_question_filled)
        }
      }
      setFinalQuestion(false)

      if (timerUjian.data.timer_type === 1) {
        setTimer(soalExamAvailable.data[0].timer)
      } else {
        setTimer(timerUjian?.data.total_time - (activityExam?.data.total_consume_time || 0))
      }

      // Set the initial selectedAnswer based on questionResponseByActivity
      if (questionResponseByActivity?.data) {
        const currentResponse = questionResponseByActivity.data.find(
          (response) => response.question_order === currentQuestionIndex + 1
        )
        if (currentResponse) {
          setSelectedAnswer({
            content: currentResponse.user_response_content,
            value: currentResponse.user_response_value,
          })
        } else {
          setSelectedAnswer(null)
        }
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
  }, [soalExamAvailable, activityExam, questionResponseByActivity])

  useEffect(() => {
    // Update selectedAnswer when changing questions
    if (questionResponseByActivity?.data) {
      const currentResponse = questionResponseByActivity.data.find(
        (response) => response.question_order === currentQuestionIndex + 1
      )
      if (currentResponse) {
        setSelectedAnswer({
          content: currentResponse.user_response_content,
          value: currentResponse.user_response_value,
        })
      } else {
        setSelectedAnswer(null)
      }
    } else {
      setSelectedAnswer(null)
    }
  }, [currentQuestionIndex, questionResponseByActivity])

  useEffect(() => {
    if (!isLoadingTimer) {
      const timerSoal = setInterval(() => {
        setTimerSoal((prevSeconds) => prevSeconds + 1)
      }, 1000)

      return () => clearInterval(timerSoal)
    }
  }, [isLoadingTimer])

  useEffect(() => {
    if (!isLoadingTimer && timer > 0) {
      setRemainingTime(timer)
      const countdownTimer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            if (timerUjian?.data.timer_type === 1) {
              handleNextQuestion()
            } else {
              // TODO: handle timer type 2
            }
            return timer
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(countdownTimer)
    }
  }, [isLoadingTimer, timer, timerUjian?.data.timer_type])

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      handleJawab()
    } else if (soalExamAvailable?.data) {
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

  const handleJawab = () => {
    const nextQuestionAfterSubmit = () => {
      if (soalExamAvailable?.data) {
        const nextIndex = currentQuestionIndex + 1
        if (nextIndex < soalExamAvailable.data.length) {
          setSoal(soalExamAvailable.data[nextIndex])
          setCurrentQuestionIndex(nextIndex)
          setFinalQuestion(nextIndex === soalExamAvailable.data.length - 1)
          if (timerUjian?.data.timer_type === 1) {
            setTimer(soalExamAvailable.data[nextIndex].timer)
          }
          // Refetch after updating the state
          refetchQuestionResponseByActivity()
        } else if (params.activityId) {
          finishMutation.mutate({ activityUuid: params.activityId })
        }
      }
    }
    if (activityExam && selectedAnswer && soal && soal.question_type === 1) {
      const body = {
        activity_id: activityExam.data.ID,
        activity_uuid: activityExam.data.Uuid,
        question_model_id: location.state.question_model_id,
        question_model_uuid: location.state.question_model_uuid,
        question_id: soal.ID,
        question_uuid: soal.Uuid,
        question_order:
          questionType === "SoalExam" || questionType === "SoalExamPPI"
            ? soal.question_order
            : (soal as SoalExamLS1).showing_order,
        user_response_content: selectedAnswer.content,
        user_response_value: selectedAnswer.value,
        user_response_at_second: timer - remainingTime,
        total_consume_time:
          activityExam.data.user_response_at === 0 ? timerSoal : timerSoal + activityExam.data.user_response_at,
      }
      // console.log(body)
      submitMutation.mutate(
        { body },
        {
          onSuccess: () => {
            nextQuestionAfterSubmit()
          },
        }
      )
    } else {
      nextQuestionAfterSubmit()
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
            mt: 10,
          }}
        >
          <Box>
            {soal && params.activityId && (
              <>
                {soal.question_type === 1 ? (
                  <>
                    <SoalPertanyaanPilgan
                      soal={soal}
                      isFinalQuestion={finalQuestion}
                      activityId={params.activityId}
                      setAnswer={(answer: answer) => setSelectedAnswer(answer)}
                      selectedAnswer={selectedAnswer}
                      remainingTime={remainingTime}
                      timerUjian={timerUjian}
                      showInstruction={() =>
                        setModalInstruction({
                          ...modalInstruction,
                          open: true,
                          title: "Instruksi",
                          message: moduleInstruction?.data.content || "",
                        })
                      }
                    />
                  </>
                ) : soal.question_type === 2 ? (
                  <ExamExample question={soal as SoalExamLS1} remainingTime={remainingTime} />
                ) : (
                  <ExamInstruction
                    content={soal.question_content}
                    imageSrc={(soal as SoalExamLS1).image_path_cat}
                    remainingTime={remainingTime}
                  />
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "98%" }}>
                  <Button color="info" onClick={handleJawab}>
                    {finalQuestion ? "Selesai" : "Simpan dan Lanjutkan"}
                  </Button>
                  {timerUjian?.data.timer_type === 2 && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                </Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ mt: 10, height: "90vh", overflow: "auto" }}>
          <Box>
            <Grid
              sx={{
                pt: 5,
              }}
            >
              <Card
                sx={{
                  position: "sticky",
                  top: "20px",
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
                  {!isLoadingSoal && timerUjian?.data.timer_type && (
                    <TimerAndWebcam
                      tipeTimer={timerUjian.data.timer_type}
                      waktu={timer}
                      nextQuestion={handleNextQuestion}
                      questionIndex={currentQuestionIndex}
                      isLoadingTimer={isLoadingSoal}
                      handleJawab={handleJawab}
                      total_consume_time={activityExam?.data.total_consume_time || 0}
                      remainingTime={remainingTime}
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
                  padding: 0,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.8rem" }}>
                    Keterangan:
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", mr: 2, display: "flex", alignItems: "center" }}
                    >
                      Soal belum dikerjakan :{" "}
                      <Button
                        variant="contained"
                        size="sm"
                        sx={{
                          width: "1%",
                          minWidth: 5,
                          borderRadius: 0,
                          fontSize: "0.875rem",
                          backgroundColor: "white",
                          color: "#4828A3",
                          border: "1px solid #4828A3",
                          ml: 2,
                        }}
                      >
                        {/* @ts-ignore */}
                        {soalExamAvailable.data.filter((ar) => ar.question_type === 1).length -
                          (questionResponseByActivity?.data?.length || 0)}
                      </Button>
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem", display: "flex", alignItems: "center" }}>
                      Soal sudah dikerjakan :{" "}
                      <Button
                        variant="contained"
                        size="sm"
                        sx={{
                          width: "1%",
                          minWidth: 5,
                          borderRadius: 0,
                          fontSize: "0.875rem",
                          border: "1px solid #4828A3",
                          color: "white",
                          ml: 2,
                        }}
                      >
                        {questionResponseByActivity?.data?.length || 0}
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
                <CardContent
                  sx={{
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid container spacing={3} gap={2}>
                    {soalExamAvailable?.data
                      // @ts-ignore
                      ?.filter((ar) => ar.question_type === 1)
                      // @ts-ignore
                      .map((item, index) => {
                        const answeredExam = questionResponseByActivity
                        return (
                          <Grid item key={index} xs={2} sm={1}>
                            <Button
                              variant="contained"
                              key={index}
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
                                backgroundColor:
                                  questionType === "SoalExam" || questionType === "SoalExamPPI"
                                    ? answeredExam &&
                                      answeredExam?.data.filter((ar) => ar.question_order === item.question_order)
                                        .length > 0
                                      ? "#4828A3" //answered exam
                                      : currentQuestionIndex + 1 <= item.question_order
                                      ? "white" //the exam that still not answered yet
                                      : "red" //the exam that's not being answered item but already getting pass through
                                    : answeredExam &&
                                      answeredExam?.data.filter(
                                        (ar) => ar.question_order === (item as SoalExamLS1).showing_order
                                      ).length > 0
                                    ? "#4828A3" //answered exam LS1
                                    : currentQuestionIndex + 1 <= (item as SoalExamLS1).showing_order
                                    ? "white" //the exam that still not answered yet LS1
                                    : "red", //the exam that's not being answered item but already getting pass through LS1
                                color:
                                  questionType === "SoalExam" || questionType === "SoalExamPPI"
                                    ? answeredExam &&
                                      answeredExam?.data.filter((ar) => ar.question_order === item.question_order)
                                        .length > 0
                                      ? "white" //answered exam
                                      : currentQuestionIndex + 1 <= item.question_order
                                      ? "#4828A3" //the exam that still not answered yet
                                      : "white" //the exam that's not being answered item but already getting pass through
                                    : answeredExam &&
                                      answeredExam?.data.filter(
                                        (ar) => ar.question_order === (item as SoalExamLS1).showing_order
                                      ).length > 0
                                    ? "white" //answered exam LS1
                                    : currentQuestionIndex + 1 <= (item as SoalExamLS1).showing_order
                                    ? "#4828A3" //the exam that still not answered yet LS1
                                    : "white", //the exam that's not being answered item but already getting pass through LS1
                                border: "1px solid #4828A3",
                              }}
                              onClick={() => {
                                // @ts-ignore
                                const onlyExam = soalExamAvailable.data.filter((ar) => ar.question_type === 1)
                                if (timerUjian?.data.timer_type !== 1) {
                                  setSoal(onlyExam[index])
                                  setCurrentQuestionIndex(onlyExam[index].question_order - 1) // Update current question index
                                  if (index === soalExamAvailable.meta.total_data - 1) {
                                    setFinalQuestion(true)
                                  } else {
                                    setFinalQuestion(false)
                                  }
                                }
                              }}
                            >
                              {index + 1}
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
      <ModalInstruction
        open={modalInstruction.open}
        onClose={() => setModalInstruction({ ...modalInstruction, open: false })}
        title={modalInstruction.title}
        message={modalInstruction.message}
        onConfirm={() => null}
      />
    </>
  )
}

export default LembarUjian
