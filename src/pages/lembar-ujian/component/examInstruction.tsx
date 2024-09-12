import { Typography } from "@mui/material"
import React from "react"

interface ExamInstructionProps {
  content: string
  imageSrc: string
  imageAlt?: string
}

const ExamInstruction: React.FC<ExamInstructionProps> = ({
  content,
  imageSrc,
  imageAlt = "Exam instruction image",
}) => {
  return (
    <div className="exam-instruction">
      <div className="content">
        <Typography dangerouslySetInnerHTML={{ __html: content }} sx={{ "& p": { fontSize: "22px" } }} />
      </div>
      <div className="image" style={{ height: "500px", maxHeight: "500px" }}>
        <img src={import.meta.env.VITE_API_URL + imageSrc} alt={imageAlt} style={{ width: "auto", height: "50%" }} />
      </div>
    </div>
  )
}

export default ExamInstruction
