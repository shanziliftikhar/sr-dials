import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function Gallery({ product }) {
  const items = product.media?.length
    ? product.media
    : [{ type: "image", src: product.image }];
  const [i, setI] = useState(0);
  const cur = items[i];

  const prev = () => setI((i - 1 + items.length) % items.length);
  const next = () => setI((i + 1) % items.length);

  return (
    <div className="gallery">
      <div className="g-main">
        {cur.type === "video" ? (
          <video key={cur.src} src={cur.src} poster={cur.poster}
                 controls playsInline muted loop autoPlay />
        ) : (
          <img src={cur.src} alt={product.name} />
        )}
        {items.length > 1 && (
          <>
            <button className="g-arrow left" onClick={prev} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button className="g-arrow right" onClick={next} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="g-thumbs">
          {items.map((m, idx) => (
            <button key={idx}
                    className={`g-thumb ${idx === i ? "active" : ""}`}
                    onClick={() => setI(idx)}
                    aria-label={`Show item ${idx + 1}`}>
              <img src={m.type === "video" ? m.poster || product.image : m.src} alt="" />
              {m.type === "video" && <Play size={18} className="g-play" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}