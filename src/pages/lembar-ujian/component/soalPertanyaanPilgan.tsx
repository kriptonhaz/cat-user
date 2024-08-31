import React, { useState } from "react"
import { Box, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { SoalExam } from "@/interfaces/exam.interface"

interface soalSchema {
  Uuid: string
  question_content: string
  question_order: number
  answer_data: {
    question_uuid: string
    answer_mapping: string
    answer_mapping_reader: {
      content: string
      value: number
    }[]
  }
}

const SoalPertanyaanPilgan = ({ soal }: { soal: SoalExam }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (_event: React.MouseEvent<HTMLElement>, newOption: string | null) => {
    setSelectedOption(newOption)
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
      }}
    >
      <CardContent>
        <Typography variant="h6">{soal.question_content}</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 4 }}>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
            {soal.answer_data.answer_mapping_reader.map((answer) => (
              <FormControlLabel
                value={answer.value}
                control={<Radio size="small" />}
                label={answer.content}
                sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
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
      </CardContent>
    </Card>
  )
}

export default SoalPertanyaanPilgan
