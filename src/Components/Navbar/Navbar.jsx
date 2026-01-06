import Banner from "../Banner/Banner";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import CartWidget from "../CartWidget/CartWidget";
import { Search, User, Heart, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

//Estructura de Nav Bar con triple fila > 
//(Banner de anuncios. Barra Principal. Barra Categorias.) 

function NavBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const { isLoggedIn, userPhotoURL } = useAuth();

  const categories = [
    { name: "Wallets", path: "/category/wallets" },
    { name: "Bracelets", path: "/category/bracelets" },
    { name: "Bags & Pouches", path: "/category/bags-pouches" },
    { name: "Belts", path: "/category/belts" },
  ];

  return (
    <nav className="nav-menu">

      <Banner />

      <div className="navbar-top-row">
        <Link to="/" className="nav-logo-container">
          <span className="logo-wrapper">
            <img
              className="logo-image"
              src="/imgs/logo.png"
              alt="Simaru Logo"
            />
          </span>
        </Link>

        <div className="navbar-tagline-container">
          <span className="logo-tagline">
            Sustainable Fashion since 2017
          </span>
        </div>

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

            <Link to="/wishlist" className= "nav-icon-link">
              <span className="tooltip-container" data-tooltip="Wishlist"> 
                <Heart size={22} />
              </span>
            </Link>
                      
            {isLoggedIn ? (
              // ESTADO: SESIÓN INICIADA - Icono foto de perfil
              <Link to="/profile" className="nav-icon-link user-profile-link">
                <span className="tooltip-container" data-tooltip="Profile">
                  <div className="profile-icon-wrapper">
                    <img src={userPhotoURL} alt="User" className="profile-mini-pic" />
                    <ChevronDown size={14} className="profile-chevron" />
                  </div>
                </span>
              </Link>
            ) : (
              // ESTADO: SESIÓN CERRADA - Icono User generico para login
              <Link to="/login" className="nav-icon-link">
                <span className="tooltip-container" data-tooltip="Login">
                  <User size={22} /> 
                </span>
              </Link>
            )}
          
            <Link to="/cart" className= "nav-icon-link">
              <span className="tooltip-container" data-tooltip="Cart"> 
                <CartWidget />
              </span>
            </Link>
          </div>
        </div>
        <div className="nav-divider"></div>

        <div className="navbar-bottom-wrapper">
          <div className="navbar-bottom-row">
            <ul className="nav-links">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <NavLink to={cat.path}>{cat.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

    </nav>
  );
}

export default NavBar;