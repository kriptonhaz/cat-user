import { Box, Typography } from "@mui/material"
import React from "react"
import { MagnifyingGlass } from "phosphor-react"
import { neutral } from "@/theme/ts/colors"

const EmptyState: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: neutral[25],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "240px",
      }}
    >
      <MagnifyingGlass size={32} />
      <Typography variant="subtitle2" mt={4} fontWeight={600}>
        Tidak ada data
      </Typography>
    </Box>
  )
}

export default EmptyState
