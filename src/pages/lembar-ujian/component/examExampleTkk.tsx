import { SoalExamLS1 } from "@/interfaces/exam.interface"
import React, { useState } from "react"
import { Cancel, Check, TextIncrease, TextDecrease } from "@mui/icons-material" // Import icons from Material-UI
import { Box, Button, Card, Divider, Typography } from "@mui/material"
import { formatTime } from "@/utils/timer"

interface ExamExampleTkkProps {
  question: SoalExamLS1
  remainingTime: number
  showExampleLabel?: boolean
  subtestNumber?: string
  subtestName?: string
}

const ExamExampleTkk: React.FC<ExamExampleTkkProps> = ({
  question,
  remainingTime,
  showExampleLabel = false,
  subtestNumber,
  subtestName,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [fontSize, setFontSize] = useState(22)

  const onAnswerSelect = (uuid: string, isCorrectAnswer: boolean) => {
    setSelectedAnswer(uuid)
    setIsCorrect(isCorrectAnswer)
  }

  const onIncreaseFont = () => {
    setFontSize(fontSize + 1)
  }

  const onDecreaseFont = () => {
    setFontSize(fontSize - 1)
  }

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
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Sisa Waktu: {formatTime(remainingTime)}</Typography>
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
          {subtestNumber} : {subtestName}
        </Typography>
      )}
      {showExampleLabel && (
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: fontSize, my: 3 }}>
          Contoh Soal
        </Typography>
      )}
      <h3
        dangerouslySetInnerHTML={{ __html: question.question_content }}
        style={{ fontSize: fontSize, marginLeft: 40 }}
      />
      <div className="answer-options">
        {question.answer_data.map((answer, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", height: "40px", marginLeft: 40 }}>
            <input
              type="radio"
              id={`question-${question.ID}-answer-${index}`}
              name={`question-${question.ID}`}
              style={{ marginRight: "15px" }}
              value={answer.uuid}
              onChange={() => onAnswerSelect(answer.uuid, answer.is_question_answer)}
            />
            <label
              htmlFor={`question-${question.ID}-answer-${index}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer.content }} style={{ fontSize: fontSize }} />
              {selectedAnswer === answer.uuid &&
                (isCorrect ? (
                  <Check style={{ marginLeft: "5px", color: "green" }} />
                ) : (
                  <Cancel style={{ marginLeft: "5px", color: "red" }} />
                ))}
            </label>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ExamExampleTkk
