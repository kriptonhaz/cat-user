import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import LoginForm from "./component/LoginForm"

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
      <LoginForm />
    </>
  )
}
export default LoginPage
