import LoginForm from "./component/LoginForm"
import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Logo from "@/assets/logo-kemenhan.png"
import Navbar from "@/components/navbar"
import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import { primary } from "@/theme/ts/colors"

const LoginPage: React.FC = () => {
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          md={6}
          sx={{
            background: primary[100],
            ".splide__slide ": {
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              "& img": { height: "100vh", width: "auto !important" },
            },
          }}
        >
          <Splide aria-label="My Favorite Images">
            <SplideSlide>
              <img
                src="https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 1"
                style={{ width: "100%" }}
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src="https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 2"
                style={{ width: "100%" }}
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?q=80&w=2922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 3"
                style={{ width: "100%" }}
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src="https://images.unsplash.com/photo-1565689157206-0fddef7589a2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 4"
                style={{ width: "100%" }}
              />
            </SplideSlide>
          </Splide>
        </Grid>
        <Grid item md={6}>
          <Container maxWidth="sm">
            <Stack direction="column" justifyContent={"center"} alignItems={"center"} sx={{ height: "80vh" }}>
              <Box>
                <Box sx={{ width: "180px", margin: "auto" }}>
                  <img src={Logo} alt="cat kemenhan" style={{ width: "100%" }} />
                </Box>
                <Box sx={{ flex: "1", maxWidth: "400px", mx: "auto" }}>
                  <Box textAlign={"center"} mb={4}>
                    <Typography variant="h6" fontWeight={"semiBold"}>
                      Silahkan Masuk sebagai Peserta
                    </Typography>
                    <Typography variant="subtitle1">
                      Masukan nama pengguna dan kata sandi peserta untuk dapat mengikuti ujian
                    </Typography>
                  </Box>
                  <LoginForm />
                </Box>
              </Box>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}
export default LoginPage
