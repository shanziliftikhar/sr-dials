import { Gem } from "lucide-react";

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <div className="divider"><span /><Gem size={20} /><span /></div>
      <p>{subtitle}</p>
    </div>
  );
}
