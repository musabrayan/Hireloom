import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/global/Navbar"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import JobBoard from "./components/JobBoard"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <JobBoard />
  },
])

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
