import { Grid, Typography } from "@mui/material"
import SoalCard from "./component/SoalCard"
import { useParams } from "react-router-dom"
import { useExamHooks } from "@/hooks/useExamHooks"
import { useEffect, useState } from "react"
import { getExamActivityByModule } from "@/service/exam.service"
import { IExamActivityResponse } from "@/interfaces/exam.interface"

const ListSoal = () => {
  const params = useParams()
  const { queryModuleExamAvailable, queryGetExam } = useExamHooks()
  const { data: dataModuleExamAvailable } = queryModuleExamAvailable(params.examId)
  const { data: dataExam } = queryGetExam(params.examId)

  const [activityExams, setActivityExams] = useState<IExamActivityResponse[]>([])

  useEffect(() => {
    const fetchActivityExams = async () => {
      if (dataModuleExamAvailable && activityExams.length === 0) {
        const exams = await Promise.all(
          dataModuleExamAvailable.data.map((module) => getExamActivityByModule(module.exam_uuid, module.Uuid))
        )
        setActivityExams(exams)
      }
    }
    fetchActivityExams()
  }, [dataModuleExamAvailable, activityExams])

  return (
    <>
      <Grid container sx={{ mt: 10, pl: 5 }} spacing={5}>
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
          {dataModuleExamAvailable?.data.length === 0 ? (
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: "medium",
                fontSize: 20,
                textAlign: "center",
                width: "100%",
                mt: 4,
              }}
            >
              Tidak ada modul ujian yang tersedia saat ini.
            </Typography>
          ) : (
            dataModuleExamAvailable?.data.map((module, index) => {
              return (
                <SoalCard
                  key={module.module_id}
                  ujian={{
                    ...module,
                    activity_stage:
                      activityExams.length > 0
                        ? activityExams.filter(
                          (ar) => ar.data.exam_uuid === module.exam_uuid && ar.data.module_uuid === module.Uuid
                        )[0].data.activity_stage
                        : 0,
                  }}
                />
              )
            })
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default ListSoal
