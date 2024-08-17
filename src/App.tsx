import { Routes, Route } from "react-router-dom"
import DashboardRoute from "@/pages/design-system/route"
import Error404 from "./pages/error/404"
import { Error500 } from "./pages/error/500"
import WelcomePage from "./pages"
import LoadingPage from "./ui/views/LoadingPage"
import LoginPage from "./pages/auth"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/home"
import ListSoal from "./pages/list-soal"
import Navbar from "./components/navbar"
import LembarUjian from "./pages/lembar-ujian/page"

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={"/"} element={<WelcomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/list-soal/:examId"} element={<ListSoal />} />
          <Route path={"/lembar-ujian/:examId"} element={<LembarUjian />} />
        </Routes>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </div>
  )
}

export default App
