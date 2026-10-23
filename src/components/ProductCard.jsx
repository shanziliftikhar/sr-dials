import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/wishlistcontext";

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const { ids, toggle } = useWishlist();
  const liked = ids.includes(product.id);
  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="card">
      <button className="heart" onClick={() => toggle(product.id)} aria-label="Wishlist">
        <Heart size={20} fill={liked ? "#c9a24b" : "none"} color={liked ? "#c9a24b" : "#111"} />
      </button>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p className="price">
        Rs. {product.price.toLocaleString()}
        {discount > 0 && (
          <>
            <span className="old">Rs. {product.oldPrice.toLocaleString()}</span>
            <span className="off">{discount}% OFF</span>
          </>
        )}
      </p>
      <button onClick={() => dispatch({ type: "ADD", product })}>Add to Cart</button>
    </div>
  );
}