import { Card, Grid, Typography, CardContent } from "@mui/material"
import TestCard from "./component/TestCard"
import { useExamHooks } from "@/hooks/useExamHooks"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { useProfileHooks } from "@/hooks/useProfileHooks"
import { useEffect, useState } from "react"

const HomePage: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  const { queryExamAvailable } = useExamHooks()
  const { queryProfile } = useProfileHooks()

  const { data: dataExamAvailable } = queryExamAvailable()
  const { data: dataProfile } = queryProfile()

  useEffect(() => {
    if (dataProfile) {
      localStorage.setItem("nip", dataProfile.data.nip)
      localStorage.setItem("name", dataProfile.data.full_name)
      localStorage.setItem("gender", dataProfile.data.sex === 1 ? "Laki - laki" : "Perempuan")
    }
  }, [dataProfile])

  return (
    <>
      <Card>
        <Grid container sx={{ mt: 5, pl: 5 }} spacing={5}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Profil</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>Informasi Data Diri</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>Nama : {dataProfile?.data.full_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>NIP : {dataProfile?.data.nip}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                border: "1px solid #ccc", // Added border
                "&:hover": {
                  boxShadow: 3,
                },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <CardContent>
                <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>Riwayat Edukasi</Typography>
                {expanded && (
                  <div>
                    <Typography sx={{ mt: 2 }}>
                      Jenis Kelamin: {dataProfile?.data.sex === 1 ? "Laki-laki" : "Perempuan"}
                    </Typography>
                    <Typography>Email: {dataProfile?.data.email}</Typography>
                    {/* Tambahkan informasi lain yang ingin ditampilkan */}
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                border: "1px solid #ccc", // Added border
                "&:hover": {
                  boxShadow: 3,
                },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <CardContent>
                <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>Riwayat Pekerjaan</Typography>
                {expanded && (
                  <div>
                    <Typography sx={{ mt: 2 }}>
                      Jenis Kelamin: {dataProfile?.data.sex === 1 ? "Laki-laki" : "Perempuan"}
                    </Typography>
                    <Typography>Email: {dataProfile?.data.email}</Typography>
                    {/* Tambahkan informasi lain yang ingin ditampilkan */}
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
      <Grid container sx={{ mt: 5, pl: 5, mb: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Daftar Ujian</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>
            Berikut merupakan beberapa ujian yang dapat anda kerjakan
          </Typography>
        </Grid>
        {dataExamAvailable?.data.map((exam) => {
          return (
            <Grid item xs={3} key={exam.ID}>
              <TestCard
                soal={{
                  id: exam.ID,
                  uuid: exam.exam_uuid,
                  title: exam.exam_data.name,
                  tanggalMulai: dayjs(exam.exam_data.start_time).locale("id").format("dddd, DD MMMM YYYY"),
                  tanggalSelesai: dayjs(exam.exam_data.end_time).locale("id").format("dddd, DD MMMM YYYY"),
                  tempat: exam.exam_data.location,
                  batch: parseInt(exam.exam_data.batch),
                }}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default HomePage
