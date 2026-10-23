import { Link } from "react-router-dom";
import { products } from "./data/products";
import { useWishlist } from "./context/wishlistcontext";
import ProductCard from "./components/ProductCard";

export default function Wishlist() {
  const { ids } = useWishlist();
  const list = products.filter((product) => ids.includes(product.id));

  if (list.length === 0) {
    return <p>Your wishlist is empty. <Link to="/">Browse watches</Link></p>;
  }

  return (
    <>
      <h1>Wishlist</h1>
      <div className="grid">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
