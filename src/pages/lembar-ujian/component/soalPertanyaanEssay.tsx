import {
  Box,
  Card,
  CardContent,
  TextareaAutosize,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"

const SoalPertanyaanEssay = () => {
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
        <Typography variant="h6">2. Apa hasil dari 1 + 1 ?</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 4 }}>
          <TextField
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            sx={{
              width: "100%",
              maxWidth: "600px",
              bgcolor: "background.paper",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SoalPertanyaanEssay
