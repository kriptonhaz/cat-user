import LoginForm from "./component/LoginForm"
import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Logo from "@/assets/logo-kemenhan.png"
import Navbar from "@/components/navbar"
import { Grid } from "@mui/material"

const LoginPage: React.FC = () => {
  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
        <Grid item>
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: "loop",
              autoplay: true,
            }}
          >
            <SplideSlide>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <img src={Logo} alt="Image 1" style={{ width: "30%" }} />
              </div>
            </SplideSlide>
            <SplideSlide>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <img src={Logo} alt="Image 1" style={{ width: "30%" }} />
              </div>
            </SplideSlide>
          </Splide>
        </Grid>

        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  )
}
export default LoginPage
