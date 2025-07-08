import LoginForm from "./component/LoginForm"
import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Logo from "@/assets/logo-kemenhan.png"
import { Box, Container, Grid, Stack } from "@mui/material"
import { primary } from "@/theme/ts/colors"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import Thumbnail1 from "@/assets/slider/image-1.jpg"
import Thumbnail2 from "@/assets/slider/image-2.jpg"
import Thumbnail3 from "@/assets/slider/image-3.jpg"
import Thumbnail4 from "@/assets/slider/image-4.jpg"

const LoginPage: React.FC = () => {
  const { queryBannerPublic } = useCmsHooks()
  const { data: dataBanner } = queryBannerPublic()

  // Fallback images in case CMS data is not available
  const fallbackImages = [Thumbnail1, Thumbnail2, Thumbnail3, Thumbnail4]
  const bannerImages = dataBanner?.data?.map((item) => `${import.meta.env.VITE_API_URL}${item.image}`) || fallbackImages

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
            {bannerImages.map((image, index) => (
              <SplideSlide key={index}>
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100vh",
                  }}
                ></div>
              </SplideSlide>
            ))}
          </Splide>
        </Grid>
        <Grid item md={6}>
          <Container maxWidth="sm">
            <Stack direction="column" justifyContent={"center"} alignItems={"center"} sx={{ height: "80vh" }}>
              <Box>
                <Box sx={{ width: "180px", margin: "auto", mt: 12 }}>
                  <img src={Logo} alt="cat kemenhan" style={{ width: "100%" }} />
                </Box>
                <Box sx={{ flex: "1", maxWidth: "400px", mx: "auto" }}>
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
