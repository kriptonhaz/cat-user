import { Card, Grid, Typography, CardContent } from "@mui/material"
import TestCard from "./component/TestCard"
import { useExamHooks } from "@/hooks/useExamHooks"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { useProfileHooks } from "@/hooks/useProfileHooks"
import { useEffect, useState } from "react"

const HomePage: React.FC = () => {
  const [edukasiExpanded, setEdukasiExpanded] = useState(false)
  const [jobExpanded, setJobExpanded] = useState(false)

  const { queryExamAvailable } = useExamHooks()
  const { queryProfile } = useProfileHooks()

  const { data: dataExamAvailable } = queryExamAvailable()
  const { data: dataProfile } = queryProfile()

  return (
    <>
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
        <Grid item xs={5}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              border: "1px solid #ccc", // Added border
              "&:hover": {
                boxShadow: 3,
              },
            }}
            onClick={() => setEdukasiExpanded(!edukasiExpanded)}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>Riwayat Edukasi</Typography>
              {edukasiExpanded &&
                dataProfile?.data.education.map((edukasi) => (
                  <div key={edukasi.ID}>
                    <Card>
                      <Typography sx={{ mt: 2 }}>
                        Jurusan: {edukasi.grade} {edukasi.major}
                      </Typography>
                      <Typography sx={{ mt: 2 }}>Gelar: {edukasi.title}</Typography>
                    </Card>
                  </div>
                ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              border: "1px solid #ccc", // Added border
              "&:hover": {
                boxShadow: 3,
              },
            }}
            onClick={() => setJobExpanded(!jobExpanded)}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>Riwayat Pekerjaan</Typography>
              {jobExpanded &&
                dataProfile?.data.job.map((job) => (
                  <div key={job.ID}>
                    <Card>
                      <Typography sx={{ mt: 2 }}>Divisi: {job.work_department}</Typography>
                      <Typography sx={{ mt: 2 }}>Jabatan: {job.job_title}</Typography>
                    </Card>
                  </div>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
