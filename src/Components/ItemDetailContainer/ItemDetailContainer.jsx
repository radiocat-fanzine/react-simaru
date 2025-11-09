import RelatedProducts from '../RelatedProducts/RelatedProducts'
import StateComponent from "../ColorPick/StateComponent"
import { useParams } from "react-router"
import { getProductById } from "../../data/firebase";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Clock, Truck, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './ItemDetailContainer.css';

const SERVICE_MESSAGES = [
    { icon: <Clock size={18} className="service-icon" />, text: "Shipped within 24 hours" },
    { icon: <Truck size={18} className="service-icon" />, text: "Free shipping within Germany" },
    { icon: <RefreshCw size={18} className="service-icon" />, text: "Free returns for Germany and Austria" },
    { icon: <ShieldCheck size={18} className="service-icon" />, text: "Simaru manufacturer's warranty included" },
];

// Funcion para definir estructura del item card con descripcion

function ItemDetailContainer() {
    const { idParam } = useParams();
    const [product, setProduct] = useState( {loading: true} );
    const { addToCart} = useContext(CartContext);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect ( () => {
        getProductById(idParam)
        .then( response => setProduct(response))
        .catch( error => alert(error))
    }, [])

    //Función para alternar el estado (Wishlist) y mostrar la notificación
    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);

        const newStatus = !isInWishlist;
        const message = newStatus 
            ? `❤️ "${product.title}" added to your Wishlist!`
            : `💔 "${product.title}" removed from your Wishlist.`;
        
        // Llama a Toastify
        toast.success(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { backgroundColor: '#FF69B4', color: 'white' } 
        });
    };

    // If con early return para condicionar la visibilidad del item card a su disponibilidad
    
    if ( product.loading ){
        return <p>Loading products ...</p>
    }

    const correctedImgURL = '/' + product.imgURL;

    // Retorna estructura del Item Detallado + Componente Carrusel de sugerencias (Related Products)
    return (
        <div className="item-detail-view">
            <ToastContainer />
            <div className="detail-content-wrapper">

                <div className="wishlist-icon-container" onClick={toggleWishlist}>
                    <Heart 
                        size={32} 
                        className="wishlist-icon" 
                        // Rellena si está en la lista de deseos
                        fill={isInWishlist ? '#FF69B4' : 'none'} 
                        stroke={isInWishlist ? '#FF69B4' : 'currentColor'}
                    />
                </div>

                <div className="detail-image-column">
                    <img 
                        className="detail-main-img"
                        src= {correctedImgURL}
                        alt= {product.title}
                    />
                </div>

                <div className="detail-info-column" >

                    <h4 className="detail-category-material">
                        {product.category} / {product.material}
                    </h4>
                    <div className="rating-stars">
                        <span>★★★★★</span> 
                    </div>
                    <h2 className="item-card-title">{product.title}</h2>
                    <h3 className="price-large">€ {product.price}</h3>

                    <StateComponent/>

                    <button className="add-to-cart-btn" onClick={ () => addToCart(product)}> Add to Cart </button>

                    <hr />

                    <div className="detail-scrollable-content">
                        <p className="detail-description">{product.description}</p>
                        <p className='origin-message' >
                            <img className='eu-flag' src="/imgs/EU_icon.png" alt="European Union flag"/>
                            Made in EU 
                        </p>

                        <div className="detail-origin-service">
                            <ul className="service-messages">
                                {SERVICE_MESSAGES.map((msg, index) => (
                                    <li key={index}>
                                        {msg.icon}
                                        {msg.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>
            </div>

            <RelatedProducts currentProductId={idParam} />

        </div>
    )
}

export default ItemDetailContainer