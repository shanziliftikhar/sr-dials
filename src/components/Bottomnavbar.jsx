import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Heart, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/wishlistcontext";

export default function BottomNav() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { pathname } = useLocation();

  const openSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".nav-right button")?.click();
  };

  return (
    <nav className="bottom-nav">
      <Link to="/#shop" className={pathname === "/" ? "active" : ""}>
        <LayoutGrid size={24} /><span>Shop</span>
      </Link>
      <Link to="/wishlist" className={pathname === "/wishlist" ? "active" : ""}>
        <Heart size={24} /><span>Wishlist</span>
        <b className="badge">{ids.length}</b>
      </Link>
      <Link to="/cart" className={pathname === "/cart" ? "active" : ""}>
        <ShoppingCart size={24} /><span>Cart</span>
        <b className="badge">{count}</b>
      </Link>
      <button onClick={openSearch}>
        <Search size={24} /><span>Search</span>
      </button>
    </nav>
  );
}