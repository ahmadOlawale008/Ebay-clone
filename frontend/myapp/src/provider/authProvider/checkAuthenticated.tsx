import { Navigate, useLocation } from 'react-router-dom'

const CheckAuthenticated = () => {
  const isAuthenticated = false
  const location = useLocation()
  return <Navigate to={`/login?redirected_from=${location.pathname}`} />
}

export default CheckAuthenticated
