import LoginForm from "./component/LoginForm"
import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Logo from "@/assets/logo-kemenhan.png"
import Navbar from "@/components/navbar"

const LoginPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <img src={Logo} alt="Image 1" style={{ width: "30%" }} />
        </SplideSlide>
      </Splide>
      <LoginForm />
    </>
  )
}
export default LoginPage
