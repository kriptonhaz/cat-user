import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { useExamHooks } from "@/hooks/useExamHooks"
import dayjs from "dayjs"

const RiwayatUjian = () => {
  const { queryGetRiwayatUjian } = useExamHooks()
  const { data: dataRiwayatUjian } = queryGetRiwayatUjian()

  return (
    <Box>
      <Grid container sx={{ mt: 5, pl: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Riwayat Ujian Anda</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>
            Berikut merupakan ujian yang telah anda kerjakan
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5, pl: 5 }} direction="column" spacing={3}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kode Ujian</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Nama Ujian</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Lokasi</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRiwayatUjian?.data.map((riwayat, index) => (
                <TableRow key={riwayat.Uuid} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{riwayat.exam_data.code}</TableCell>
                  <TableCell>{riwayat.exam_data.name}</TableCell>
                  <TableCell>{riwayat.exam_data.location}</TableCell>
                  <TableCell>{dayjs(riwayat.exam_data.end_time).format("DD-MM-YYYY HH:mm")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  )
}

export default RiwayatUjian
