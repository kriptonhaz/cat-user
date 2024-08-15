import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import SoalCard from "./component/SoalCard"

const ListSoal = () => {
  const ujian = [
    {
      id: 1,
      nama: "Tes Logika",
    },
    {
      id: 2,
      nama: "Tes Aritmatika",
    },
    {
      id: 3,
      nama: "Tes Penalaran",
    },
  ]
  return (
    <>
      <Grid container sx={{ mt: 5, pl: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Daftar Soal</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>
            Berikut merupakan beberapa soal yang terdapat dalam ujian ini
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5, pl: 5 }} direction="column" spacing={3}>
        <Grid item>
          {ujian.map((ujian) => (
            <SoalCard key={ujian.id} ujian={ujian} />
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default ListSoal
