import { Grid, Typography } from "@mui/material"
import TestCard from "./component/TestCard"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const listSoal = [
    {
      id: 1,
      title: "Test Chuan",
      tanggalMulai: "Kamis, 18 April 2024",
      tanggalSelesai: "Jumat, 18 April 2025",
      tempat: "Jakarta",
      batch: 1,
    },
    {
      id: 2,
      title: "Test Thariq",
      tanggalMulai: "Kamis, 18 April 2024",
      tanggalSelesai: "Jumat, 18 April 2025",
      tempat: "Jakarta",
      batch: 1,
    },
    {
      id: 3,
      title: "Test Joyce",
      tanggalMulai: "Kamis, 18 April 2024",
      tanggalSelesai: "Jumat, 18 April 2025",
      tempat: "Jakarta",
      batch: 1,
    },
  ]

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      navigate("/login")
    }
  })

  return (
    <>
      <Grid container sx={{ mt: 5, pl: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Daftar Ujian</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>
            Berikut merupakan beberapa ujian yang dapat anda kerjakan
          </Typography>
        </Grid>
        {listSoal.map((soal) => {
          return (
            <Grid item xs={3} key={soal.id}>
              <TestCard soal={soal} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default HomePage
