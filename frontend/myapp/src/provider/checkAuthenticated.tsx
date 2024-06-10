import { Navigate, Outlet } from 'react-router-dom'

const CheckAuthenticated = () => {
  const isAuthenticated = false
  if(isAuthenticated) return <Outlet /> 
  return <Navigate to={"/login"} />
}

export default CheckAuthenticated
