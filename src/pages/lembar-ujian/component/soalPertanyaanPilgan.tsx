import React from "react"
import { Box, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material"
import { SoalExam } from "@/interfaces/exam.interface"
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
  soal: SoalExam
  isFinalQuestion: boolean
  activityId: string
  setAnswer: (answer: answer) => void
  selectedAnswer: answer | null
}) => {
  const { finishExamMutation } = useExamMutation()
  const examMutation = finishExamMutation()

  const handleChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const choosenAnswer = parseInt(event.target.value)
    // Remove this line: setSelectedOption(event.target.value)

    const answer = soal.answer_data.answer_mapping_reader.find((answer) => answer.value === choosenAnswer)

    if (answer?.content && answer?.value) {
      setAnswer({
        content: answer.content,
        value: answer.value,
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
            <Typography variant="h6">{soal.question_content}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 4, pl: "35px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleChoose}
              value={selectedAnswer ? selectedAnswer.value.toString() : ""}
            >
              {soal.answer_data.answer_mapping_reader.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer.value}
                  control={<Radio size="small" />}
                  label={answer.content}
                  sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
                />
              ))}
            </RadioGroup>
            {/* TODO: will show it later for different test tools */}
            {/* <ToggleButtonGroup
            value={selectedOption}
            exclusive
            onChange={handleOptionChange}
            sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500 }}
          >
            {["A. Chuan", "B. Chuan", "C. Chuan"].map((option) => (
              <ToggleButton key={option} value={option} sx={{ p: 0, border: "none", width: "100%" }}>
                <Card
                  sx={{
                    width: "100%",
                    margin: 1,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: selectedOption === option ? "2px solid #3f51b5" : "1px solid #ccc",
                    boxShadow: selectedOption === option ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none",
                  }}
                >
                  <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                    <Typography variant="body1" align="center" sx={{ fontSize: "1rem" }}>
                      {option}
                    </Typography>
                  </CardContent>
                </Card>
              </ToggleButton>
            ))}
          </ToggleButtonGroup> */}
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
