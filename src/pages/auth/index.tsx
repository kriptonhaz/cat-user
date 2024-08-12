import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import LoginForm from "./component/LoginForm"
import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"

const LoginPage: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
          </Toolbar>
        </Container>
      </AppBar>
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 1"
            style={{ width: "50%" }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 2"
            style={{ width: "50%" }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?q=80&w=2922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 3"
            style={{ width: "50%" }}
          />
        </SplideSlide>
      </Splide>
      <LoginForm />
    </>
  )
}
export default LoginPage
