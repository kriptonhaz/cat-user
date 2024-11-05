import React from "react"
import { Box, Card, CardContent, Typography, Button } from "@mui/material"
import { TextIncrease, TextDecrease } from "@mui/icons-material"
import { formatTime } from "@/utils/timer"

const CardTimer = ({
  remainingTime,
  timerType,
  subtestNumber,
  subtestName,
  onIncreaseFont,
  onDecreaseFont,
  showTimer = true,
}: {
  remainingTime: number
  timerType: number
  subtestNumber?: string
  subtestName?: string
  onIncreaseFont: () => void
  onDecreaseFont: () => void
  showTimer?: boolean
}) => {
  return (
    <Card
      sx={{
        width: "98%",
        border: "0.5px solid #ccc",
        boxShadow: 3,
        borderRadius: 0,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
        mb: 5,
        position: "sticky",
        top: "80px",
        zIndex: 9999,
      }}
    >
      <CardContent sx={{ padding: 0, paddingBottom: "0px !important" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {showTimer && <Typography variant="h6">Sisa Waktu: {formatTime(remainingTime)}</Typography>}
          <Box sx={timerType === 2 ? { width: "250px", display: "flex", justifyContent: "space-between" } : {}}>
            <Box display={"flex"} justifyContent={"space-between"} width={140}>
              <Button color="primary" startIcon={<TextDecrease />} variant="outlined" onClick={onDecreaseFont} />
              <Button color="primary" startIcon={<TextIncrease />} variant="outlined" onClick={onIncreaseFont} />
            </Box>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {subtestNumber} : {subtestName}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardTimer
