export type OfferAudience = "men" | "women";

export type OfferItem = {
  serviceId: string;
  
  name: string;
  price: number;
};

export type SpecialOffer = {
  id: string;
  audience: OfferAudience;
  name: string;
  items: OfferItem[];
  originalTotal: number;
  dealPrice: number;
  savings: number;
};

export const specialOffers: SpecialOffer[] = [
  {
    id: "fresh-gentleman",
    audience: "men",
    name: "Fresh Gentleman",
    items: [
      { serviceId: "haircut-shampoo", name: "Hair Cut + Shampoo", price: 700 },
      { serviceId: "shave-trim-beard", name: "Shave + Trim + Beard", price: 400 },
    ],
    originalTotal: 1100,
    dealPrice: 1000,
    savings: 100,
  },
  {
    id: "complete-grooming",
    audience: "men",
    name: "Complete Grooming",
    items: [
      { serviceId: "hair-trim-beard-shampoo", name: "Hair + Trim + Beard + Shampoo", price: 1100 },
      { serviceId: "men-facial", name: "Facial Massage for Men", price: 690 },
      { serviceId: "wax-ears-nose", name: "Wax (Ears/Nose)", price: 200 },
    ],
    originalTotal: 1990,
    dealPrice: 1840,
    savings: 150,
  },
  {
    id: "relax-care",
    audience: "men",
    name: "Relax & Care",
    items: [
      { serviceId: "shampoo-spa-set", name: "Shampoo + Spa + Set Hair + Head Massage", price: 390 },
      { serviceId: "men-treatment", name: "Hair Treatment + Spa + Vitamin (Men)", price: 600 },
      { serviceId: "manicure-hands", name: "Manicure - Hands", price: 350 },
    ],
    originalTotal: 1340,
    dealPrice: 1190,
    savings: 150,
  },
  {
    id: "hair-refresh",
    audience: "women",
    name: "Hair Refresh",
    items: [
      { serviceId: "women-hair-cut", name: "Women Hair Cut", price: 690 },
      { serviceId: "shampoo-blow-dry", name: "Shampoo + Blow Dry", price: 450 },
    ],
    originalTotal: 1140,
    dealPrice: 1040,
    savings: 100,
  },
  {
    id: "beauty-care",
    audience: "women",
    name: "Beauty Care",
    items: [
      { serviceId: "hair-spa", name: "Hair Spa S/M/L", price: 600 },
      { serviceId: "women-facial", name: "Facial Massage for Women", price: 600 },
      { serviceId: "brazilian-keratin", name: "Brazilian Keratin", price: 1500 },
    ],
    originalTotal: 2700,
    dealPrice: 2550,
    savings: 150,
  },
];

export const offerDiscount = (serviceCount: number) =>
  serviceCount < 2 ? 0 : serviceCount === 2 ? 100 : 150 + Math.max(0, serviceCount - 3) * 50;
