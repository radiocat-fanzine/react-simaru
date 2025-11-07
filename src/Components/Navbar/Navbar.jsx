import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function NavBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-logo">
        <img src="/imgs/logo.png" alt="Simaru Logo" />
      </Link>

      <div className="navbar-search">
        <i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search eco-friendly products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Link to="/cart" className="nav-cart">
        <CartWidget />
      </Link>

      <div className="nav-divider"></div>

      <ul className="nav-links">
        <li><Link to="/category/wallets">Wallets</Link></li>
        <li><Link to="/category/bracelets">Bracelets</Link></li>
        <li><Link to="/category/bags-pouches">Bags & Pouches</Link></li>
        <li><Link to="/category/belts">Belts</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;