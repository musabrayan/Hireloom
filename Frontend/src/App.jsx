import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import JobBoard from "./components/JobBoard"
import BrowseJobs from "./components/BrowseJobs"
import UserProfile from "./components/UserProfile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import JobPostForm from "./components/admin/JobPostForm"
import JobApplicants from "./components/admin/JobApplicants"
import EditJob from "./components/admin/EditJob"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import Roadmap from "./components/Roadmap"

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
    path: "/roadmap",
    element: <Roadmap/>
  },
  {
    path: "/user-profile",
    element: <UserProfile/>
  },

  // Admin Routes

 {
  path: "/admin",
  element: <ProtectedRoute />, 
  children: [
    { path: "companies", element: <Companies /> },
    { path: "companies/create", element: <CreateCompany /> },
    { path: "companies/edit/:id", element: <CompanySetup /> },
    { path: "jobs", element: <AdminJobs /> },
    { path: "jobs/create", element: <JobPostForm /> },
    { path: "jobs/edit/:id", element: <EditJob /> },
    { path: "jobs/:id/applicants", element: <JobApplicants /> }
  ]
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
