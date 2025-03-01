import useJob from "@/hooks/useJob"
import useUrl from "@/hooks/useUrl"
import { Job } from "@/interfaces/job.interface"
import EmptyState from "@/components/EmptyState"
import InputGroup from "@/ui/components/InputGroup"
import Render from "@/ui/elements/Render"
import { LoadingScreen } from "@/ui/views/LoadingPage"
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { ArrowCircleLeft, ArrowCircleRight, FastForward, Pencil, Plus, Trash } from "phosphor-react"
import React, { useState } from "react"
import ModalAddJob from "../modals/ModalAddJob"
import ModalDelete from "../modals/ModalDelete"

export interface FormJobProps {
  prevStep: () => void
  nextStep: () => void
  userId: number | null
  userUuid: string
}
const JobForm: React.FC<FormJobProps> = (props) => {
  const { isEdit } = useUrl()
  const { prevStep, nextStep, userId, userUuid } = props
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [jobEdited, setJobEdited] = useState<Job | null>(null)
  const { getJobByUserUuidQuery, deleteMutation } = useJob()
  const [modalDelete, setModalDelete] = useState<{ show: boolean; job: Partial<Job> | null }>({
    show: false,
    job: null,
  })
  const userJobsQuery = getJobByUserUuidQuery({
    userUuid: userUuid!,
  })

  const handleEdit = (job: Job) => {
    setJobEdited(job)
    setShowModalAdd(true)
  }

  const destroy = deleteMutation({
    onSuccess: () => {
      setModalDelete((prev) => ({ ...prev, show: false, job: null }))
    },
  })

  const onDelete = () => {
    destroy.mutate({
      uuid: modalDelete.job?.uuid!,
    })
  }

  return (
    <>
      <Stack direction="column" spacing={4}>
        {userJobsQuery.isPending && (
          <Box sx={{ height: "400px" }}>
            <LoadingScreen />
          </Box>
        )}
        {userJobsQuery.data?.data.length === 0 && <EmptyState />}
        {userJobsQuery?.data?.data.map((job, index) => (
          <Box sx={{ border: "1px solid #ccc", px: 6, py: 4, borderRadius: "8px" }} key={index}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="subtitle2" fontWeight={"semiBold"}>
                Pekerjaan ke-{index + 1}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  data-shape="icon"
                  color="success"
                  onClick={() => {
                    handleEdit(job)
                  }}
                >
                  <Pencil size={24} />
                </Button>
                <Button
                  data-shape="icon"
                  color="error"
                  onClick={() => setModalDelete((prev) => ({ ...prev, show: true, job: job }))}
                >
                  <Trash size={24} />
                </Button>
              </Stack>
            </Stack>
            <Grid container columnSpacing={4}>
              <Grid item xs={12} md={6}>
                <InputGroup label="Jabatan" value={job.job_title} readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputGroup label="Grade" value={job.grade} readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputGroup label="Departemen" value={job.work_department} readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputGroup label="Tempat Kerja" value={job.work_place} readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputGroup label="Kode Wilayah" value={job.city_code} readOnly />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Stack>
      <Button startIcon={<Plus size={20} />} sx={{ mt: 3 }} onClick={() => setShowModalAdd(true)}>
        Tambah Pekerjaan Baru
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
        <Render in={isEdit}>
          <Button variant="text" type="button" onClick={nextStep} endIcon={<FastForward size={20} />}>
            Lewati
          </Button>
        </Render>
        <Button type="button" onClick={nextStep} endIcon={<ArrowCircleRight size={20} />}>
          Selanjutnya
        </Button>
      </Stack>
      <ModalAddJob
        open={showModalAdd}
        job={jobEdited}
        onClose={() => {
          setShowModalAdd(false)
          setJobEdited(null)
        }}
        userId={userId}
        userUuid={userUuid}
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

export default JobForm
