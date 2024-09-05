import { IusePagination } from "@/hooks/usePagination"
import { IRiwayatExamResponse, RiwayatUjian } from "@/interfaces/exam.interface"
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
import dayjs from "dayjs"
import Pagination from "@/ui/sections/Pagination"
import DataTable from "@/ui/sections/Table/DataTable"
import { useEffect, useMemo, useState } from "react"
import { setRiwayatUjianParams } from ".."

const TableRiwayatUjian = ({
  data,
  isLoading,
  isError,
  setParams,
}: {
  data: IRiwayatExamResponse
  isLoading: boolean
  isError: boolean
  setParams: React.Dispatch<React.SetStateAction<setRiwayatUjianParams>>
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 0,
  })

  useEffect(() => {
    setPagination({
      pageIndex: data.meta.page - 1,
      pageSize: data.meta.per_page,
    })
  }, [])

  useEffect(() => {
    if (pagination.pageSize !== 0) {
      setParams((prev) => ({ ...prev, page: pagination.pageIndex + 1, per_page: pagination.pageSize }))
    }
  }, [pagination])

  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "Kode Ujian",
        enableSorting: false,
        size: 300,
        Cell: ({ row }) => row.original.exam_data.code,
      },
      {
        accessorKey: "name",
        header: "Kode Ujian",
        enableSorting: false,
        Cell: ({ row }) => row.original.exam_data.name,
      },
      {
        accessorKey: "location",
        header: "Lokasi",
        enableSorting: false,
        Cell: ({ row }) => row.original.exam_data.location,
      },
      {
        accessorKey: "start_time",
        header: "Tanggal Mulai",
        enableSorting: false,
        Cell: ({ row }) => dayjs(row.original.exam_data.start_time).format("DD MMM YYYY"),
      },
      {
        accessorKey: "end_time",
        header: "Tanggal Selesai",
        enableSorting: false,
        Cell: ({ row }) => dayjs(row.original.exam_data.end_time).format("DD MMM YYYY"),
      },
    ],
    []
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={data.data || ([] as RiwayatUjian[])}
        onPaginationChange={setPagination}
        rowCount={data.meta.total_data || 0}
        state={{ pagination, isLoading, showAlertBanner: isError }}
        enableGlobalFilter={false}
      />
    </>
  )
}

export default TableRiwayatUjian
