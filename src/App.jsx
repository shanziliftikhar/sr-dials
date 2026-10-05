import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BottomNav from "./components/Bottomnavbar";
import Home from "./Home";
import Wishlist from "./Wishlist";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
export default function App() {
  const isHome = useLocation().pathname === "/";
  return (
    <>
      <Navbar />
      {isHome && <Hero />}
      <main className="container">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="*" element={<p>Page not found (no route matched)</p>} />
</Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} SR Dials</footer>
      <BottomNav />
    </>
  );
}