import { Link, useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { products } from "./data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <p>Watch not found. <Link to="/">Browse watches</Link></p>;
  }

  return (
    <section className="product-detail">
      <img src={product.image} alt={product.name} />
      <div>
        <p>{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price">Rs. {product.price.toLocaleString()}</p>
        <button onClick={() => dispatch({ type: "ADD", product })}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
