import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { createOrder } from "../../data/firebase";
import FormCheckout from "./FormCheckout.jsx";
import EmptyStateCarousel from '../WishlistView/EmptyStateCarousel';
import Swal from "sweetalert2";
import { Trash2, ShoppingBag } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import './CartContainer.css';

function CartContainer() {
    const { cartItems, removeItem, clearCart, calculateTotalPrice, addToCart, removeItemComplete } = useContext(CartContext);

    const navigate = useNavigate();

    // Calcular total del carrito
    const totalPrice = calculateTotalPrice();

    // Manejo del checkout, la logica para generar las ordenes de compra
    async function handleCheckout(formData) {
        const orderData = {
            buyer: formData,
            items: cartItems,
            price: totalPrice,
            date: new Date()
        };

        try {
            const newOrder = await createOrder(orderData);
            clearCart();

            //Funcion de seguimiento simulado (Boton Track Your Order) con SweetAlert
            const showTrackingSwal = () => {
                Swal.fire({
                    title: "🚚 Order Tracking: " + newOrder.id,
                    html: `
                        <div style="text-align: left;">
                            <h5 style="margin-top:0;">Shipping Steps:</h5>
                            <ul style="list-style: none; padding-left: 0;">
                                <li style="color:#4caf50;">✅ Order Confirmed (${new Date().toLocaleTimeString()})</li>
                                <li>📦 Preparing for Shipment</li>
                                <li>✈️ In Transit to ${formData.country}</li>
                                <li>🏡 Out for Delivery</li>
                            </ul>
                            <h5 style="border-top: 1px solid #eee; padding-top: 10px;">Delivery Details:</h5>
                            <p><strong>Address:</strong> ${formData.address}, ${formData.country}</p>
                            <p><strong>Recipient:</strong> ${formData.username}</p>
                        </div>
                    `,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: "Close Tracking",
                    cancelButtonText: "Back to Home",
                    reverseButtons: true,
                    focusCancel: true,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                        navigate("/"); 
                    }
                });
            };

            //Funcion de Confirmacion de orden con SweetAlert
            Swal.fire({
                title: "Got it! 🎉",
                html: `<p>Your Order ID is:</p>
                <p style="font-weight:bold; color:#4caf50; font-size:1.1rem;">${newOrder.id}</p>
                <p>All delivery information has been sent to <b>${formData.email}</b></p>`,
                showCancelButton: true,
                confirmButtonText: "Track your order",
                cancelButtonText: "Back to Home",
                reverseButtons: true,
                focusCancel: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate("/"); // Redirige al inicio
                } else if (result.isConfirmed) {
                    showTrackingSwal();
                }
            });
        } catch (error) {
            Swal.fire('Error', '"Oops! We couldn’t process your order this time. Please try again in a moment.', 'error');
            console.error("Error creating order: ", error);
        }
    }

//Estructura de Carrito de compras: Item con nombre, foto, cantidad + botones agregar y restar y precio total
//Uso de .toFixed(2) para limitar decimales
//Al estar vacio te muestra un carrusel de fotos y CTA de vuelta a la tienda
    return (
        <div className="cart-container">
        <h3>Your Items — Almost yours!</h3>

        {cartItems.length === 0 ? (
            <div className="empty-layout-wrapper">
                <div className="empty-media-column">
                    <EmptyStateCarousel /> 
                </div>

                <div className="cart-empty-state">
                    <ShoppingBag size={64} className="empty-icon" />
                    <h2>Your Shopping Cart is Empty</h2>
                    <p>Discover our best sellers and start your order now!</p>
                    <Link to="/" className="btn-primary">Continue Shopping</Link>
                </div>
            </div>
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

                <div className="cart-checkout-section">
                    <div className="cart-total-footer">
                        <span className="cart-total-label">Final Total:</span>
                        <h4 className="cart-total-value">€{calculateTotalPrice().toFixed(2)}</h4>
                    </div>  

                    <div className="form-checkout-container"> 
                        <FormCheckout handleCheckout={handleCheckout} />
                    </div>
                </div>

            </div>
        )}
        </div>
    );
}

export default CartContainer;