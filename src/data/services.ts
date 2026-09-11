export type ServiceCategory = "hair" | "beard" | "spa" | "combo";

export type Service = {
  id: string;
  name: string;
  thai: string;
  category: ServiceCategory;
  price: number;
  minutes: number;
  blurb: string;
  includes: string[];
  signature?: boolean;
};

export const categories: { id: ServiceCategory | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "hair", label: "Hair" },
  { id: "beard", label: "Beard & Shave" },
  { id: "spa", label: "Head Spa" },
  { id: "combo", label: "Combos" },
];

export const services: Service[] = [
  {
    id: "kropper-fade",
    name: "Kropper Signature Fade",
    thai: "เฟดสไตล์ครอปเปอร์",
    category: "hair",
    price: 450,
    minutes: 45,
    blurb: "Skin-to-scissor fade built around your head shape, finished with a hot towel and matte styling.",
    includes: ["Consultation", "Clipper + scissor fade", "Hot towel neck shave", "Matte finish styling"],
    signature: true,
  },
  {
    id: "classic-cut",
    name: "Classic Gentleman Cut",
    thai: "ตัดผมสุภาพบุรุษ",
    category: "hair",
    price: 350,
    minutes: 35,
    blurb: "Timeless scissor work, including side parts, crops and pompadours, cut dry for real-world shape.",
    includes: ["Scissor cut", "Neck clean-up", "Blow dry", "Product finish"],
  },
  {
    id: "kids-cut",
    name: "Little Eagle Cut",
    thai: "ตัดผมเด็ก",
    category: "hair",
    price: 250,
    minutes: 25,
    blurb: "Fast, patient and fun cuts for ages 3–12, with a booster seat and a lollipop at the end.",
    includes: ["Kid-friendly clippers", "Booster seat", "Quick wash", "Treat"],
  },
  {
    id: "royal-shave",
    name: "Royal Straight Razor Shave",
    thai: "โกนหนวดมีดโกน",
    category: "beard",
    price: 400,
    minutes: 40,
    blurb: "Three hot towels, pre-shave oil, single-blade glide and a cold aftershave finish.",
    includes: ["Hot towel ritual", "Pre-shave oil", "Straight razor", "Cooling balm"],
    signature: true,
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt & Line-Up",
    thai: "จัดทรงหนวด",
    category: "beard",
    price: 300,
    minutes: 30,
    blurb: "Razor-sharp cheek lines, tapered edges and beard oil worked into the skin.",
    includes: ["Trim & shape", "Razor line-up", "Beard oil", "Comb-out"],
  },
  {
    id: "head-spa",
    name: "Thai Herbal Head Spa",
    thai: "สปาหนังศีรษะสมุนไพร",
    category: "spa",
    price: 550,
    minutes: 50,
    blurb: "Scalp detox with lemongrass and butterfly-pea, plus a 15-minute shoulder and neck massage.",
    includes: ["Scalp scrub", "Herbal steam", "Shoulder massage", "Blow dry"],
  },
  {
    id: "grey-blend",
    name: "Grey Blend & Colour",
    thai: "ย้อมผมปิดผมขาว",
    category: "spa",
    price: 600,
    minutes: 55,
    blurb: "Natural-looking grey coverage or a full tone change with ammonia-free colour.",
    includes: ["Colour match", "Application", "Wash out", "Style"],
  },
  {
    id: "full-service",
    name: "The Bangkok Kropper Full Service",
    thai: "เต็มรูปแบบ",
    category: "combo",
    price: 1100,
    minutes: 90,
    blurb: "Signature fade, royal shave and herbal head spa. Our most-booked package, cold drink included.",
    includes: ["Signature fade", "Royal razor shave", "Herbal head spa", "Cold drink"],
    signature: true,
  },
  {
    id: "cut-beard",
    name: "Cut + Beard Combo",
    thai: "ตัดผม + หนวด",
    category: "combo",
    price: 650,
    minutes: 60,
    blurb: "The weekly reset: fresh cut, sharp beard, hot towel finish.",
    includes: ["Haircut", "Beard sculpt", "Hot towel", "Styling"],
  },
];
