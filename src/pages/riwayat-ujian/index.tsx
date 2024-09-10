import {
  Box,
  Card,
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
import usePagination from "@/hooks/usePagination"
import Pagination from "@/ui/sections/Pagination"
import { useEffect, useState } from "react"
import TableRiwayatUjian from "./component/TableRiwayatUjian"

export interface setRiwayatUjianParams {
  per_page: number
  page: number
}

const RiwayatUjian = () => {
  const [getRiwayatUjianParams, setRiwayatUjianParams] = useState<setRiwayatUjianParams>({
    per_page: 10,
    page: 1,
  })

  const { queryGetRiwayatUjian } = useExamHooks()

  const { data: dataRiwayatUjian, isLoading, isError } = queryGetRiwayatUjian(getRiwayatUjianParams)

  return (
    <Box>
      <Grid container sx={{ mt: 10, pl: 5, mb: 5 }} spacing={5}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>Riwayat Ujian Anda</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "medium", fontSize: 25 }}>
            Berikut merupakan ujian yang telah anda kerjakan
          </Typography>
        </Grid>
      </Grid>
      {dataRiwayatUjian && (
        <TableRiwayatUjian
          data={dataRiwayatUjian}
          isLoading={isLoading}
          isError={isError}
          setParams={setRiwayatUjianParams}
        />
      )}
    </Box>
  )
}

export default RiwayatUjian
