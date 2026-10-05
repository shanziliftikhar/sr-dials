import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import SectionHeading from "./SectionHeading";

export default function Home() {
  const [params] = useSearchParams();
  const location = useLocation();
  const [search, setSearch] = useState(params.get("q") || "");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setSearch(params.get("q") || "");
    if (location.hash === "#shop")
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  // 1) search
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // 2) sort (copy the array first so the original order stays safe)
  const list = [...filtered].sort((a, b) => {
    switch (sort) {
      case "best":
        return (b.sold || 0) - (a.sold || 0);
      case "new":
        return new Date(b.addedAt) - new Date(a.addedAt);
      case "low":
        return a.price - b.price;
      case "high":
        return b.price - a.price;
      default:
        return 0; // "featured" keeps the order in products.js
    }
  });

  return (
    <section id="shop">
      <SectionHeading
        title="Luxury Watch Collections"
        subtitle="Designed for Modern Elegance"
      />

      <div className="filters">
        <input
          placeholder="Search watches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="best">Best Selling</option>
          <option value="new">New Arrivals</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {list.length === 0 && <p>No watches found.</p>}

      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}