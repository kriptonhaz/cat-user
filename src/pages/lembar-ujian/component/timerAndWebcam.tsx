import Webcam from "react-webcam"
import { Box, Typography } from "@mui/material"
import CameraOff from "@/assets/camera-off.png"
import React, { useEffect, useState } from "react"
import { FiberManualRecord } from "@mui/icons-material"
import { formatTime } from "@/utils/timer"

const TimerAndWebcam = ({
  tipeTimer,
  waktu,
  nextQuestion,
  questionIndex,
  isLoadingTimer,
  total_consume_time,
  remainingTime,
  showTimer = true,
}: {
  tipeTimer: number
  waktu: number
  nextQuestion: () => void
  questionIndex: number
  isLoadingTimer: boolean
  total_consume_time: number
  remainingTime: number
  showTimer?: boolean
}) => {
  const [isWebcamError, setIsWebcamError] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(total_consume_time)

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  useEffect(() => {
    if (!isLoadingTimer) {
      const elapsedTimer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)

      return () => clearInterval(elapsedTimer)
    }
  }, [isLoadingTimer])

  return (
    <>
      <Box sx={{ display: "flex", mt: 1, justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            mt: 5,
            justifyContent: "center",
            position: "relative",
            width: 320,
            height: 170,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {isWebcamError ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={CameraOff} alt="Camera Off" style={{ width: "100px", height: "100px" }} />
              <Typography variant="body2" sx={{ color: "red", mt: 1, textAlign: "center" }}>
                Terjadi kesalahan saat mengakses kamera
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                animation: "vibrate 1s infinite ease-in-out",
                color: "red",
                fontSize: 20,
                position: "absolute",
                top: 5,
                left: 5,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiberManualRecord />
              Recording
            </Box>
          )}
          <Webcam
            audio={false}
            height={170}
            screenshotFormat="image/jpeg"
            width={400}
            mirrored={true}
            videoConstraints={videoConstraints}
            style={{ position: "absolute", zIndex: 0, borderRadius: "15px" }}
            onUserMediaError={() => {
              setIsWebcamError(true)
            }}
            onUserMedia={() => {
              setIsWebcamError(false)
            }}
          />
        </Box>
      </Box>
      {showTimer && (
        <Box sx={{ display: "flex", mt: 5, justifyContent: "right" }}>
          <Typography variant="subtitle1">Waktu yang digunakan: {formatTime(elapsedTime)}</Typography>
        </Box>
      )}
    </>
  )
}

export default TimerAndWebcam
