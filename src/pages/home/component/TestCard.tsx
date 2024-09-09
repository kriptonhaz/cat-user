import { Card, CardHeader, CardContent, Typography, CardActions, Button } from "@mui/material"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

interface soalSchema {
  id: number
  uuid: string
  title: string
  tanggalMulai: string
  tanggalSelesai: string
  tempat: string
  batch: number
}

const TestCard = ({ soal }: { soal: soalSchema }) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        border: "0.5px solid #ccc",
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.2,
              height: "3.6em", // 3 lines * 1.2 line-height
            }}
          >
            {soal.title}
          </Typography>
        }
        sx={{
          flexShrink: 0,
          padding: 2,
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Tanggal : {soal.tanggalMulai} - {soal.tanggalSelesai}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tempat dan Batch : {soal.tempat}, Batch {soal.batch}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-start", padding: 2 }}>
        <Button
          disabled={
            dayjs().isBefore(dayjs(soal.tanggalMulai).format()) || dayjs().isAfter(dayjs(soal.tanggalSelesai).format())
          }
          variant="contained"
          onClick={() => navigate(`/list-soal/${soal.uuid}`)}
        >
          Mulai
        </Button>
      </CardActions>
    </Card>
  )
}

export default TestCard
