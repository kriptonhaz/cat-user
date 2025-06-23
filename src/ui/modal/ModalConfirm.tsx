import { Modal } from "@/ui/layouts/Modal"
import { Button, CircularProgress, Typography } from "@mui/material"
import { Warning } from "phosphor-react"
import React, { useEffect, useRef } from "react"

export interface ModalConfirmProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  loading?: boolean
  displayCancel?: boolean
  onCancel?: () => void
  cancelLabel?: string
  isCustomCancel?: boolean
  overrideClose?: boolean
}
const ModalConfirm: React.FC<ModalConfirmProps> = (props) => {
  const {
    onClose,
    open,
    title,
    message,
    onConfirm,
    loading,
    displayCancel = true,
    cancelLabel = "Batal",
    isCustomCancel = false,
    onCancel,
    overrideClose = true,
  } = props

  // Track previous open state to prevent onCancel from firing during transitions
  const prevOpenRef = useRef(open)
  // Track if the modal is being closed by the confirm button
  const isConfirmCloseRef = useRef(false)

  useEffect(() => {
    // Only call onCancel when transitioning from open to closed AND it's not from a confirmation action
    if (!open && prevOpenRef.current && onCancel && displayCancel && !isConfirmCloseRef.current) {
      onCancel()
    }

    // Reset the confirm close flag when modal is closed
    if (!open) {
      isConfirmCloseRef.current = false
    }

    // Update the ref with current open state
    prevOpenRef.current = open
  }, [open, onCancel, displayCancel])

  // Wrapper for onConfirm to set the flag before calling the original function
  const handleConfirm = () => {
    isConfirmCloseRef.current = true
    // Close the modal immediately before calling onConfirm to prevent flashing
    if (onClose) {
      onClose()
    }
    // Call onConfirm after a small delay to ensure the modal is closed
    setTimeout(() => {
      onConfirm()
    }, 0)
  }

  return (
    <Modal
      containerProps={{ sx: { maxWidth: "400px !important", minHeight: "230px !important" } }}
      open={open}
      onClose={displayCancel || overrideClose ? onClose : () => (onConfirm(), onClose())}
    >
      <Modal.Header icon={{ icon: <Warning weight="bold" />, color: "warning", variant: "contained" }} />
      <Modal.Body>
        <Typography variant="subtitle2" fontWeight={"semiBold"}>
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Modal.Body>
      <Modal.Footer onCancel={displayCancel ? onClose : undefined} divider cancelLabel={cancelLabel}>
        {isCustomCancel && cancelLabel && (
          <Button color="error" onClick={onCancel} disabled={loading} startIcon={!!loading && <CircularProgress />}>
            {cancelLabel}
          </Button>
        )}
        <Button
          color="warning"
          onClick={handleConfirm}
          disabled={loading}
          startIcon={!!loading && <CircularProgress />}
        >
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm
