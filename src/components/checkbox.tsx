import { neutral, primary } from "@/theme/ts/colors"
import { Box } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"

type CheckboxManualProps = {
  isChecked: boolean
}
export const CheckboxManual = (props: CheckboxManualProps) => {
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        aspectRatio: 1 / 1,
        borderRadius: "4px",
        border: "2px solid",
        borderColor: props.isChecked ? primary[500] : neutral[500],
        backgroundColor: props.isChecked ? primary[500] : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "8px",
        transition: "background-color 0.2s, border-color 0.2s",
      }}
    >
      {props.isChecked && <CheckIcon sx={{ color: "white" }} />}
    </Box>
  )
}
