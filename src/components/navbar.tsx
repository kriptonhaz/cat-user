import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import "@splidejs/react-splide/css"
import Logo from "@/assets/logo-kemenhan.png"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="static">
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
          <Typography
            variant="body1"
            sx={{
              color: "inherit",
              display: { xs: "none", md: "flex" },
            }}
          >
            Luthfi Fitra Musyaffa ( 123123123123, Laki-laki )
          </Typography>
          <Button
            color="error"
            sx={{ ml: 3 }}
            onClick={() => {
              navigate("/login")
            }}
          >
            Keluar
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
