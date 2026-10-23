import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q)}#shop`);
    setSearching(false);
  };

  return (
    <>
      <header className="nav">
        <button className="icon-btn" onClick={() => setMenu(true)} aria-label="Menu">
          <Menu size={26} />
        </button>

        <Link to="/" className="logo">SR DIALS</Link>

        <div className="nav-right">
          <button className="icon-btn" onClick={() => setSearching(!searching)} aria-label="Search">
            <Search size={24} />
          </button>
          <Link to="/cart" className="icon-btn cart-link" aria-label="Cart">
            <ShoppingCart size={24} />
            <span className="badge">{count}</span>
          </Link>
        </div>
      </header>

      {searching && (
        <form className="search-bar" onSubmit={submit}>
          <input
            autoFocus
            placeholder="Search watches..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button>Search</button>
        </form>
      )}

      {menu && <div className="overlay" onClick={() => setMenu(false)} />}
      <aside className={`drawer ${menu ? "open" : ""}`}>
        <button className="icon-btn close" onClick={() => setMenu(false)}>
          <X size={26} />
        </button>
        <Link to="/" onClick={() => setMenu(false)}>Home</Link>
        <Link to="/#shop" onClick={() => setMenu(false)}>Shop</Link>
        <Link to="/wishlist" onClick={() => setMenu(false)}>Wishlist</Link>
        <Link to="/cart" onClick={() => setMenu(false)}>Cart</Link>
      </aside>
    </>
  );
}