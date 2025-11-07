import StateComponent from "../ColorPick/StateComponent"
import { useParams } from "react-router"
import { getProductById } from "../../data/firebase";
import { useEffect, useState, useContext } from "react";
import CartContext from "../../context/CartContext";


// Funcion para definir estructura del item card con descripcion

function ItemDetailContainer() {
    const { idParam } = useParams();
    const [product, setProduct] = useState( {loading: true} );
    const context = useContext(CartContext);

    useEffect ( () => {
        getProductById(idParam)
        .then( response => setProduct(response))
        .catch( error => alert(error))
    }, [])

    // If con early return para condicionar la visibilidad del item card a su disponibilidad
    
    if ( product.loading ){
        return <p>Loading products ...</p>
    }

    return (
            <div className="item-card">
                <h2 className="item-card-title"> {product.title} </h2>
                <img 
                className="item-card-img"
                height= "800"
                src= {product.imgURL}
                />
    
                <h3 className="item-card-price">Price: € {product.price} </h3>
                <StateComponent/>
                <div style={{ textAlign: "center"}}>
                    <p> {product.description} </p>
                </div>
                <div>
                    <button onClick={ () => context.addToCart(product)}>Add to Cart</button>
                </div>
            </div>
        )
}

export default ItemDetailContainer