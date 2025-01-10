import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import LoginPage from "./pages/auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/home"
import ListSoal from "./pages/list-soal"
import Navbar from "./components/navbar"
import LembarUjian from "./pages/lembar-ujian/page"
import LembarUjianTkk from "./pages/lembar-ujian-tkk/page"
import useTokenStore from "./store/token.store"
import RiwayatUjian from "./pages/riwayat-ujian"
import Layout from "./pages/layout/Layout"
import { LandingLayoutRoute } from "./landing/landing.layout"
import LandingPage from "./pages"
import Render from "./ui/elements/Render"

function App() {
  const location = useLocation()
  const queryClient = new QueryClient()

  const ProtectedRoute: React.FC = () => {
    const token = useTokenStore((state) => state.accessToken)
    const isLogin = useTokenStore((state) => state.isLogin)

    if (!token && !isLogin) return <Navigate to="/login" />

    return <Outlet />
  }

  const GuestRoute: React.FC = () => {
    const token = useTokenStore((state) => state.accessToken)
    const isLogin = useTokenStore((state) => state.isLogin)

    if (!!token && !!isLogin) return <Navigate to="/home" />

    return <Outlet />
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Render in={location.pathname !== "/"}>
          <Navbar />
        </Render>
        <Layout>
          <Routes>
            <Route element={<LandingLayoutRoute />}>
              <Route path={"/"} element={<LandingPage />} />
            </Route>
            <Route element={<GuestRoute />}>
              <Route path={"/login"} element={<LoginPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/home"} element={<HomePage />} />
              <Route path={"/list-soal/:examId"} element={<ListSoal />} />
              <Route
                path={"/lembar-ujian/:examId/module/:moduleId/activity/:activityId/model/:model/examTool/:examToolId"}
                element={<LembarUjian />}
              />
              <Route
                path={
                  "/lembar-ujian-tkk/:examId/module/:moduleId/activity/:activityId/model/:model/examTool/:examToolId"
                }
                element={<LembarUjianTkk />}
              />
              <Route path={"/riwayat-ujian"} element={<RiwayatUjian />} />
            </Route>
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </div>
  )
}

export default App
