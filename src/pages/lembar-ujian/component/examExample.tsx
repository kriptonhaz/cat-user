import { SoalExamLS1 } from "@/interfaces/exam.interface"
import React, { useState } from "react"
import { Cancel, Check } from "@mui/icons-material" // Import icons from Material-UI

interface ExamExampleProps {
  question: SoalExamLS1
}

const ExamExample: React.FC<ExamExampleProps> = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const onAnswerSelect = (uuid: string, isCorrectAnswer: boolean) => {
    setSelectedAnswer(uuid)
    setIsCorrect(isCorrectAnswer)
  }

  return (
    <div className="exam-question">
      <h3 dangerouslySetInnerHTML={{ __html: question.question_content }} style={{ fontSize: "22px" }} />
      <div className="answer-options">
        {question.answer_data.map((answer, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              id={`question-${question.ID}-answer-${index}`}
              name={`question-${question.ID}`}
              style={{ marginRight: "5px" }}
              value={answer.Uuid}
              onChange={() => onAnswerSelect(answer.Uuid, answer.is_question_answer)}
            />
            <label
              htmlFor={`question-${question.ID}-answer-${index}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer.content }} style={{ fontSize: "22px" }} />
              {selectedAnswer === answer.Uuid &&
                (isCorrect ? (
                  <Check style={{ marginLeft: "5px", color: "green" }} />
                ) : (
                  <Cancel style={{ marginLeft: "5px", color: "red" }} />
                ))}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExamExample
