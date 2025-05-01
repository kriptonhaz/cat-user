import { useExamHooks } from "@/hooks/useExamHooks"
import { Box, Button, Card, CardContent, Grid, Typography, Stack } from "@mui/material"
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
import ModalConfirm, { ModalConfirmProps } from "@/ui/modal/ModalConfirm"
import useConfigStore from "@/store/config.store"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const LembarUjianTkk: React.FC = () => {
  const location = useLocation()
  const params = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const configStore = useConfigStore((state) => state)
  const { queryActivityExam, queryGetSoalExamByModule, queryGetDataTkk, queryGetQuestionResponseByActivity } =
    useExamHooks()
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

  const [canGoBack, setCanGoBack] = useState(false)
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
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<string | null>(null)
  const [maxVisitedIndex, setMaxVisitedIndex] = useState<number>(0)

  const { leftExamBeforeFinishMutation, updateExamActivityMutation, finishExamMutation, submitJawabanMutation } =
    useExamMutation()
  const examMutation = leftExamBeforeFinishMutation()
  const examActivityMutation = updateExamActivityMutation()
  const finishMutation = finishExamMutation()
  const submitMutation = submitJawabanMutation()
  const [modalConfirm, setModalConfirm] = useState<ModalConfirmProps>({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {
      return null
    },
    onClose: () => {
      setModalConfirm((prev) => ({ ...prev, open: false, title: "", message: "", displayCancel: true }))
    },
    displayCancel: true,
  })

  useEffect(() => {
    if (
      typeof indexSubtestActiveTkk === "number" &&
      dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
    ) {
      refetchSoal()
    }
  }, [indexSubtestActiveTkk])

  useEffect(() => {
    if (soalExamAvailable) {
      const currentIndex = soalExamAvailable.data.findIndex(
        (item) => (item as SoalExamLS1).uuid === (soal as SoalExamLS1)?.uuid
      )
      setMaxVisitedIndex((prev) => Math.max(prev, currentIndex))
    }
  }, [soal])

  useEffect(() => {
    setMaxVisitedIndex((prev) => Math.max(prev, currentQuestionIndex))
  }, [currentQuestionIndex])

  useEffect(() => {
    if (soal && questionResponseByActivity) {
      const responseSoal = questionResponseByActivity.data.filter(
        (ar) => ar.question_uuid === (soal as SoalExamLS1).uuid
      )
      if (responseSoal.length > 0) {
        if ((soal as SoalExamLS1)?.total_answer_should_have_for_true === 1) {
          setSelectedAnswer({
            value: responseSoal[0].user_response_value,
            content: responseSoal[0].user_response_content,
          })
        } else {
          try {
            const parsedContent = JSON.parse(responseSoal[0].user_response_content)
            if (Array.isArray(parsedContent)) {
              setSelectedMultipleAnswer(parsedContent)
            } else {
              console.warn("Parsed content is not an array:", parsedContent)
            }
          } catch (error) {
            console.error("Error parsing JSON:", error, responseSoal[0].user_response_content)
          }
        }
      }
    }
  }, [soal, questionResponseByActivity])

  useEffect(() => {
    const currentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
    const memorySpanUuid = ExamData.filter((ar) => ar.examName === "Memory Span")[0].examUuid
    const workingMemoryUuid = ExamData.filter((ar) => ar.examName === "Working Memory")[0].examUuid
    if (
      soal &&
      soal.question_type === 1 &&
      (soal as SoalExamLS1)?.total_answer_should_have_for_true === 2 &&
      selectedMultipleAnswer.filter((ar) => ar !== "").length < 2
    ) {
      setDisabledNextButton(true)
    } else if (currentUuid !== memorySpanUuid && currentUuid !== workingMemoryUuid) {
      setDisabledNextButton(false)
    }
  }, [soal, selectedMultipleAnswer])

  const submitWithoutNextSingle = (answer: answer) => {
    if (answer && activityExam && soal && soal.question_type === 1 && answer.content !== "") {
      const body = {
        activity_id: activityExam.data.ID,
        activity_uuid: activityExam.data.Uuid,
        question_model_id: location.state.question_model_id,
        question_model_uuid: location.state.question_model_uuid,
        question_id: soal.ID,
        question_uuid: (soal as SoalExamLS1).uuid,
        question_order: (soal as SoalExamLS1).showing_order,
        user_response_content: answer && answer.content,
        user_response_value: answer && answer.value,
        user_response_at_second: timer - remainingTime,
        total_consume_time:
          activityExam.data.user_response_at === 0 ? timerSoal : timerSoal + activityExam.data.user_response_at,
        subtest_id: (soal as SoalExamLS1).subtest_model_id,
        subtest_uuid: (soal as SoalExamLS1).subtest_model_uuid,
      }
      // console.log("submit without next single")
      submitMutation.mutate(
        // @ts-ignore
        { body },
        {
          onSuccess: () => {
            refetchQuestionResponseByActivity()
          },
        }
      )
    }
  }

  const submitWithoutNextMultiple = (answer: string[]) => {
    if (
      answer &&
      answer.length === 2 &&
      activityExam &&
      soal &&
      soal.question_type === 1 &&
      (answer || selectedMultipleAnswer.length > 0 || (multipleSelectedAnswer?.length || 0) > 0)
    ) {
      const body = {
        activity_id: activityExam.data.ID,
        activity_uuid: activityExam.data.Uuid,
        question_model_id: location.state.question_model_id,
        question_model_uuid: location.state.question_model_uuid,
        question_id: soal.ID,
        question_uuid: (soal as SoalExamLS1).uuid,
        question_order: (soal as SoalExamLS1).showing_order,
        user_response_content: JSON.stringify(answer),
        user_response_value: 0,
        user_response_at_second: timer - remainingTime,
        total_consume_time:
          activityExam.data.user_response_at === 0 ? timerSoal : timerSoal + activityExam.data.user_response_at,
        subtest_id: (soal as SoalExamLS1).subtest_model_id,
        subtest_uuid: (soal as SoalExamLS1).subtest_model_uuid,
      }
      submitMutation.mutate(
        // @ts-ignore
        { body },
        {
          onSuccess: () => {
            refetchQuestionResponseByActivity()
          },
        }
      )
    }
  }

  const submitWithoutNextScrolling = (props: { answer: answer; question: SoalExamLS1; source: string }) => {
    const { answer, question } = props
    if (answer && activityExam && soal && soal.question_type === 1 && answer.content !== "") {
      const body = {
        activity_id: activityExam.data.ID,
        activity_uuid: activityExam.data.Uuid,
        question_model_id: location.state.question_model_id,
        question_model_uuid: location.state.question_model_uuid,
        question_id: question.ID,
        question_uuid: question.uuid,
        question_order: question.showing_order,
        user_response_content: answer && answer.content,
        user_response_value: answer && answer.value,
        user_response_at_second: timer - remainingTime,
        total_consume_time:
          activityExam.data.user_response_at === 0 ? timerSoal : timerSoal + activityExam.data.user_response_at,
        subtest_id: question.subtest_model_id,
        subtest_uuid: question.subtest_model_uuid,
      }
      // console.log("submit without next scrolling")
      submitMutation.mutate(
        // @ts-ignore
        { body },
        {
          onSuccess: () => {
            refetchQuestionResponseByActivity()
          },
        }
      )
    }
  }

  useEffect(() => {
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
  }, [isLoadingTimer, timer, dataTkk])

  useEffect(() => {
    const currentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
    const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
    const perceptualSpeedComparisonUuid = ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0]
      .examUuid
    const memorySpanUuid = ExamData.filter((ar) => ar.examName === "Memory Span")[0].examUuid
    const workingMemoryUuid = ExamData.filter((ar) => ar.examName === "Working Memory")[0].examUuid

    if (remainingTime <= 0 && dataTkk?.data && typeof indexSubtestActiveTkk === "number") {
      if (
        dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1 &&
        soal &&
        currentUuid !== numberFacilityUuid &&
        currentUuid !== perceptualSpeedComparisonUuid &&
        currentUuid !== memorySpanUuid &&
        currentUuid !== workingMemoryUuid
      ) {
        setTimer(0)
        setTimeout(() => {
          handleJawab({ source: "timeout" })
        }, 300)
      } else {
        // TODO: handle timer type 2
      }
    }
  }, [remainingTime, dataTkk, indexSubtestActiveTkk])

  const checkQuestionAvailable = async () => {
    const activityExamDirect = await getExamActivityByModule(params.examId, params.moduleId)
    if (activityExamDirect?.data && dataTkk?.data) {
      const currentSubtestIndexTkkActivity = dataTkk?.data.detail_data.findIndex(
        (ar) => ar.subtest_model_uuid === activityExamDirect?.data.last_question_subtest
      )
      try {
        if (activityExamDirect?.data.last_question_subtest !== "") {
          const dataSubtestQuestion = await getSoalExamByModule(activityExamDirect?.data.last_question_subtest)
          if (activityExamDirect?.data.last_question_filled >= dataSubtestQuestion.data.length) {
            if (currentSubtestIndexTkkActivity >= dataTkk?.data.detail_data.length - 1) {
              if (params.activityId) {
                setModalConfirm({
                  ...modalConfirm,
                  open: true,
                  title: "Apa anda yakin ingin menyelesaikan ujian ini?",
                  onConfirm: () => {
                    setModalConfirm({
                      ...modalConfirm,
                      open: false,
                      title: "",
                    })
                    finishMutation.mutate({ activityUuid: params.activityId || "" })
                  },
                  displayCancel: true,
                })
              }
            } else {
              setIndexSubtestActiveTkk(currentSubtestIndexTkkActivity + 1)
              setCurrentQuestionIndex(0)
            }
          } else {
            setIndexSubtestActiveTkk(currentSubtestIndexTkkActivity)
            setCurrentQuestionIndex(activityExamDirect?.data.last_question_filled)
            if (
              activityExamDirect?.data.last_question_filled + 1 ===
              (dataSubtestQuestion.data[dataSubtestQuestion.data.length - 1] as SoalExamLS1).showing_order
            ) {
              setFinalQuestion(true)
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === 0 && dataTkk && activityExam?.data) {
      const checkActivity = async () => {
        const activityExamDirect = await getExamActivityByModule(params.examId, params.moduleId)
        if (
          activityExamDirect?.data.last_question_filled === 0 ||
          activityExamDirect?.data.last_question_subtest === ""
        ) {
          setIndexSubtestActiveTkk(0)
          setCurrentQuestionIndex(0)
        } else {
          // checkQuestionAvailable()

          // NOTE: only for testing
          setIndexSubtestActiveTkk(0)
          setCurrentQuestionIndex(0)
        }
      }
      checkActivity()
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

  useEffect(() => {
    if (dataTkk && typeof indexSubtestActiveTkk === "number") {
      if (dataTkk.data.detail_data[indexSubtestActiveTkk]) {
        setCanGoBack(dataTkk.data.detail_data[indexSubtestActiveTkk].subtest_model_data.can_go_back)
      }
    }
  }, [indexSubtestActiveTkk, dataTkk])

  const handleNextQuestion = () => {
    if (selectedAnswer || selectedMultipleAnswer.length > 0) {
      handleJawab({ source: "handleNextQuestion" })
    } else {
      nextQuestionAfterSubmit()
    }
    setSelectedMultipleAnswer([])
  }

  const handlePreviousQuestion = () => {
    if (soalExamAvailable?.data) {
      const nextIndex = currentQuestionIndex - 1
      if (nextIndex < soalExamAvailable.data.length) {
        setSoal(soalExamAvailable.data[nextIndex])
        setCurrentQuestionIndex(nextIndex)
      }
    }
  }

  const nextQuestionAfterSubmit = () => {
    setSelectedAnswer(null)
    setSelectedMultipleAnswer([])
    const curentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
    const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
    const perceptualSpeedComparisonUuid = ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0]
      .examUuid
    if (soalExamAvailable?.data) {
      const soalIndex = soalExamAvailable.data.findIndex(
        (ar) => (ar as SoalExamLS1).uuid === (soal as SoalExamLS1).uuid
      )
      const nextIndex = soalIndex + 1
      if (
        nextIndex < soalExamAvailable?.data.length &&
        (soal?.question_type !== 1 || curentUuid !== numberFacilityUuid || curentUuid !== perceptualSpeedComparisonUuid)
      ) {
        // condition when the next question is still in the same subtest
        setSoal(soalExamAvailable?.data[nextIndex])
        setCurrentQuestionIndex(nextIndex)
        setFinalQuestion(nextIndex === soalExamAvailable.data.length - 1)
        if (
          typeof indexSubtestActiveTkk === "number" &&
          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1
        ) {
          setTimer(soalExamAvailable?.data[nextIndex].timer)
        } else if (typeof indexSubtestActiveTkk === "number") {
          console.log("timer_type 2", dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type)
        }
        // Refetch after updating the state
        refetchQuestionResponseByActivity()
      } else if (
        nextIndex >= soalExamAvailable?.data.length ||
        curentUuid === numberFacilityUuid ||
        curentUuid === perceptualSpeedComparisonUuid
      ) {
        // condition when the next question is in a new subtest
        if (curentUuid === numberFacilityUuid || curentUuid === perceptualSpeedComparisonUuid) {
          checkQuestionAvailable()
        } else {
          setModalConfirm({
            ...modalConfirm,
            open: true,
            title: "Subtest ini telah selesai, anda akan melanjutkan ke subtest berikutnya",
            onConfirm: () => {
              setModalConfirm({
                ...modalConfirm,
                open: false,
                title: "",
              })
              checkQuestionAvailable()
            },
            displayCancel: false,
          })
        }
      }
    }
  }

  const onFinish = () => {
    setModalConfirm({
      ...modalConfirm,
      open: true,
      title: "Apa anda yakin ingin menyelesaikan ujian ini?",
      onConfirm: () => {
        setModalConfirm({
          ...modalConfirm,
          open: false,
          title: "",
          onConfirm: () => null,
        })
        examActivityMutation.mutate({
          last_question_filled: (soalExamAvailable?.data[soalExamAvailable?.data.length - 1] as SoalExamLS1)
            .showing_order,
          last_question_subtest: (soal as SoalExamLS1).subtest_model_uuid,
          uuidActivity: activityExam?.data.Uuid || "",
          onSuccess: () => {
            checkQuestionAvailable()
          },
        })
      },
      displayCancel: true,
    })
  }

  const handleJawab = (props?: {
    answer?: { content: string; value: number }
    question?: SoalExamLS1
    source?: string
  }) => {
    const { answer, question } = props || {}
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
      submitMutation.mutate(
        // @ts-ignore
        { body },
        {
          onSuccess: () => {
            const curentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
            const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
            const perceptualSpeedComparisonUuid = ExamData.filter(
              (ar) => ar.examName === "Perceptual Speed – comparison"
            )[0].examUuid

            if (curentUuid !== numberFacilityUuid && curentUuid !== perceptualSpeedComparisonUuid) {
              nextQuestionAfterSubmit()
              setSelectedMultipleAnswer([])
            } else {
              refetchQuestionResponseByActivity().then((res) => {
                if (soalExamAvailable?.data && !answer) {
                  const totalAnswer = res.data?.data.length || 0
                  const notAnsweredQuestion =
                    soalExamAvailable?.data.filter((ar) => ar.question_type === 1).length - totalAnswer
                  if (
                    typeof indexSubtestActiveTkk === "number" &&
                    dataTkk?.data?.detail_data[indexSubtestActiveTkk]?.subtest_model_data?.is_must_fill_all_question ===
                      true &&
                    notAnsweredQuestion > 0
                  ) {
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
                          onConfirm: () => {
                            setModalConfirm({
                              ...modalConfirm,
                              open: false,
                              title: "",
                            })
                          },
                        })
                      },
                      displayCancel: true,
                    })
                  } else {
                    setModalConfirm({
                      ...modalConfirm,
                      open: true,
                      title: "Apa anda yakin ingin menyelesaikan ujian ini?",
                      onConfirm: () => {
                        setModalConfirm({
                          ...modalConfirm,
                          open: false,
                          title: "",
                          onConfirm: () => null,
                        })
                        examActivityMutation.mutate({
                          last_question_filled: (
                            soalExamAvailable?.data[soalExamAvailable?.data.length - 1] as SoalExamLS1
                          ).showing_order,
                          last_question_subtest: (soal as SoalExamLS1).subtest_model_uuid,
                          uuidActivity: activityExam?.data.Uuid,
                          onSuccess: () => {
                            checkQuestionAvailable()
                          },
                        })
                      },
                      displayCancel: true,
                    })
                  }
                }
              })
            }
          },
        }
      )
    } else {
      // console.log("next question line 467")
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
                      fontSize={configStore.fontSize}
                      setFontSize={configStore.setFontSize}
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
                      nextQuestion={() => handleJawab({ source: "example" })}
                      setDisableNextButton={(val) => {
                        setDisabledNextButton(val)
                      }}
                      showTimer={
                        typeof indexSubtestActiveTkk === "number" &&
                        dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.show_countdown_timer
                      }
                      fontSize={configStore.fontSize}
                      setFontSize={configStore.setFontSize}
                    />
                  )}
                  {soal.question_type === 1 &&
                    ((soal as SoalExamLS1).narrow_data.Uuid ===
                      ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
                      (soal as SoalExamLS1).narrow_data.Uuid ===
                        ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid) && (
                      <CardTimer
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
                        fontSize={configStore.fontSize}
                        setFontSize={configStore.setFontSize}
                      />
                    )}
                  {(soal as SoalExamLS1).narrow_data.Uuid ===
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
                              fontSize={configStore.fontSize}
                              setFontSize={configStore.setFontSize}
                              isScrolling={true}
                              checkQuestionAvailable={checkQuestionAvailable}
                              selectedMultipleAnswer={selectedMultipleAnswer}
                              soalExamAvailable={soalExamAvailable}
                              submitAnswer={() => handleJawab({ source: "submitAnswer" })}
                              setAnswer={(answer: answer) => {
                                const currentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
                                const numberFacilityUuid = ExamData.filter((ar) => ar.examName === "Number Facility")[0]
                                  .examUuid
                                if (currentUuid === numberFacilityUuid) {
                                  submitWithoutNextScrolling({
                                    answer: answer,
                                    question: item as SoalExamLS1,
                                    source: "scrolling NF",
                                  })
                                  const questionUuid = (item as SoalExamLS1).uuid
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
                              // @ts-ignore
                              selectedAnswer={
                                (soal as SoalExamLS1)?.narrow_data.Uuid ===
                                ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid
                                  ? multipleSelectedAnswer?.find((i) => i.questionUuid === (item as SoalExamLS1)?.uuid!)
                                      ?.answer
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
                              // subtestName={soal.narrow_data.name} //hide subtest name in scrolling subtest
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
                  {(soal as SoalExamLS1).narrow_data.Uuid ===
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
                              fontSize={configStore.fontSize}
                              setFontSize={configStore.setFontSize}
                              isScrolling={true}
                              checkQuestionAvailable={checkQuestionAvailable}
                              selectedMultipleAnswer={selectedMultipleAnswer}
                              soalExamAvailable={soalExamAvailable}
                              submitAnswer={() => handleJawab({ source: "submitAnswer" })}
                              setAnswer={(answer: answer) => {
                                const currentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
                                const numberFacilityUuid = ExamData.filter(
                                  (ar) => ar.examName === "Perceptual Speed – comparison"
                                )[0].examUuid
                                if (currentUuid === numberFacilityUuid) {
                                  submitWithoutNextScrolling({
                                    answer: answer,
                                    question: item as SoalExamLS1,
                                    source: "scrolling PC",
                                  })
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
                              // @ts-ignore
                              selectedAnswer={
                                (soal as SoalExamLS1)?.narrow_data.Uuid ===
                                ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid
                                  ? multipleSelectedAnswer?.find((i) => i.questionUuid === (item as SoalExamLS1)?.uuid!)
                                      ?.answer
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
                  {(soal as SoalExamLS1).narrow_data.Uuid !==
                    ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid &&
                    (soal as SoalExamLS1).narrow_data.Uuid !==
                      ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid &&
                    soal.question_type === 1 && (
                      <SoalPertanyaanTkk
                        soal={soal}
                        fontSize={configStore.fontSize}
                        setFontSize={configStore.setFontSize}
                        checkQuestionAvailable={checkQuestionAvailable}
                        selectedMultipleAnswer={selectedMultipleAnswer}
                        soalExamAvailable={soalExamAvailable}
                        submitAnswer={() => handleJawab({ source: "submitAnswer" })}
                        setAnswer={(answer: answer) => {
                          if ((soal as SoalExamLS1).total_answer_should_have_for_true === 1) {
                            setSelectedAnswer(answer)
                            submitWithoutNextSingle(answer)
                          } else {
                            let finalAnswer: string[] = []
                            if (selectedMultipleAnswer.filter((ar) => ar === answer.content).length > 0) {
                              finalAnswer = selectedMultipleAnswer.filter((ar) => ar !== answer.content)
                              setSelectedMultipleAnswer(selectedMultipleAnswer.filter((ar) => ar !== answer.content))
                            } else {
                              finalAnswer = [...selectedMultipleAnswer, answer.content]
                              setSelectedMultipleAnswer([...selectedMultipleAnswer, answer.content])
                            }
                            submitWithoutNextMultiple(finalAnswer)
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
                <Stack direction="row" spacing={2}>
                  <Button
                    color={disabledNextButton ? "primary" : "info"}
                    onClick={() => handleJawab({ source: "Lanjutkan" })}
                    disabled={disabledNextButton}
                  >
                    {soal?.question_type === 2 || soal?.question_type === 3 //only for instruction and example
                      ? "Lanjutkan"
                      : (typeof indexSubtestActiveTkk === "number" &&
                          dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 1 &&
                          finalQuestion) ||
                        (soal &&
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                            ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid) ||
                        (soal &&
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                            ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid)
                      ? "Selesai"
                      : "Simpan dan Lanjutkan"}
                  </Button>
                  {typeof indexSubtestActiveTkk === "number" &&
                    dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 2 &&
                    soalExamAvailable &&
                    soalExamAvailable?.data.filter((ar) => ar.question_type === 1).length -
                      (questionResponseByActivity?.data?.filter(
                        (ar) => ar.subtest_uuid === dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
                      ).length || 0) ===
                      0 &&
                    soal &&
                    (soal as SoalExamLS1).narrow_data.Uuid !==
                      ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid &&
                    (soal as SoalExamLS1).narrow_data.Uuid !==
                      ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid && (
                      <Button color="info" onClick={onFinish}>
                        Selesai
                      </Button>
                    )}
                </Stack>

                {soal &&
                  typeof indexSubtestActiveTkk === "number" &&
                  dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type === 2 &&
                  (ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid !==
                    (soal as SoalExamLS1).narrow_data.Uuid ||
                    ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid !==
                      (soal as SoalExamLS1).narrow_data.Uuid) && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        onClick={() => handlePreviousQuestion()}
                        disabled={currentQuestionIndex === 0 || canGoBack === false}
                        sx={{ mr: 2 }}
                      >
                        <ArrowBackIcon />
                      </Button>
                      <Button onClick={() => handleNextQuestion()} disabled={finalQuestion}>
                        <ArrowForwardIcon />
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
            position: "sticky",
            top: "50px",
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
                  // position: "sticky",
                  top: "20px",
                  width: "95%",
                  border: "0.5px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "0.3s",
                  zIndex: 1000,
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
                      soal &&
                      soalExamAvailable?.data
                        // @ts-ignore
                        ?.filter((ar) => ar.question_type === 1)
                        // @ts-ignore
                        .map((item, index) => {
                          const answeredExam = questionResponseByActivity?.data.filter(
                            (ar) =>
                              ar.subtest_uuid === dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_uuid
                          )
                          const isAnswered = answeredExam?.some((ar) => ar.question_uuid === (item as SoalExamLS1).uuid)
                          const currentIndex = soalExamAvailable.data.findIndex(
                            (ar) => (ar as SoalExamLS1).uuid === (soal as SoalExamLS1)?.uuid
                          )
                          const thisIndex = soalExamAvailable.data.findIndex(
                            (ar) => (ar as SoalExamLS1).uuid === (item as SoalExamLS1).uuid
                          )

                          let backgroundColor = "white"
                          let color = "#4828A3"

                          if (isAnswered) {
                            backgroundColor = "#4828A3" // answered — purple
                            color = "white"
                          } else if (thisIndex === currentIndex) {
                            backgroundColor = "white" // current but unanswered — white
                            color = "#4828A3"
                          } else if (thisIndex <= maxVisitedIndex) {
                            backgroundColor = "red" // passed but unanswered — red
                            color = "white"
                          }

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
                                  backgroundColor: backgroundColor,
                                  color: color,
                                  border: "1px solid #4828A3",
                                }}
                                onClick={() => {
                                  if (
                                    (soal as SoalExamLS1).narrow_data.Uuid ===
                                      ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
                                    (soal as SoalExamLS1).narrow_data.Uuid ===
                                      ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0]
                                        .examUuid
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
                                  } else {
                                    const itemUuid = (item as SoalExamLS1).uuid
                                    const indexItem = soalExamAvailable.data.findIndex(
                                      (ar) => (ar as SoalExamLS1).uuid === itemUuid
                                    )
                                    if (
                                      dataTkk?.data.detail_data[indexSubtestActiveTkk].subtest_model_data.timer_type !==
                                        1 &&
                                      canGoBack
                                    ) {
                                      setSoal(soalExamAvailable?.data[indexItem])
                                      setCurrentQuestionIndex(indexItem)
                                      if (indexItem === soalExamAvailable.data.length - 1) {
                                        setFinalQuestion(true)
                                      } else {
                                        setFinalQuestion(false)
                                      }
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
      <ModalConfirm
        open={!!modalConfirm.open}
        onClose={() => setModalConfirm({ ...modalConfirm, open: false })}
        title={modalConfirm.title}
        message={modalConfirm.message}
        onConfirm={modalConfirm.onConfirm}
        displayCancel={modalConfirm.displayCancel}
      />
    </>
  )
}

export default LembarUjianTkk
