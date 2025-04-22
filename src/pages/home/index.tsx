import { Card, Grid, Typography, CardContent, Button, Box } from "@mui/material"
import {
  PersonOutline,
  BadgeOutlined,
  PhoneOutlined,
  CalendarMonthOutlined,
  MaleOutlined,
  FemaleOutlined,
  WorkOutline,
  SchoolOutlined,
} from "@mui/icons-material"
import TestCard from "./component/TestCard"
import { useExamHooks } from "@/hooks/useExamHooks"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { useProfileHooks } from "@/hooks/useProfileHooks"
import Barcode from "react-barcode"
import ModalConfirm, { ModalConfirmProps } from "@/ui/modal/ModalConfirm"
import { useState } from "react"

const HomePage: React.FC = () => {
  const { queryExamAvailable } = useExamHooks()
  const { queryProfile, submitReviseMutation, submitVerifyMutation } = useProfileHooks()

  const { data: dataExamAvailable } = queryExamAvailable()
  const { data: dataProfile } = queryProfile()
  const mutationRevise = submitReviseMutation()
  const mutationVerify = submitVerifyMutation()

  const [modalConfirm, setModalConfirm] = useState<ModalConfirmProps>({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {
      return null
    },
    onClose: () => {
      setModalConfirm((prev) => ({ ...prev, open: false, title: "", message: "", displayCancel: true }))
    },
    displayCancel: true,
    onCancel: () => {
      return null
    },
  })

  return (
    <>
      <Grid container sx={{ mt: 10, pl: 5, pr: 5, pb: 5, minHeight: "calc(100vh - 64px)" }} spacing={5}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              border: "0.5px solid #ccc",
              boxShadow: 3,
              borderRadius: 0,
              transition: "0.3s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ mt: -4 }}>
              <Typography sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center" }}>
                <PersonOutline sx={{ mr: 3 }} />
                Nama: {dataProfile?.data.full_name}
              </Typography>
              <Typography sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center" }}>
                <BadgeOutlined sx={{ mr: 3 }} />
                NIP: {dataProfile?.data.nip}
              </Typography>
              <Typography sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center" }}>
                <PhoneOutlined sx={{ mr: 3 }} />
                Tlp: {dataProfile?.data.phone}
              </Typography>
              <Typography sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center" }}>
                <CalendarMonthOutlined sx={{ mr: 3 }} />
                TTL: {dataProfile?.data.pob}, {dayjs(dataProfile?.data.dob).locale("id").format("DD MMMM YYYY")}
              </Typography>
              <Typography sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center" }}>
                {dataProfile?.data.sex === 1 ? <MaleOutlined sx={{ mr: 3 }} /> : <FemaleOutlined sx={{ mr: 3 }} />}
                Jenis Kelamin: {dataProfile?.data.sex === 1 ? "Laki - laki" : "Perempuan"}
              </Typography>
              <Typography
                sx={{ fontWeight: "regular", fontSize: 18, mt: 5, mb: 1, display: "flex", alignItems: "center" }}
              >
                <WorkOutline sx={{ mr: 3 }} />
                Pekerjaan Terakhir
              </Typography>
              {dataProfile?.data && dataProfile?.data?.job?.length > 0 && (
                <>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Jabatan: {dataProfile?.data.job[0].job_title}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Grade: {dataProfile?.data.job[0].grade}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Departement: {dataProfile?.data.job[0].work_department}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Tempat Bekerja: {dataProfile?.data.job[0].work_place}
                  </Typography>
                </>
              )}

              <Typography
                sx={{ fontWeight: "regular", fontSize: 18, mt: 5, mb: 1, display: "flex", alignItems: "center" }}
              >
                <SchoolOutlined sx={{ mr: 3 }} />
                Pendidikan Terakhir
              </Typography>
              {dataProfile?.data && dataProfile?.data?.education?.length > 0 && (
                <>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Gelar: {dataProfile?.data.education[0].title}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Grade: {dataProfile?.data.education[0].grade}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: 18, mb: 1, display: "flex", alignItems: "center", pl: 8 }}
                  >
                    Program Studi: {dataProfile?.data.education[0].major}
                  </Typography>
                </>
              )}
              <Box display={"flex"} justifyContent={"center"}>
                {dataProfile?.data.nip && (
                  <Barcode value={dataProfile?.data.nip} height={70} width={3} displayValue={false} />
                )}
              </Box>

              {dataProfile?.data.is_verified_by_user !== true}
              <Typography sx={{ fontWeight: "regular", fontSize: 18, mb: 1, textAlign: "center" }}>
                {dataProfile?.data.is_verified_by_user !== true ? "Belum Verifikasi" : "Data Terverifikasi"}
              </Typography>
              <Button
                fullWidth
                sx={{
                  display: dataProfile?.data.is_verified_by_user ? "none" : "block",
                }}
                onClick={() => {
                  setModalConfirm({
                    ...modalConfirm,
                    open: true,
                    title: "Apakah anda yakin data anda sudah sesuai?",
                    onClose: () => {
                      setModalConfirm((prev) => ({ ...prev, open: false, title: "", message: "", displayCancel: true }))
                    },
                    onConfirm: () => {
                      setModalConfirm((prev) => ({ ...prev, open: false, title: "", message: "", displayCancel: true }))
                      mutationVerify.mutate()
                    },
                    displayCancel: true,
                    onCancel: () => {
                      setModalConfirm((prev) => ({ ...prev, open: false, title: "", message: "", displayCancel: true }))
                      mutationRevise.mutate()
                    },
                  })
                }}
              >
                Verifikasi Data
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30, mb: 6 }}>Daftar Ujian</Typography>
          <Typography sx={{ fontWeight: "medium", fontSize: 25, mb: 6 }}>
            Berikut ujian yang dapat anda kerjakan
          </Typography>
          <Grid container spacing={3}>
            {dataExamAvailable?.data.length === 0 ? (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", width: "100%" }}
              >
                <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: "medium", textAlign: "center" }}>
                  Tidak ada ujian yang tersedia saat ini.
                </Typography>
              </Grid>
            ) : (
              dataExamAvailable?.data.map((exam) => (
                <Grid item xs={12} md={6} lg={4} key={exam.ID}>
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
              ))
            )}
          </Grid>
        </Grid>
      </Grid>

      <ModalConfirm
        open={!!modalConfirm.open}
        onClose={() => setModalConfirm({ ...modalConfirm, open: false })}
        title={modalConfirm.title}
        message={modalConfirm.message}
        onConfirm={modalConfirm.onConfirm}
        displayCancel={false}
        cancelLabel="Tidak"
        isCustomCancel={true}
        onCancel={modalConfirm.onCancel}
      />
    </>
  )
}

export default HomePage
