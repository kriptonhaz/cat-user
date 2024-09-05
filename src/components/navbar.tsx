import { AppBar, Box, Button, Container, Modal, Toolbar, Typography } from "@mui/material"
import "@splidejs/react-splide/css"
import Logo from "@/assets/logo-kemenhan.png"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isMatchingRoute = (pathname: string, pattern: RegExp) => pattern.test(pathname)

  if (location.pathname === "/login") {
    return <></>
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth={false} sx={{ maxWidth: "1900px" }}>
          <Toolbar disableGutters>
            <img src={Logo} alt="cat kemenhan" style={{ width: "4%" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CAT
            </Typography>
            {/* Navigation Menu */}
            {localStorage.getItem("name") && !isMatchingRoute(location.pathname, /^\/lembar-ujian\/\d+$/) && (
              <Box sx={{ display: "flex", ml: 4 }}>
                <Button
                  sx={{
                    color: "white",
                    mr: 2,
                    backgroundColor: location.pathname === "/home" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    border: "1px solid white",
                  }}
                  onClick={() => navigate("/home")}
                >
                  Home
                </Button>
                <Button
                  sx={{
                    color: "white",
                    mr: 2,
                    backgroundColor:
                      location.pathname === "/riwayat-ujian" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    border: "1px solid white",
                  }}
                  onClick={() => navigate("/riwayat-ujian")}
                >
                  Riwayat Ujian
                </Button>
              </Box>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {localStorage.getItem("name") && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "inherit", mr: 2 }}>
                  {localStorage.getItem("name")} ( {localStorage.getItem("nip")}, {localStorage.getItem("gender")} )
                </Typography>
                <Button
                  color="error"
                  sx={{ ml: 3 }}
                  onClick={() => {
                    localStorage.removeItem("name")
                    navigate("/login")
                  }}
                >
                  Keluar
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Navbar
