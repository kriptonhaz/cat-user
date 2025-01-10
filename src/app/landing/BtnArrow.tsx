import { primary } from "@/theme/ts/colors"
import { IconButton, IconButtonProps, SxProps } from "@mui/material"
import { ArrowUpRight } from "phosphor-react"
import React from "react"

const styles: { btn: SxProps } = {
  btn: {
    background: "#fff",
    color: primary[500],
    "&.bottom-right": {
      position: "absolute",
      right: "20px",
      bottom: "20px",
    },
    "&.right": {
      position: "absolute",
      right: "20px",
    },
    "&:hover": {
      background: primary[50],
    },
    "&.btn-md": {
      width: "52px",
      height: "52px",
      "& svg": {
        width: "32px",
        height: "32px",
      },
    },
    "&.btn-lg": {
      width: "80px",
      height: "80px",
      "& svg": {
        width: "40px",
        height: "40px",
      },
    },
  },
}

const BtnArrow: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <IconButton {...props} sx={styles.btn}>
      <ArrowUpRight />
    </IconButton>
  )
}

export default BtnArrow
