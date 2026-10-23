import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "./context/CartContext";
import QtyStepper from "./components/QtyStepper";

const SHIPPING_CHARGE = 250;

export default function Cart() {
  const { cart, dispatch, total } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your cart</h1>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-solid">Browse watches</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <h1>Your cart</h1>
        <span>{cart.length} {cart.length === 1 ? "item" : "items"}</span>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-unit-price">
                  Rs. {item.price.toLocaleString()} each
                  {item.oldPrice > item.price && (
                    <span className="old">Rs. {item.oldPrice.toLocaleString()}</span>
                  )}
                </span>
                <div className="cart-item-controls">
                  <QtyStepper
                    value={item.qty}
                    onChange={(qty) =>
                      dispatch({ type: "QTY", id: item.id, qty })
                    }
                  />
                  <button
                    className="cart-remove"
                    onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
              <strong className="cart-item-total">
                Rs. {(item.price * item.qty).toLocaleString()}
              </strong>
            </article>
          ))}
          <Link to="/" className="cart-continue">Continue shopping</Link>
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <strong>Rs. {total.toLocaleString()}</strong>
          </div>
          <div className="cart-summary-row">
            <span>Standard shipping</span>
            <strong>Rs. {SHIPPING_CHARGE.toLocaleString()}</strong>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <strong>Rs. {(total + SHIPPING_CHARGE).toLocaleString()}</strong>
          </div>
          <Link to="/checkout" className="btn-solid cart-checkout">
            Continue to checkout
          </Link>
          <p className="cart-delivery-note">Delivery in 4–5 working days</p>
        </aside>
      </div>
    </section>
  );
}
