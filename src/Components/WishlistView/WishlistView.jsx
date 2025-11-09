import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, HeartCrack } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist'; 
import { CartContext } from '../../context/CartContext';
import EmptyStateCarousel from './EmptyStateCarousel';
import './WishlistView.css';

//Componente Mini-Card Reutilizable
const WishlistItemCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlistItem } = useWishlist();

    const linkPath = `/detail/${product.id}`; 
    const correctedImgURL = '/' + product.imgURL;

    //Función de manejo de clic para eliminar.
    const handleRemoveClick = (e) => {
    
        e.stopPropagation(); 

        e.preventDefault(); 
        
        toggleWishlistItem(product);
    };
    
    // Función para quitar de wishlist al mover al carrito
    const handleAddToCartAndRemove = () => {
        addToCart(product);
        toggleWishlistItem(product);
    };
    
    // Retorna Boton para remover de Wishlist (Corazon roto)
    return (
        <div className="wishlist-item-card">
            <button 
                className="wishlist-remove-btn" 
                onClick={handleRemoveClick}
                title="Remove from Wishlist"
            >
                <HeartCrack size={24} />
            </button>

            <Link to={linkPath} onClick={() => window.scrollTo(0, 0)}>
                <img src={correctedImgURL} alt={product.title} className="wishlist-img" />
            </Link>
            
            <div className="card-info">
                <Link to={linkPath} onClick={() => window.scrollTo(0, 0)}>
                    <h5 className="wishlist-title">{product.title}</h5>
                </Link>
                <p className="wishlist-price">€ {product.price}</p>
                <button 
                    onClick={handleAddToCartAndRemove} 
                    className="wishlist-add-btn"
                >
                    <ShoppingBag size={24} /> Add to Cart 
                </button>
            </div>
        </div>
    );
};

//Componente principal para funcionamiento de Wishlist
//Al tener productos guardados te los muestra en un Grid
//Al estar vacio te muestra un carrusel de fotos y CTA de vuelta a la tienda
export default function WishlistView() {
    const { wishlist } = useWishlist(); // Obtener la lista del hook useWishlist.js

    return (
        <div className="wishlist-view">
            <div className="wishlist-header">
                <h1 className="wishlist-main-title">My Wishlist</h1>
                <p className="wishlist-subtitle">Your favorite items are waiting! ({wishlist.length} items)</p>
            </div>

            {wishlist.length === 0 ? (
                <div className="empty-layout-wrapper"> 
                    <div className="empty-media-column">
                        <EmptyStateCarousel />
                    </div>

                    <div className="wishlist-empty-state">
                        <HeartCrack size={64} className="empty-icon" />
                        <h2>Your Wishlist is Empty</h2>
                        <p>Start adding products you love from the store!</p>
                        <Link to="/" className="btn-primary">Go to Store</Link>
                    </div>
                    
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map(product => (
                        <WishlistItemCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}