import { SoalExamLS1 } from "@/interfaces/exam.interface"
import React, { useEffect, useRef, useState } from "react"
import { Cancel, TextIncrease, TextDecrease, CheckCircle } from "@mui/icons-material" // Import icons from Material-UI
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { formatTime } from "@/utils/timer"
import { ExamData } from "./exam-data"
import { CheckboxManual } from "@/components/checkbox"

interface ExamExampleTkkProps {
  question: SoalExamLS1
  remainingTime: number
  showExampleLabel?: boolean
  subtestNumber?: string
  subtestName?: string
  nextQuestion: () => void
  setDisableNextButton?: (val: boolean) => void
  showTimer?: boolean
  fontSize: number
  setFontSize: (fontSize: number) => void
}

const ExamExampleTkk: React.FC<ExamExampleTkkProps> = ({
  question,
  remainingTime,
  showExampleLabel = false,
  subtestNumber,
  subtestName,
  nextQuestion,
  setDisableNextButton,
  showTimer = true,
  fontSize,
  setFontSize,
}) => {
  const initialFocusRef = useRef(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [selectedAnswerMultiple, setSelectedAnswerMultiple] = useState<
    Array<{ uuid: string; isCorrectAnswer: boolean }>
  >([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [startTimer, setStartTimer] = useState(false)
  const [indexMemorySpan, setIndexMemorySpan] = useState(0)
  const [timerMemorySpan, setTimerMemorySpan] = useState(0)
  const [startAnswer, setStartAnswer] = useState(false)
  const [displayAnswerMemory, setDisplayAnswerMemory] = useState(false)
  const [answerMemory, setAnswerMemory] = useState<{ val: string; index: number }[]>([])

  useEffect(() => {
    if (question.answer_type === 3) {
      setTimerMemorySpan(question.intro_data[indexMemorySpan].timer)
      setStartTimer(true)
      const timerSoal = setInterval(() => {
        setTimerMemorySpan((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => {
        clearInterval(timerSoal)
        setStartTimer(false)
      }
    }
  }, [indexMemorySpan, question])

  useEffect(() => {
    if (question.answer_type === 3 && timerMemorySpan === 0 && startTimer) {
      const maxMemory = question.intro_data.length
      if (indexMemorySpan < maxMemory - 1 && startAnswer === false) {
        setIndexMemorySpan(indexMemorySpan + 1)
        setTimerMemorySpan(question.intro_data[indexMemorySpan + 1].timer)
      } else if (startAnswer === false) {
        setStartAnswer(true)
        setTimerMemorySpan(question.timer)
      } else if (startAnswer === true) {
        nextQuestion()
      }
    }
  }, [timerMemorySpan, question, startTimer])

  useEffect(() => {
    if (question.answer_type === 3) {
      if (startAnswer === true) {
        setDisableNextButton && setDisableNextButton(false)
      } else {
        setDisableNextButton && setDisableNextButton(true)
      }
    }
  }, [question, startAnswer])

  const onAnswerSelect = (uuid: string, isCorrectAnswer: boolean) => {
    if (question.total_answer_should_have_for_true === 1) {
      setSelectedAnswer(uuid)
      setIsCorrect(isCorrectAnswer)
    } else if (question.total_answer_should_have_for_true === 2) {
      if (selectedAnswerMultiple.filter((ar) => ar.uuid === uuid).length > 0) {
        setSelectedAnswerMultiple(selectedAnswerMultiple.filter((answer) => answer.uuid !== uuid))
      } else {
        setSelectedAnswerMultiple([...selectedAnswerMultiple, { uuid: uuid, isCorrectAnswer: isCorrectAnswer }])
      }
    }
  }

  const onIncreaseFont = () => {
    setFontSize(fontSize + 1)
  }

  const onDecreaseFont = () => {
    setFontSize(fontSize - 1)
  }

  const handleEditMemorySpan = (value: string, index: number) => {
    const found = answerMemory.find((ar) => ar.index === index)
    if (found) {
      setAnswerMemory(
        answerMemory.map((ar) => {
          if (ar.index === index) {
            return { ...ar, val: value }
          }
          return ar
        })
      )
    } else {
      setAnswerMemory([...answerMemory, { val: value, index: index }])
    }
  }

  useEffect(() => {
    const totalAnswer = (question as SoalExamLS1).intro_data.filter((ar) => ar.intro_type !== 2).length
    if (answerMemory.length === totalAnswer) {
      setTimeout(() => {
        setDisplayAnswerMemory(true)
      }, 3000)
    } else {
      setDisplayAnswerMemory(false)
    }
  }, [answerMemory])

  useEffect(() => {
    setIsCorrect(null)
    setSelectedAnswer(null)
    setSelectedAnswerMultiple([])
    setIndexMemorySpan(0)
    setStartAnswer(false)
    setDisplayAnswerMemory(false)
    setAnswerMemory([])
    initialFocusRef.current = false
  }, [question])

  return (
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
        minHeight: "525px",
        paddingBottom: 10,
        maxHeight:
          (question as SoalExamLS1).narrow_data.Uuid ===
          ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid
            ? "82vh"
            : undefined,
        overflow: "auto !important",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        {showTimer && (
          <Typography variant="h6">
            Sisa Waktu: {formatTime(question.answer_type === 3 ? timerMemorySpan : remainingTime)}
          </Typography>
        )}
        <Box
          sx={{
            marginLeft: "auto", // This ensures the box stays on the right
            marginBottom: 5,
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"} width={140}>
            <Button color="primary" startIcon={<TextDecrease />} variant="outlined" onClick={onDecreaseFont} />
            <Button color="primary" startIcon={<TextIncrease />} variant="outlined" onClick={onIncreaseFont} />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      {subtestNumber !== undefined && subtestName !== undefined && (
        <Typography variant="h6" sx={{ fontSize: fontSize }}>
          {subtestNumber}
        </Typography>
      )}
      {/* {showExampleLabel && ( */}
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: fontSize, my: 3 }}>
        Contoh Soal
      </Typography>
      {/* )} */}
      {question.answer_type !== 3 && (
        <Typography
          dangerouslySetInnerHTML={{ __html: question.question_content }}
          sx={{
            fontSize: fontSize,
            "& p": { margin: 0 },
            "& img": { maxWidth: "50vw", maxHeight: "22vh", margin: "0 auto", display: "block" },
            marginLeft:
              (question as SoalExamLS1).narrow_data.Uuid ===
              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                ? 0
                : "40px",
            display: "flex",
            flexDirection:
              (question as SoalExamLS1).narrow_data.Uuid ===
              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                ? "row"
                : "column",
            justifyContent:
              (question as SoalExamLS1).narrow_data.Uuid ===
              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                ? "center"
                : "flex-start",
          }}
        />
      )}
      {(question as SoalExamLS1).image_path_cat &&
        (question as SoalExamLS1).narrow_data.Uuid !==
          ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid && (
          <Box
            sx={{
              width: "100%",
              // height: "auto",
              // maxHeight: "200px",
              marginBottom: 4,
              display: "flex",
              justifyContent:
                (question as SoalExamLS1).narrow_data.Uuid ===
                ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                  ? "center"
                  : "flex-start",
            }}
          >
            <img
              src={import.meta.env.VITE_API_URL + (question as SoalExamLS1).image_path_cat}
              alt={"Answer image"}
              style={{
                marginTop: "8px",
                width: "auto",
                height: "auto",
                maxHeight:
                  (question as SoalExamLS1).narrow_data.Uuid ===
                  ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                    ? "30vh"
                    : undefined,
              }}
            />
          </Box>
        )}
      {(question as SoalExamLS1).narrow_data.Uuid ===
      ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid ? (
        <Grid container spacing={2} sx={{ overflow: "hidden", mt: 4 }}>
          <Grid item xs={12} lg={4}>
            {(question as SoalExamLS1).image_path_cat && (
              <Box
                sx={{
                  height: "auto",
                  marginBottom: 4,
                  display: "flex",
                  borderRight: "1px solid #ccc",
                  paddingRight: 4,
                  marginRight: 2,
                  justifyContent:
                    (question as SoalExamLS1).narrow_data.Uuid ===
                    ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                      ? "center"
                      : "flex-start",
                }}
              >
                <img
                  src={import.meta.env.VITE_API_URL + (question as SoalExamLS1).image_path_cat}
                  alt={"Answer image"}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    height: "100%",
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
            {(question as SoalExamLS1).answer_data.map((answer, index) => (
              <Grid key={index} item xs={12} md={6} lg={3.5 * (fontSize / 22)}>
                <Stack direction="row" alignItems="flex-start">
                  <CheckboxManual
                    isChecked={selectedAnswer === answer.uuid}
                    onClick={() => {
                      setSelectedAnswer(answer.uuid)
                      setIsCorrect(answer.is_question_answer)
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      cursor: "pointer",
                      minHeight: "27vh",
                    }}
                    onClick={() => {
                      setSelectedAnswer(answer.uuid)
                      setIsCorrect(answer.is_question_answer)
                    }}
                  >
                    <Box display={"flex"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                      {(question as SoalExamLS1).is_need_answer_label && <Typography>{answer.label}</Typography>}
                      {question.total_answer_should_have_for_true === 1 &&
                        selectedAnswer === answer.uuid &&
                        (isCorrect ? <CheckCircle style={{ color: "green" }} /> : <Cancel style={{ color: "red" }} />)}
                    </Box>

                    <img
                      src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                      alt={"Answer image"}
                      style={{
                        marginTop: "8px",
                        width: "90%",
                        height: "90%",
                        alignSelf: "center",
                        marginBottom: "8px",
                        transform: `scale(${(1 * (fontSize + 2)) / 22})`,
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
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:
                (question as SoalExamLS1).narrow_data.Uuid ===
                ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                  ? "center"
                  : "flex-start",
              mt: 4,
              pl: "35px",
            }}
          >
            {(question as SoalExamLS1).total_answer_should_have_for_true === 1 &&
              (question as SoalExamLS1).answer_type !== 3 && (
                <RadioGroup
                  row={question.answer_showing_position === 1 ? false : true}
                  key={question.Uuid}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {(question as SoalExamLS1).answer_data.map((answer, index) => (
                    <FormControlLabel
                      key={index}
                      value={answer.uuid}
                      control={
                        (question as SoalExamLS1).narrow_data.Uuid ===
                        ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                          <></>
                        ) : (
                          <CheckboxManual
                            isChecked={
                              question.total_answer_should_have_for_true === 1 && selectedAnswer === answer.uuid
                            }
                          />
                        )
                      }
                      onClick={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
                      label={
                        <>
                          <Box flexDirection={"row"} display={"flex"}>
                            <>
                              {(question as SoalExamLS1).narrow_data.Uuid ===
                              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                                <Box
                                  flexDirection={"column"}
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  width={"12vw"}
                                  height={"20vh"}
                                  onClick={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
                                >
                                  <Typography
                                    dangerouslySetInnerHTML={{ __html: answer.content }}
                                    sx={{
                                      "& img": {
                                        width: "100%",
                                        height: "100%",
                                        fontSize: fontSize,
                                        margin: 0,
                                        transform: `scale(${(1 * (fontSize + 10)) / 22})`,
                                      },
                                      "& p": { margin: 0 },
                                      "& figure": { margin: 0, marginRight: "0px", maxWidth: "100px" },
                                      fontSize: fontSize,
                                      mt: 5,
                                      mb: 5,
                                    }}
                                  />
                                  <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    height={"30%"}
                                  >
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                      <CheckboxManual
                                        isChecked={
                                          question.total_answer_should_have_for_true === 1 &&
                                          selectedAnswer === answer.uuid
                                        }
                                      />
                                      {(question as SoalExamLS1).is_need_answer_label && (
                                        <Typography>{answer.label}</Typography>
                                      )}
                                    </Box>

                                    {question.total_answer_should_have_for_true === 1 &&
                                      selectedAnswer === answer.uuid &&
                                      (isCorrect ? (
                                        <CheckCircle style={{ color: "green" }} />
                                      ) : (
                                        <Cancel style={{ color: "red" }} />
                                      ))}
                                  </Box>
                                </Box>
                              ) : (
                                <Box
                                  display={"flex"}
                                  onClick={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
                                >
                                  {(question as SoalExamLS1).is_need_answer_label && (
                                    <Typography sx={{ fontSize: fontSize }}>{answer.label}.&nbsp;</Typography>
                                  )}
                                  <Typography
                                    dangerouslySetInnerHTML={{ __html: answer.content }}
                                    sx={{
                                      display: "inline",
                                      "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                      "& p": {
                                        margin: 0,
                                        marginRight:
                                          (question as SoalExamLS1).narrow_data.Uuid ===
                                            ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid ||
                                          (question as SoalExamLS1).narrow_data.Uuid ===
                                            ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0]
                                              .examUuid
                                            ? 8
                                            : 0,
                                      },
                                      "& figure": { margin: 0, marginRight: "20px", maxWidth: "100px" },
                                      fontSize: fontSize,
                                    }}
                                  />
                                </Box>
                              )}

                              {answer.image_path_cat && (
                                <img
                                  src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                                  alt={`Answer ${index + 1} image`}
                                  style={{ maxWidth: "50%", marginTop: "8px", width: "50%", height: "50%" }}
                                />
                              )}
                            </>
                            {(question as SoalExamLS1).narrow_data.Uuid !==
                              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid &&
                              (question as SoalExamLS1).narrow_data.Uuid !==
                                ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid &&
                              (question as SoalExamLS1).narrow_data.Uuid !==
                                ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid &&
                              question.total_answer_should_have_for_true === 1 &&
                              selectedAnswer === answer.uuid &&
                              (isCorrect ? (
                                <CheckCircle style={{ marginLeft: "5px", color: "green" }} />
                              ) : (
                                <Cancel style={{ marginLeft: "5px", color: "red" }} />
                              ))}
                          </Box>
                        </>
                      }
                      sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 1 } }}
                    />
                  ))}
                </RadioGroup>
              )}
            {(question as SoalExamLS1).total_answer_should_have_for_true === 2 &&
              (question as SoalExamLS1).answer_type !== 3 && (
                <Box
                  display={"flex"}
                  flexDirection={question.answer_showing_position === 1 ? "column" : "row"}
                  justifyContent={
                    (question as SoalExamLS1).narrow_data.Uuid ===
                    ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                      ? "space-between"
                      : "flex-start"
                  }
                  sx={{ width: "100%" }}
                >
                  {(question as SoalExamLS1).answer_data.map((answer) => {
                    const isChecked = selectedAnswerMultiple.some((selected) => selected.uuid === answer.uuid)
                    const isDisabled =
                      !isChecked &&
                      selectedAnswerMultiple.length >= (question as SoalExamLS1).total_answer_should_have_for_true
                    return (
                      <FormControlLabel
                        key={answer.uuid}
                        value={answer.uuid}
                        control={
                          (question as SoalExamLS1).narrow_data?.Uuid ===
                          ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid ? (
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                cursor: "pointer",
                                opacity: 0, // Make it invisible but still clickable
                              }}
                            />
                          ) : (
                            <Checkbox size="small" />
                          )
                        }
                        onChange={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
                        disabled={isDisabled}
                        label={
                          <Box
                            display={"flex"}
                            flexDirection={question.answer_showing_position === 1 ? "row" : "column"}
                          >
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              flexDirection={
                                (question as SoalExamLS1).narrow_data.Uuid ===
                                ExamData.filter((ar) => ar.examName === "Lexical Knowledge")[0].examUuid
                                  ? "row"
                                  : "column"
                              }
                              alignItems={"center"}
                            >
                              {(question as SoalExamLS1).narrow_data.Uuid ===
                              ExamData.filter((ar) => ar.examName === "Lexical Knowledge")[0].examUuid ? (
                                <>
                                  {(question as SoalExamLS1).is_need_answer_label && (
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
                                <Box
                                  onClick={() =>
                                    isDisabled ? null : onAnswerSelect(answer.uuid, answer.is_question_answer)
                                  }
                                  width={"100%"}
                                >
                                  {answer.image_path_cat ? (
                                    <img
                                      src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                                      style={{
                                        width: "100%",
                                        maxWidth: `${5 * ((1 * (fontSize + 11)) / 22)}vw`,
                                        height: `${9 * ((1 * (fontSize + 11)) / 22)}vh`,
                                        transform: `scale(${(1 * (fontSize + 11)) / 22})`,
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
                                    {(question as SoalExamLS1).is_need_answer_label && (
                                      <Typography>{answer.label}</Typography>
                                    )}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                            {question.total_answer_should_have_for_true === 2 &&
                              ((selectedAnswerMultiple.filter(
                                (ar) => ar.uuid === answer.uuid && ar.isCorrectAnswer === true
                              ).length > 0 && <CheckCircle style={{ marginLeft: "5px", color: "green" }} />) ||
                                (selectedAnswerMultiple.filter(
                                  (ar) => ar.uuid === answer.uuid && ar.isCorrectAnswer === false
                                ).length > 0 && <Cancel style={{ marginLeft: "5px", color: "red" }} />))}
                          </Box>
                        }
                      />
                    )
                  })}
                </Box>
              )}
            {(question as SoalExamLS1).answer_type === 3 && (
              <>
                <Typography
                  variant="h6"
                  dangerouslySetInnerHTML={{
                    __html: startAnswer ? question.question_content : question.intro_data[indexMemorySpan].instruction,
                  }}
                  sx={{
                    "& p": { margin: 0, fontSize: fontSize },
                    fontSize: fontSize,
                    minHeight: "10px",
                    height: "auto",
                    textWrap: "wrap",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
                  {startAnswer === false ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: question.intro_data[indexMemorySpan].question_content }}
                      style={{ fontSize: fontSize + 5, fontWeight: "bold", alignSelf: "center" }}
                    />
                  ) : (
                    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} gap={3}>
                      {(question as SoalExamLS1).intro_data
                        .filter((ar) => ar.intro_type !== 2)
                        .map((answer, index) => (
                          <Grid item sx={{ display: "flex", alignItems: "center" }} key={index}>
                            <Stack direction="column" alignItems={"flex-start"} mt={4}>
                              {displayAnswerMemory === true && (
                                <span>
                                  {question.answer_data[0].content.replace(/(<([^>]+)>)/gi, "").split(" ")[index]}
                                </span>
                              )}
                              <TextField
                                variant="filled"
                                inputProps={{
                                  "data-state": answer.showing_order,
                                  style: { textTransform: "uppercase" },
                                }}
                                autoComplete="off"
                                inputRef={(input) => {
                                  // Only focus the first text field when startAnswer initially becomes true
                                  if (input && startAnswer && index === 0 && !initialFocusRef.current) {
                                    input.focus()
                                    initialFocusRef.current = true
                                  }
                                }}
                                onKeyUp={(e) => {
                                  const input = e.target as HTMLInputElement
                                  const cursorPosition = input.selectionStart
                                  const inputValue = input.value
                                  // @ts-ignore
                                  const rootElement = e.target.parentElement?.parentElement?.parentElement.parentElement
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
                                onChange={(e) => {
                                  handleEditMemorySpan(e.target.value, index)
                                }}
                              />
                            </Stack>
                          </Grid>
                        ))}
                    </Grid>
                  )}
                </div>
              </>
            )}
          </Box>
        </>
      )}
      {((question as SoalExamLS1).narrow_data.Uuid ===
        ExamData.filter((ar) => ar.examName === "Perceptual Speed – comparison")[0].examUuid ||
        (question as SoalExamLS1).narrow_data.Uuid ===
          ExamData.filter((ar) => ar.examName === "Number Facility")[0].examUuid) &&
        question.total_answer_should_have_for_true === 1 &&
        selectedAnswer &&
        (isCorrect !== null && isCorrect === true ? (
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CheckCircle style={{ marginRight: "5px", color: "green", fontSize: "40px" }} />
            <Typography sx={{ color: "green", fontSize: "24px" }} variant="body2">
              BENAR
            </Typography>
          </Box>
        ) : isCorrect !== null && isCorrect === false ? (
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Cancel style={{ marginRight: "5px", color: "red", fontSize: "40px" }} />
            <Typography sx={{ color: "red", fontSize: "24px" }} variant="body2">
              SALAH
            </Typography>
          </Box>
        ) : null)}
    </Card>
  )
}

export default ExamExampleTkk
