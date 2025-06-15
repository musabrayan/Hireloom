import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.userRole !== "recruiter") {
      navigate("/")
    }
  }, [user])

  return <Outlet />
}

export default ProtectedRoute