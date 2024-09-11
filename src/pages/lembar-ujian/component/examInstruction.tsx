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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="image">
        <img src={import.meta.env.VITE_API_URL + imageSrc} alt={imageAlt} style={{ width: "700px", height: "auto" }} />
      </div>
    </div>
  )
}

export default ExamInstruction
