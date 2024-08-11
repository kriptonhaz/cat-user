import { Routes, Route } from "react-router-dom"
import DashboardRoute from "@/pages/design-system/route"
import Error404 from "./pages/error/404"
import { Error500 } from "./pages/error/500"
import WelcomePage from "./pages"
import LoadingPage from "./ui/views/LoadingPage"
import LoginPage from "./pages/auth"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={"/"} element={<WelcomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </div>
  )
}

export default App
