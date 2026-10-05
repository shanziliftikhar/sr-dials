import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find((p) => String(p.id) === id);

  if (!product)
    return (
      <p>
        Product not found. <Link to="/">Back to shop</Link>
      </p>
    );

  return (
    <div className="detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p className="price">Rs. {product.price.toLocaleString()}</p>
        <p>{product.description}</p>
        <br />
        <button onClick={() => dispatch({ type: "ADD", product })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}