import { Link } from "react-router-dom";
import StateComponent from "../ColorPick/StateComponent";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import './Item.css'

function Item ({ product }) {
    const { id, title, imgURL, price } = product;
    const { addToCart } = useContext(CartContext);

    const correctedImgURL = '/' + imgURL;

    return (
        <div className="item-card">
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
