import React, { useEffect } from "react"
import { Box, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, Divider } from "@mui/material"
import { TextIncrease, TextDecrease } from "@mui/icons-material"
import { ITimerUjianResponse, SoalExam, SoalExamLS1, SoalExamPPI } from "@/interfaces/exam.interface"
import { useExamMutation } from "@/mutations/exam.mutation"
import { formatTime } from "@/utils/timer"
import { CheckboxManual } from "@/components/checkbox"

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
  remainingTime,
  timerUjian,
  showInstruction,
  fontSize,
  setFontSize,
  displayImage,
}: {
  soal: SoalExam | SoalExamLS1 | SoalExamPPI
  isFinalQuestion: boolean
  activityId: string
  setAnswer: (answer: answer) => void
  selectedAnswer: answer | null
  remainingTime: number
  timerUjian?: ITimerUjianResponse
  showInstruction: () => void
  fontSize: number
  setFontSize: (fontSize: number) => void
  displayImage?: boolean
}) => {
  const { finishExamMutation } = useExamMutation()
  const examMutation = finishExamMutation()

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
    } else if (questionType === "SoalExamLS1") {
      const answer = (soal as SoalExamLS1).answer_data.find((answer) => answer.Uuid === choosenAnswer)
      setAnswer({
        content: answer?.Uuid || "",
        value: 0,
      })
    } else if (questionType === "SoalExamPPI") {
      const soalPPI = soal as SoalExamPPI
      let content = ""
      if (soalPPI.answer_data.answer_type === 1) {
        // handle for type NOT CONSISTENCY
        if (choosenAnswer === "1") {
          content = soalPPI.answer_data.option_one_sub_aspect_uuid
        } else {
          content = soalPPI.answer_data.option_two_sub_aspect_uuid
        }
      } else {
        // handle for type CONSISTENCY
        content = soalPPI.answer_data.option_one_sub_aspect_uuid
      }
      setAnswer({
        content: content,
        value: Number(choosenAnswer),
      })
    }
  }

  useEffect(() => {
    console.log(selectedAnswer)
  }, [selectedAnswer])

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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="h6">Sisa Waktu: {formatTime(remainingTime)}</Typography>
            <Box
              sx={{
                ...(timerUjian?.data.timer_type === 2
                  ? { width: "250px", display: "flex", justifyContent: "space-between" }
                  : {}),
                marginLeft: "auto",
              }}
            >
              {timerUjian?.data.timer_type === 2 && (
                <Button color="warning" onClick={showInstruction}>
                  Instruksi
                </Button>
              )}
              <Box display={"flex"} justifyContent={"space-between"} width={140}>
                <Button
                  color="primary"
                  startIcon={<TextDecrease />}
                  variant="outlined"
                  onClick={() => setFontSize(fontSize - 1)}
                />
                <Button
                  color="primary"
                  startIcon={<TextIncrease />}
                  variant="outlined"
                  onClick={() => setFontSize(fontSize + 1)}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />
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
                {(!(soal as SoalExamLS1).is_image_interval || !displayImage) && (
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
                )}
                <br />
                {(soal as SoalExamLS1).image_path_cat && (
                  <div>
                    <img
                      src={import.meta.env.VITE_API_URL + (soal as SoalExamLS1).image_path_cat}
                      alt={"Answer image"}
                      style={{
                        marginTop: "8px",
                        width: "auto",
                        maxHeight: "30vh",
                        display: displayImage ? "block" : "none",
                      }}
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
              // onChange={handleChoose}
              value={
                selectedAnswer
                  ? questionType === "SoalExam" || questionType === "SoalExamPPI"
                    ? selectedAnswer.value
                    : selectedAnswer.content
                  : ""
              }
            >
              {questionType === "SoalExam" ? (
                (soal as SoalExam).answer_data.answer_mapping_reader.map((answer, index) => (
                  <FormControlLabel
                    key={index}
                    value={answer.value}
                    onClick={() => {
                      setAnswer({
                        content: answer?.content,
                        value: answer?.value,
                      })
                    }}
                    control={
                      <CheckboxManual isChecked={selectedAnswer ? selectedAnswer.value === answer.value : false} />
                    }
                    label={answer.content}
                    sx={{
                      mr: 7,
                      mb: 2,
                      "& .MuiFormControlLabel-label": {
                        ml: 0.5,
                        fontSize: fontSize,
                      },
                      fontSize: fontSize,
                    }}
                  />
                ))
              ) : questionType === "SoalExamLS1" ? (
                (!(soal as SoalExamLS1).is_image_interval || !displayImage) &&
                (soal as SoalExamLS1).answer_data.map((answer, index) => (
                  <FormControlLabel
                    key={index}
                    value={answer.Uuid}
                    onClick={() => {
                      setAnswer({
                        content: answer?.Uuid || "",
                        value: 0,
                      })
                    }}
                    control={
                      <CheckboxManual isChecked={selectedAnswer ? selectedAnswer.content === answer.Uuid : false} />
                    }
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
                ))
              ) : (
                <>
                  <FormControlLabel
                    key={(soal as SoalExamPPI).answer_data.option_one_value}
                    value={(soal as SoalExamPPI).answer_data.option_one_value}
                    onClick={() => {
                      const soalPPI = soal as SoalExamPPI
                      let content = ""
                      const choosenAnswer = "1"
                      if (soalPPI.answer_data.answer_type === 1) {
                        // handle for type NOT CONSISTENCY
                        content = soalPPI.answer_data.option_one_sub_aspect_uuid
                      } else {
                        // handle for type CONSISTENCY
                        content = soalPPI.answer_data.option_one_sub_aspect_uuid
                      }
                      setAnswer({
                        content: content,
                        value: Number(choosenAnswer),
                      })
                    }}
                    control={
                      <CheckboxManual
                        isChecked={
                          selectedAnswer?.value === parseInt((soal as SoalExamPPI).answer_data.option_one_value)
                        }
                      />
                    }
                    label={
                      <Box
                        sx={{
                          backgroundColor:
                            selectedAnswer?.value === parseInt((soal as SoalExamPPI).answer_data.option_one_value)
                              ? "#c9f395"
                              : "#d6d3d1",
                          padding: "12px",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "black", fontSize: fontSize }}>
                          {(soal as SoalExamPPI).answer_data.option_one_content}
                        </Typography>
                      </Box>
                    }
                    sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
                  />
                  <FormControlLabel
                    key={(soal as SoalExamPPI).answer_data.option_two_value}
                    value={(soal as SoalExamPPI).answer_data.option_two_value}
                    onClick={() => {
                      const soalPPI = soal as SoalExamPPI
                      let content = ""
                      const choosenAnswer = "2"
                      if (soalPPI.answer_data.answer_type === 1) {
                        // handle for type NOT CONSISTENCY
                        content = soalPPI.answer_data.option_two_sub_aspect_uuid
                      } else {
                        // handle for type CONSISTENCY
                        content = soalPPI.answer_data.option_one_sub_aspect_uuid
                      }
                      setAnswer({
                        content: content,
                        value: Number(choosenAnswer),
                      })
                    }}
                    control={
                      <CheckboxManual
                        isChecked={
                          selectedAnswer?.value === parseInt((soal as SoalExamPPI).answer_data.option_two_value)
                        }
                      />
                    }
                    label={
                      <Box
                        sx={{
                          backgroundColor:
                            selectedAnswer?.value === parseInt((soal as SoalExamPPI).answer_data.option_two_value)
                              ? "#c9f395"
                              : "#d6d3d1",
                          padding: "12px",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "black", fontSize: fontSize }}>
                          {(soal as SoalExamPPI).answer_data.option_two_content}
                        </Typography>
                      </Box>
                    }
                    sx={{ mb: 2, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
                  />
                </>
              )}
            </RadioGroup>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default SoalPertanyaanPilgan
