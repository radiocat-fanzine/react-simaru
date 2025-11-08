import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { createOrder } from "../../data/firebase";
import FormCheckout from "./FormCheckout.jsx";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartContainer() {
    const { cartItems, removeItem, clearCart, calculateTotalPrice, addToCart } = useContext(CartContext);

    // Calcular total del carrito
    const totalPrice = calculateTotalPrice();

    // Manejo del checkout
    async function handleCheckout(formData) {
        const orderData = {
            buyer: formData,
            items: cartItems,
            price: totalPrice,
            date: new Date()
        };

        const newOrder = await createOrder(orderData);
        clearCart();
        Swal.fire({
            title: "Got it! 🎉",
            html: `
                <p>Your Order ID is:</p>
                <p style="font-weight:bold; color:#4caf50; font-size:1.1rem;">${newOrder.id}</p>
                <p>All delivery information has been sent to <b>${formData.email}</b></p>
            `,
            showCancelButton: true,
            confirmButtonText: "Track your order",
            cancelButtonText: "Back to Home",
            reverseButtons: true,
            focusCancel: true,
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                navigate("/"); // Te lleva al inicio
            }
        });
    }

    //Apariencia de Carrito de compras: Item con nombre, foto, cantidad + botones agregar y restar y precio total
    // Uso de .toFixed(2) para limitar decimales
    return (
        <div className="cart-container">
        <h3>Your Items</h3>

        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="cart-items">
                <div className="cart-header">
                    <span></span> 
                    <div className="cart-info-header">
                        <span className="header-col-product">Item</span> 
                        <span className="header-col-units">Units</span> 
                        <span className="header-col-price">Price</span> 
                    </div>
                    <span className="header-col-remove">Remove</span>
                </div>

                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img width="100" src={item.imgURL} alt={item.title} />
                        <div className="cart-item-info">
                            <h4>{item.title}</h4>
                            
                            <div className="item-count-buttons">
                                <button onClick={() => removeItem(item.id)} disabled={item.count === 1}>-</button>
                                <span>{item.count}</span>
                                <button onClick={() => addToCart(item)}>+</button>
                            </div>
                            
                            <p>€ {(item.price * item.count).toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeItemComplete(item.id)}
                            className="remove-item-btn"><Trash2 size={20} /></button>
                    </div>
                ))}

                <div className="cart-total-footer">
                    <span className="cart-total-label">Final Total:</span>
                    <h4 className="cart-total-value">€{calculateTotalPrice().toFixed(2)}</h4>
                </div>

                <FormCheckout handleCheckout={handleCheckout} />
            </div>
        )}
        </div>
    );
}

export default CartContainer;