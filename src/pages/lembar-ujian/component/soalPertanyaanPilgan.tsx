import React from "react"
import { Box, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material"
import { SoalExam, SoalExamLS1 } from "@/interfaces/exam.interface"
import { useExamMutation } from "@/mutations/exam.mutation"

export interface answer {
  content: string
  value: number
}

const SoalPertanyaanPilgan = ({
  soal,
  isFinalQuestion,
  activityId,
  setAnswer,
  selectedAnswer,
}: {
  soal: SoalExam | SoalExamLS1
  isFinalQuestion: boolean
  activityId: string
  setAnswer: (answer: answer) => void
  selectedAnswer: answer | null
}) => {
  const { finishExamMutation } = useExamMutation()
  const examMutation = finishExamMutation()

  const isSoalExamLS1 = (soal: SoalExam | SoalExamLS1): soal is SoalExamLS1 => {
    return "image_path_cat" in soal
  }

  const questionType: "SoalExamLS1" | "SoalExam" = isSoalExamLS1(soal) ? "SoalExamLS1" : "SoalExam"

  const handleChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = isSoalExamLS1(soal) ? event.target.value : parseInt(event.target.value)

    if (questionType === "SoalExam") {
      const answer = (soal as SoalExam).answer_data.answer_mapping_reader.find(
        (answer) => answer.value === choosenAnswer
      )

      if (answer?.content && answer?.value) {
        setAnswer({
          content: answer.content,
          value: answer.value,
        })
      }
    } else {
      const answer = (soal as SoalExamLS1).answer_data.find((answer) => answer.Uuid === choosenAnswer)
      setAnswer({
        content: answer?.Uuid || "",
        value: 0,
      })
    }
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
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ mr: 2, minWidth: "30px" }}>
              {soal.question_order}.
            </Typography>
            {questionType === "SoalExam" ? (
              <Typography variant="h6">{soal.question_content}</Typography>
            ) : (
              <>
                <Typography
                  variant="h6"
                  dangerouslySetInnerHTML={{ __html: soal.question_content }}
                  sx={{ "& p": { margin: 0 } }}
                />
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 4, pl: "35px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleChoose}
              value={
                selectedAnswer ? (questionType === "SoalExam" ? selectedAnswer.value : selectedAnswer.content) : ""
              }
            >
              {questionType === "SoalExam"
                ? (soal as SoalExam).answer_data.answer_mapping_reader.map((answer, index) => (
                    <FormControlLabel
                      key={index}
                      value={answer.value}
                      control={<Radio size="small" />}
                      label={answer.content}
                      sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
                    />
                  ))
                : (soal as SoalExamLS1).answer_data.map((answer, index) => (
                    <FormControlLabel
                      key={index}
                      value={answer.Uuid}
                      control={<Radio size="small" />}
                      label={
                        <>
                          <Typography dangerouslySetInnerHTML={{ __html: answer.content }} />
                          {answer.image_path_cat && (
                            <img
                              src={import.meta.env.VITE_API_URL + answer.image_path_cat}
                              alt={`Answer ${index + 1} image`}
                              style={{ maxWidth: "100%", marginTop: "8px" }}
                            />
                          )}
                        </>
                      }
                      sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
                    />
                  ))}
            </RadioGroup>
          </Box>
          {isFinalQuestion && (
            <Button onClick={() => examMutation.mutate({ activityUuid: activityId })}>Selesai</Button>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default SoalPertanyaanPilgan
