import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface ujianSchema {
  id: number
  nama: string
}

const SoalCard = ({ ujian }: { ujian: ujianSchema }) => {
  const navigate = useNavigate()

  return (
    <>
      <Card
        sx={{
          maxWidth: "50%",
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
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">{ujian.nama}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/lembar-ujian/${ujian.id}`)}>Mulai</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default SoalCard
