import Item from "../Item/Item";
import { getProducts, getProductsByCateg } from "../../data/firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import './ItemListContainer.css';

// Funcion para definir estructura del item card para tienda virtual

export default function ItemListContainer( props ) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categParam } = useParams();

    useEffect( () => {
        setIsLoading(true)

        if (categParam){
            getProductsByCateg(categParam)
            .then (productsByCateg => setProducts(productsByCateg))
            .catch (error => alert(error))
            .finally ( () => setIsLoading(false))
        }
        else {
            getProducts()
            .then ((productList) => {
                setProducts(productList);
            })
            .catch ( (error) => {
                alert("Something went wrong while looking for products :(")
            })
            .finally( () => {
                setIsLoading(false)
            })
        }
    
    }, [ categParam ])

    return (
        <div className="item-list-container">
            <h2>{props.children}</h2>
            { isLoading
                ? <p className="item-list-container__loading">Loading...</p>
                : ""
            }
            <div className="item-list" >
            {
                products.map (item => <Item key= { item.id } {...item} /> )
            }
            </div>
        </div>
    )
}

