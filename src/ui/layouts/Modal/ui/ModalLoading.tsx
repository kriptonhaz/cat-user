import { Button, CircularProgress, Typography } from "@mui/material"
import { Info } from "phosphor-react"
import React from "react"
import Modal from "./Modal"

export interface IModalLoadingProps {
  open: boolean
  onClose: () => void
}
const ModalLoading: React.FC<IModalLoadingProps> = ({ open, onClose }) => {
  return (
    <Modal containerProps={{ sx: { maxWidth: "600px !important" } }} open={open} onClose={onClose}>
      <Modal.Header icon={{ icon: <Info weight="bold" />, color: "info", variant: "contained" }} title={"Memproses"} />
      <Modal.Body
        sx={{ maxHeight: "540px", overflow: "auto", margin: "20px auto", alignItems: "center", textAlign: "center" }}
      >
        <Typography variant="subtitle2" fontWeight={"semiBold"}>
          Sedang Menghubungi Penyedia
        </Typography>
        <CircularProgress />
      </Modal.Body>
      <Modal.Footer>
        <Button color="error" variant="text" onClick={onClose}>
          Batalkan
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalLoading
