import { Button, CircularProgress, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Modal from "./Modal"

export interface IModalLoadingProps {
  open: boolean
  onClose: () => void
  isSso?: boolean
}
const ModalLoading: React.FC<IModalLoadingProps> = ({ open, onClose, isSso }) => {
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    if (open && isSso) {
      setTimeout(() => {
        setDisplayLoading(false)
      }, 3000)
    } else if (open === false) {
      setDisplayLoading(true)
    }
  }, [open, isSso])

  return (
    <Modal
      containerProps={{
        sx: {
          maxWidth: "500px !important",
          height: "200px",
          display: "flex",
          flexDirection: "column",
        },
      }}
      open={open}
      onClose={onClose}
    >
      <Modal.Body
        sx={{
          maxHeight: "540px",
          overflow: "auto",
          margin: "20px auto",
          alignItems: "center",
          textAlign: "center",
          flex: 1,
        }}
      >
        <Typography variant="subtitle2" fontWeight={"semiBold"} mb={3}>
          {displayLoading ? "Terhubung ke SIMPEG" : "Terjadi Kesalahan Koneksi Ke SIMPEG"}
        </Typography>
        {displayLoading && open && <CircularProgress />}
        <Button
          color="error"
          variant="text"
          onClick={onClose}
          sx={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", width: "400px" }}
        >
          Batalkan
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ModalLoading
