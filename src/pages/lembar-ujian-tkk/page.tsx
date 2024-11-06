import { useExamHooks } from "@/hooks/useExamHooks"
import { Box, Button, Card, CardContent, Grid, Typography, SxProps } from "@mui/material"
import { useLocation, useParams } from "react-router-dom"
import TimerAndWebcam from "../lembar-ujian/component/timerAndWebcam"
import { useEffect, useRef, useState } from "react"
import { SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import ExamInstruction from "../lembar-ujian/component/examInstruction"
import { useExamMutation } from "@/mutations/exam.mutation"
import ExamExampleTkk from "../lembar-ujian/component/examExampleTkk"
import SoalPertanyaanTkk, { answer } from "../lembar-ujian/component/soalPertanyaanTkk"
import { getExamActivityByModule, getSoalExamByModule } from "@/service/exam.service"
import CardTimer from "../lembar-ujian/component/cardTimer"
import { ExamData } from "../lembar-ujian/component/exam-data"
import ModalConfirm from "@/ui/modal/ModalConfirm"

const LembarUjianTkk: React.FC = () => {
  const location = useLocation()
  const params = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const {
    queryActivityExam,
    queryGetTimerUjian,
    queryGetSoalExamByModule,
    queryGetDataTkk,
    queryGetQuestionResponseByActivity,
  } = useExamHooks()
  const { data: activityExam } = queryActivityExam(params.examId, params.moduleId)
  const { data: dataTkk, isLoading: isLoadingTimer } = queryGetDataTkk({
    model: params.model,
    examUuid: params.examToolId,
  })
  const { data: questionResponseByActivity, refetch: refetchQuestionResponseByActivity } =
    queryGetQuestionResponseByActivity(params.activityId)
  const [indexSubtestActiveTkk, setIndexSubtestActiveTkk] = useState<number | string>("")
  const {
    data: soalExamAvailable,
    isLoading: isLoadingSoal,
    refetch: refetchSoal,
  } = queryGetSoalExamByModule(
    (typeof indexSubtestActiveTkk === "number" &&
      dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid) ||
      ""
  )

  const [timer, setTimer] = useState(0)
  const [timerSoal, setTimerSoal] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Add state to track current question index
  const [soal, setSoal] = useState<SoalExam | SoalExamLS1 | SoalExamPPI | null>(null)
  const [finalQuestion, setFinalQuestion] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<{ content: string; value: number } | null>(null)
  const [multipleSelectedAnswer, setMultipleSelectedAnswer] = useState<
    { questionUuid: string; answer: { content: string; value: number } }[] | null
  >(null)
  const [selectedMultipleAnswer, setSelectedMultipleAnswer] = useState<string[]>([])
  const [disabledNextButton, setDisabledNextButton] = useState(false)
  const [fontSize, setFontSize] = useState(22)
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<string | null>(null)

  const { leftExamBeforeFinishMutation, updateExamActivityMutation, finishExamMutation, submitJawabanMutation } =
    useExamMutation()
  const examMutation = leftExamBeforeFinishMutation()
  const examActivityMutation = updateExamActivityMutation()
  const finishMutation = finishExamMutation()
  const submitMutation = submitJawabanMutation()
  const [modalConfirm, setModalConfirm] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {
      null
    },
  })

  useEffect(() => {
    if (
      typeof indexSubtestActiveTkk === "number" &&
      dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
    ) {
      refetchSoal()
    }
  }, [indexSubtestActiveTkk])

  /*  useEffect(() => {
    if (!isLoadingTimer) {
      const timerSoal = setInterval(() => {
        setTimerSoal((prevSeconds) => prevSeconds + 1)
      }, 1000)

      return () => clearInterval(timerSoal)
    }
  }, [isLoadingTimer])

  useEffect(() => {
    if (!isLoadingTimer && timer > 0 && dataTkk?.data) {
      setRemainingTime(timer)
      const countdownTimer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(countdownTimer)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(countdownTimer)
    }
  }, [isLoadingTimer, timer, dataTkk]) */

  useEffect(() => {
    if (remainingTime <= 0 && dataTkk?.data && typeof indexSubtestActiveTkk === "number") {
      if (dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1) {
        setTimer(0)
        setTimeout(() => {
          handleJawab()
        }, 300)
      } else {
        // TODO: handle timer type 2
      }
    }
  }, [remainingTime, dataTkk, indexSubtestActiveTkk])

  const checkQuestionAvailable = async () => {
    console.log('--- check question available ---')
    const currentUuid = (soal as SoalExamLS1)?.subtest_model_uuid
        const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
    console.log('1st current uuid  => ' , currentUuid)

    const activityExamDirect = await getExamActivityByModule(params.examId, params.moduleId)
    if (activityExamDirect?.data && dataTkk?.data) {
      const currentSubtestIndexTkkActivity = dataTkk?.data.detail_data.findIndex(
        (ar) => ar.subtest_model_uuid === activityExamDirect?.data.last_question_subtest
      )
      try {
        const dataSubtestQuestion = await getSoalExamByModule(activityExamDirect?.data.last_question_subtest || "")
        const currentUuid = (soal as SoalExamLS1)?.subtest_model_uuid
        const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
        console.log('current uuid => ' , currentUuid)
        if (activityExamDirect?.data.last_question_filled >= dataSubtestQuestion.data.length || currentUuid === numberFacilityUuid) {
          if (currentSubtestIndexTkkActivity >= dataTkk?.data.detail_data.length - 1) {
            if (params.activityId) {
              finishMutation.mutate({ activityUuid: params.activityId })
            }
          } else {
            setIndexSubtestActiveTkk(currentSubtestIndexTkkActivity + 1)
            setCurrentQuestionIndex(0)
          }
        } else {
          setIndexSubtestActiveTkk(currentSubtestIndexTkkActivity)
          setCurrentQuestionIndex(activityExamDirect?.data.last_question_filled)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === 0 && dataTkk && activityExam?.data) {
      if (activityExam?.data.last_question_filled === 0 || activityExam?.data.last_question_subtest === "") {
        setIndexSubtestActiveTkk(0)
        setCurrentQuestionIndex(0)
      } else {
        checkQuestionAvailable()

        // NOTE: only for testing
        // setIndexSubtestActiveTkk(0)
        // setCurrentQuestionIndex(0)
      }
      // setFinalQuestion(false)

      // if (dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1) {
      //   setTimer(soalExamAvailable.data[0].timer)
      // } else {
      //   // setTimer(timerUjian?.data.total_time - (activityExam?.data.total_consume_time || 0))
      // }

      // // Set the initial selectedAnswer based on questionResponseByActivity
      // if (questionResponseByActivity?.data) {
      //   const currentResponse = questionResponseByActivity.data.find(
      //     (response) => response.question_order === currentQuestionIndex + 1
      //   )
      //   // TODO: handle multiple choice
      //   // if (currentResponse) {
      //   //   setSelectedAnswer({
      //   //     content: currentResponse.user_response_content,
      //   //     value: currentResponse.user_response_value,
      //   //   })
      //   // } else {
      //   //   setSelectedAnswer(null)
      //   // }
      // }
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
  }, [activityExam, questionResponseByActivity, indexSubtestActiveTkk, refetchSoal, dataTkk])

  useEffect(() => {
    if (soalExamAvailable?.data && dataTkk?.data && typeof indexSubtestActiveTkk === "number") {
      setSoal(soalExamAvailable.data[currentQuestionIndex])
      if (dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1) {
        setTimer(soalExamAvailable.data[0].timer)
      } else {
        setTimer(
          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.total_time -
            (activityExam?.data.total_consume_time || 0)
        )
      }
    }
  }, [soalExamAvailable, currentQuestionIndex, dataTkk])

  const onIncreaseFont = () => {
    setFontSize(fontSize + 1)
  }

  const onDecreaseFont = () => {
    setFontSize(fontSize - 1)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      handleJawab()
    } else {
      nextQuestionAfterSubmit()
    }
  }

  const handlePreviousQuestion = () => {
    // TODO: handle logic here for TKK
    // if (soalExamAvailable?.data) {
    //   const nextIndex = currentQuestionIndex - 1
    //   if (nextIndex < soalExamAvailable.data.length) {
    //     setSoal(soalExamAvailable.data[nextIndex])
    //     setCurrentQuestionIndex(nextIndex)
    //     setFinalQuestion(nextIndex === soalExamAvailable.data.length - 1)
    //     if (timerUjian?.data.timer_type === 1) {
    //       setTimer(soalExamAvailable.data[nextIndex].timer)
    //     }
    //   }
    // }
  }

  const nextQuestionAfterSubmit = () => {
    console.log('------- next question after submit -----')
    const curentUuid = (soal as SoalExamLS1)?.subtest_model_uuid
            const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
    
            console.log('1st condition => ' , soalExamAvailable?.data && curentUuid !== numberFacilityUuid && soal.question_type !== 1,soalExamAvailable?.data,(soal.question_type !== 1 && curentUuid !== numberFacilityUuid ))
    if (soalExamAvailable?.data || (soal.question_type !== 1 && curentUuid !== numberFacilityUuid ) ) {
      const soalIndex = soalExamAvailable.data.findIndex(
        (ar) => (ar as SoalExamLS1).uuid === (soal as SoalExamLS1).uuid
      )
      const nextIndex = soalIndex + 1
      if (nextIndex < soalExamAvailable.data.length) {
        // condition when the next question is still in the same subtest
        setSoal(soalExamAvailable.data[nextIndex])
        setCurrentQuestionIndex(nextIndex)
        setFinalQuestion(nextIndex === soalExamAvailable.data.length - 1)
        if (
          typeof indexSubtestActiveTkk === "number" &&
          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1
        ) {
          setTimer(soalExamAvailable.data[nextIndex].timer)
        } else if (typeof indexSubtestActiveTkk === "number") {
          console.log("timer_type 2", dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type)
        }
        // Refetch after updating the state
        refetchQuestionResponseByActivity()
      } else if (nextIndex >= soalExamAvailable.data.length || curentUuid === numberFacilityUuid) {
        // condition when the next question is in a new subtest
        console.log('---- else next question after submit ----')
        checkQuestionAvailable()
      }
    }
  }
  


  const handleJawab = (answer?: { content: string; value: number }, question?: SoalExamLS1) => {
    if (
      activityExam &&
      soal &&
      soal.question_type === 1 &&
      (selectedAnswer || selectedMultipleAnswer.length > 0 || (multipleSelectedAnswer?.length || 0) > 0)
    ) {
      const body = {
        activity_id: activityExam.data.ID,
        activity_uuid: activityExam.data.Uuid,
        question_model_id: location.state.question_model_id,
        question_model_uuid: location.state.question_model_uuid,
        question_id: soal.ID,
        question_uuid: question?.uuid || (soal as SoalExamLS1).uuid,
        question_order: question?.showing_order || (soal as SoalExamLS1).showing_order,
        user_response_content:
          (soal as SoalExamLS1).total_answer_should_have_for_true === 1
            ? !!answer
              ? answer.content
              : selectedAnswer && selectedAnswer.content
            : JSON.stringify(selectedMultipleAnswer),
        user_response_value:
          (soal as SoalExamLS1).total_answer_should_have_for_true === 1
            ? !!answer
              ? answer.value
              : selectedAnswer && selectedAnswer.value
            : 0,
        user_response_at_second: timer - remainingTime,
        total_consume_time:
          activityExam.data.user_response_at === 0 ? timerSoal : timerSoal + activityExam.data.user_response_at,
        subtest_id: (soal as SoalExamLS1).subtest_model_id,
        subtest_uuid: (soal as SoalExamLS1).subtest_model_uuid,
      }
      console.log("------ submit answer body --------")
      console.log(body)
      submitMutation.mutate(
        // @ts-ignore
        { body },
        {
          onSuccess: () => {
            const curentUuid = (soal as SoalExamLS1)?.subtest_model_uuid
            const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid

            if (curentUuid !== numberFacilityUuid) {
              nextQuestionAfterSubmit()
              setSelectedMultipleAnswer([])
            } else {
              refetchQuestionResponseByActivity().then((res) => {
                console.log('---- after refetch ----')
                if(soalExamAvailable?.data && !answer) {
                  const totalAnswer = res.data?.data.length || 0
                  const notAnsweredQuestion =
                    soalExamAvailable?.data.filter((ar) => ar.question_type === 1).length - totalAnswer
                  if (dataTkk?.data?.detail_data[indexSubtestActiveTkk]?.subtest_model_data?.is_must_fill_all_question === true && notAnsweredQuestion > 0) {
                    setModalConfirm({
                      ...modalConfirm,
                      open: true,
                      title:
                        "Anda belum menjawab semua pertanyaan, harap isi semua pertanyaan sebelum menyelesaikan ujian!",
                      onConfirm: () => {
                        setModalConfirm({
                          ...modalConfirm,
                          open: false,
                          title: "",
                          onConfirm: () => null,
                        })
                      },
                    })
                  } else {
                    setModalConfirm({
                      ...modalConfirm,
                      open: true,
                      title: "Apa anda yakin ingin menyelesaikan ujian ini?",
                      onConfirm: () => {
                        if(curentUuid === numberFacilityUuid) {
                          checkQuestionAvailable()
                        }
                        // if (params.activityId) {
                        //   finishMutation.mutate({ activityUuid: params.activityId })
                        // }
                      },
                    })
                  }
                }
              })
            }
          },
        }
      )
    } else {
      console.log("skip")
      nextQuestionAfterSubmit()
    }
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
            <>
              {soal && params.activityId && (
                <>
                  {soal.question_type === 3 && (
                    <ExamInstruction
                      content={soal.question_content}
                      imageSrc={(soal as SoalExamLS1).image_path_cat}
                      remainingTime={remainingTime}
                      showInstructionLabel
                      subtestNumber={
                        (typeof indexSubtestActiveTkk === "number" &&
                          dataTkk?.data.detail_data[indexSubtestActiveTkk].name) ||
                        ""
                      }
                      subtestName={soal.narrow_data.name}
                      showTimer={
                        typeof indexSubtestActiveTkk === "number" &&
                        dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                      }
                    />
                  )}
                  {soal.question_type === 2 && (
                    <ExamExampleTkk
                      question={soal as SoalExamLS1}
                      remainingTime={remainingTime}
                      showExampleLabel
                      subtestNumber={
                        (typeof indexSubtestActiveTkk === "number" &&
                          dataTkk?.data.detail_data[indexSubtestActiveTkk].name) ||
                        ""
                      }
                      subtestName={soal.narrow_data.name}
                      nextQuestion={handleJawab}
                      setDisableNextButton={(val) => {
                        setDisabledNextButton(val)
                      }}
                      showTimer={
                        typeof indexSubtestActiveTkk === "number" &&
                        dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                      }
                    />
                  )}
                  {soal.question_type === 1 &&
                    (soal as SoalExamLS1).subtest_model_uuid ===
                      ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid && (
                      <CardTimer
                        onIncreaseFont={onIncreaseFont}
                        onDecreaseFont={onDecreaseFont}
                        remainingTime={remainingTime}
                        timerType={
                          (typeof indexSubtestActiveTkk === "number" &&
                            dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type) ||
                          0
                        }
                        subtestNumber={
                          (typeof indexSubtestActiveTkk === "number" &&
                            dataTkk?.data.detail_data[indexSubtestActiveTkk].name) ||
                          ""
                        }
                        subtestName={soal.narrow_data.name}
                        showTimer={
                          typeof indexSubtestActiveTkk === "number" &&
                          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                        }
                      />
                    )}
                  {(soal as SoalExamLS1).subtest_model_uuid ===
                    ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid &&
                    soal.question_type === 1 &&
                    soalExamAvailable?.data
                      // @ts-ignore
                      .filter((ar) => ar.question_type === 1)
                      // @ts-ignore
                      .map((item) => {
                        return (
                          <>
                            <SoalPertanyaanTkk
                              key={(item as SoalExamLS1).uuid}
                              // @ts-ignore
                              ref={selectedQuestionNumber === (item as SoalExamLS1).uuid ? ref : undefined}
                              soal={item}
                              fontSize={fontSize}
                              onIncreaseFont={onIncreaseFont}
                              onDecreaseFont={onDecreaseFont}
                              setAnswer={(answer: answer) => {
                                const currentUuid = (soal as SoalExamLS1)?.subtest_model_uuid
                                const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0]
                                  .examUuid
                                if (currentUuid === numberFacilityUuid) {
                                  // TODO[Latif]: handle answer scoring here
                                  handleJawab(answer, item as SoalExamLS1)
                                  // @ts-ignore
                                  const questionUuid = item.uuid
                                  // @ts-ignore
                                  setMultipleSelectedAnswer((prev) => {
                                    const isExist = prev?.find((i) => i.questionUuid === questionUuid)
                                    if (isExist) {
                                      return prev
                                        ?.filter((i) => !!i.questionUuid)
                                        .map((i) =>
                                          i.questionUuid === questionUuid ? { questionUuid: questionUuid, answer } : i
                                        )
                                    }
                                    return [
                                      ...(prev?.filter((i) => !!i.answer.content) || []),
                                      { questionUuid: questionUuid, answer },
                                    ]
                                  })
                                } else {
                                  if ((soal as SoalExamLS1).total_answer_should_have_for_true === 1) {
                                    setSelectedAnswer(answer)
                                  } else {
                                    if (selectedMultipleAnswer.filter((ar) => ar === answer.content).length > 0) {
                                      setSelectedMultipleAnswer(
                                        selectedMultipleAnswer.filter((ar) => ar !== answer.content)
                                      )
                                    } else {
                                      setSelectedMultipleAnswer([...selectedMultipleAnswer, answer.content])
                                    }
                                  }
                                }
                              }}
                              selectedAnswer={
                                (soal as SoalExamLS1)?.subtest_model_uuid ===
                                ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
                                  ? multipleSelectedAnswer?.find((i) => i.questionUuid === item?.uuid!)?.answer
                                  : selectedAnswer
                              }
                              remainingTime={remainingTime}
                              timerType={
                                (typeof indexSubtestActiveTkk === "number" &&
                                  dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type) ||
                                0
                              }
                              subtestNumber={
                                (typeof indexSubtestActiveTkk === "number" &&
                                  dataTkk?.data.detail_data[indexSubtestActiveTkk].name) ||
                                ""
                              }
                              subtestName={soal.narrow_data.name}
                              setDisableNextButton={(val) => {
                                setDisabledNextButton(val)
                              }}
                              showTimer={
                                typeof indexSubtestActiveTkk === "number" &&
                                dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                              }
                            />
                          </>
                        )
                      })}
                  {(soal as SoalExamLS1).subtest_model_uuid ===
                    ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid &&
                    soal.question_type === 1 &&
                    soalExamAvailable?.data
                      // @ts-ignore
                      .filter((ar) => ar.question_type === 1)
                      // @ts-ignore
                      .map((item) => {
                        return (
                          <>
                            <SoalPertanyaanTkk
                              key={(item as SoalExamLS1).uuid}
                              // @ts-ignore
                              ref={selectedQuestionNumber === (item as SoalExamLS1).uuid ? ref : undefined}
                              soal={item}
                              fontSize={fontSize}
                              onIncreaseFont={onIncreaseFont}
                              onDecreaseFont={onDecreaseFont}
                              setAnswer={(answer: answer) => {
                                const currentUuid = (soal as SoalExamLS1)?.subtest_model_uuid
                                const numberFacilityUuid = ExamData.filter(
                                  (ar) => ar.examName === "Perceptual Speed – comparison"
                                )[0].examUuid
                                if (currentUuid === numberFacilityUuid) {
                                  // TODO[Latif]: handle answer scoring here
                                  handleJawab(answer, item as SoalExamLS1)
                                  // @ts-ignore
                                  const questionUuid = item.uuid
                                  // @ts-ignore
                                  setMultipleSelectedAnswer((prev) => {
                                    const isExist = prev?.find((i) => i.questionUuid === questionUuid)
                                    if (isExist) {
                                      return prev
                                        ?.filter((i) => !!i.questionUuid)
                                        .map((i) =>
                                          i.questionUuid === questionUuid ? { questionUuid: questionUuid, answer } : i
                                        )
                                    }
                                    return [
                                      ...(prev?.filter((i) => !!i.answer.content) || []),
                                      { questionUuid: questionUuid, answer },
                                    ]
                                  })
                                } else {
                                  if ((soal as SoalExamLS1).total_answer_should_have_for_true === 1) {
                                    setSelectedAnswer(answer)
                                  } else {
                                    if (selectedMultipleAnswer.filter((ar) => ar === answer.content).length > 0) {
                                      setSelectedMultipleAnswer(
                                        selectedMultipleAnswer.filter((ar) => ar !== answer.content)
                                      )
                                    } else {
                                      setSelectedMultipleAnswer([...selectedMultipleAnswer, answer.content])
                                    }
                                  }
                                }
                              }}
                              selectedAnswer={
                                (soal as SoalExamLS1)?.subtest_model_uuid ===
                                ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid
                                  ? multipleSelectedAnswer?.find((i) => i.questionUuid === item?.uuid!)?.answer
                                  : selectedAnswer
                              }
                              remainingTime={remainingTime}
                              timerType={
                                (typeof indexSubtestActiveTkk === "number" &&
                                  dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type) ||
                                0
                              }
                              subtestNumber={
                                (typeof indexSubtestActiveTkk === "number" &&
                                  dataTkk?.data.detail_data[indexSubtestActiveTkk].name) ||
                                ""
                              }
                              subtestName={soal.narrow_data.name}
                              setDisableNextButton={(val) => {
                                setDisabledNextButton(val)
                              }}
                              showTimer={
                                typeof indexSubtestActiveTkk === "number" &&
                                dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                              }
                            />
                          </>
                        )
                      })}
                  {(soal as SoalExamLS1).subtest_model_uuid !==
                    ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid &&
                    soal.question_type === 1 && (
                      <SoalPertanyaanTkk
                        soal={soal}
                        fontSize={fontSize}
                        onIncreaseFont={onIncreaseFont}
                        onDecreaseFont={onDecreaseFont}
                        setAnswer={(answer: answer) => {
                          if ((soal as SoalExamLS1).total_answer_should_have_for_true === 1) {
                            setSelectedAnswer(answer)
                          } else {
                            if (selectedMultipleAnswer.filter((ar) => ar === answer.content).length > 0) {
                              setSelectedMultipleAnswer(selectedMultipleAnswer.filter((ar) => ar !== answer.content))
                            } else {
                              setSelectedMultipleAnswer([...selectedMultipleAnswer, answer.content])
                            }
                          }
                        }}
                        selectedAnswer={selectedAnswer}
                        remainingTime={remainingTime}
                        timerType={
                          (typeof indexSubtestActiveTkk === "number" &&
                            dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type) ||
                          0
                        }
                        subtestNumber={
                          (typeof indexSubtestActiveTkk === "number" &&
                            dataTkk?.data.detail_data[indexSubtestActiveTkk].name) ||
                          ""
                        }
                        subtestName={soal.narrow_data.name}
                        setDisableNextButton={(val) => {
                          setDisabledNextButton(val)
                        }}
                        showTimer={
                          typeof indexSubtestActiveTkk === "number" &&
                          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                        }
                      />
                    )}
                </>
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "98%" }}>
                <Button
                  color={disabledNextButton ? "primary" : "info"}
                  onClick={() => handleJawab()}
                  disabled={disabledNextButton}
                >
                  {soal?.question_type === 2 || soal?.question_type === 3
                    ? "Lanjutkan"
                    : finalQuestion ||
                      (soal &&
                        (soal as SoalExamLS1).subtest_model_uuid ===
                          ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid)
                    ? "Selesai"
                    : "Simpan dan Lanjutkan"}
                </Button>
                {typeof indexSubtestActiveTkk === "number" &&
                  dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 2 && (
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
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            mt: 10,
            height: "90vh",
            overflow: "auto",
            position:
              soal &&
              (soal as SoalExamLS1).subtest_model_uuid ===
                ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
                ? "sticky"
                : "relative",
            top: "70px",
          }}
        >
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
                  {!isLoadingSoal &&
                    typeof indexSubtestActiveTkk === "number" &&
                    dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type && (
                      <TimerAndWebcam
                        tipeTimer={dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type}
                        waktu={timer}
                        nextQuestion={handleNextQuestion}
                        questionIndex={currentQuestionIndex}
                        isLoadingTimer={isLoadingSoal}
                        handleJawab={handleJawab}
                        total_consume_time={activityExam?.data.total_consume_time || 0}
                        remainingTime={remainingTime}
                        showTimer={
                          typeof indexSubtestActiveTkk === "number" &&
                          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_usage_timer
                        }
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
                        {soalExamAvailable &&
                          typeof indexSubtestActiveTkk === "number" &&
                          // @ts-ignore
                          soalExamAvailable?.data.filter((ar) => ar.question_type === 1).length -
                            (questionResponseByActivity?.data?.filter(
                              (ar) =>
                                ar.subtest_uuid === dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
                            ).length || 0)}
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
                        {(typeof indexSubtestActiveTkk === "number" &&
                          questionResponseByActivity?.data?.filter(
                            (ar) =>
                              ar.subtest_uuid === dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
                          ).length) ||
                          0}
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
                    {typeof indexSubtestActiveTkk === "number" &&
                      soalExamAvailable?.data
                        // @ts-ignore
                        ?.filter((ar) => ar.question_type === 1)
                        // @ts-ignore
                        .map((item, index) => {
                          const answeredExam = questionResponseByActivity?.data.filter(
                            (ar) =>
                              ar.subtest_uuid === dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
                          )
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
                                    answeredExam &&
                                    answeredExam?.filter(
                                      (ar) => ar.question_order === (item as SoalExamLS1).showing_order
                                    ).length > 0
                                      ? "#4828A3" //answered exam LS1
                                      : currentQuestionIndex + 1 <= (item as SoalExamLS1).showing_order
                                      ? "white" //the exam that still not answered yet LS1
                                      : (item as SoalExamLS1).subtest_model_uuid !==
                                        activityExam?.data.last_question_subtest
                                      ? "white"
                                      : "red", //the exam that's not being answered item but already getting pass through LS1
                                  color:
                                    answeredExam &&
                                    answeredExam?.filter(
                                      (ar) => ar.question_order === (item as SoalExamLS1).showing_order
                                    ).length > 0
                                      ? "white" //answered exam LS1
                                      : currentQuestionIndex + 1 <= (item as SoalExamLS1).showing_order
                                      ? "#4828A3" //the exam that still not answered yet LS1
                                      : (item as SoalExamLS1).subtest_model_uuid !==
                                        activityExam?.data.last_question_subtest
                                      ? "#4828A3"
                                      : "white", //the exam that's not being answered item but already getting pass through LS1
                                  border: "1px solid #4828A3",
                                }}
                                onClick={() => {
                                  if (
                                    (soal as SoalExamLS1).subtest_model_uuid ===
                                    ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
                                  ) {
                                    setSelectedQuestionNumber((item as SoalExamLS1).uuid)
                                    setTimeout(() => {
                                      if (ref) {
                                        ref?.current?.scrollIntoView({
                                          behavior: "smooth",
                                          block: "center",
                                          inline: "nearest",
                                        })
                                      }
                                    }, 500)
                                  }
                                  // @ts-ignore
                                  // const onlyExam = soalExamAvailable.data.filter((ar) => ar.question_type === 1)
                                  // if (timerUjian?.data.timer_type !== 1) {
                                  // setSoal(onlyExam[index])
                                  // setCurrentQuestionIndex(onlyExam[index].question_order - 1) // Update current question index
                                  //   if (index === soalExamAvailable.meta.total_data - 1) {
                                  //     setFinalQuestion(true)
                                  //   } else {
                                  //     setFinalQuestion(false)
                                  //   }
                                  // }
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
      {/* !TODO[Latif]: Add modal */}
      <ModalConfirm
        open={!!modalConfirm.open}
        onClose={() => setModalConfirm({ ...modalConfirm, open: false })}
        title={modalConfirm.title}
        message={modalConfirm.message}
        onConfirm={modalConfirm.onConfirm}
      />
    </>
  )
}

export default LembarUjianTkk
