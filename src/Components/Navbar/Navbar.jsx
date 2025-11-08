import Banner from "../Banner/Banner";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import CartWidget from "../CartWidget/CartWidget";
import { Search, User, Heart } from "lucide-react";
import "./Navbar.css";

//Estructura de Nav Bar con triple fila > 
//(Banner de anuncios. Barra Principal. Barra Categorias.) 

function NavBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  return (
    <nav className="nav-menu">
      
      <Banner />

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
                <Search size={22} />
              </button>
            </div>
          </div>

          <Link to="/wishlist" className="nav-icon-link">
            <Heart size={22} />
          </Link>
                    
          <Link to="/account" className="nav-icon-link">
            <User size={22} />
          </Link>
        
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