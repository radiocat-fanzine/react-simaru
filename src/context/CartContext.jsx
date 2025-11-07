import { createContext, useState, useEffect } from "react";

//Creacion del contexto del cart

const CartContext = createContext();

//Componente proveedor que envuelve a la app

export function CartProvider(props) {

    //Estado inicial con persistencia local
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //Se almacena cada modificacion en el localStorage 
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    },[cartItems]);

    //Funcion para agregar productos al carrito de compra

    function addToCart(newItem){
        const newCartItems = structuredClone(cartItems);
        const isInCart = cartItems.some( item => item.id === newItem.id)
        
        if (isInCart) {
            const index = cartItems.findIndex( item => item.id === newItem.id);
            newCartItems[index].count = newCartItems[index].count + 1
        }
        else{
            newCartItems.push( { ...newItem, count:1});
        }
        
        setCartItems(newCartItems)
        alert(`You successfully added ${newItem.title} to your cart`);
    }

    //Funcion para quitar una unidad de un producto (o eliminar si queda 1)
    function removeItem(idRemove){
        let newCartItems= structuredClone(cartItems)
        const isInCart = cartItems.find ( (item) => item.id === idRemove);

        if(!isInCart) return; //Asegura que el producto este, antes de continuar

        const countInCart  = isInCart.count;
            if(countInCart > 1){
                const index = cartItems.findIndex( (item) => item.id === idRemove);
                newCartItems[index].count = newCartItems[index].count -1;
            }
            else {
                newCartItems = cartItems.filter((item) => item.id !== idRemove);
            }

            setCartItems(newCartItems);
    }


    //Funcion para eliminar un producto completamente del carrito de compra
    function removeItemComplete(idRemove){
        const newCart = cartItems.filter( (item) => item.id !== idRemove);
        setCartItems(newCart);
    }

    //Funcion para contar la cantidad total de productos
    function countItems(){
        let count = 0;
        cartItems.forEach( (item) => (count += item.count));
        return count;
    }

    //Funcion para calcular el precio total del carrito de compras

    function calculateTotalPrice() {
        let total = 0;
        cartItems.forEach((item) => (total += item.price * item.count));
        return total;
    }

    //Funcion para vaciar todo el carrito de compras
    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContextartContext.Provider value={ {cartItems, addToCart, removeItemComplete, countItems, removeItem, calculateTotalPrice, clearCart,} }>
            { props.children }
        </CartContextartContext.Provider>
    );
}

export default CartContext;

