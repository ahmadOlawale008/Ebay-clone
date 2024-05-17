import "./navbar-styles.css"
import NavbarSearch from './NavbarSearch'
import NavbarInto from './NavbarInto'
const Navbar = () => {
  return (
    <div className='header-nav-wrapped '>
      <NavbarInto />
      <NavbarSearch />
    </div>
  )
}

export default Navbar
