import { useExamHooks } from "@/hooks/useExamHooks"
import { useExamMutation } from "@/mutations/exam.mutation"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface ujianSchema {
  Uuid: string
  exam_uuid: string
  module_data: {
    module_name: string
    exam_tool_uuid: string
    Uuid: string
  }
}

const SoalCard = ({ ujian }: { ujian: ujianSchema }) => {
  const navigate = useNavigate()

  const { startExamMutation } = useExamMutation()
  const examMutation = startExamMutation()

  const handleStartExam = () => {
    examMutation.mutate({
      examUuid: ujian.exam_uuid,
      moduleUuid: ujian.Uuid,
    })
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
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">{ujian.module_data.module_name}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleStartExam}>Mulai</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default SoalCard
