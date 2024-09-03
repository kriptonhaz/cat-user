import { neutral } from "@/theme/ts/colors"
import { InputAdornment } from "@mui/material"
import MaterialReactTable, { MaterialReactTableProps, type MRT_Icons } from "material-react-table"
import {
  ArrowDown,
  CornersIn,
  CornersOut,
  DotsSix,
  DotsThreeOutline,
  DotsThreeOutlineVertical,
  EyeSlash,
  FadersHorizontal,
  Funnel,
  List,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  PushPinSimple,
  SortAscending,
  SquareHalf,
} from "phosphor-react"
import React from "react"
import { MRT_Localization_ID } from "material-react-table/locales/id"

const phosphorIcon: Partial<MRT_Icons> = {
  ArrowDownwardIcon: (props: any) => <ArrowDown weight="regular" {...props} />,
  ClearAllIcon: () => <FadersHorizontal weight="regular" />,
  DensityLargeIcon: () => <List weight="regular" />,
  DensityMediumIcon: () => <List weight="regular" />,
  DensitySmallIcon: () => <List weight="regular" />,
  DragHandleIcon: () => <DotsSix weight="regular" />,
  FilterListIcon: (props: any) => <Funnel weight="regular" {...props} />,
  FilterListOffIcon: () => <Funnel weight="bold" />,
  FullscreenExitIcon: () => <CornersIn weight="regular" />,
  FullscreenIcon: () => <CornersOut weight="regular" />,
  SearchIcon: (props: any) => <MagnifyingGlass weight="regular" {...props} />,
  SearchOffIcon: () => <MagnifyingGlassMinus weight="regular" />,
  ViewColumnIcon: () => <SquareHalf weight="regular" />,
  MoreVertIcon: () => <DotsThreeOutlineVertical weight="regular" />,
  MoreHorizIcon: () => <DotsThreeOutline weight="regular" />,
  SortIcon: (props: any) => <SortAscending weight="regular" {...props} />,
  PushPinIcon: (props: any) => <PushPinSimple weight="regular" {...props} />,
  VisibilityOffIcon: () => <EyeSlash weight="regular" />,
}

export interface DataTableProps extends MaterialReactTableProps {
  isError?: boolean
}
const DataTable: React.FC<DataTableProps> = (props) => {
  return (
    <MaterialReactTable
      enableDensityToggle={false}
      enableColumnActions={false}
      enableFullScreenToggle={false}
      enableHiding={false}
      enableColumnFilters={false}
      localization={MRT_Localization_ID}
      icons={phosphorIcon}
      manualFiltering
      manualPagination
      muiSearchTextFieldProps={{
        placeholder: "Cari..",
        sx: { minWidth: "300px", margin: "0px", marginRight: "4px" },
        variant: "standard",
        InputProps: {
          startAdornment: (
            <InputAdornment position="start">
              <MagnifyingGlass size={24} />
            </InputAdornment>
          ),
        },
      }}
      muiToolbarAlertBannerProps={
        props.isError
          ? {
            color: "error",
            children: "Error loading data",
          }
          : undefined
      }
      muiLinearProgressProps={({ isTopToolbar }) => ({
        sx: {
          display: isTopToolbar ? "block" : "none", //hide bottom progress bar
        },
      })}
      muiTableContainerProps={{
        sx: {
          borderRadius: "8px",
          border: `1px solid ${neutral[200]}`,
        },
      }}
      muiTablePaperProps={{
        sx: { boxShadow: "none" },
      }}
      {...props}
    />
  )
}

export default DataTable
