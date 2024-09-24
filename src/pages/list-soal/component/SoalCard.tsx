import { useExamMutation } from "@/mutations/exam.mutation"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { neutral, info, danger, success } from "@/theme/ts/colors"

interface ujianSchema {
  Uuid: string
  exam_uuid: string
  exam_type_name: string
  module_data: {
    exam_tool_model_id: number
    module_name: string
    exam_tool_model_uuid: string
    Uuid: string
  }
  activity_stage: number
}

const SoalCard = ({ ujian }: { ujian: ujianSchema }) => {
  const { startExamMutation } = useExamMutation()
  const examMutation = startExamMutation()
  const sedangDikerjakanStage = [1, 2, 3, 4, 5, 6, 7]

  const handleStartExam = (model: string, examToolModelUuid: string, examModelId: number) => {
    examMutation.mutate({
      examUuid: ujian.exam_uuid,
      moduleUuid: ujian.Uuid,
      examToolUuid: examToolModelUuid,
      examModelId,
      model,
    })
  }

  const statusUjian = (status: number) => {
    if (status === 0) {
      return {
        color: neutral[500],
        fontColor: "white",
        status: "Belum Dikerjakan",
      }
    } else if (sedangDikerjakanStage.includes(status)) {
      return {
        color: info[500],
        fontColor: "white",
        status: "Sedang Dikerjakan",
      }
    } else if (status === 8) {
      return {
        color: danger[500],
        fontColor: "white",
        status: "Waktu Habis",
      }
    } else {
      return {
        color: success[500],
        fontColor: "white",
        status: "Selesai",
      }
    }
  }

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
          position: "relative",
        }}
      >
        <>
          <Typography
            variant="subtitle2"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: statusUjian(ujian.activity_stage).color,
              color: statusUjian(ujian.activity_stage).fontColor,
              padding: "4px 8px",
              borderRadius: 1,
              fontSize: "0.75rem",
            }}
          >
            {statusUjian(ujian.activity_stage).status}
          </Typography>
          <CardContent sx={{ display: "flex", alignItems: "center", pt: 4 }}>
            <Typography variant="h6">{ujian.module_data.module_name}</Typography>
          </CardContent>
          <CardActions>
            <Button
              disabled={ujian.activity_stage === 9}
              onClick={() =>
                handleStartExam(
                  ujian.exam_type_name,
                  ujian.module_data.exam_tool_model_uuid,
                  ujian.module_data.exam_tool_model_id
                )
              }
            >
              {ujian.activity_stage === 0
                ? "Mulai"
                : sedangDikerjakanStage.includes(ujian.activity_stage)
                ? "Lanjutkan"
                : "Sudah Selesai"}
            </Button>
          </CardActions>
        </>
      </Card>
    </>
  )
}

export default SoalCard
