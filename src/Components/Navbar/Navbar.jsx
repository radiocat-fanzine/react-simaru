import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function NavBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  return (
    <nav className="nav-menu">
      <div className="navbar-top-row">
        <Link to="/" className="nav-logo">
        <img className="logo-image" src="./imgs/logo.png" alt="Simaru Logo" />
        </Link>

        <div className="nav-right-group">

          <div className="navbar-search-wrapper">
            <div className="navbar-search">
              <input
                type="text"
                placeholder="Find your next piece here…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-icon-button" aria-label="Search">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        
          <Link to="/cart" className="nav-cart">
            <CartWidget />
          </Link>
          
        </div>

      </div>

      <div className="nav-divider"></div>

      <div className="navbar-bottom-row">
        <ul className="nav-links">
          <li><Link to="/category/wallets">Wallets</Link></li>
          <li><Link to="/category/bracelets">Bracelets</Link></li>
          <li><Link to="/category/bags-pouches">Bags & Pouches</Link></li>
          <li><Link to="/category/belts">Belts</Link></li>
        </ul>
      </div>

    </nav>
  );
}

export default NavBar;