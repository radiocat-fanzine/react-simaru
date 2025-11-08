import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { getRelatedProducts } from '../../data/firebase';
import { CartContext } from '../../context/CartContext';
import './RelatedProducts.css'; 

// Componente para renderizar un mini card de producto
const RelatedItemCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const linkPath = `/detail/${product.id}`; 
    const correctedImgURL = '/' + product.imgURL;
    
    // Retorno de elementos con WindowScrollTo para mejorar la navegacion
    return (
        <div className="related-item-card">
            <Link to={linkPath} onClick={() => window.scrollTo(0, 0)}> {/* Agregamos scrollTo para ir arriba */}
                <img src={correctedImgURL} alt={product.title} className="related-img" />
            </Link>
            <div className="card-info">
                <Link to={linkPath} onClick={() => window.scrollTo(0, 0)}>
                    <h5 className="related-title">{product.title}</h5>
                </Link>
                <p className="related-price">€ {product.price}</p>
                <button onClick={() => addToCart(product)} className="related-add-btn"> Add to Cart </button>
            </div>
        </div>
    );
};

export default function RelatedProducts({ currentProductId }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getRelatedProducts(currentProductId, 4)
            .then(data => setRelatedProducts(data))
            .catch(error => console.error("Error fetching related products:", error))
            .finally(() => setIsLoading(false));
    }, [currentProductId]);

    if (isLoading) {
        return <p className="recommendations-loading">Loading recommendations...</p>;
    }
    
    if (relatedProducts.length === 0) {
        return null; 
    }

    return (
        <div className="recommendations-section">
            <h2 className="recommendations-title">You Might Also Like</h2>
            <div className="carousel-wrapper">
                {relatedProducts.map(product => (
                    <RelatedItemCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}