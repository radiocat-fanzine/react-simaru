import { Link } from "react-router-dom";
import StateComponent from "../ColorPick/StateComponent";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useWishlist } from '../../hooks/useWishlist';
import './Item.css'

function Item ({ product }) {
    const { id, title, imgURL, price } = product;
    const { addToCart } = useContext(CartContext); //Para agregar al carrito

    //Hook de Wishlist
    const { toggleWishlistItem, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(id); //Para verificar si es un producto favorito

    const correctedImgURL = '/' + imgURL;

    //Funcion para manejar el click del icono
    const handleWishlistClick = (e) => {
        e.preventDefault(); // Detener navegación del <Link> si el Item está envuelto
        e.stopPropagation(); // Prevenir que el clic afecte al contenedor padre
        
        toggleWishlistItem(product);

        const message = !isFavorite
            ? `❤️ "${title}" added to Wishlist!`
            : `💔 "${title}" removed from Wishlist.`;

        toast.success(message, {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
            style: { backgroundColor: '#FF69B4', color: 'white' }
        });
    };

    //Retorna la card de cada Item + Icono flotante para whislist
    return (
        <div className="item-card">
            <div 
                className="wishlist-icon-card" 
                onClick={handleWishlistClick}
            >
                <Heart 
                    size={28} 
                    className="wishlist-icon" 
                    // Relleno condicional basado en el estado
                    fill={isFavorite ? '#FF69B4' : 'none'} 
                    stroke={isFavorite ? '#FF69B4' : 'currentColor'}
                />
            </div>

            <img 
            className="item-card-img"
            src= {correctedImgURL}
            alt= {title}
            />
            <h2 className="item-card-title"> {title} </h2>
            <h3 className="item-card-price">Price: € {price} </h3>
            <StateComponent/>

            <div className="item-card-actions">
                <Link to= {`/detail/${id}`} className="see-more-link flex-item">
                    <button className="btn-secondary">See more</button>
                </Link>
                <button className="add-to-cart-btn btn-primary flex-item" onClick={ () => addToCart(product)}> 
                    Add to Cart 
                </button>
            </div>
            
        </div>
    )
}

export default Item;
