import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/global/Navbar"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import JobBoard from "./components/JobBoard"
import BrowseJobs from "./components/BrowseJobs"
import UserProfile from "./components/userProfile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import JobPostForm from "./components/admin/JobPostForm"
import JobApplicants from "./components/admin/JobApplicants"

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

  // Admin Routes

  {
    path:"/admin/companies",
    element:<Companies/>
  },

  {
    path:"/admin/companies/create",
    element:<CreateCompany/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<JobPostForm/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<JobApplicants/>
  }


])

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
