import { createContext, useState } from "react";

const cartContext = createContext();

export function CartProvider(props) {
    const [cartItems, setCartItems] = useState([]);
    console.log (cartItems);

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

    function removeItem(idRemove){
        let newCartItems= structuredClone(cartItems)

        const isInCart = cartItems.find ( item => item.id === idRemove)
        const countInCart  = isInCart.count;
            if(countInCart > 1){
                const index = cartItems.findIndex( item => item.id === idRemove)
                newCartItems[index].count;
            }
            else {
                newCartItems = cartItems.filter( item => item.id !== idRemove)
            }

            setCartItems(newCartItems);
    }

    function removeItemComplete(idRemove){
        const newCart = cartItems.filter( item=> item.id !== idRemove)
        setCartItems(newCart)
    }

    function countItems(){
        let count = 0;
        cartItems.forEach( item => count += item.count)
        return count;
    }

    // function calculateTotalPrice(){}

    function clearCart(){
    setCartItems([])
    }

    return (
        <cartContext.Provider value={ {cartItems, addToCart, removeItemCompleto, countItems, removeItem, clearCart} }>
            { props.children }
        </cartContext.Provider>
    )
}

export default cartContext;

