import React, { useState } from "react"
import { Box, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, Divider } from "@mui/material"
import { TextIncrease, TextDecrease } from "@mui/icons-material"
import { SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import { formatTime } from "@/utils/timer"

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
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Sisa Waktu: {formatTime(remainingTime)}</Typography>
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
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ mr: 2, minWidth: "30px", fontSize: fontSize }}>
              {soal.question_order}.
            </Typography>
            {questionType === "SoalExam" ? (
              <Typography variant="h6" sx={{ fontSize: fontSize }}>
                {soal.question_content}
              </Typography>
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  dangerouslySetInnerHTML={{ __html: soal.question_content }}
                  sx={{
                    "& p": { margin: 0, fontSize: fontSize },
                    fontSize: fontSize,
                    minHeight: "10px",
                    height: "auto",
                    textWrap: "wrap",
                  }}
                />
                <br />
                {(soal as SoalExamLS1).image_path_cat && (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "100px",
                      maxHeight: "200px",
                      marginBottom: 4,
                    }}
                  >
                    <img
                      src={import.meta.env.VITE_API_URL + (soal as SoalExamLS1).image_path_cat}
                      alt={"Answer image"}
                      style={{ marginTop: "8px", width: "auto", height: "100%" }}
                    />
                  </div>
                )}
              </Box>
            )}
          </Box>
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 4, pl: "35px" }}>
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
                  control={<Radio size="small" />}
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
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default SoalPertanyaanTkk
