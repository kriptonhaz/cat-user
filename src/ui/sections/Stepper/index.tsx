import bgStepActive from "@/assets/forms/stepper-icon-active.svg"
import bgStepDefault from "@/assets/forms/stepper-icon-neutral.svg"
import bgStepDone from "@/assets/forms/stepper-icon.svg"
import { neutral, primary } from "@/theme/ts/colors"
import { Typography } from "@mui/material"
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector"
import { StepIconProps } from "@mui/material/StepIcon"
import { styled } from "@mui/material/styles"
import { Check } from "phosphor-react"
import Render from "@/ui/elements/Render"

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: primary[500],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: primary[500],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 5,
    border: 0,
    margin: "0px 12px",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 5,
    transition: theme.transitions.create(["background-color", "border"]),
  },
}))

export const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  color: neutral[400],
  width: 54,
  height: 54,
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: `url(${bgStepDefault})`,
  backgroundSize: "100% 100%",
  ...(ownerState.active && {
    color: "#fff",
    backgroundImage: `url(${bgStepActive})`,
  }),
  ...(ownerState.completed && {
    color: "#fff",
    backgroundImage: `url(${bgStepDone})`,
  }),
  "&.clickable": {
    cursor: "pointer",
    transition: ".25s",
    ["&:hover"]: {
      transform: "scale(1.1)",
      color: primary[600],
    },
    "&:hover:is-not(:active)": {},
  },
}))

export function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props
  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className} data-step="icon">
      <Render in={!!completed}>
        <Check size={26} weight="bold" />
      </Render>
      <Render in={!completed}>
        <Typography variant="subtitle2">{props.icon}</Typography>
      </Render>
    </ColorlibStepIconRoot>
  )
}

export const isClickedStep = (e: React.MouseEvent) => {
  e.preventDefault()
  const element = e.target as HTMLElement
  const tagName = element.tagName.toLowerCase()
  const dataStepAttr = element.getAttribute("data-step")
  const isStepElement = dataStepAttr !== null || tagName === "h6" || tagName === "svg"
  return isStepElement
}
