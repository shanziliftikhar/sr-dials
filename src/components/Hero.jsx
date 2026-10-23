import { useState } from "react";

export default function Hero() {
  const [broken, setBroken] = useState(false);

  return (
    <section className="hero">
      <p className="hero-tag">ELEVATE EVERY MOMENT</p>
      <h1 className="hero-title">SR DIALS</h1>
      {!broken && (
        <img
          className="hero-watch"
          src="/images/hero-watch.png"
          alt="SR Dials featured watch"
          onError={() => setBroken(true)}
        />
      )}
    </section>
  );
}