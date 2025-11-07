import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import { ShoppingCart } from "lucide-react";
import "./CartWidget.css";

export default function CartWidget() {
    const { countItems } = useContext(cartContext);
    const totalItems = countItems();

    return (
        <div className="cart-widget">
            <ShoppingCart size={22} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
    );
}
