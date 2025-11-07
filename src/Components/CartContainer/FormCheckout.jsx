import { useState } from "react";
import './CartContainer.css';

//Simulacion de pago, formulario de ingreso de datos de envio + confirmacion de envio

export default function FormCheckout(props) {

    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: ""
    });

    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        props.handleCheckout(formData);
        setSubmitted(true);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function resetForm() {
        setFormData({
        username: "",
        phone: "",
        email: ""
        });
        setSubmitted(false);
    }

    return (
        <div className="form-checkout-container">
        <h4>Enter Shipping Details</h4>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Full Name</label>
            <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your legal name (first and last)"
            value={formData.username}
            onChange={handleInputChange}
            required
            />

            <label htmlFor="email">Email Address</label>
            <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address."
            value={formData.email}
            onChange={handleInputChange}
            required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+49 1XX XXXX XXX"
            pattern="[0-9]{6,15}"
            title="Phone number must be between 6 and 15 digits (numbers only)."
            value={formData.phone}
            onChange={handleInputChange}
            required
            />

            <div className="form-buttons">
            <button type="submit">Enviar</button>
            <button type="button" onClick={resetForm}> Clear Form </button>
            </div>

            {submitted && (
            <p className="success-message">
                Payment Successful!
            </p>
            )}
        </form>
        </div>
    );
}
