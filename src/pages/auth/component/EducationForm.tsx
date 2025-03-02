import useEducation from "@/hooks/useEducation"
import { Education } from "@/interfaces/education.interface"
import EmptyState from "@/components/EmptyState"
import InputGroup from "@/ui/components/InputGroup"
import { LoadingScreen } from "@/ui/views/LoadingPage"
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { ArrowCircleLeft, FloppyDisk, Pencil, Plus, Trash } from "phosphor-react"
import React, { useState } from "react"
import ModalAddEducation from "../modals/ModalAddEducation"
import ModalDelete from "../modals/ModalDelete"

export interface FormEducationProps {
  prevStep: () => void
  nextStep: () => void
  userId: number | null
  userUuid: string
}
const EducationForm: React.FC<FormEducationProps> = (props) => {
  const { prevStep, nextStep, userId, userUuid } = props
  const [educationEdited, setEducationEdited] = useState<Education | null>(null)
  const [showModalAdd, setShowModalAdd] = useState(false)
  const { getByUserUuidQuery, deleteMutation } = useEducation()
  const [modalDelete, setModalDelete] = useState<{ show: boolean; education: Partial<Education> | null }>({
    show: false,
    education: null,
  })
  const userEducationsQuery = getByUserUuidQuery({
    user_uuid: userUuid!,
  })

  const handleEdit = (education: Education) => {
    setEducationEdited(education)
    setShowModalAdd(true)
  }

  const destroy = deleteMutation({
    onSuccess: () => {
      setModalDelete((prev) => ({ ...prev, show: false, education: null }))
    },
  })

  const onDelete = () => {
    destroy.mutate({
      uuid: modalDelete.education?.uuid!,
    })
  }

  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        sx={{
          height: "400px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
        }}
      >
        {userEducationsQuery.isPending && (
          <Box sx={{ height: "400px" }}>
            <LoadingScreen />
          </Box>
        )}
        {userEducationsQuery.data?.data.length === 0 && <EmptyState />}

        {userEducationsQuery?.data?.data.map((education, index) => (
          <Box sx={{ border: "1px solid #ccc", px: 6, py: 4, borderRadius: "8px" }} key={index}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="subtitle2" fontWeight={"semiBold"}>
                Pendidikan ke-{index + 1}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  data-shape="icon"
                  color="success"
                  onClick={() => {
                    handleEdit(education)
                  }}
                >
                  <Pencil size={24} />
                </Button>
                <Button
                  data-shape="icon"
                  color="error"
                  onClick={() => setModalDelete((prev) => ({ ...prev, show: true, education: education }))}
                >
                  <Trash size={24} />
                </Button>
              </Stack>
            </Stack>
            <Grid container columnSpacing={4}>
              <Grid item xs={12} md={6}>
                <InputGroup label="Gelar" value={education.title} readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputGroup label="Grade" value={education.grade} readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputGroup label="Program Studi" value={education.major} readOnly />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Stack>
      <Button startIcon={<Plus size={20} />} sx={{ mt: 3 }} onClick={() => setShowModalAdd(true)}>
        Tambah Pendidikan Baru
      </Button>
      <Stack direction="row" justifyContent="flex-end" spacing={4} sx={{ mt: 4 }}>
        <Button
          variant="text"
          type="button"
          color="inherit"
          onClick={prevStep}
          startIcon={<ArrowCircleLeft size={20} />}
        >
          Kembali
        </Button>
        <Button onClick={nextStep} startIcon={<FloppyDisk size={20} />}>
          Simpan
        </Button>
      </Stack>
      <ModalAddEducation
        open={showModalAdd}
        onClose={() => {
          setShowModalAdd(false)
          setEducationEdited(null)
        }}
        userId={userId}
        userUuid={userUuid}
        education={educationEdited}
      />
      <ModalDelete
        open={modalDelete.show}
        onClose={() => setModalDelete((prev) => ({ ...prev, show: false, user: null }))}
        title={"Hapus Data Pengguna"}
        message={"Apakah Anda yakin ingin menghapus data ini?"}
        onDelete={onDelete}
        loading={destroy.isPending}
      />
    </>
  )
}

export default EducationForm
