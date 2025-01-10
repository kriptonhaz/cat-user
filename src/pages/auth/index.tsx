import LoginForm from "./component/LoginForm"
import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Logo from "@/assets/logo-kemenhan.png"
import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import { primary } from "@/theme/ts/colors"
import Thumbnail1 from "@/assets/slider/image-1.jpg"
import Thumbnail2 from "@/assets/slider/image-2.jpg"
import Thumbnail3 from "@/assets/slider/image-3.jpg"
import Thumbnail4 from "@/assets/slider/image-4.jpg"

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
              <div
                style={{
                  backgroundImage: `url(${Thumbnail1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100vh",
                }}
              ></div>
            </SplideSlide>
            <SplideSlide>
              <div
                style={{
                  backgroundImage: `url(${Thumbnail2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100vh",
                }}
              ></div>
            </SplideSlide>
            <SplideSlide>
              <div
                style={{
                  backgroundImage: `url(${Thumbnail3})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100vh",
                }}
              ></div>
            </SplideSlide>
            <SplideSlide>
              <div
                style={{
                  backgroundImage: `url(${Thumbnail4})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100vh",
                }}
              ></div>
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
