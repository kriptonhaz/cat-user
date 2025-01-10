import { Box } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import classes from "./_.module.scss"
import Footer from "./Footer"
import Navbar from "./Navbar"

const LandingLayout: React.FC = () => {
  return <div>LandingLayout</div>
}

export default LandingLayout

export const LandingLayoutRoute: React.FC = () => {
  return (
    <Box className={classes.Container}>
      <Navbar />
      <Box sx={{ minHeight: "calc(100vh - 400px)" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
