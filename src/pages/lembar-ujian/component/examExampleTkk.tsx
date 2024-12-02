import { SoalExamLS1 } from "@/interfaces/exam.interface"
import React, { useEffect, useState } from "react"
import { Cancel, Check, TextIncrease, TextDecrease } from "@mui/icons-material" // Import icons from Material-UI
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { formatTime } from "@/utils/timer"
import { ExamData } from "./exam-data"

interface ExamExampleTkkProps {
  question: SoalExamLS1
  remainingTime: number
  showExampleLabel?: boolean
  subtestNumber?: string
  subtestName?: string
  nextQuestion: () => void
  setDisableNextButton?: (val: boolean) => void
  showTimer?: boolean
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
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [selectedAnswerMultiple, setSelectedAnswerMultiple] = useState<
    Array<{ uuid: string; isCorrectAnswer: boolean }>
  >([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [fontSize, setFontSize] = useState(22)
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
      }, 1000)
    } else {
      setDisplayAnswerMemory(false)
    }
  }, [answerMemory])

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
          (question as SoalExamLS1).subtest_model_uuid ===
          ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid
            ? "82vh"
            : undefined,
        overflow: "auto !important",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {showTimer && (
          <Typography variant="h6">
            Sisa Waktu: {formatTime(question.answer_type === 3 ? timerMemorySpan : remainingTime)}
          </Typography>
        )}
        <Box>
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
      {showExampleLabel && (
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: fontSize, my: 3 }}>
          Contoh Soal
        </Typography>
      )}
      {question.answer_type !== 3 && (
        <Typography
          dangerouslySetInnerHTML={{ __html: question.question_content }}
          sx={{
            fontSize: fontSize,
            "& p": { margin: 0 },
            marginLeft:
              (question as SoalExamLS1).subtest_model_uuid ===
              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                ? 0
                : 40,
            display: "flex",
            flexDirection:
              (question as SoalExamLS1).subtest_model_uuid ===
              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                ? "row"
                : "column",
            justifyContent:
              (question as SoalExamLS1).subtest_model_uuid ===
              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                ? "center"
                : "flex-start",
          }}
        />
      )}
      {(question as SoalExamLS1).image_path_cat &&
        (question as SoalExamLS1).subtest_model_uuid !==
          ExamData.filter((ar) => ar.examName === "Visualization")[0].examUuid && (
          <Box
            sx={{
              width: "100%",
              // height: "auto",
              // maxHeight: "200px",
              marginBottom: 4,
              display: "flex",
              justifyContent:
                (question as SoalExamLS1).subtest_model_uuid ===
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
              }}
            />
          </Box>
        )}
      {(question as SoalExamLS1).subtest_model_uuid ===
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
                  justifyContent:
                    (question as SoalExamLS1).subtest_model_uuid ===
                    ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                      ? "center"
                      : "flex-start",
                }}
              >
                <img
                  src={import.meta.env.VITE_API_URL + (question as SoalExamLS1).image_path_cat}
                  alt={"Answer image"}
                  style={{
                    width: "80%",
                    margin: "8px auto",
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
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    cursor: "pointer",
                    minHeight: "27vh",
                    backgroundColor: selectedAnswer === answer.uuid ? "#c5e89e" : undefined,
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
                      (isCorrect ? <Check style={{ color: "green" }} /> : <Cancel style={{ color: "red" }} />)}
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
                    }}
                  />
                </Box>
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
                (question as SoalExamLS1).subtest_model_uuid ===
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
                        (question as SoalExamLS1).subtest_model_uuid ===
                        ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                          <></>
                        ) : (
                          <Radio size="small" />
                        )
                      }
                      onChange={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
                      label={
                        <>
                          <Box flexDirection={"row"} display={"flex"}>
                            <>
                              {(question as SoalExamLS1).subtest_model_uuid ===
                              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                                <Box
                                  flexDirection={"column"}
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  sx={{ backgroundColor: selectedAnswer === answer.uuid ? "#c5e89e" : undefined }}
                                  width={"12vw"}
                                  height={"20vh"}
                                  onClick={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
                                >
                                  <Typography
                                    dangerouslySetInnerHTML={{ __html: answer.content }}
                                    sx={{
                                      "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                      "& p": { margin: 0 },
                                      "& figure": { margin: 0, marginRight: "0px", maxWidth: "100px" },
                                      fontSize: fontSize,
                                    }}
                                  />
                                  <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    height={"30%"}
                                  >
                                    {(question as SoalExamLS1).is_need_answer_label && (
                                      <Typography>{answer.label}</Typography>
                                    )}
                                    {question.total_answer_should_have_for_true === 1 &&
                                      selectedAnswer === answer.uuid &&
                                      (isCorrect ? (
                                        <Check style={{ color: "green" }} />
                                      ) : (
                                        <Cancel style={{ color: "red" }} />
                                      ))}
                                  </Box>
                                </Box>
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

                              {answer.image_path_cat && (
                                <img
                                  src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                                  alt={`Answer ${index + 1} image`}
                                  style={{ maxWidth: "50%", marginTop: "8px", width: "50%", height: "50%" }}
                                />
                              )}
                            </>
                            {(question as SoalExamLS1).subtest_model_uuid !==
                              ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid &&
                              question.total_answer_should_have_for_true === 1 &&
                              selectedAnswer === answer.uuid &&
                              (isCorrect ? (
                                <Check style={{ marginLeft: "5px", color: "green" }} />
                              ) : (
                                <Cancel style={{ marginLeft: "5px", color: "red" }} />
                              ))}
                          </Box>
                        </>
                      }
                      sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
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
                    (question as SoalExamLS1).subtest_model_uuid ===
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
                        control={<Checkbox size="small" />}
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
                              flexDirection={"column"}
                              alignItems={"center"}
                            >
                              <Typography
                                dangerouslySetInnerHTML={{ __html: answer.content }}
                                sx={{
                                  "& img": { width: "100%", height: "100%", fontSize: fontSize, margin: 0 },
                                  "& p": { margin: 0 },
                                  "& figure": { margin: 0, marginRight: "20px", maxWidth: "100px" },
                                  fontSize: fontSize,
                                }}
                              />
                              {(question as SoalExamLS1).is_need_answer_label && (
                                <Typography>{answer.label}</Typography>
                              )}
                            </Box>
                            {question.total_answer_should_have_for_true === 2 &&
                              ((selectedAnswerMultiple.filter(
                                (ar) => ar.uuid === answer.uuid && ar.isCorrectAnswer === true
                              ).length > 0 && <Check style={{ marginLeft: "5px", color: "green" }} />) ||
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
                                onChange={(e) => handleEditMemorySpan(e.target.value, index)}
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
    </Card>
  )
}

export default ExamExampleTkk
