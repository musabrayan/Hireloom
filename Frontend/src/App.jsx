import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/global/Navbar"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import JobBoard from "./components/JobBoard"
import BrowseJobs from "./components/BrowseJobs"
import UserProfile from "./components/userProfile"
import JobDescription from "./components/JobDescription"

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
  {
    path: "/job-description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <BrowseJobs/>
  },
  {
    path: "/user-profile",
    element: <UserProfile/>
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
