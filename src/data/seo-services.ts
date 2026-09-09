import barberWork from "@/assets/barber-work.jpg";
import heroShop from "@/assets/hero-shop.jpg";

export type SeoService = {
  slug: string;
  name: string;
  shortName: string;
  price: number;
  minutes: number;
  description: string;
  details: string;
  includes: string[];
  image: string;
};

export const seoServices: SeoService[] = [
  {
    slug: "mens-haircut",
    name: "Men's Haircut",
    shortName: "Men's cut",
    price: 700,
    minutes: 60,
    description:
      "A considered men's haircut in Sukhumvit, Bangkok, shaped around your face, texture and everyday style.",
    details:
      "Your visit starts with a consultation, then a precise cut, shampoo and finishing style from a barber who pays attention to how the shape grows out.",
    includes: ["Style consultation", "Precision haircut", "Shampoo", "Finishing style"],
    image: barberWork,
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    shortName: "Skin fade",
    price: 450,
    minutes: 45,
    description:
      "A clean skin fade in Bangkok, blended from skin to length and tailored to your head shape.",
    details:
      "The Kropper signature fade combines detailed clipper work, scissor finishing and matte styling for sharp lines without a harsh grow-out.",
    includes: ["Head-shape consultation", "Skin-to-scissor fade", "Neck clean-up", "Matte styling"],
    image: barberWork,
  },
  {
    slug: "fade-haircut",
    name: "Fade Haircut",
    shortName: "Fade haircut",
    price: 450,
    minutes: 45,
    description:
      "A modern fade haircut with clean transitions, balanced proportions and a finish built for Bangkok life.",
    details:
      "Choose a low, mid or high fade and let the barber refine the top around your natural movement, hairline and preferred styling routine.",
    includes: ["Fade consultation", "Clipper and scissor work", "Neck clean-up", "Product finish"],
    image: heroShop,
  },
  {
    slug: "beard-trim",
    name: "Beard Trim",
    shortName: "Beard trim",
    price: 400,
    minutes: 40,
    description:
      "A precise beard trim and line-up with hot towels for a sharper, more even finish.",
    details:
      "Your beard is shaped to suit your face, with clean cheek and neckline work, conditioning care and a calm straight-razor finish where needed.",
    includes: ["Beard consultation", "Trim and shape", "Razor line-up", "Hot towel finish"],
    image: barberWork,
  },
  {
    slug: "haircut-beard",
    name: "Haircut + Beard",
    shortName: "Hair and beard",
    price: 1100,
    minutes: 90,
    description:
      "A complete haircut and beard grooming service for a polished look from every angle.",
    details:
      "Reset the full look in one chair visit with a tailored haircut, beard sculpt, shampoo and hot towel finish from the Bangkok Kropper team.",
    includes: ["Haircut consultation", "Precision haircut", "Beard sculpt", "Shampoo and hot towel"],
    image: barberWork,
  },
];

export function getSeoService(slug: string) {
  return seoServices.find((service) => service.slug === slug);
}
