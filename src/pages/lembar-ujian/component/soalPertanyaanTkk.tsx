import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Checkbox,
  Grid,
  TextField,
} from "@mui/material"
import { TextIncrease, TextDecrease } from "@mui/icons-material"
import { SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import { formatTime } from "@/utils/timer"
import { ExamData } from "./exam-data"

export interface answer {
  content: string
  value: number
}

const SoalPertanyaanTkk = ({
  soal,
  setAnswer,
  selectedAnswer,
  remainingTime,
  timerType,
  subtestNumber,
  subtestName,
}: {
  soal: SoalExam | SoalExamLS1 | SoalExamPPI
  setAnswer: (answer: answer) => void
  selectedAnswer: answer | null
  remainingTime: number
  timerType: number
  subtestNumber?: string
  subtestName?: string
}) => {
  const [fontSize, setFontSize] = useState(22)
  const [answerMemorySpan, setAnswerMemorySpan] = useState<Array<{ order: number; content: string }>>([])
  const [startTimer, setStartTimer] = useState(false)
  const [indexMemorySpan, setIndexMemorySpan] = useState(0)
  const [timerMemorySpan, setTimerMemorySpan] = useState(0)
  const [startAnswer, setStartAnswer] = useState(false)

  useEffect(() => {
    if ((soal as SoalExamLS1).answer_type === 3) {
      setTimerMemorySpan((soal as SoalExamLS1).intro_data[indexMemorySpan].timer)
      setStartTimer(true)
      const timerSoal = setInterval(() => {
        setTimerMemorySpan((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => {
        clearInterval(timerSoal)
        setStartTimer(false)
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
        // TODO:
        console.log("ngapain yak")
      }
    }
  }, [timerMemorySpan, soal, startTimer])

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
    const choosenAnswer = isSoalExamLS1(soal) || isSoalExamPPI(soal) ? event.target.value : parseInt(event.target.value)
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
    const formattedAnswer = answerMemorySpan.sort((a, b) => a.order - b.order)
    setAnswer({ content: formattedAnswer.map((ar) => ar.content).join(""), value: 0 })
  }, [answerMemorySpan])

  const onIncreaseFont = () => {
    setFontSize(fontSize + 1)
  }

  const onDecreaseFont = () => {
    setFontSize(fontSize - 1)
  }

  return (
    <>
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
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">
              Sisa Waktu: {formatTime((soal as SoalExamLS1).answer_type === 3 ? timerMemorySpan : remainingTime)}
            </Typography>
            <Box sx={timerType === 2 ? { width: "250px", display: "flex", justifyContent: "space-between" } : {}}>
              <Box display={"flex"} justifyContent={"space-between"} width={140}>
                <Button color="primary" startIcon={<TextDecrease />} variant="outlined" onClick={onDecreaseFont} />
                <Button color="primary" startIcon={<TextIncrease />} variant="outlined" onClick={onIncreaseFont} />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />
          {subtestNumber !== undefined && subtestName !== undefined && (
            <Typography variant="h6" sx={{ fontSize: fontSize, mb: 3 }}>
              {subtestNumber} : {subtestName}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems:
                (soal as SoalExamLS1).subtest_model_uuid ===
                ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                  ? "center"
                  : "flex-start",
              flexDirection:
                (soal as SoalExamLS1).subtest_model_uuid ===
                ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid
                  ? "column"
                  : "row",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mr: 2, minWidth: "30px", fontSize: fontSize, textAlign: "left", alignSelf: "flex-start" }}
            >
              {soal.question_order}.
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
                    (soal as SoalExamLS1).subtest_model_uuid ===
                    ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                      ? "column"
                      : "row",
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
                    }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    dangerouslySetInnerHTML={{ __html: soal.question_content }}
                    sx={{
                      "& p": { margin: 0, fontSize: fontSize },
                      "& figure": { margin: 0, marginRight: "0px" },
                      fontSize: fontSize,
                      minHeight: "10px",
                      height: "auto",
                      textWrap: "wrap",
                    }}
                  />
                )}

                <br />
                {(soal as SoalExamLS1).image_path_cat && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "145px",
                      maxHeight: "200px",
                      marginBottom: 4,
                      display: "flex",
                      justifyContent:
                        (soal as SoalExamLS1).subtest_model_uuid ===
                        ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                          ? "center"
                          : "flex-start",
                    }}
                  >
                    <img
                      src={import.meta.env.VITE_API_URL + (soal as SoalExamLS1).image_path_cat}
                      alt={"Answer image"}
                      style={{ marginTop: "8px", width: "auto", height: "100%" }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:
                (soal as SoalExamLS1).subtest_model_uuid ===
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
                        __html: (soal as SoalExamLS1).intro_data[indexMemorySpan].question_content,
                      }}
                      style={{ fontSize: fontSize + 5, fontWeight: "bold", alignSelf: "center" }}
                    />
                  ) : (
                    (soal as SoalExamLS1).intro_data.map((answer, index) => (
                      <Grid item sx={{ display: "flex", alignItems: "center" }} key={index}>
                        <TextField
                          variant="filled"
                          title={"urutan" + answer.showing_order.toString()}
                          inputProps={{ "data-state": answer.showing_order }}
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
                  row={soal.answer_showing_position === 1 ? false : true}
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
                      control={
                        (soal as SoalExamLS1).subtest_model_uuid ===
                        ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                          <></>
                        ) : (
                          <Radio size="small" />
                        )
                      }
                      label={
                        <>
                          {(soal as SoalExamLS1).subtest_model_uuid ===
                          ExamData.filter((ar) => ar.examName === "Induction")[0].examUuid ? (
                            <Box
                              flexDirection={"column"}
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              sx={{ backgroundColor: selectedAnswer?.content === answer.uuid ? "#c5e89e" : undefined }}
                              width={"12vw"}
                              height={"16vh"}
                              onClick={() => selectAnswerInduction(answer.uuid)}
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
                              {(soal as SoalExamLS1).is_need_answer_label && <Typography>{answer.label}</Typography>}
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
                      }
                      sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
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
                    (soal as SoalExamLS1).subtest_model_uuid ===
                    ExamData.filter((ar) => ar.examName === "Flexibility of Closure")[0].examUuid
                      ? "space-between"
                      : "flex-start"
                  }
                  sx={{ width: "100%" }}
                >
                  {(soal as SoalExamLS1).answer_data.map((answer) => (
                    <FormControlLabel
                      key={answer.uuid}
                      value={answer.uuid}
                      control={<Checkbox size="small" />}
                      // @ts-ignore
                      onChange={handleChoose}
                      label={
                        <>
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
                      }
                    />
                  ))}
                </Box>
              )}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default SoalPertanyaanTkk
