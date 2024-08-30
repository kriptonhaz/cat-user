import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import SoalCard from "./component/SoalCard"
import { useParams } from "react-router-dom"
import { useExamHooks } from "@/hooks/useExamHooks"

const ListSoal = () => {
  const params = useParams()

  const { queryModuleExamAvailable } = useExamHooks()
  const { data: dataModuleExamAvailable } = queryModuleExamAvailable(params.examId)

  const { queryGetExam } = useExamHooks()
  const { data: dataExam } = queryGetExam(params.examId)
  return (
    <>
      <Grid container sx={{ mt: 5, pl: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>{dataExam?.data.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>
            Berikut merupakan beberapa soal yang terdapat dalam ujian ini
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5, pl: 5 }} direction="column" spacing={3}>
        <Grid item>
          {dataModuleExamAvailable?.data.map((module) => (
            <SoalCard key={module.module_id} ujian={module} />
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default ListSoal
