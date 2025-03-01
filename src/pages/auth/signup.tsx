import "@splidejs/react-splide/css"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Logo from "@/assets/logo-kemenhan.png"
import { primary } from "@/theme/ts/colors"
import Thumbnail1 from "@/assets/slider/image-1.jpg"
import Thumbnail2 from "@/assets/slider/image-2.jpg"
import Thumbnail3 from "@/assets/slider/image-3.jpg"
import Thumbnail4 from "@/assets/slider/image-4.jpg"
import { Card, CardContent, Box, Stepper, Step, StepLabel, Container, Grid, Stack } from "@mui/material"
import Render from "@/ui/elements/Render"
import { ColorlibConnector, ColorlibStepIcon } from "@/ui/sections/Stepper"
import { useLocation } from "react-router-dom"
import UserForm from "./component/UserForm"
import JobForm from "./component/JobForm"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EducationForm from "./component/EducationForm"

const SignupPage: React.FC = () => {
  const listSteps = ["Data Pengguna", "Pekerjaan", "Pendidikan"]
  const location = useLocation()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)
  const [userID, setUserID] = useState<number | null>(null)
  const [userUUID, setUserUUID] = useState("")

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const userIDQuery = queryParams.get("id")
    const userUUIDQuery = queryParams.get("uuid")
    const step = queryParams.get("step")

    if (userIDQuery && userUUIDQuery) {
      setUserID(parseInt(userIDQuery))
      setUserUUID(userUUIDQuery)
    }
    if (step) setActiveStep(parseInt(step))
  }, [])

  useEffect(() => {
    const updateQueryParams = () => {
      const queryParams = new URLSearchParams()

      if (userID) {
        queryParams.set("id", userID.toString())
      }
      if (userUUID) {
        queryParams.set("uuid", userUUID)
      }
      if (activeStep) {
        queryParams.set("step", activeStep.toString())
      }

      const queryString = queryParams.toString()
      const currentUrl = location.pathname + (queryString ? `?${queryString}` : "")
      window.history.replaceState({}, "", currentUrl)
    }

    updateQueryParams()
  }, [activeStep, userID, userUUID])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const userIDQuery = queryParams.get("id")
    const userUUIDQuery = queryParams.get("uuid")
    const stepQuery = queryParams.get("step")

    if (userIDQuery && userUUIDQuery) {
      setUserID(parseInt(userIDQuery))
      setUserUUID(userUUIDQuery)
    }

    if (stepQuery) {
      setActiveStep(parseInt(stepQuery))
    }
  }, [location.search])
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          md={5}
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
        <Grid item md={7}>
          <Container maxWidth="md">
            <Stack direction="column" justifyContent={"center"} alignItems={"center"} sx={{ height: "65vh" }}>
              <Box>
                <Box sx={{ width: "180px", margin: "auto", mt: "30vh", mb: "-30px" }}>
                  <img src={Logo} alt="cat kemenhan" style={{ width: "100%" }} />
                </Box>
                <Box sx={{ flex: "1", maxWidth: "50vw", mx: "auto" }}>
                  <>
                    <Card className="no-padding min-screen" sx={{ height: "80vh", width: "50vw" }}>
                      <CardContent>
                        <Box sx={{ width: "100%" }}>
                          <Stepper
                            alternativeLabel
                            activeStep={activeStep - 1}
                            connector={<ColorlibConnector />}
                            sx={{ mb: 6, width: "60%", mx: "auto" }}
                          >
                            {listSteps.map((item) => (
                              <Step key={item}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{item}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                          <Container maxWidth="md">
                            <Render in={activeStep === 1}>
                              <UserForm
                                prevStep={() => navigate(-1)}
                                nextStep={(id, uuid) => {
                                  setActiveStep(2)
                                  setUserID(id)
                                  setUserUUID(uuid)
                                }}
                              />
                            </Render>
                            <Render in={activeStep === 2}>
                              <JobForm
                                prevStep={() => setActiveStep(1)}
                                nextStep={() => setActiveStep(3)}
                                userId={userID}
                                userUuid={"1234"}
                              />
                            </Render>
                            <Render in={activeStep === 3}>
                              <EducationForm
                                prevStep={() => setActiveStep(2)}
                                nextStep={() => navigate("/login")}
                                userId={userID}
                                userUuid={"1234"}
                              />
                            </Render>
                          </Container>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                </Box>
              </Box>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}
export default SignupPage
