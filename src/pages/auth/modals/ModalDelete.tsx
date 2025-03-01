import { Modal } from "@/ui/layouts/Modal"
import { Button, CircularProgress, Typography } from "@mui/material"
import { Trash } from "phosphor-react"
import React from "react"

export interface ModalDeleteProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  onDelete: () => void
  loading?: boolean
}
const ModalDelete: React.FC<ModalDeleteProps> = (props) => {
  const { onClose, open, title, message, onDelete, loading } = props
  return (
    <Modal
      containerProps={{ sx: { maxWidth: "400px !important", minHeight: "230px !important" } }}
      open={open}
      onClose={onClose}
    >
      <Modal.Header icon={{ icon: <Trash weight="bold" />, color: "error", variant: "contained" }} />
      <Modal.Body>
        <Typography variant="subtitle2" fontWeight={"semiBold"}>
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Modal.Body>
      <Modal.Footer onCancel={onClose} divider>
        <Button color="error" onClick={onDelete} disabled={loading} startIcon={!!loading && <CircularProgress />}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDelete
