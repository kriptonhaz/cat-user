import { Card, CardHeader, CardContent, Typography, CardActions, Button } from "@mui/material"
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
    <>
      <Card
        sx={{
          border: "0.5px solid #ccc",
          boxShadow: 3,
          borderRadius: 2,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <CardHeader title={soal.title}></CardHeader>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Tanggal : {soal.tanggalMulai} - {soal.tanggalSelesai}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tempat dan Batch : {soal.tempat}, Batch {soal.batch}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/list-soal/${soal.uuid}`)}>Kerjakan</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default TestCard
