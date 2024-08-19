import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import "@splidejs/react-splide/css"
import Logo from "@/assets/logo-kemenhan.png"
import { useNavigate } from "react-router-dom"
import { primary } from "@/theme/ts/colors"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="static" sx={{ backgroundColor: primary["25"] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="cat kemenhan" style={{ width: "5%" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
  )
}

export default Navbar
