import { useContext } from "react";
import cartContext from "../../context/cartContext";
import { createOrder } from "../../data/firebase";
import { FormCheckout } from "FormCheckout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CartContainer() {
    const { cartItems, removeItem, clearCart, calculateTotalPrice } = useContext(cartContext);

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
    return (
        <div className="cart-container">
        <h3>Your Items</h3>

        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img width="100" src={item.imgURL} alt={item.title} />
                        <h4>{item.title}</h4>
                        <div className="item-count-buttons">
                            <button onClick={() => removeItem(item.id)}>-</button>
                            <span>{item.count}</span>
                            <button onClick={() => addToCart(item)}>+</button>
                        </div>
                        <p>€ {item.price * item.count}</p>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                ))}

                <h4>Total: €{calculateTotalPrice()}</h4>

                <FormCheckout handleCheckout={handleCheckout} />
            </div>
        )}
        </div>
    );
}

export default CartContainer;