import RelatedProducts from '../RelatedProducts/RelatedProducts'
import StateComponent from "../ColorPick/StateComponent"
import { useParams } from "react-router"
import { getProductById } from "../../data/firebase";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Clock, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
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

    useEffect ( () => {
        getProductById(idParam)
        .then( response => setProduct(response))
        .catch( error => alert(error))
    }, [])

    // If con early return para condicionar la visibilidad del item card a su disponibilidad
    
    if ( product.loading ){
        return <p>Loading products ...</p>
    }

    const correctedImgURL = '/' + product.imgURL;

    // Retorna estructura de Item Detail Container con State Component incrustado + Componente Carrusel de sugerencias (Related Products)
    return (

        <div className="item-detail-view">
            <div className="detail-content-wrapper">

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
                    <h2 className="item-card-title">{product.title}</h2>

                    <div className="rating-stars">
                        <span>★★★★★</span> 
                    </div>

                    <h3 className="price-large">€ {product.price}</h3>

                    <StateComponent/>

                    <button className="add-to-cart-btn" onClick={ () => addToCart(product)}> Add to Cart </button>

                    <hr />

                    <p className="detail-description">{product.description}</p>
                    <p>
                        <img className='eu-flag' src="/imgs/EU_icon.png" alt="European Union flag" style={{ width: '24px', height: '24px', marginLeft: '10px' }}/>
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

            <RelatedProducts currentProductId={idParam} />

        </div>
    )
}

export default ItemDetailContainer