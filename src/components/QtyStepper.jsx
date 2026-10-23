import { Minus, Plus } from "lucide-react";

export default function QtyStepper({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="qty">
      <button type="button" aria-label="Decrease"
              onClick={() => onChange(Math.max(min, value - 1))}>
        <Minus size={16} />
      </button>
      <span>{value}</span>
      <button type="button" aria-label="Increase"
              onClick={() => onChange(Math.min(max, value + 1))}>
        <Plus size={16} />
      </button>
    </div>
  );
}