import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import LoginPage from "./pages/auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/home"
import ListSoal from "./pages/list-soal"
import Navbar from "./components/navbar"
import LembarUjian from "./pages/lembar-ujian/page"
import useTokenStore from "./store/token.store"
import RiwayatUjian from "./pages/riwayat-ujian"

function App() {
  const queryClient = new QueryClient()

  const ProtectedRoute: React.FC = () => {
    const token = useTokenStore((state) => state.accessToken)
    const isLogin = useTokenStore((state) => state.isLogin)

    if (!token && !isLogin) return <Navigate to="/login" />

    return <Outlet />
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/home"} element={<HomePage />} />
            <Route path={"/list-soal/:examId"} element={<ListSoal />} />
            <Route
              path={"/lembar-ujian/:examId/module/:moduleId/activity/:activityId/model/:model/examTool/:examToolId"}
              element={<LembarUjian />}
            />
            <Route path={"/riwayat-ujian"} element={<RiwayatUjian />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </div>
  )
}

export default App
