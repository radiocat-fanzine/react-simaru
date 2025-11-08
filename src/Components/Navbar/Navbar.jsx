import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import CartWidget from "../CartWidget/CartWidget";
import { Search, User, Heart,ChevronDown } from "lucide-react";
import "./Navbar.css";

//Estructura de Nav Bar con triple fila > 
//(Banner de anuncios. Barra Logo + Search Input + Cart. Barra Categorias.) 

function NavBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  //Rotacion de mensajes en Banner
  const [announcementIndex, setAnnouncementIndex] = useState(0);
    const messages = [
        "✨ ¡Nueva Colección! Hasta 35% OFF en artículos seleccionados.",
        "¡ENVÍO GRATIS en pedidos de más de 75€!",
        "¡Paga a plazos sin intereses! 💳 Descubre nuestras opciones."
    ];
  
  useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex(prevIndex => (prevIndex + 1) % messages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

  return (
    <nav className="nav-menu">
      <div className="announcement-bar">
                <div className="announcement-content">
                    {messages[announcementIndex]}
                </div>
                <div className="announcement-utilities">
                    <div className="utility-selector"> 
                        € EUR <ChevronDown size={14} />
                    </div> 
                    <div className="utility-selector">
                        🇬🇧 EN <ChevronDown size={14} />
                    </div> 
                </div>
            </div>

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