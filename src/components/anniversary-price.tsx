type AnniversaryPriceProps = {
  price: number;
  className?: string;
  align?: "left" | "right";
  prefix?: string;
};



export function AnniversaryPrice({ price, className = "", align = "right", prefix = "" }: AnniversaryPriceProps) {
  return (
    <span className={`inline-flex flex-col ${align === "left" ? "items-start text-left" : "items-end text-right"} ${className}`}>
      <span className="font-semibold text-primary">{prefix}{price.toLocaleString()} THB</span>
    </span>
  );
}
