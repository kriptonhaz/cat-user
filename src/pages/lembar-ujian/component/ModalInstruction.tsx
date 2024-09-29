import { Modal } from "@/ui/layouts/Modal"
import { Button, CircularProgress, Typography } from "@mui/material"
import { Warning } from "phosphor-react"
import React from "react"

export interface ModalInstructionProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  loading?: boolean
}
const ModalInstruction: React.FC<ModalInstructionProps> = (props) => {
  const { onClose, open, title, message, onConfirm, loading } = props
  return (
    <Modal
      containerProps={{
        sx: { maxWidth: "1400px !important", minHeight: "230px !important", maxHeight: "90vh", padding: 30 },
      }}
      open={open}
      onClose={onClose}
    >
      <Modal.Header />
      <Modal.Body sx={{ maxHeight: "calc(90vh - 120px)", overflowY: "auto" }}>
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: message }}
          sx={{
            "& p": { margin: 0 },
            "& img": { width: "100%", height: "auto" },
            minHeight: "10px",
            height: "auto",
            textWrap: "wrap",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        />
        {/* <Typography variant="body2">{message}</Typography> */}
      </Modal.Body>
      <Modal.Footer onCancel={onClose} divider cancelLabel="Tutup" />
    </Modal>
  )
}

export default ModalInstruction
