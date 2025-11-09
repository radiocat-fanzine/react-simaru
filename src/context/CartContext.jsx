import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

//Creacion del contexto del cart

export const CartContext = createContext();

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

    function addToCart(newItem) {
        const isInCart = cartItems.find(item => item.id === newItem.id); 

        if (isInCart) {
            const updatedCart = cartItems.map(item =>
                item.id === newItem.id
                    ? { ...item, count: item.count + 1 }
                    : item
            );
            setCartItems(updatedCart);

            toast.success(`+1 added to cart: ${newItem.title}`, {
                style: { backgroundColor: '#4CAF50', color: 'white' },
            });

        } else {
            setCartItems([...cartItems, { ...newItem, count: 1 }]);
            toast.info(`Item added to cart: ${newItem.title}`, {
                style: { backgroundColor: '#2196F3', color: 'white' },
        });
    }
}

    //Funcion para quitar una unidad de un producto (o eliminar si queda 1)
    function removeItem(idRemove) {
    const isInCart = cartItems.find((item) => item.id === idRemove);

    if (!isInCart) return;

    if (isInCart.count > 1) {
        const updatedCart = cartItems.map(item =>
            item.id === idRemove
                ? { ...item, count: item.count - 1 }
                : item 
        );
        setCartItems(updatedCart);
    } else {
        const newCartItems = cartItems.filter((item) => item.id !== idRemove);
        setCartItems(newCartItems);
    }
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
        <CartContext.Provider value={ {cartItems, addToCart, removeItemComplete, countItems, removeItem, calculateTotalPrice, clearCart,} }>
            { props.children }
        </CartContext.Provider>
    );
}


