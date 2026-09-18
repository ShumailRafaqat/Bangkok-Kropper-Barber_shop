type AnniversaryPriceProps = {
  price: number;
  className?: string;
  align?: "left" | "right";
  prefix?: string;
};

export const anniversaryPrice = (price: number) => Math.round(price * 0.5);

export function AnniversaryPrice({ price, className = "", align = "right", prefix = "" }: AnniversaryPriceProps) {
  return (
    <span className={`inline-flex flex-col ${align === "left" ? "items-start text-left" : "items-end text-right"} ${className}`}>
      <span className="text-xs text-muted-foreground line-through">{prefix}{price.toLocaleString()} THB</span>
      <span className="font-semibold text-primary">50% OFF · {anniversaryPrice(price).toLocaleString()} THB</span>
    </span>
  );
}
