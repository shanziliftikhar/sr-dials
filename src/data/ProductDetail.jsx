import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import Gallery from "../components/gallery";
import QtyStepper from "../components/QtyStepper";

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((p) => String(p.id) === id);

  if (!product)
    return (
      <p>
        Product not found. <Link to="/">Back to shop</Link>
      </p>
    );

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;
  const unavailable = !product.price;

  const addToCart = () => {
    dispatch({ type: "ADD", product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const buyNow = () =>
    navigate("/checkout", { state: { buyNow: { product, qty } } });

  return (
    <div className="detail">
      <Gallery product={product} />

      <div className="info">
        <h1>{product.name}</h1>

        <p className="price big">
          {unavailable ? "Price coming soon" : `Rs. ${product.price.toLocaleString()}`}
          {product.oldPrice > product.price && (
            <>
              <span className="old">Rs. {product.oldPrice.toLocaleString()}</span>
              <span className="off">{discount}% OFF</span>
            </>
          )}
        </p>

        <p className="label">Quantity</p>
        <QtyStepper value={qty} onChange={setQty} />

        <p className="desc">{product.description}</p>

        <button className="btn-outline" onClick={addToCart} disabled={unavailable}>
          {added ? "Added to cart ✓" : "Add to cart"}
        </button>
        <button className="btn-solid" onClick={buyNow} disabled={unavailable}>
          Buy it now
        </button>

        <p className="note">Cash on Delivery · Delivery in 4-5 working days</p>

        {product.specs?.length > 0 && (
          <table className="specs">
            <tbody>
              {product.specs.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}