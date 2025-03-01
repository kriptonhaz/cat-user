import { Box, BoxProps, Typography } from "@mui/material"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import classes from "./_.module.scss"
import { combineClasses } from "@/utils/styles"
import NProgress from "nprogress"
import Logo from "@/assets/logo-kemenhan.png"

export const LoadingScreen: React.FC<BoxProps> = (props) => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })
  return (
    <Box className={combineClasses([classes.Container, classes.Screen])} {...props}>
      <Box className={classes.Content}>
        <Illustration trackColor="#e2e8f0" />

        <Typography className={classes.Title}>Harap Menunggu</Typography>
        <Typography className={classes.Subtitle}>Sedang memuat data</Typography>
      </Box>
    </Box>
  )
}

const LoadingPage: React.FC = () => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })
  return ReactDOM.createPortal(
    <Box className={classes.Container}>
      <Box className={classes.Content}>
        <Illustration />

        <Typography className={classes.Title}>Harap Menunggu</Typography>
        <Typography className={classes.Subtitle}>Sedang memuat data</Typography>
      </Box>
    </Box>,
    document.getElementById("overlay") as HTMLElement
  )
}

export default LoadingPage

const Illustration: React.FC<{ trackColor?: string }> = ({ trackColor = "#FEF9E1" }) => {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <img src={Logo} style={{ position: "absolute", width: "110px", height: "110px", left: "13px", top: "9px" }} />
        <svg
          width="136"
          height="136"
          viewBox="0 0 136 136"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classes.Loading}
        >
          <path
            d="M121.571 64C121.571 71.0351 120.186 78.0013 117.493 84.5009C114.801 91.0005 110.855 96.9062 105.881 101.881C100.906 106.855 95.0004 110.801 88.5008 113.494C82.0012 116.186 75.035 117.571 67.9999 117.571C60.9648 117.571 53.9986 116.186 47.499 113.494C40.9994 110.801 35.0937 106.855 30.1192 101.881C25.1446 96.9061 21.1986 91.0005 18.5063 84.5009C15.8141 78.0013 14.4285 71.0351 14.4285 64C14.4285 56.9649 15.8141 49.9987 18.5064 43.4991C21.1986 36.9995 25.1446 31.0938 30.1192 26.1193C35.0938 21.1447 40.9994 17.1987 47.499 14.5064C53.9986 11.8142 60.9648 10.4286 67.9999 10.4286C75.035 10.4286 82.0012 11.8142 88.5008 14.5065C95.0004 17.1987 100.906 21.1447 105.881 26.1193C110.855 31.0939 114.801 36.9995 117.493 43.4991C120.186 49.9987 121.571 56.9649 121.571 64L121.571 64Z"
            stroke={trackColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className={classes.Loading_Progress}
            d="M67.9999 10.4286C75.035 10.4286 82.0012 11.8142 88.5008 14.5065C95.0004 17.1987 100.906 21.1447 105.881 26.1193C110.855 31.0939 114.801 36.9995 117.493 43.4991C120.186 49.9987 121.571 56.9649 121.571 64"
            stroke="url(#paint0_linear_1907_14741)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g filter="url(#filter0_d_1907_14741)">
            <circle cx="68" cy="64" r="36" fill="url(#paint1_linear_1907_14741)" />
          </g>
          <defs>
            <filter
              id="filter0_d_1907_14741"
              x="0"
              y="0"
              width="136"
              height="136"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="16" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.882353 0 0 0 0 0.282353 0 0 0 0 0.14902 0 0 0 0.32 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1907_14741" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1907_14741" result="shape" />
            </filter>
            <linearGradient
              id="paint0_linear_1907_14741"
              x1="14.4285"
              y1="117.571"
              x2="137.061"
              y2="95.1505"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D98324" />
              <stop offset="1" stopColor="#EFDCAB" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1907_14741"
              x1="32"
              y1="100"
              x2="114.409"
              y2="84.9331"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D98324" />
              <stop offset="1" stopColor="#EFDCAB" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </>
  )
}
