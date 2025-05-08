import { formatTime } from "@/utils/timer"
import { Box, Button, Card, Divider, Typography } from "@mui/material"
import React, { useState } from "react"
import { TextIncrease, TextDecrease } from "@mui/icons-material"

interface ExamInstructionProps {
  content: string
  imageSrc: string
  imageAlt?: string
  remainingTime: number
  showInstructionLabel?: boolean
  subtestNumber?: string
  subtestName?: string
  showTimer?: boolean
  fontSize: number
  setFontSize: (fontSize: number) => void
}

const ExamInstruction: React.FC<ExamInstructionProps> = ({
  content,
  imageSrc,
  imageAlt = "Exam instruction image",
  remainingTime,
  showInstructionLabel = false,
  subtestNumber,
  subtestName,
  showTimer = true,
  fontSize,
  setFontSize,
}) => {
  // const [fontSize, setFontSize] = useState(22)

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
        height: "560px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        {showTimer && <Typography variant="h6">Sisa Waktu: {formatTime(remainingTime)}</Typography>}
        <Box
          sx={{
            marginLeft: "auto", // This ensures the box stays on the right
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
      {showInstructionLabel && (
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: fontSize, my: 3 }}>
          Instruksi
        </Typography>
      )}
      <div className="content">
        <Typography dangerouslySetInnerHTML={{ __html: content }} sx={{ "& p": { fontSize: fontSize } }} />
      </div>
      {imageSrc !== "" && (
        <div className="image" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={import.meta.env.VITE_API_URL + imageSrc}
            alt={imageAlt}
            style={{ width: "auto", height: "100%", maxHeight: "380px" }}
          />
        </div>
      )}
    </Card>
  )
}

export default ExamInstruction
