import React, { useState } from "react"
import { Box, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material"

const SoalPertanyaanPilgan = () => {
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
        <Typography variant="h6">
          1. Saya menggagas perubahan sistem di tempat kerja saya, walaupun menghadapi banyak penolakan dari rekan
          kerja?
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 4 }}>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
            <FormControlLabel
              value="sts"
              control={<Radio size="small" />}
              label="Sangat Tidak Setuju"
              sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
            />
            <FormControlLabel
              value="ts"
              control={<Radio size="small" />}
              label="Tidak Setuju"
              sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
            />
            <FormControlLabel
              value="ats"
              control={<Radio size="small" />}
              label="Agak Tidak Setuju"
              sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
            />
            <FormControlLabel
              value="as"
              control={<Radio size="small" />}
              label="Agak Setuju"
              sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
            />
            <FormControlLabel
              value="s"
              control={<Radio size="small" />}
              label="Setuju"
              sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
            />
            <FormControlLabel
              value="ss"
              control={<Radio size="small" />}
              label="Sangat Setuju"
              sx={{ mr: 8, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
            />
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
