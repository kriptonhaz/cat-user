import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  Checkbox,
  Grid,
  TextField,
  Stack,
} from "@mui/material"
import { TextIncrease, TextDecrease } from "@mui/icons-material"
import { ISoalExamByModuleResponse, SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import { formatTime } from "@/utils/timer"
import { ExamData } from "./exam-data"
import ModalConfirm, { ModalConfirmProps } from "@/ui/modal/ModalConfirm"
import { CheckboxManual } from "@/components/checkbox"

export interface answer {
  content: string
  value: number
}

export interface ISoalPertanyaanTkk {
  soal: SoalExam | SoalExamLS1 | SoalExamPPI
  setAnswer: (answer: answer) => void
  selectedAnswer: answer | null
  remainingTime: number
  timerType: number
  subtestNumber?: string
  subtestName?: string
  setDisableNextButton?: (val: boolean) => void
  fontSize: number
  setFontSize: (fontSize: number) => void
  showTimer?: boolean
  checkQuestionAvailable?: () => void
  selectedMultipleAnswer: string[]
  isScrolling?: boolean
  soalExamAvailable?: ISoalExamByModuleResponse
  submitAnswer?: () => void
}

const SoalPertanyaanTkk: React.FC<ISoalPertanyaanTkk> = React.forwardRef<HTMLDivElement, ISoalPertanyaanTkk>(
  (props, ref) => {
    const {
      soal,
      setAnswer,
      selectedAnswer,
      remainingTime,
      timerType,
      subtestNumber,
      subtestName,
      setDisableNextButton,
      fontSize,
      setFontSize,
      showTimer = true,
      checkQuestionAvailable,
      selectedMultipleAnswer,
      isScrolling = false,
      soalExamAvailable,
      submitAnswer,
    } = props
    const [answerMemorySpan, setAnswerMemorySpan] = useState<Array<{ order: number; content: string }>>([])
    const [startTimer, setStartTimer] = useState(false)
    const [indexMemorySpan, setIndexMemorySpan] = useState(0)
    const [timerMemorySpan, setTimerMemorySpan] = useState(0)
    const [startAnswer, setStartAnswer] = useState(false)
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
      if ((soal as SoalExamLS1).answer_type === 3) {
        setTimerMemorySpan((soal as SoalExamLS1).intro_data[indexMemorySpan].timer)
        setStartTimer(true)
        const maxMemory = (soal as SoalExamLS1).intro_data.length
        if (indexMemorySpan === maxMemory - 1 && startAnswer === true) {
          setIndexMemorySpan(0)
          setStartAnswer(false)
        }
        const timerSoal = setInterval(() => {
          setTimerMemorySpan((prevSeconds) => prevSeconds - 1)
        }, 1000)
        return () => {
          clearInterval(timerSoal)
        }
      }
    }, [indexMemorySpan, soal])

    useEffect(() => {
      if ((soal as SoalExamLS1).answer_type === 3 && timerMemorySpan === 0 && startTimer) {
        const maxMemory = (soal as SoalExamLS1).intro_data.length
        if (indexMemorySpan < maxMemory - 1) {
          setIndexMemorySpan(indexMemorySpan + 1)
          setTimerMemorySpan((soal as SoalExamLS1).intro_data[indexMemorySpan + 1].timer)
        } else if (startAnswer === false) {
          setStartAnswer(true)
          setTimerMemorySpan(soal.timer)
        } else if (startAnswer === true) {
          const indexSoal = soalExamAvailable?.data.findIndex(
            (ar) => (ar as SoalExamLS1).uuid === (soal as SoalExamLS1).uuid
          )
          if (indexSoal && soalExamAvailable) {
            if (indexSoal < soalExamAvailable.data.length - 1) {
              setModalConfirm({
                ...modalConfirm,
                open: true,
                title: "Waktu habis, Anda diarahkan ke soal berikutnya",
                message: "",
                onClose: () => {
                  setModalConfirm((prev) => ({ ...prev, open: false, title: "", message: "", displayCancel: true }))
                },
                onConfirm: () => {
                  setModalConfirm({
                    ...modalConfirm,
                    open: false,
                    title: "",
                    message: "",
                    onClose: () => {
                      setModalConfirm((prev) => ({
                        ...prev,
                        open: false,
                        title: "",
                        message: "",
                        displayCancel: true,
                        overrideClose: true,
                      }))
                    },
                  })
                  if (submitAnswer) {
                    submitAnswer()
                  }
                  if (checkQuestionAvailable) {
                    checkQuestionAvailable()
                  }
                  setIndexMemorySpan(0)
                  setStartAnswer(false)
                  setTimerMemorySpan((soal as SoalExamLS1).intro_data[indexMemorySpan + 1].timer)
                },
                displayCancel: false,
                overrideClose: false,
              })
            } else {
              if (submitAnswer) {
                submitAnswer()
              }
              if (checkQuestionAvailable) {
                checkQuestionAvailable()
              }
            }
          } else {
            console.log("data error")
          }
        }
      }
    }, [timerMemorySpan, soal, startTimer])

    useEffect(() => {
      if ((soal as SoalExamLS1).answer_type === 3) {
        if (startAnswer === true) {
          setDisableNextButton && setDisableNextButton(false)
        } else {
          setDisableNextButton && setDisableNextButton(true)
        }
      }
    }, [soal, startAnswer])

    const isSoalExamLS1 = (soal: SoalExam | SoalExamLS1 | SoalExamPPI): soal is SoalExamLS1 => {
      return "image_path_cat" in soal
    }

    const isSoalExamPPI = (soal: SoalExam | SoalExamLS1 | SoalExamPPI): soal is SoalExamPPI => {
      return "answer_data" in soal && "option_one_value" in soal.answer_data
    }

    const questionType: "SoalExamLS1" | "SoalExam" | "SoalExamPPI" = isSoalExamLS1(soal)
      ? "SoalExamLS1"
      : isSoalExamPPI(soal)
      ? "SoalExamPPI"
      : "SoalExam"

    const handleChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
      const choosenAnswer =
        isSoalExamLS1(soal) || isSoalExamPPI(soal) ? event.target.value : parseInt(event.target.value)
      const answer = (soal as SoalExamLS1).answer_data.find((answer) => answer.uuid === choosenAnswer)
      setAnswer({
        content: answer?.uuid || "",
        value: 0,
      })
    }

    const selectAnswerInduction = (answerUuid: string) => {
      setAnswer({
        content: answerUuid || "",
        value: 0,
      })
    }

    const handleEditMemorySpan = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (answerMemorySpan.length === 0) {
        setAnswerMemorySpan([
          ...answerMemorySpan,
          { order: Number(event.target.dataset.state), content: event.target.value },
        ])
      } else if (answerMemorySpan.filter((ar) => ar.order === Number(event.target.dataset.state)).length > 0) {
        const newAnswerMemorySpan = answerMemorySpan.map((ar) =>
          ar.order === Number(event.target.dataset.state) ? { order: ar.order, content: event.target.value } : ar
        )
        setAnswerMemorySpan(newAnswerMemorySpan)
      } else {
        setAnswerMemorySpan([
          ...answerMemorySpan,
          { order: Number(event.target.dataset.state), content: event.target.value },
        ])
      }
    }

    useEffect(() => {
      const currentUuid = (soal as SoalExamLS1)?.narrow_data.Uuid
      const memorySpanUuid = ExamData.filter((ar) => ar.examName === "Memory Span")[0].examUuid
      const workingMemoryUuid = ExamData.filter((ar) => ar.examName === "Working Memory")[0].examUuid
      if (currentUuid === memorySpanUuid || currentUuid === workingMemoryUuid) {
        const formattedAnswer = answerMemorySpan.sort((a, b) => a.order - b.order)
        setAnswer({ content: formattedAnswer.map((ar) => ar.content).join(" "), value: 0 })
      }
    }, [soal, answerMemorySpan])

    return (
      <div ref={ref}>
        <Card
          sx={{
            width: "98%",
            border: "0.5px solid #ccc",
            boxShadow: 3,
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              boxShadow: 6,
            },
            mb: 5,
            minHeight:
              (soal as SoalExamLS1).narrow_data.Uuid ===
                ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
              (soal as SoalExamLS1).narrow_data.Uuid ===
                ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid
                ? "10vh"
                : "525px",
            maxHeight:
              (soal as SoalExamLS1).narrow_data.Uuid ===
              ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid
                ? "82vh"
                : undefined,
            overflow: "auto !important",
          }}
        >
          <CardContent>
            {((soal as SoalExamLS1).narrow_data.Uuid !==
              ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
              (soal as SoalExamLS1).narrow_data.Uuid !==
                ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid) && (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                {showTimer && (
                  <Typography variant="h6">
                    Sisa Waktu: {formatTime((soal as SoalExamLS1).answer_type === 3 ? timerMemorySpan : remainingTime)}
                  </Typography>
                )}
                <Box
                  sx={{
                    ...(timerType === 2 ? { width: "250px", display: "flex", justifyContent: "space-between" } : {}),
                    marginLeft: "auto", // This ensures the box stays on the right
                  }}
                >
                  <Box display={isScrolling ? "none" : "flex"} justifyContent={"space-between"} width={140}>
                    <Button
                      color="primary"
                      startIcon={<TextDecrease />}
                      variant="outlined"
                      onClick={() => setFontSize(fontSize - 1)}
                    />
                    <Button
                      color="primary"
                      startIcon={<TextIncrease />}
                      variant="outlined"
                      onClick={() => setFontSize(fontSize + 1)}
                    />
                  </Box>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems:
                  (soal as SoalExamLS1).narrow_data.Uuid ===
                  ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                    ? "center"
                    : "flex-start",
                flexDirection:
                  (soal as SoalExamLS1).narrow_data.Uuid ===
                  ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                    ? "column"
                    : "row",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  minWidth: "30px",
                  fontSize: fontSize,
                  textAlign: "left",
                  alignSelf: "flex-start",
                  display: (soal as SoalExamLS1).answer_type === 3 && startAnswer === false ? "none" : "block",
                }}
              >
                {`${soal.question_order})`}
              </Typography>
              {questionType === "SoalExam" ? (
                <Typography variant="h6" sx={{ fontSize: fontSize }}>
                  {soal.question_content}
                </Typography>
              ) : (
                <Box
                  sx={{
                    margin: 0,
                    display: "flex",
                    width: "100%",
                    flexDirection:
                      (soal as SoalExamLS1).narrow_data.Uuid ===
                        ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid ||
                      (soal as SoalExamLS1).narrow_data.Uuid ===
                        ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid
                        ? "column"
                        : "row",
                    justifyContent:
                      (soal as SoalExamLS1).narrow_data.Uuid ===
                      ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                        ? "center"
                        : "flex-start",
                  }}
                >
                  {(soal as SoalExamLS1).answer_type === 3 ? (
                    <Typography
                      variant="h6"
                      dangerouslySetInnerHTML={{
                        __html: startAnswer
                          ? soal.question_content
                          : (soal as SoalExamLS1).intro_data[indexMemorySpan].instruction,
                      }}
                      sx={{
                        "& p": { margin: 0, fontSize: fontSize },
                        fontSize: fontSize,
                        minHeight: "10px",
                        height: "auto",
                        textWrap: "wrap",
                        display: startAnswer ? "block" : "none",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      dangerouslySetInnerHTML={{ __html: soal.question_content }}
                      sx={{
                        "& p": { margin: 0, fontSize: fontSize },
                        "& figure": { margin: 0, marginRight: "0px" },
                        "& img": {
                          width: "100%",
                          height: "auto",
                          maxHeight: "30vh",
                          transform: `scale(${(1 * fontSize) / 22})`,
                        },
                        fontSize: fontSize,
                        minHeight: "10px",
                        height: "auto",
                        textWrap: "wrap",
                        display: "flex",
                        flexDirection:
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                          ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                            ? "row"
                            : "column",
                      }}
                    />
                  )}

                  <br />
                  {(soal as SoalExamLS1).image_path_cat &&
                    (soal as SoalExamLS1).narrow_data.Uuid !==
                      ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid && (
                      <Box
                        sx={{
                          width: "100%",
                          // height: "145px",
                          // maxHeight: "200px",
                          marginBottom: 4,
                          display: "flex",
                          justifyContent:
                            (soal as SoalExamLS1).narrow_data.Uuid ===
                            ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                              ? "center"
                              : "flex-start",
                        }}
                      >
                        <img
                          src={import.meta.env.VITE_API_URL + (soal as SoalExamLS1).image_path_cat}
                          alt={"Answer image"}
                          style={{
                            marginTop: "8px",
                            width: "auto",
                            height: "auto",
                            maxHeight:
                              (soal as SoalExamLS1).narrow_data.Uuid ===
                              ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                                ? "30vh"
                                : undefined,
                          }}
                        />
                      </Box>
                    )}
                </Box>
              )}
            </Box>
            {(soal as SoalExamLS1).narrow_data.Uuid ===
            ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid ? (
              <Grid container spacing={2} sx={{ overflow: "hidden", mt: 4 }}>
                <Grid item xs={12} lg={4}>
                  {(soal as SoalExamLS1).image_path_cat && (
                    <Box
                      sx={{
                        // width: `${20 * (fontSize / 22)}%`,
                        objectFit: "contain",
                        height: "auto",
                        marginBottom: 4,
                        display: "flex",
                        borderRight: "1px solid #ccc",
                        justifyContent:
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                          ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                            ? "center"
                            : "flex-start",
                      }}
                    >
                      <img
                        src={import.meta.env.VITE_API_URL + (soal as SoalExamLS1).image_path_cat}
                        alt={"Answer image"}
                        style={{
                          marginTop: "8px",
                          width: "100%",
                          objectFit: "contain",
                          transform: `scale(${(1 * fontSize) / 22})`,
                        }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={8}
                  container
                  gap={2}
                  mt={2}
                  columnSpacing={8}
                  sx={{ height: "auto", overflow: "auto" }}
                >
                  {(soal as SoalExamLS1).answer_data.map((answer, index) => (
                    <Grid key={index} item xs={12} md={6 * (fontSize / 22)} lg={3.5 * (fontSize / 22)}>
                      <Stack direction="row" alignItems="flex-start">
                        <CheckboxManual isChecked={selectedAnswer?.content === answer.uuid} />
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            cursor: "pointer",
                            // minHeight: "27vh",
                          }}
                          onClick={() => {
                            selectAnswerInduction(answer.uuid)
                          }}
                        >
                          {(soal as SoalExamLS1).is_need_answer_label && <Typography>{answer.label}</Typography>}
                          <img
                            src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                            alt={"Answer image"}
                            style={{
                              marginTop: "8px",
                              width: "100%",
                              // height: "90%",
                              alignSelf: "center",
                              marginBottom: "8px",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ) : (
              <>
                {((soal as SoalExamLS1).narrow_data.Uuid !==
                  ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
                  (soal as SoalExamLS1).narrow_data.Uuid !==
                    ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid) && (
                  <Divider
                    sx={{
                      marginTop: 3,
                      marginBottom: 3,
                      display: (soal as SoalExamLS1).answer_type === 3 ? "none" : "block",
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      (soal as SoalExamLS1).narrow_data.Uuid ===
                      ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                        ? "center"
                        : "flex-start",
                    mt: 4,
                    pl: "35px",
                  }}
                >
                  {(soal as SoalExamLS1).answer_type === 3 && (
                    <>
                      <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} gap={3}>
                        {startAnswer === false ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                (soal as SoalExamLS1).intro_data[indexMemorySpan].intro_type !== 2
                                  ? (soal as SoalExamLS1).intro_data[indexMemorySpan].question_content
                                  : (soal as SoalExamLS1).intro_data[indexMemorySpan].instruction,
                            }}
                            style={{ fontSize: fontSize + 5, fontWeight: "bold", alignSelf: "center" }}
                          />
                        ) : (
                          (soal as SoalExamLS1).intro_data
                            .filter((ar) => ar.intro_type !== 2)
                            .map((answer, index) => (
                              <Grid item sx={{ display: "flex", alignItems: "center" }} key={index}>
                                <TextField
                                  variant="filled"
                                  title={"urutan" + answer.showing_order.toString()}
                                  inputProps={{
                                    "data-state": answer.showing_order,
                                    style: { textTransform: "uppercase" },
                                  }}
                                  onKeyUp={(e) => {
                                    const input = e.target as HTMLInputElement
                                    const cursorPosition = input.selectionStart
                                    const inputValue = input.value
                                    // @ts-ignore
                                    const rootElement = e.target.parentElement?.parentElement.parentElement
                                      .parentElement as HTMLDivElement
                                    const nextItems = rootElement.childNodes[index + 1] as HTMLDivElement
                                    const prevItems = rootElement.childNodes[index - 1] as HTMLDivElement
                                    if (e.code === "ArrowRight" && cursorPosition === inputValue.length) {
                                      // Do some action here
                                      if (nextItems) {
                                        nextItems.querySelector("input")?.focus()
                                      }
                                    }
                                    if (e.code === "ArrowLeft" && cursorPosition === 0) {
                                      if (prevItems) {
                                        prevItems.querySelector("input")?.focus()
                                      }
                                    }
                                  }}
                                  autoComplete="off"
                                  onChange={handleEditMemorySpan}
                                />
                              </Grid>
                            ))
                        )}
                      </Grid>
                    </>
                  )}
                  {(soal as SoalExamLS1).total_answer_should_have_for_true === 1 &&
                    (soal as SoalExamLS1).answer_type !== 3 && (
                      <RadioGroup
                        row={
                          soal.answer_showing_position === 2 ||
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                            ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                            ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid
                            ? true
                            : false
                        }
                        key={soal.Uuid}
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={handleChoose}
                        value={
                          selectedAnswer
                            ? questionType === "SoalExam" || questionType === "SoalExamPPI"
                              ? selectedAnswer.value
                              : selectedAnswer.content
                            : ""
                        }
                      >
                        {(soal as SoalExamLS1).answer_data.map((answer, index) => (
                          <FormControlLabel
                            key={index}
                            value={answer.uuid}
                            onClick={() => {
                              if (
                                (soal as SoalExamLS1).narrow_data.Uuid !==
                                ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                              ) {
                                setAnswer({
                                  content: answer?.uuid || "",
                                  value: 0,
                                })
                              }
                            }}
                            control={
                              (soal as SoalExamLS1).narrow_data.Uuid ===
                              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                                <></>
                              ) : (
                                <CheckboxManual
                                  isChecked={
                                    (soal as SoalExamLS1).total_answer_should_have_for_true === 1 &&
                                    selectedAnswer?.content === answer.uuid
                                  }
                                />
                              )
                            }
                            label={
                              <>
                                {(soal as SoalExamLS1).narrow_data.Uuid ===
                                ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                                  <Box
                                    flexDirection={"column"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    width={"12vw"}
                                    height={"16vh"}
                                    onClick={() => {
                                      selectAnswerInduction(answer.uuid)
                                    }}
                                  >
                                    <Typography
                                      dangerouslySetInnerHTML={{ __html: answer.content }}
                                      sx={{
                                        "& img": {
                                          width: "100%",
                                          height: "100%",
                                          fontSize: fontSize,
                                          margin: 0,
                                          transform: `scale(${(1 * fontSize) / 22})`,
                                        },
                                        "& p": { margin: 0 },
                                        "& figure": { margin: 0, marginRight: "0px", maxWidth: "100px" },
                                        fontSize: fontSize,
                                      }}
                                    />
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                      <CheckboxManual isChecked={selectedAnswer?.content === answer.uuid} />
                                      {(soal as SoalExamLS1).is_need_answer_label && (
                                        <Typography sx={{ fontSize: fontSize }}>{answer.label}</Typography>
                                      )}
                                    </Box>
                                  </Box>
                                ) : (
                                  <Typography
                                    dangerouslySetInnerHTML={{
                                      __html: `${
                                        (soal as SoalExamLS1).is_need_answer_label ? answer.label + ". " : ""
                                      }${answer.content}`,
                                    }}
                                    sx={{
                                      "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                      "& p": {
                                        display: "inline",
                                        margin: 0,
                                        marginRight:
                                          (soal as SoalExamLS1).narrow_data.Uuid ===
                                            ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
                                          (soal as SoalExamLS1).narrow_data.Uuid ===
                                            ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0]
                                              .examUuid
                                            ? 8
                                            : 0,
                                      },
                                      "& figure": { margin: 0, marginRight: "20px", maxWidth: "100px" },
                                      fontSize: fontSize,
                                    }}
                                  />
                                )}
                                {answer.image_path_cat && (
                                  <img
                                    src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                                    alt={`Answer ${index + 1} image`}
                                    style={{ maxWidth: "50%", marginTop: "8px", width: "50%", height: "50%" }}
                                  />
                                )}
                              </>
                            }
                            sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 1 } }}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  {(soal as SoalExamLS1).total_answer_should_have_for_true === 2 &&
                    (soal as SoalExamLS1).answer_type !== 3 && (
                      <Box
                        display={"flex"}
                        flexDirection={soal.answer_showing_position === 1 ? "column" : "row"}
                        justifyContent={
                          (soal as SoalExamLS1).narrow_data.Uuid ===
                          ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                            ? "space-between"
                            : "flex-start"
                        }
                        textAlign={"center"}
                        sx={{ width: "100%" }}
                      >
                        {(soal as SoalExamLS1).answer_data.map((answer) => {
                          const isChecked = selectedMultipleAnswer.includes(answer.uuid)
                          const isDisabled =
                            !isChecked &&
                            selectedMultipleAnswer.filter((ar) => ar !== "").length >=
                              (soal as SoalExamLS1).total_answer_should_have_for_true
                          return (
                            <FormControlLabel
                              key={answer.uuid}
                              value={answer.uuid}
                              control={
                                (soal as SoalExamLS1).narrow_data.Uuid ===
                                ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid ? (
                                  <></>
                                ) : (
                                  <Checkbox size="small" checked={selectedMultipleAnswer.includes(answer.uuid)} />
                                )
                              }
                              // checked={true}
                              // @ts-ignore
                              onChange={handleChoose}
                              disabled={isDisabled}
                              label={
                                <>
                                  <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    flexDirection={
                                      (soal as SoalExamLS1).narrow_data.Uuid ===
                                      ExamData.filter((ar) => ar.examName === "Lexical Knowledge")[0].examUuid
                                        ? "row"
                                        : "column"
                                    }
                                    alignItems={"center"}
                                    onClick={() => {
                                      const uuid = (soal as SoalExamLS1).narrow_data.Uuid
                                      const targetUuid = ExamData.find(
                                        (ar) => ar.examName === "Lexical Knowledge"
                                      )?.examUuid
                                      if (uuid === targetUuid || isDisabled) return
                                      setAnswer({
                                        content: answer?.uuid || "",
                                        value: 0,
                                      })
                                    }}
                                  >
                                    {(soal as SoalExamLS1).narrow_data.Uuid ===
                                    ExamData.filter((ar) => ar.examName === "Lexical Knowledge")[0].examUuid ? (
                                      <>
                                        {(soal as SoalExamLS1).is_need_answer_label && (
                                          <Typography
                                            dangerouslySetInnerHTML={{ __html: answer.label + ".&nbsp;" }}
                                            sx={{
                                              "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                              "& p": { margin: 0 },
                                              "& figure": { margin: 0, marginRight: "20px", maxWidth: "100px" },
                                              fontSize: fontSize,
                                            }}
                                          />
                                        )}
                                        <Typography
                                          dangerouslySetInnerHTML={{ __html: answer.content }}
                                          sx={{
                                            "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                            "& p": { margin: 0 },
                                            "& figure": { margin: 0, marginRight: "20px", maxWidth: "100px" },
                                            fontSize: fontSize,
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        {answer.image_path_cat ? (
                                          <img
                                            src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                                            style={{
                                              width: "100%",
                                              maxWidth: `${5 * ((1 * fontSize) / 22)}vw`,
                                              height: `${15 * ((1 * fontSize) / 22)}vh`,
                                              transform: `scale(${(1 * fontSize) / 22})`,
                                              margin: 0,
                                              objectFit: "contain",
                                            }}
                                          />
                                        ) : (
                                          <Typography
                                            dangerouslySetInnerHTML={{ __html: answer.content }}
                                            sx={{
                                              "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                              "& p": { margin: 0 },
                                              "& figure": { margin: 0, marginRight: "20px", maxWidth: "100px" },
                                              fontSize: fontSize,
                                            }}
                                          />
                                        )}
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mt: 2,
                                          }}
                                        >
                                          <CheckboxManual isChecked={isChecked} />
                                          {(soal as SoalExamLS1).is_need_answer_label && (
                                            <Typography>{answer.label}</Typography>
                                          )}
                                        </Box>
                                      </>
                                    )}
                                  </Box>
                                </>
                              }
                            />
                          )
                        })}
                      </Box>
                    )}
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        <ModalConfirm
          open={!!modalConfirm.open}
          onClose={() => {
            setModalConfirm({ ...modalConfirm, open: false, overrideClose: true })
          }}
          title={modalConfirm.title}
          message={modalConfirm.message}
          onConfirm={modalConfirm.onConfirm}
          displayCancel={modalConfirm.displayCancel}
          overrideClose={modalConfirm.overrideClose}
        />
      </div>
    )
  }
)

export default SoalPertanyaanTkk
