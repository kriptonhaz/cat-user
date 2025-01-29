import { Modal } from "@/ui/layouts/Modal"
import { Button, CircularProgress, Typography } from "@mui/material"
import { Warning } from "phosphor-react"
import React from "react"

export interface ModalConfirmProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  loading?: boolean
  displayCancel?: boolean
  cancelLabel?: string
}
const ModalConfirm: React.FC<ModalConfirmProps> = (props) => {
  const { onClose, open, title, message, onConfirm, loading, displayCancel = true, cancelLabel } = props
  return (
    <Modal
      containerProps={{ sx: { maxWidth: "400px !important", minHeight: "230px !important" } }}
      open={open}
      onClose={displayCancel ? onClose : () => (onConfirm(), onClose())}
    >
      <Modal.Header icon={{ icon: <Warning weight="bold" />, color: "warning", variant: "contained" }} />
      <Modal.Body>
        <Typography variant="subtitle2" fontWeight={"semiBold"}>
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Modal.Body>
      <Modal.Footer onCancel={displayCancel ? onClose : undefined} divider cancelLabel={cancelLabel}>
        <Button color="warning" onClick={onConfirm} disabled={loading} startIcon={!!loading && <CircularProgress />}>
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm
