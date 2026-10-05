import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

export default function Cart() {
  const { cart, dispatch, total } = useCart();

  if (cart.length === 0) {
    return (
      <section>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Browse watches</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              <p>Rs. {item.price.toLocaleString()}</p>
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(event) =>
                    dispatch({
                      type: "QTY",
                      id: item.id,
                      qty: Number(event.target.value),
                    })
                  }
                />
              </label>
              <button onClick={() => dispatch({ type: "REMOVE", id: item.id })}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="price">Total: Rs. {total.toLocaleString()}</p>
      <Link to="/checkout">Continue to checkout</Link>
    </section>
  );
}
