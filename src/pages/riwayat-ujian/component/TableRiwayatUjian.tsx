// @ts-nocheck
import { IusePagination } from "@/hooks/usePagination"
import { IRiwayatExamResponse, ITestModuleData, RiwayatUjian } from "@/interfaces/exam.interface"
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
import { AssignmentIndOutlined } from "@mui/icons-material"
import dayjs from "dayjs"
import Pagination from "@/ui/sections/Pagination"
import DataTable from "@/ui/sections/Table/DataTable"
import { useEffect, useMemo, useState } from "react"
import { setRiwayatUjianParams } from ".."
import { Textbox } from "phosphor-react"
import PsychologyIcon from "@mui/icons-material/Psychology"
import SocialDistanceIcon from "@mui/icons-material/SocialDistance"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"

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
        accessorKey: "name",
        header: "Nama Ujian",
        enableSorting: false,
        Cell: ({ row }) => <div style={{ marginLeft: 0, zIndex: 9999 }}>{row.original.exam_data.name}</div>,
        Header: () => <div style={{ marginLeft: 0, zIndex: 9999 }}>Nama Ujian</div>,
      },
      {
        accessorKey: "start_time",
        size: 80,
        header: "Tanggal Mulai",
        enableSorting: false,
        Cell: ({ row }) => dayjs(row.original.exam_data.start_time).format("DD MMM YYYY"),
      },
      {
        accessorKey: "end_time",
        header: "Tanggal Selesai",
        enableSorting: false,
        size: 20,
        Cell: ({ row }) => dayjs(row.original.exam_data.end_time).format("DD MMM YYYY"),
      },
      {
        accessorKey: "location",
        header: "Lokasi",
        enableSorting: false,
        size: 100,
        Cell: ({ row }) => row.original.exam_data.location,
      },
      {
        accessorKey: "name",
        header: "Tujuan",
        enableSorting: false,
        Cell: ({ row }) => row.original.exam_data.purpose_data.name,
      },
      {
        accessorKey: "name",
        header: "Posisi",
        enableSorting: false,
        Cell: ({ row }) => row.original.exam_data.position_purpose_data.name,
      },
    ],
    []
  )

  const getIconExamModuleTest = (exam_type_name: string) => {
    switch (exam_type_name) {
      case "LS1":
        return <PsychologyIcon sx={{ color: "white" }} />

      case "LS2":
        return <Textbox size={26} weight={"bold"} color="white" />

      case "LS3":
        return <SocialDistanceIcon sx={{ color: "white" }} />

      case "PPI":
        return <SentimentNeutralIcon sx={{ color: "white" }} />

      case "PPS":
        return <SentimentVerySatisfiedIcon sx={{ color: "white" }} />

      default:
        break
    }
  }

  return (
    <>
      {/* <MaterialReactTable table={table} /> */}
      <Box sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <DataTable
          columns={columns}
          data={data.data || ([] as RiwayatUjian[])}
          onPaginationChange={setPagination}
          rowCount={data.meta.total_data || 0}
          state={{ pagination, isLoading, showAlertBanner: isError }}
          enableGlobalFilter={false}
          enableExpandAll={false}
          muiTableBodyProps={{
            sx: {
              "& .MuiTableRow-root": {
                alignItems: "flex-start",
              },
            },
          }}
          displayColumnDefOptions={{
            "mrt-row-expand": {
              size: 10,
              header: "",
            },
          }}
          muiTableDetailPanelProps={() => ({
            sx: (theme) => ({
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,210,244,0.1)" : "rgba(0,0,0,0.1)",
            }),
          })}
          muiTableBodyRowProps={({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
              cursor: "pointer",
            },
          })}
          muiExpandButtonProps={({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
              transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
              transition: "transform 0.2s",
              display: "none",
            },
          })}
          renderDetailPanel={(row) => (
            <Box
              sx={
                {
                  // padding: "1rem",
                }
              }
            >
              <Grid container spacing={3} flexDirection={"row"}>
                {(row.row.original.exam_data.test_module_data as ITestModuleData[]).map((data, index) => (
                  <Grid item>
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: "#5F37BE",
                        border: "1px solid white",
                        borderRadius: 2,
                        padding: "10px 20px 10px 20px",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                        width: "120px",
                        justifyContent: "space-between",
                      }}
                    >
                      {getIconExamModuleTest(data.exam_type_name)}
                      <Typography sx={{ color: "white" }}>{data.exam_type_name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          positionExpandColumn={"last"}
          enableExpanding
        />
      </Box>
    </>
  )
}

export default TableRiwayatUjian
