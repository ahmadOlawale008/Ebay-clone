import "./navbar-styles.css"
import NavbarSearch from './NavbarSearch'
import NavbarInto from './NavbarInto'
import { Outlet } from "react-router-dom"
const Navbar = () => {
  return (
    <div className='header-nav-wrapped '>
      <NavbarInto />
      <NavbarSearch />
      <Outlet />
    </div>
  )
}

export default Navbar
