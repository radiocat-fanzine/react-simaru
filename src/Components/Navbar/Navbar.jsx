import CartWidget from "./CartWidget"
import "./Navbar.css"
function NavBar() {
  return (
    <nav className="nav-menu">
      <Link to="/">
      <span className="nav-logo">Simaru.de</span>
      </Link>
      <ul className="nav-links">
        <li>
          <link to="/category/wallets">
            Wallets
          </link>
        </li>
        <li>
          <link to="/category/bracelets">
            Bracelets
          </link>
        </li>
        <li>
          <link to="/category/bags-pouches">
            Bags & Pouches
          </link>
        </li>
        <li>
          <link to="/category/belts">
            Belts
          </link>
        </li>
      </ul>
      <link to ="/cart">
      <span> <CartWidget/> </span>
      </link>

    </nav>

  )
}

export default NavBar