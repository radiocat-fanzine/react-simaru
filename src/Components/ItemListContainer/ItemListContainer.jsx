import { SearchContext } from "../../context/SearchContext";
import Item from "../Item/Item";
import { getProducts, getProductsByCateg } from "../../data/firebase";
import { useContext, useState, useEffect } from "react"; 
import { useParams } from "react-router";
import './ItemListContainer.css';

// Funcion para definir estructura del item card para tienda virtual

export default function ItemListContainer( props ) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categParam } = useParams();
    const { searchQuery } = useContext(SearchContext);

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
                console.log(error);
                alert("Something went wrong while looking for products :(")
            })
            .finally( () => {
                setIsLoading(false)
            })
        }
    
    }, [ categParam ]);

    //Filtro de busqueda en tiempo real

    const filteredProducts = products.filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            item.title?.toLowerCase().includes(q) ||
            item.category?.toLowerCase().includes(q) ||
            item.material?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="item-list-container">
            <h2>{props.children}</h2>

            { isLoading
                ? <p className="item-list-container__loading">Loading...</p>
                : ""
            }
            <div className="item-list" >
            {filteredProducts.length > 0 ? (
                filteredProducts.map (item => <Item key= { item.id } {...item} /> )
            ):(<p className="no-results">No products found.</p>
            )}
            </div>
        </div>
    )
}
