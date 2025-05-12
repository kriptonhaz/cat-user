import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import "@splidejs/react-splide/css"
import Logo from "@/assets/logo-kemenhan.png"
import { useLocation, useNavigate } from "react-router-dom"
import useTokenStore from "@/store/token.store"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const tokenStore = useTokenStore()

  const isMatchingRoute = (pathname: string, pattern: RegExp) => pattern.test(pathname)

  if (location.pathname === "/login") {
    return <></>
  }

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth={false} sx={{ maxWidth: "1900px", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar disableGutters>
            <img src={Logo} alt="cat kemenhan" style={{ width: "4%" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={isMatchingRoute(location.pathname, /\/lembar-ujian/) ? undefined : "/"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                fontSize: "1.1rem",
                lineHeight: 1.2,
                ml: 1,
                whiteSpace: "normal"
              }}
            >
              Assessment and Development Center
              <Typography variant="subtitle2" sx={{ mt: 0.5, fontSize: "0.9rem", lineHeight: 1.2 }}>
                Kementerian Pertahanan RI
              </Typography>
            </Typography>
            {/* Navigation Menu */}
            {localStorage.getItem("name") &&
              (!isMatchingRoute(location.pathname, /\/lembar-ujian/) || import.meta.env.MODE === "development") && (
                <Box sx={{ display: "flex", ml: 4 }}>
                  <Button
                    sx={{
                      color: "white",
                      mr: 2,
                      backgroundColor: location.pathname === "/home" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                      border: "1px solid white",
                      width: "150px",
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
                      width: "150px",
                    }}
                    onClick={() => navigate("/riwayat-ujian")}
                  >
                    Riwayat Ujian
                  </Button>
                  <Button
                    sx={{
                      color: "white",
                      mr: 2,
                      backgroundColor: location.pathname === "/faq" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                      border: "1px solid white",
                      width: "150px",
                    }}
                    onClick={() => navigate("/faq")}
                  >
                    FAQ
                  </Button>
                  <Button
                    sx={{
                      color: "white",
                      mr: 2,
                      backgroundColor: location.pathname === "/setting" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                      border: "1px solid white",
                      width: "150px",
                    }}
                    onClick={() => navigate("/setting")}
                  >
                    Pengaturan
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
                  color={!isMatchingRoute(location.pathname, /\/lembar-ujian/) ? "error" : "inherit"}
                  sx={{ ml: 3 }}
                  onClick={() => {
                    tokenStore.logout()
                    navigate("/login")
                  }}
                  disabled={isMatchingRoute(location.pathname, /\/lembar-ujian/)}
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
