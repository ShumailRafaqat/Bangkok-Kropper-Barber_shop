import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Banknote,
  Calendar as CalendarIcon,
  Check,
  Clock,
  FileText,
  HelpCircle,
  Lightbulb,
  Loader2,
  MapPin,
  MessageCircle,
  Scissors,
  Send,
  Sparkles,
  User,
  Wind,
  X,
} from "lucide-react";
import { offerDiscount, specialOffers, type SpecialOffer } from "@/data/offers";
import { useI18n } from "@/lib/i18n";
import { getServiceDescription, getServiceName } from "@/data/service-translations";

export const WHATSAPP_NUMBER = "66929050509";
export const LINE_ACCOUNT_ID = "shu0865";
export const LINE_CHAT_DEEP_LINK = `line://ti/p/~${LINE_ACCOUNT_ID}`;

type Svc = {
  id: string;
  name: string;
  price: number;
  minutes: number;
  desc: string;
  Icon: typeof Scissors;
};

const bookableServices: Svc[] = [
  {
    id: "haircut-shampoo",
    name: "Haircut + Shampoo",
    price: 700,
    minutes: 60,
    desc: "A complete cut, wash and finishing service.",
    Icon: Scissors,
  },
  {
    id: "shave-trim-beard",
    name: "Shave + Trim + Beard",
    price: 400,
    minutes: 40,
    desc: "Clean lines and a precise beard finish.",
    Icon: Wind,
  },
  {
    id: "hair-trim-beard-shampoo",
    name: "Hair + Trim + Beard + Shampoo",
    price: 1100,
    minutes: 90,
    desc: "The full chair ritual with cut, beard and shampoo.",
    Icon: Sparkles,
  },
  {
    id: "kids-hair-cut",
    name: "Kids' Haircut",
    price: 500,
    minutes: 25,
    desc: "Patient cuts for ages 3–12, booster seat included.",
    Icon: Baby,
  },
  {
    id: "shampoo-spa-set",
    name: "Shampoo + Spa + Set Hair + Head Massage",
    price: 390,
    minutes: 45,
    desc: "Wash, scalp care, styling and a relaxing head massage.",
    Icon: Sparkles,
  },
  {
    id: "men-hair-color",
    name: "Hair Color (Black/Brown)",
    price: 1200,
    minutes: 90,
    desc: "Natural black or brown color with a tailored consultation.",
    Icon: Sparkles,
  },
  {
    id: "beard-color",
    name: "Beard Color (Black/Brown)",
    price: 500,
    minutes: 45,
    desc: "Natural-looking beard color for an even, sharp finish.",
    Icon: Wind,
  },
  {
    id: "fashion-color-men",
    name: "Hair Color (Fashion)",
    price: 2500,
    minutes: 180,
    desc: "Fashion color starting from 2,500 THB; final price varies.",
    Icon: Sparkles,
  },
  {
    id: "men-treatment",
    name: "Hair Treatment + Spa + Vitamin (Men)",
    price: 600,
    minutes: 60,
    desc: "Nourishing hair and scalp treatment with vitamin care.",
    Icon: Sparkles,
  },
  {
    id: "wax-ears-nose",
    name: "Wax (Ears/Nose)",
    price: 200,
    minutes: 20,
    desc: "A precise grooming finish for ears and nose.",
    Icon: Scissors,
  },
  {
    id: "men-facial",
    name: "Facial Massage for Men",
    price: 690,
    minutes: 45,
    desc: "Refreshing facial massage to release tension and reset skin.",
    Icon: Sparkles,
  },
  {
    id: "manicure-hands",
    name: "Manicure - Hands",
    price: 350,
    minutes: 45,
    desc: "Clean, cared-for hands or feet with a precise finish.",
    Icon: Sparkles,
  },
  {
    id: "pedicure-feet",
    name: "Pedicure - Feet",
    price: 350,
    minutes: 45,
    desc: "Clean, cared-for feet with a precise finish.",
    Icon: Sparkles,
  },
  {
    id: "women-hair-cut",
    name: "Women's Haircut",
    price: 690,
    minutes: 60,
    desc: "A considered cut shaped around your texture and everyday style.",
    Icon: Scissors,
  },
  {
    id: "shampoo-blow-dry",
    name: "Shampoo + Blow Dry",
    price: 450,
    minutes: 45,
    desc: "Fresh wash and polished blow dry starting from 450 THB.",
    Icon: Wind,
  },
  {
    id: "hair-color-women",
    name: "Women's Hair Color",
    price: 2000,
    minutes: 120,
    desc: "Women’s hair color starting from 2,000 THB; final price varies.",
    Icon: Sparkles,
  },
  {
    id: "hair-spa",
    name: "Hair Spa S, M, L",
    price: 600,
    minutes: 60,
    desc: "Hair spa starting from 600 THB depending on size and length.",
    Icon: Sparkles,
  },
  {
    id: "volume-perm",
    name: "Volume Perm",
    price: 2500,
    minutes: 180,
    desc: "Soft, lasting volume starting from 2,500 THB.",
    Icon: Sparkles,
  },
  {
    id: "straightening",
    name: "Permanent Hair Straightening",
    price: 2500,
    minutes: 180,
    desc: "Smooth, polished finish starting from 2,500 THB.",
    Icon: Sparkles,
  },
  {
    id: "color-highlight",
    name: "Hair Highlights / Color Highlights",
    price: 2500,
    minutes: 150,
    desc: "Dimensional highlights starting from 2,500 THB.",
    Icon: Sparkles,
  },
  {
    id: "keratin-hair-treatment",
    name: "Keratin Hair Treatment",
    price: 500,
    minutes: 90,
    desc: "Keratin treatment starting from 500 THB.",
    Icon: Sparkles,
  },
  {
    id: "women-facial",
    name: "Facial Massage for Women",
    price: 600,
    minutes: 45,
    desc: "A calming facial massage for refreshed skin.",
    Icon: Sparkles,
  },
  {
    id: "brazilian-keratin",
    name: "Brazilian Keratin",
    price: 1500,
    minutes: 150,
    desc: "Smoothing care starting from 1,500 THB.",
    Icon: Sparkles,
  },
];

function buildTimeSlots() {
  return Array.from({ length: 40 }, (_, index) => {
    const totalMinutes = (9 * 60 + index * 30) % (24 * 60);
    const hour = Math.floor(totalMinutes / 60);
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  });
}

const timeSlots = buildTimeSlots();

const steps = ["Service", "Date", "Time", "Details", "Confirm"] as const;
const serviceFilters = ["All", "Men", "Women", "Kids", "Grooming", "Treatments", "Color"] as const;

function serviceCategory(id: string) {
  if (["kids-hair-cut"].includes(id)) return "Kids";
  if (["men-hair-color", "fashion-color-men", "hair-color-women", "color-highlight", "keratin-hair-treatment", "brazilian-keratin"].includes(id)) return "Color";
  if (["women-hair-cut", "shampoo-blow-dry", "hair-spa", "volume-perm", "straightening", "women-facial"].includes(id)) return "Women";
  if (["shampoo-spa-set", "men-treatment", "men-facial", "hair-spa", "keratin-hair-treatment", "women-facial", "brazilian-keratin"].includes(id)) return "Treatments";
  if (["shave-trim-beard", "beard-color", "wax-ears-nose", "manicure-hands", "pedicure-feet", "hair-trim-beard-shampoo"].includes(id)) return "Grooming";
  return "Men";
}

function localizedCategory(id: string, language: "en" | "th") {
  const category = serviceCategory(id);
  if (language === "en") return category;
  return {
    Men: "ผู้ชาย",
    Women: "ผู้หญิง",
    Kids: "เด็ก",
    Grooming: "กรูมมิ่ง",
    Treatments: "ทรีตเมนต์",
    Color: "ทำสี",
  }[category] ?? category;
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function prettyDate(iso: string, language: "en" | "th" = "en") {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y!, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString(language === "th" ? "th-TH" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "United States (+1)" },
  { code: "+7", flag: "🇷🇺", label: "Russia (+7)" },
  { code: "+20", flag: "🇪🇬", label: "Egypt (+20)" },
  { code: "+27", flag: "🇿🇦", label: "South Africa (+27)" },
  { code: "+30", flag: "🇬🇷", label: "Greece (+30)" },
  { code: "+31", flag: "🇳🇱", label: "Netherlands (+31)" },
  { code: "+32", flag: "🇧🇪", label: "Belgium (+32)" },
  { code: "+33", flag: "🇫🇷", label: "France (+33)" },
  { code: "+34", flag: "🇪🇸", label: "Spain (+34)" },
  { code: "+36", flag: "🇭🇺", label: "Hungary (+36)" },
  { code: "+39", flag: "🇮🇹", label: "Italy (+39)" },
  { code: "+41", flag: "🇨🇭", label: "Switzerland (+41)" },
  { code: "+43", flag: "🇦🇹", label: "Austria (+43)" },
  { code: "+44", flag: "🇬🇧", label: "United Kingdom (+44)" },
  { code: "+45", flag: "🇩🇰", label: "Denmark (+45)" },
  { code: "+46", flag: "🇸🇪", label: "Sweden (+46)" },
  { code: "+47", flag: "🇳🇴", label: "Norway (+47)" },
  { code: "+48", flag: "🇵🇱", label: "Poland (+48)" },
  { code: "+49", flag: "🇩🇪", label: "Germany (+49)" },
  { code: "+51", flag: "🇵🇪", label: "Peru (+51)" },
  { code: "+52", flag: "🇲🇽", label: "Mexico (+52)" },
  { code: "+53", flag: "🇨🇺", label: "Cuba (+53)" },
  { code: "+54", flag: "🇦🇷", label: "Argentina (+54)" },
  { code: "+55", flag: "🇧🇷", label: "Brazil (+55)" },
  { code: "+56", flag: "🇨🇱", label: "Chile (+56)" },
  { code: "+57", flag: "🇨🇴", label: "Colombia (+57)" },
  { code: "+58", flag: "🇻🇪", label: "Venezuela (+58)" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia (+60)" },
  { code: "+61", flag: "🇦🇺", label: "Australia (+61)" },
  { code: "+62", flag: "🇮🇩", label: "Indonesia (+62)" },
  { code: "+63", flag: "🇵🇭", label: "Philippines (+63)" },
  { code: "+64", flag: "🇳🇿", label: "New Zealand (+64)" },
  { code: "+65", flag: "🇸🇬", label: "Singapore (+65)" },
  { code: "+66", flag: "🇹🇭", label: "Thailand (+66)" },
  { code: "+81", flag: "🇯🇵", label: "Japan (+81)" },
  { code: "+82", flag: "🇰🇷", label: "South Korea (+82)" },
  { code: "+84", flag: "🇻🇳", label: "Vietnam (+84)" },
  { code: "+86", flag: "🇨🇳", label: "China (+86)" },
  { code: "+90", flag: "🇹🇷", label: "Turkey (+90)" },
  { code: "+91", flag: "🇮🇳", label: "India (+91)" },
  { code: "+92", flag: "🇵🇰", label: "Pakistan (+92)" },
  { code: "+94", flag: "🇱🇰", label: "Sri Lanka (+94)" },
  { code: "+95", flag: "🇲🇲", label: "Myanmar (+95)" },
  { code: "+98", flag: "🇮🇷", label: "Iran (+98)" },
  { code: "+211", flag: "🇸🇸", label: "South Sudan (+211)" },
  { code: "+212", flag: "🇲🇦", label: "Morocco (+212)" },
  { code: "+213", flag: "🇩🇿", label: "Algeria (+213)" },
  { code: "+216", flag: "🇹🇳", label: "Tunisia (+216)" },
  { code: "+218", flag: "🇱🇾", label: "Libya (+218)" },
  { code: "+220", flag: "🇬🇲", label: "Gambia (+220)" },
  { code: "+221", flag: "🇸🇳", label: "Senegal (+221)" },
  { code: "+222", flag: "🇲🇷", label: "Mauritania (+222)" },
  { code: "+223", flag: "🇲🇱", label: "Mali (+223)" },
  { code: "+224", flag: "🇬🇳", label: "Guinea (+224)" },
  { code: "+225", flag: "🇨🇮", label: "Ivory Coast (+225)" },
  { code: "+226", flag: "🇧🇫", label: "Burkina Faso (+226)" },
  { code: "+227", flag: "🇳🇪", label: "Niger (+227)" },
  { code: "+228", flag: "🇹🇬", label: "Togo (+228)" },
  { code: "+229", flag: "🇧🇯", label: "Benin (+229)" },
  { code: "+230", flag: "🇲🇺", label: "Mauritius (+230)" },
  { code: "+231", flag: "🇱🇷", label: "Liberia (+231)" },
  { code: "+232", flag: "🇸🇱", label: "Sierra Leone (+232)" },
  { code: "+233", flag: "🇬🇭", label: "Ghana (+233)" },
  { code: "+234", flag: "🇳🇬", label: "Nigeria (+234)" },
  { code: "+235", flag: "🇹🇩", label: "Chad (+235)" },
  { code: "+236", flag: "🇨🇫", label: "Central African Republic (+236)" },
  { code: "+237", flag: "🇨🇲", label: "Cameroon (+237)" },
  { code: "+238", flag: "🇨🇻", label: "Cape Verde (+238)" },
  { code: "+239", flag: "🇸🇹", label: "Sao Tome and Principe (+239)" },
  { code: "+240", flag: "🇬🇶", label: "Equatorial Guinea (+240)" },
  { code: "+241", flag: "🇬🇦", label: "Gabon (+241)" },
  { code: "+242", flag: "🇨🇬", label: "Congo (+242)" },
  { code: "+243", flag: "🇨🇩", label: "DR Congo (+243)" },
  { code: "+244", flag: "🇦🇴", label: "Angola (+244)" },
  { code: "+245", flag: "🇬🇼", label: "Guinea-Bissau (+245)" },
  { code: "+248", flag: "🇸🇨", label: "Seychelles (+248)" },
  { code: "+249", flag: "🇸🇩", label: "Sudan (+249)" },
  { code: "+250", flag: "🇷🇼", label: "Rwanda (+250)" },
  { code: "+251", flag: "🇪🇹", label: "Ethiopia (+251)" },
  { code: "+252", flag: "🇸🇴", label: "Somalia (+252)" },
  { code: "+253", flag: "🇩🇯", label: "Djibouti (+253)" },
  { code: "+254", flag: "🇰🇪", label: "Kenya (+254)" },
  { code: "+255", flag: "🇹🇿", label: "Tanzania (+255)" },
  { code: "+256", flag: "🇺🇬", label: "Uganda (+256)" },
  { code: "+257", flag: "🇧🇮", label: "Burundi (+257)" },
  { code: "+258", flag: "🇲🇿", label: "Mozambique (+258)" },
  { code: "+260", flag: "🇿🇲", label: "Zambia (+260)" },
  { code: "+261", flag: "🇲🇬", label: "Madagascar (+261)" },
  { code: "+263", flag: "🇿🇼", label: "Zimbabwe (+263)" },
  { code: "+264", flag: "🇳🇦", label: "Namibia (+264)" },
  { code: "+265", flag: "🇲🇼", label: "Malawi (+265)" },
  { code: "+266", flag: "🇱🇸", label: "Lesotho (+266)" },
  { code: "+267", flag: "🇧🇼", label: "Botswana (+267)" },
  { code: "+268", flag: "🇸🇿", label: "Eswatini (+268)" },
  { code: "+269", flag: "🇰🇲", label: "Comoros (+269)" },
  { code: "+291", flag: "🇪🇷", label: "Eritrea (+291)" },
  { code: "+297", flag: "🇦🇼", label: "Aruba (+297)" },
  { code: "+298", flag: "🇫🇴", label: "Faroe Islands (+298)" },
  { code: "+299", flag: "🇬🇱", label: "Greenland (+299)" },
  { code: "+351", flag: "🇵🇹", label: "Portugal (+351)" },
  { code: "+352", flag: "🇱🇺", label: "Luxembourg (+352)" },
  { code: "+353", flag: "🇮🇪", label: "Ireland (+353)" },
  { code: "+354", flag: "🇮🇸", label: "Iceland (+354)" },
  { code: "+355", flag: "🇦🇱", label: "Albania (+355)" },
  { code: "+356", flag: "🇲🇹", label: "Malta (+356)" },
  { code: "+357", flag: "🇨🇾", label: "Cyprus (+357)" },
  { code: "+358", flag: "🇫🇮", label: "Finland (+358)" },
  { code: "+370", flag: "🇱🇹", label: "Lithuania (+370)" },
  { code: "+371", flag: "🇱🇻", label: "Latvia (+371)" },
  { code: "+372", flag: "🇪🇪", label: "Estonia (+372)" },
  { code: "+373", flag: "🇲🇩", label: "Moldova (+373)" },
  { code: "+374", flag: "🇦🇲", label: "Armenia (+374)" },
  { code: "+375", flag: "🇧🇾", label: "Belarus (+375)" },
  { code: "+376", flag: "🇦🇩", label: "Andorra (+376)" },
  { code: "+377", flag: "🇲🇨", label: "Monaco (+377)" },
  { code: "+378", flag: "🇸🇲", label: "San Marino (+378)" },
  { code: "+380", flag: "🇺🇦", label: "Ukraine (+380)" },
  { code: "+381", flag: "🇷🇸", label: "Serbia (+381)" },
  { code: "+382", flag: "🇲🇪", label: "Montenegro (+382)" },
  { code: "+385", flag: "🇭🇷", label: "Croatia (+385)" },
  { code: "+386", flag: "🇸🇮", label: "Slovenia (+386)" },
  { code: "+387", flag: "🇧🇦", label: "Bosnia and Herzegovina (+387)" },
  { code: "+389", flag: "🇲🇰", label: "North Macedonia (+389)" },
  { code: "+420", flag: "🇨🇿", label: "Czech Republic (+420)" },
  { code: "+421", flag: "🇸🇰", label: "Slovakia (+421)" },
  { code: "+423", flag: "🇱🇮", label: "Liechtenstein (+423)" },
  { code: "+500", flag: "🇫🇰", label: "Falkland Islands (+500)" },
  { code: "+501", flag: "🇧🇿", label: "Belize (+501)" },
  { code: "+502", flag: "🇬🇹", label: "Guatemala (+502)" },
  { code: "+503", flag: "🇸🇻", label: "El Salvador (+503)" },
  { code: "+504", flag: "🇭🇳", label: "Honduras (+504)" },
  { code: "+505", flag: "🇳🇮", label: "Nicaragua (+505)" },
  { code: "+506", flag: "🇨🇷", label: "Costa Rica (+506)" },
  { code: "+507", flag: "🇵🇦", label: "Panama (+507)" },
  { code: "+509", flag: "🇭🇹", label: "Haiti (+509)" },
  { code: "+590", flag: "🇬🇵", label: "Guadeloupe (+590)" },
  { code: "+591", flag: "🇧🇴", label: "Bolivia (+591)" },
  { code: "+592", flag: "🇬🇾", label: "Guyana (+592)" },
  { code: "+593", flag: "🇪🇨", label: "Ecuador (+593)" },
  { code: "+594", flag: "🇬🇫", label: "French Guiana (+594)" },
  { code: "+595", flag: "🇵🇾", label: "Paraguay (+595)" },
  { code: "+596", flag: "🇲🇶", label: "Martinique (+596)" },
  { code: "+597", flag: "🇸🇷", label: "Suriname (+597)" },
  { code: "+598", flag: "🇺🇾", label: "Uruguay (+598)" },
  { code: "+599", flag: "🇧🇶", label: "Caribbean Netherlands (+599)" },
  { code: "+670", flag: "🇹🇱", label: "Timor-Leste (+670)" },
  { code: "+672", flag: "🇦🇨", label: "Antarctica (+672)" },
  { code: "+675", flag: "🇵🇬", label: "Papua New Guinea (+675)" },
  { code: "+676", flag: "🇹🇴", label: "Tonga (+676)" },
  { code: "+677", flag: "🇸🇧", label: "Solomon Islands (+677)" },
  { code: "+678", flag: "🇻🇺", label: "Vanuatu (+678)" },
  { code: "+679", flag: "🇫🇯", label: "Fiji (+679)" },
  { code: "+680", flag: "🇵🇼", label: "Palau (+680)" },
  { code: "+681", flag: "🇼🇫", label: "Wallis and Futuna (+681)" },
  { code: "+682", flag: "🇨🇰", label: "Cook Islands (+682)" },
  { code: "+683", flag: "🇳🇺", label: "Niue (+683)" },
  { code: "+685", flag: "🇼🇸", label: "Samoa (+685)" },
  { code: "+686", flag: "🇰🇮", label: "Kiribati (+686)" },
  { code: "+687", flag: "🇳🇨", label: "New Caledonia (+687)" },
  { code: "+688", flag: "🇹🇻", label: "Tuvalu (+688)" },
  { code: "+689", flag: "🇵🇫", label: "French Polynesia (+689)" },
  { code: "+690", flag: "🇹🇰", label: "Tokelau (+690)" },
  { code: "+691", flag: "🇫🇲", label: "Micronesia (+691)" },
  { code: "+692", flag: "🇲🇭", label: "Marshall Islands (+692)" },
  { code: "+850", flag: "🇰🇵", label: "North Korea (+850)" },
  { code: "+852", flag: "🇭🇰", label: "Hong Kong (+852)" },
  { code: "+853", flag: "🇲🇴", label: "Macau (+853)" },
  { code: "+886", flag: "🇹🇼", label: "Taiwan (+886)" },
  { code: "+960", flag: "🇲🇻", label: "Maldives (+960)" },
  { code: "+961", flag: "🇱🇧", label: "Lebanon (+961)" },
  { code: "+962", flag: "🇯🇴", label: "Jordan (+962)" },
  { code: "+963", flag: "🇸🇾", label: "Syria (+963)" },
  { code: "+964", flag: "🇮🇶", label: "Iraq (+964)" },
  { code: "+965", flag: "🇰🇼", label: "Kuwait (+965)" },
  { code: "+966", flag: "🇸🇦", label: "Saudi Arabia (+966)" },
  { code: "+967", flag: "🇾🇪", label: "Yemen (+967)" },
  { code: "+968", flag: "🇴🇲", label: "Oman (+968)" },
  { code: "+971", flag: "🇦🇪", label: "United Arab Emirates (+971)" },
  { code: "+972", flag: "🇮🇱", label: "Israel (+972)" },
  { code: "+973", flag: "🇧🇭", label: "Bahrain (+973)" },
  { code: "+974", flag: "🇶🇦", label: "Qatar (+974)" },
  { code: "+975", flag: "🇧🇹", label: "Bhutan (+975)" },
  { code: "+976", flag: "🇲🇳", label: "Mongolia (+976)" },
  { code: "+977", flag: "🇳🇵", label: "Nepal (+977)" },
  { code: "+992", flag: "🇹🇯", label: "Tajikistan (+992)" },
  { code: "+993", flag: "🇹🇲", label: "Turkmenistan (+993)" },
  { code: "+994", flag: "🇦🇿", label: "Azerbaijan (+994)" },
  { code: "+995", flag: "🇬🇪", label: "Georgia (+995)" },
  { code: "+996", flag: "🇰🇬", label: "Kyrgyzstan (+996)" },
  { code: "+998", flag: "🇺🇿", label: "Uzbekistan (+998)" },
  { code: "+1242", flag: "🇧🇸", label: "Bahamas (+1242)" },
  { code: "+1246", flag: "🇧🇧", label: "Barbados (+1246)" },
  { code: "+1264", flag: "🇦🇮", label: "Anguilla (+1264)" },
  { code: "+1268", flag: "🇦🇬", label: "Antigua and Barbuda (+1268)" },
  { code: "+1284", flag: "🇻🇬", label: "British Virgin Islands (+1284)" },
  { code: "+1340", flag: "🇻🇮", label: "U.S. Virgin Islands (+1340)" },
  { code: "+1345", flag: "🇰🇾", label: "Cayman Islands (+1345)" },
  { code: "+1441", flag: "🇧🇲", label: "Bermuda (+1441)" },
  { code: "+1473", flag: "🇬🇩", label: "Grenada (+1473)" },
  { code: "+1649", flag: "🇹🇨", label: "Turks and Caicos Islands (+1649)" },
  { code: "+1664", flag: "🇲🇸", label: "Montserrat (+1664)" },
  { code: "+1670", flag: "🇲🇵", label: "Northern Mariana Islands (+1670)" },
  { code: "+1671", flag: "🇬🇺", label: "Guam (+1671)" },
  { code: "+1684", flag: "🇦🇸", label: "American Samoa (+1684)" },
  { code: "+1758", flag: "🇱🇨", label: "Saint Lucia (+1758)" },
  { code: "+1767", flag: "🇩🇲", label: "Dominica (+1767)" },
  { code: "+1784", flag: "🇻🇨", label: "Saint Vincent and the Grenadines (+1784)" },
  { code: "+1787", flag: "🇵🇷", label: "Puerto Rico (+1787)" },
  { code: "+1868", flag: "🇹🇹", label: "Trinidad and Tobago (+1868)" },
  { code: "+1869", flag: "🇰🇳", label: "Saint Kitts and Nevis (+1869)" },
  { code: "+1876", flag: "🇯🇲", label: "Jamaica (+1876)" },
] as const;

const COUNTRY_PHONE_LIMITS: Record<string, number> = {
  "+1": 10,
  "+7": 10,
  "+20": 9,
  "+27": 9,
  "+30": 10,
  "+31": 9,
  "+32": 9,
  "+33": 9,
  "+34": 9,
  "+36": 9,
  "+39": 9,
  "+41": 9,
  "+43": 10,
  "+44": 10,
  "+45": 8,
  "+46": 9,
  "+47": 8,
  "+48": 9,
  "+49": 11,
  "+51": 9,
  "+52": 10,
  "+54": 10,
  "+55": 11,
  "+56": 9,
  "+57": 10,
  "+60": 9,
  "+61": 9,
  "+62": 11,
  "+63": 10,
  "+64": 9,
  "+65": 8,
  "+66": 9,
  "+81": 10,
  "+82": 10,
  "+84": 9,
  "+86": 11,
  "+90": 10,
  "+91": 10,
  "+92": 10,
  "+94": 9,
  "+95": 9,
  "+98": 10,
  "+211": 9,
  "+212": 9,
  "+213": 9,
  "+216": 8,
  "+218": 9,
  "+220": 7,
  "+221": 9,
  "+223": 8,
  "+224": 8,
  "+225": 8,
  "+226": 8,
  "+227": 8,
  "+228": 8,
  "+229": 8,
  "+230": 8,
  "+231": 7,
  "+232": 8,
  "+233": 9,
  "+234": 10,
  "+236": 8,
  "+237": 9,
  "+238": 8,
  "+245": 7,
  "+250": 9,
  "+251": 9,
  "+254": 9,
  "+255": 9,
  "+256": 9,
  "+257": 8,
  "+260": 9,
  "+261": 9,
  "+263": 9,
  "+264": 9,
  "+265": 8,
  "+266": 8,
  "+267": 8,
  "+268": 7,
  "+291": 7,
  "+351": 9,
  "+352": 6,
  "+353": 9,
  "+354": 7,
  "+355": 9,
  "+356": 8,
  "+357": 8,
  "+358": 11,
  "+370": 8,
  "+371": 8,
  "+372": 7,
  "+373": 8,
  "+374": 8,
  "+375": 9,
  "+376": 6,
  "+380": 9,
  "+381": 9,
  "+385": 9,
  "+386": 8,
  "+420": 9,
  "+421": 9,
  "+500": 5,
  "+501": 7,
  "+502": 8,
  "+503": 8,
  "+504": 8,
  "+505": 8,
  "+506": 8,
  "+507": 8,
  "+509": 8,
  "+591": 8,
  "+593": 9,
  "+595": 9,
  "+598": 8,
  "+670": 7,
  "+675": 8,
  "+676": 7,
  "+677": 5,
  "+678": 5,
  "+679": 7,
  "+680": 7,
  "+685": 7,
  "+686": 8,
  "+687": 6,
  "+688": 5,
  "+689": 6,
  "+691": 7,
  "+692": 7,
  "+850": 9,
  "+852": 8,
  "+853": 8,
  "+886": 9,
  "+960": 7,
  "+961": 8,
  "+962": 9,
  "+963": 9,
  "+964": 10,
  "+965": 8,
  "+966": 9,
  "+967": 9,
  "+968": 8,
  "+971": 9,
  "+972": 9,
  "+973": 8,
  "+974": 8,
  "+975": 8,
  "+976": 8,
  "+977": 10,
  "+992": 9,
  "+993": 8,
  "+994": 9,
  "+995": 9,
  "+996": 9,
  "+998": 9,
  "+1242": 10,
  "+1246": 10,
  "+1264": 7,
  "+1284": 7,
  "+1345": 10,
  "+1441": 10,
  "+1473": 10,
  "+1649": 10,
  "+1664": 10,
  "+1670": 10,
  "+1671": 10,
  "+1684": 10,
  "+1758": 7,
  "+1767": 7,
  "+1784": 7,
  "+1787": 10,
  "+1868": 10,
  "+1869": 10,
  "+1876": 10,
};

const COUNTRY_PHONE_GROUPS: Record<string, number[]> = {
  "+1": [3, 3, 4],
  "+44": [4, 6],
  "+49": [3, 3, 3, 2],
  "+61": [2, 4, 3],
  "+65": [4, 4],
  "+66": [3, 3, 3],
  "+81": [4, 2, 4],
  "+91": [5, 5],
  "+92": [4, 6],
  "+971": [3, 3, 3],
  "+966": [3, 3, 3],
};

function getPhoneMaxLength(code: string) {
  return code.length + 1 + (COUNTRY_PHONE_LIMITS[code] ?? 12);
}

function groupPhoneDigits(value: string, code: string) {
  const groups = COUNTRY_PHONE_GROUPS[code];
  if (groups) {
    const chunks: string[] = [];
    let remaining = value;

    for (let i = 0; i < groups.length && remaining.length > 0; i += 1) {
      const size = groups[i]!;
      if (i === groups.length - 1 || remaining.length <= size) {
        chunks.push(remaining);
        remaining = "";
        break;
      }
      chunks.push(remaining.slice(0, size));
      remaining = remaining.slice(size);
    }

    if (remaining) {
      chunks.push(remaining);
    }

    return chunks.join(" ");
  }

  if (value.length <= 4) {
    return value;
  }

  const chunks: string[] = [];
  for (let i = 0; i < value.length; i += 3) {
    chunks.push(value.slice(i, i + 3));
  }
  return chunks.join(" ");
}

function formatPhoneValue(rawValue: string, code: string) {
  const digits = rawValue.replace(/\D/g, "");
  const codeDigits = code.replace(/\D/g, "");
  const withoutCode = digits.startsWith(codeDigits) ? digits.slice(codeDigits.length) : digits;
  const compact = withoutCode.slice(0, COUNTRY_PHONE_LIMITS[code] ?? 12).replace(/\D/g, "");

  if (!compact) {
    return code;
  }

  return `${code} ${groupPhoneDigits(compact, code)}`.trim();
}

function buildDays(count: number) {
  const out: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

type BookingFlowProps = {
  initialPrompt?: "channel" | "none";
};

export function BookingFlow({ initialPrompt = "none" }: BookingFlowProps) {
  const { language, t } = useI18n();
  const localizedSteps = language === "th" ? ["บริการ", "วันที่", "เวลา", "รายละเอียด", "ยืนยัน"] : steps;
  const days = useMemo(() => buildDays(21), []);
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Svc | null>(null);
  const [selectedServices, setSelectedServices] = useState<Svc[]>([]);
  const [matchedOffer, setMatchedOffer] = useState<SpecialOffer | null>(null);
  const [showDealNotice, setShowDealNotice] = useState(false);
  const [bookingStarted, setBookingStarted] = useState(false);
  const [showBookingOptions, setShowBookingOptions] = useState(initialPrompt === "channel");
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "line" | null>(null);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState<string>(COUNTRY_CODES[0]!.code);
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const selectedCountry = COUNTRY_CODES.find((item) => item.code === countryCode) ?? COUNTRY_CODES[0]!;
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [serviceFilter, setServiceFilter] = useState<(typeof serviceFilters)[number]>("All");
  const channelLabel = (method: "whatsapp" | "line") => (method === "line" ? "LINE" : "WhatsApp");
  const currentChannel = contactMethod ?? "whatsapp";
  const isLineChannel = currentChannel === "line";
  const selectChannel = (method: "whatsapp" | "line") => {
    setBookingStarted(true);
    setContactMethod(method);
    setError(null);
    if (method === "line") {
      setPhone("");
    } else {
      setLineId("");
    }
    setShowBookingOptions(false);
  };
  useEffect(() => {
    if (initialPrompt === "channel" && !contactMethod) setShowBookingOptions(true);
  }, [initialPrompt, contactMethod]);
  useEffect(() => {
    const offer = specialOffers.find(
      (item) => item.id === new URLSearchParams(window.location.search).get("deal"),
    );
    if (!offer || selectedServices.length > 0) return;
    const bundled = offer.items.map((item) => ({
      id: item.serviceId,
      name: getServiceName(language, item.serviceId, item.name),
      price: item.price,
      minutes: 45,
      desc: "Selected as part of your special offer.",
      Icon: Scissors,
    }));
    setSelectedServices(bundled);
    setService(bundled[0] ?? null);
    setMatchedOffer(offer);
    setStep(1);
  }, [language, selectedServices.length]);

  const visibleServices = bookableServices.filter(
    (item) => serviceFilter === "All" || serviceCategory(item.id) === serviceFilter,
  );

  useEffect(() => {
    if (!showDealNotice || !matchedOffer || !("speechSynthesis" in window)) return;
    const announcement = new SpeechSynthesisUtterance(
      `Congratulations! You unlocked the ${matchedOffer.name} deal and saved ${matchedOffer.savings} Thai baht.`,
    );
    announcement.lang = "en-US";
    announcement.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(announcement);
    return () => window.speechSynthesis.cancel();
  }, [showDealNotice, matchedOffer]);

  const canNext =
    (step === 0 && selectedServices.length > 0) ||
    (step === 1 && date) ||
    (step === 2 && time) ||
    (step === 3 && location && name.trim().length > 1 && (contactMethod === "line" ? lineId.trim().length > 1 : phone.replace(/\D/g, "").length >= 8)) ||
    step === 4;

  const next = () => {
    if (!canNext) {
      setError(
        step === 0
          ? "Pick a service to continue."
          : step === 1
            ? "Choose a date to continue."
            : step === 2
              ? "Choose a time slot to continue."
              : "Add your name, location, and contact details to continue.",
      );
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const message = () =>
    [
      "💈 NEW WEBSITE BOOKING",
      "",
      "Hello Bangkok Barber Shop! I'd like to request an appointment.",
      "",
      `👤 Name: ${name.trim()}`,
      `📍 Location: ${location}`,
      ...(contactMethod === "line" ? [`🟢 LINE ID: ${lineId.trim()}`] : [`📱 WhatsApp: ${phone.trim()}`]),
      `✂️ Services: ${(selectedServices.length ? selectedServices : service ? [service] : []).map((item) => item.name).join(", ")}`,
      `📅 Date: ${date ? prettyDate(date, language) : ""}`,
      `🕐 Time: ${time}`,
      ...(matchedOffer
        ? [`🎁 Deal: ${matchedOffer.name}`, `💰 Deal saving: ${matchedOffer.savings} THB`, `✅ Deal total: ${matchedOffer.dealPrice} THB`]
        : []),
      ...(note.trim() ? [`📝 Special Request: ${note.trim()}`] : []),
      "",
      "🌐 SOURCE: WEBSITE BOOKING",
      "",
      "Please confirm my appointment.",
    ].join("\n");

  const send = () => {
    setSending(true);
    const encodedMessage = encodeURIComponent(message());
    const url = contactMethod === "line"
      ? LINE_CHAT_DEEP_LINK
      : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSending(false);
      setDone(true);
    }, 900);
  };

  const reset = () => {
    setDone(false);
    setStep(0);
    setService(null);
    setSelectedServices([]);
    setMatchedOffer(null);
    setShowDealNotice(false);
    setBookingStarted(false);
    setShowBookingOptions(initialPrompt === "channel");
    setShowLocationOptions(false);
    setDate(null);
    setTime(null);
    setContactMethod(null);
    setLocation(null);
    setName("");
    setPhone("");
    setLineId("");
    setNote("");
  };

  if (done) {
    const readyCopy =
      contactMethod === "line"
        ? "We’ve prepared your appointment details in LINE. Please send the message to complete your booking request — we’ll reply to confirm."
        : t.bookingReadyText;
    return (
      <div className="animate-rise rounded-sm border border-primary/50 bg-card/70 p-10 text-center neon-ring">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-8" />
        </span>
        <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-primary neon-text md:text-3xl">
          {t.bookingReady} <Check className="ml-1 inline size-6 align-[-0.2em] text-primary" aria-hidden="true" />
        </h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {readyCopy}
        </p>
        <p className="mt-4 inline-block rounded-sm border border-accent/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          {t.bookingSent}
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary hover:text-primary"
          >
            {t.bookAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-w-0 max-w-full overflow-visible rounded-sm border border-border bg-card/70 p-4 pb-24 shadow-2xl shadow-black/20 sm:pb-6 md:p-6">
      {showBookingOptions && !contactMethod && (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-black/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-channel-title">
          <div className="relative w-full max-w-md border border-primary/45 bg-background p-6 text-center shadow-2xl sm:p-8">
            <button type="button" onClick={() => setShowBookingOptions(false)} aria-label={language === "th" ? "ปิดหน้าต่าง" : "Close booking options"} className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-primary/60 bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              <X className="size-4" />
            </button>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Bangkok Kropper</p>
            <h2 id="booking-channel-title" className="mt-3 font-display text-2xl text-foreground">{language === "th" ? "ต้องการจองคิวผ่านช่องทางใด" : "How would you like to book?"}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{language === "th" ? "เลือกช่องทางติดต่อก่อน เราจะเตรียมรายละเอียดนัดหมายให้คุณ" : "Choose a contact channel first. Your appointment details will be prepared for you."}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => { selectChannel("whatsapp"); setShowLocationOptions(true); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">
                <MessageCircle className="size-4" /> WhatsApp
              </button>
              <button type="button" onClick={() => { selectChannel("line"); setShowLocationOptions(true); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/60 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <Send className="size-4" /> LINE
              </button>
            </div>
          </div>
        </div>
      )}

      {showLocationOptions && !location && (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-black/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-location-title">
          <div className="relative w-full max-w-md border border-primary/45 bg-background p-6 text-center shadow-2xl sm:p-8">
            <button type="button" onClick={() => setShowLocationOptions(false)} aria-label={language === "th" ? "ปิดหน้าต่าง" : "Close location options"} className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-primary/60 bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              <X className="size-4" />
            </button>
            <MapPin className="mx-auto size-7 text-primary" />
            <h2 id="booking-location-title" className="mt-3 font-display text-2xl text-foreground">{language === "th" ? "เลือกสาขาที่ต้องการเข้าใช้บริการ" : "Choose your location"}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{language === "th" ? "ต้องการเข้าใช้บริการที่สาขาใด" : "Where would you like to visit for your appointment?"}</p>
            <div className="mt-6 grid gap-3">
              <button type="button" onClick={() => { setLocation("Khlong Toei · Sukhumvit — 33 Sukhumvit Rd, Bangkok 10110"); setShowLocationOptions(false); }} className="border border-border px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary">{language === "th" ? "สาขา 01" : "Location 01"}</span>
                Khlong Toei · Sukhumvit
                <span className="mt-1 block text-xs text-muted-foreground">33 Sukhumvit Rd, Bangkok 10110</span>
              </button>
              <button type="button" onClick={() => { setLocation("Phaya Thai · Phahon Yothin — 2/3 Phahon Yothin 7, Bangkok 10400"); setShowLocationOptions(false); }} className="border border-border px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary">{language === "th" ? "สาขา 02" : "Location 02"}</span>
                Phaya Thai · Phahon Yothin
                <span className="mt-1 block text-xs text-muted-foreground">2/3 Phahon Yothin 7, Bangkok 10400</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showDealNotice && matchedOffer && typeof document !== "undefined"
        ? createPortal(
        <div className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm">
          <div role="dialog" aria-labelledby="deal-match-title" className="fixed left-1/2 top-32 z-[80] max-h-[calc(100dvh-9rem)] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 overflow-y-auto border border-primary/60 bg-background p-5 text-center shadow-2xl shadow-black/25 sm:top-1/2 sm:max-h-[calc(100dvh-3rem)] sm:-translate-y-1/2 sm:p-6">
            <div className="barber-pole absolute inset-x-0 top-0 h-1.5" />
            <span className="mx-auto grid size-14 place-items-center rounded-full border border-primary/50 bg-primary/10 text-primary neon-ring">
              <Sparkles className="size-7" />
            </span>
            <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-primary">
              {t.congratulations}
            </p>
            <h2 id="deal-match-title" className="mt-2 font-display text-2xl uppercase leading-none text-foreground">
              {t.unlockedDeal}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t.matchedOffer} <strong className="text-primary">{matchedOffer.name}</strong>
            </p>
            <div className="mt-5 border-y border-dashed border-border py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.yourSaving}</p>
              <p className="mt-1 font-display text-3xl text-primary">{matchedOffer.savings.toLocaleString()} THB</p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{t.dealPrice}: {matchedOffer.dealPrice.toLocaleString()} THB</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowDealNotice(false);
                setStep(1);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              {t.continueDeal} <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>,
        document.body,
      )
        : null}
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent_70%)]" />
      {/* progress */}
      <ol className="flex items-center gap-2">
        {localizedSteps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-colors md:text-xs ${
                i <= step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span
                className={`grid size-7 place-items-center rounded-full border text-xs transition-all ${
                  i < step
                    ? "border-primary bg-primary text-primary-foreground"
                    : i === step
                      ? "border-primary text-primary neon-ring"
                      : "border-border"
                }`}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < steps.length - 1 && (
              <span className="h-px flex-1 bg-border">
                <span
                  className="block h-px bg-primary transition-all duration-500"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-sm border border-border bg-background/60 p-2">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-30"
        >
          <ArrowLeft className="size-4" /> {t.back}
        </button>
        <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex">
          <User className="size-3.5" /> {t.stepLabel} {step + 1} / 5
        </span>
        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {t.continueLabel} <ArrowRight className="size-4" />
          </button>
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Review & send</span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-y border-border py-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            {t.yourVisit}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {selectedServices.length > 1 ? `${selectedServices.length} ${t.serviceLabel} selected` : service?.name ?? t.selectService}
            {date ? ` · ${prettyDate(date, language)}` : ""}
            {time ? ` · ${time}` : ""}
          </p>
        </div>
        <span className="font-display text-2xl text-primary">
          0{step + 1}
          <span className="text-sm text-muted-foreground"> / 05</span>
        </span>
      </div>

      <div key={step} className="animate-rise mt-5">
        {step === 0 && (
          <>
            <h3 className="max-w-full break-words font-display text-xl uppercase tracking-wide text-foreground md:text-2xl">
              {t.gettingToday}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.selectServices}
              {selectedServices.length > 0 && (
                <span className="ml-2 font-bold text-primary">
                  {selectedServices.length} selected
                </span>
              )}
            </p>
            <div className="mt-5 flex max-w-full gap-2 overflow-x-auto border-b border-border pb-2">
              {serviceFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setServiceFilter(filter)}
                  className={`shrink-0 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${serviceFilter === filter ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {(t.serviceFilters ?? serviceFilters)[serviceFilters.indexOf(filter)]}
                </button>
              ))}
            </div>
            <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map(({ id, name: n, price, minutes, desc, Icon }) => {
                const active = selectedServices.some((item) => item.id === id);
                const localizedName = getServiceName(language, id, n);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      const selected = { id, name: localizedName, price, minutes, desc, Icon };
                      const alreadySelected = selectedServices.some((item) => item.id === id);
                      const nextSelection = alreadySelected
                        ? selectedServices.filter((item) => item.id !== id)
                        : [...selectedServices, selected];
                      const nextOffer = specialOffers.find((offer) =>
                        offer.items.every((item) => nextSelection.some((selectedItem) => selectedItem.id === item.serviceId)),
                      ) ?? null;
                      setSelectedServices(nextSelection);
                      setService(nextSelection.at(-1) ?? null);
                      setMatchedOffer(nextOffer);
                      if (nextOffer && nextOffer.id !== matchedOffer?.id) setShowDealNotice(true);
                      setError(null);
                    }}
                    className={`group relative min-w-0 max-w-full overflow-hidden rounded-sm border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      active
                        ? "border-primary bg-primary/10 neon-ring"
                        : "border-border bg-background/50 hover:border-primary/60"
                    }`}
                  >
                    <span className="flex items-start justify-between">
                      <Icon
                        className={`size-6 transition-transform group-hover:rotate-12 ${
                          active ? "text-primary" : "text-accent"
                        }`}
                      />
                      <span className="font-display text-lg text-primary">฿{price}</span>
                    </span>
                    <span className="mt-3 inline-flex border border-border px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-accent">
                      {localizedCategory(id, language)} {t.serviceLabel}
                    </span>
                    <span className="mt-4 block break-words font-display text-xl uppercase tracking-wide text-foreground">
                      {localizedName}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{getServiceDescription(language, id, desc)}</span>
                    <span className="mt-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <Clock className="size-3.5" /> {minutes} {t.minutesShort}
                    </span>
                    {active && (
                      <span className="absolute right-4 top-14 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="font-display text-2xl uppercase tracking-wide text-foreground md:text-3xl">
              {t.whenSeeYou}
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {days.map((d, i) => {
                const iso = toISO(d);
                const active = date === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => {
                      setDate(iso);
                      setError(null);
                    }}
                    className={`rounded-sm border py-3 text-center transition-all hover:-translate-y-0.5 ${
                      active
                        ? "border-accent bg-accent text-accent-foreground blood-ring"
                        : "border-border bg-background/50 hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] opacity-80">
                      {i === 0 ? (language === "th" ? "วันนี้" : "Today") : d.toLocaleDateString(language === "th" ? "th-TH" : "en-US", { weekday: "short" })}
                    </span>
                    <span className="block font-display text-2xl">{d.getDate()}</span>
                    <span className="block text-[0.6rem] uppercase tracking-widest opacity-70">
                      {d.toLocaleDateString(language === "th" ? "th-TH" : "en-US", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="size-4 text-primary" />
              {date ? (
                <span className="text-foreground">{prettyDate(date, language)}</span>
              ) : (
                t.pickDay
              )}
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="font-display text-2xl uppercase tracking-wide text-foreground md:text-3xl">
              {t.timeWorks}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {date ? prettyDate(date, language) : ""} · {t.chairTime} {service?.minutes} {t.minutesShort}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {timeSlots.map((t) => {
                const active = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTime(t);
                      setError(null);
                    }}
                    className={`rounded-sm border py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      active
                        ? "border-primary bg-primary text-primary-foreground neon-ring"
                        : "border-border bg-background/50 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="font-display text-2xl uppercase tracking-wide text-foreground md:text-3xl">
              {t.almostThere} <span className="text-primary neon-text">👋</span>
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {t.fullName}
                </span>
                <input
                  value={name}
                  maxLength={80}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John"
                  className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {isLineChannel ? "LINE ID" : t.whatsappNumber}
                </span>
                {isLineChannel ? (
                  <input
                    value={lineId}
                    maxLength={80}
                    onChange={(e) => setLineId(e.target.value)}
                    placeholder="Your LINE ID"
                    className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 text-foreground outline-none transition-colors focus:border-primary"
                  />
                ) : (
                  <div className="mt-2 flex items-center gap-2 rounded-sm border border-input bg-background px-2 py-2 focus-within:border-primary">
                    <div className="relative min-w-[8rem] rounded-sm border border-border bg-background">
                      <div className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-foreground">
                        <span className="text-lg leading-none">{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <svg viewBox="0 0 20 20" fill="none" className="ml-1 size-4 text-muted-foreground" aria-hidden="true">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <select
                        value={countryCode}
                        onChange={(event) => {
                          const nextCode = event.target.value;
                          setCountryCode(nextCode);
                          setPhone(nextCode);
                        }}
                        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map(({ code, label }) => (
                          <option key={code} value={code}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      value={phone}
                      maxLength={getPhoneMaxLength(countryCode)}
                      inputMode="tel"
                      onChange={(e) => setPhone(formatPhoneValue(e.target.value, countryCode))}
                      placeholder="92 905 0509"
                      className="w-full border-0 bg-transparent px-1 py-2 text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                )}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {t.specialRequest}
                </span>
                <textarea
                  value={note}
                  maxLength={500}
                  rows={3}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.requestPlaceholder}
                  className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-3 py-3 text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="font-display text-xl uppercase tracking-wide text-foreground md:text-2xl">
              {t.appointment}
            </h3>
            <div className="mt-6 overflow-hidden rounded-sm border border-primary/40 bg-background/70 neon-ring">
              <div className="barber-pole h-1.5" />
              <dl className="divide-y divide-border">
                {(() => {
                  const summaryRows: Array<[typeof Scissors, string, string]> = [
                  [Scissors, language === "th" ? "บริการ" : "Services", selectedServices.length > 1 ? selectedServices.map((item) => item.name).join(", ") : `${service?.name} — ฿${service?.price}`],
                  [CalendarIcon, language === "th" ? "วันที่" : "Date", date ? prettyDate(date, language) : "—"],
                  [Clock, language === "th" ? "เวลา" : "Time", time ?? "—"],
                  [MapPin, language === "th" ? "สถานที่" : "Location", location ?? "—"],
                  [User, language === "th" ? "ชื่อ" : "Name", name.trim()],
                  [isLineChannel ? Send : MessageCircle, isLineChannel ? "LINE ID" : channelLabel(currentChannel), isLineChannel ? lineId.trim() : phone.trim()],
                  ];
                  if (note.trim()) {
                    summaryRows.push([FileText, language === "th" ? "คำขอ" : "Request", note.trim()]);
                  }
                  return summaryRows.map(([Icon, label, value]) => (
                  <div key={`${label}-${value}`} className="flex items-start justify-between gap-6 px-5 py-4">
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <Icon className="size-4 shrink-0 text-primary" />
                      {label}
                    </dt>
                    <dd className="text-right font-semibold text-foreground">{value}</dd>
                  </div>
                  ));
                })()}
              </dl>
              {(selectedServices.length > 1 || matchedOffer) && (() => {
                const originalTotal = selectedServices.reduce((sum, item) => sum + item.price, 0);
                const dealItems = new Set(matchedOffer?.items.map((item) => item.serviceId));
                const extraTotal = matchedOffer
                  ? selectedServices
                      .filter((item) => !dealItems.has(item.id))
                      .reduce((sum, item) => sum + item.price, 0)
                  : 0;
                const discount = matchedOffer
                  ? originalTotal - (matchedOffer.dealPrice + extraTotal)
                  : offerDiscount(selectedServices.length);
                const finalTotal = originalTotal - discount;
                return (
                  <div className="border-t border-border px-5 py-4 text-right text-sm">
                    <p className="text-muted-foreground">Original Total: {originalTotal.toLocaleString()} THB</p>
                    <p className="text-primary">{matchedOffer ? matchedOffer.name : "Service bundle"} discount: -{discount.toLocaleString()} THB</p>
                    <p className="mt-1 font-display text-xl text-foreground">You Pay: {finalTotal.toLocaleString()} THB</p>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">You Save: {discount.toLocaleString()} THB</p>
                  </div>
                );
              })()}
            </div>
            <button
              type="button"
              onClick={send}
              disabled={sending}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-sm bg-primary py-4 font-display text-lg uppercase tracking-widest text-primary-foreground transition-transform enabled:hover:scale-[1.02] disabled:opacity-70"
            >
              {sending ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Opening {channelLabel(contactMethod ?? "whatsapp")}…
                </>
              ) : (
                <>
                  {isLineChannel ? <Send className="size-5" /> : <MessageCircle className="size-5" />} Confirm via {channelLabel(currentChannel)}
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              This prepares your appointment in {channelLabel(contactMethod ?? "whatsapp")}; press Send to confirm.
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="animate-rise mt-5 rounded-sm border border-accent/50 bg-accent/10 px-4 py-2.5 text-sm text-accent">
          {error}
        </p>
      )}

    </div>
  );
}

const topics = [
  { label: "Services", Icon: Scissors },
  { label: "Pricing", Icon: Banknote },
  { label: "Availability", Icon: Clock },
  { label: "Haircut Advice", Icon: Lightbulb },
  { label: "Location", Icon: MapPin },
  { label: "Other", Icon: HelpCircle },
] as const;

export function AskBarber() {
  const [topic, setTopic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState<string>(COUNTRY_CODES[0]!.code);
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const selectedCountry = COUNTRY_CODES.find((item) => item.code === countryCode) ?? COUNTRY_CODES[0]!;
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const send = () => {
    if (!topic) return setError("Pick a topic so we know what it's about.");
    if (name.trim().length < 2) return setError("Tell us your name.");
    if (phone.replace(/\D/g, "").length < 8)
      return setError("Add a WhatsApp number we can reply to.");
    if (msg.trim().length < 4) return setError("Type your question first.");
    setError(null);
    setSending(true);
    const text = [
      "💬 NEW WEBSITE INQUIRY",
      "",
      "Hello Bangkok Barber Shop!",
      "",
      `👤 Name: ${name.trim()}`,
      `📱 WhatsApp: ${phone.trim()}`,
      `💡 Topic: ${topic}`,
      `📝 Message: ${msg.trim()}`,
      "",
      "🌐 SOURCE: WEBSITE INQUIRY",
      "",
      "Please reply when available.",
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSending(false);
      setDone(true);
    }, 900);
  };

  if (done) {
    return (
      <div className="animate-rise rounded-sm border border-primary/50 bg-card/70 p-10 text-center neon-ring">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <Send className="size-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-primary neon-text md:text-3xl">
          Your question is ready! 💬
        </h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          We’ve opened WhatsApp with your message — just hit send and a barber will reply when
          available.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setTopic(null);
              setName("");
              setPhone("");
              setMsg("");
            }}
            className="rounded-sm border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary hover:text-primary"
          >
            Ask another question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-border bg-card/60 p-5 md:p-8">
      <h3 className="font-display text-2xl uppercase tracking-wide text-foreground md:text-3xl">
        How can we <span className="text-primary neon-text">help you today?</span>
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {topics.map(({ label, Icon }) => {
          const active = topic === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                setTopic(label);
                setError(null);
              }}
              className={`flex items-center gap-2.5 rounded-sm border px-4 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                active
                  ? "border-primary bg-primary/10 text-primary neon-ring"
                  : "border-border bg-background/50 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              <Icon className={`size-4 ${active ? "text-primary" : "text-accent"}`} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Name
          </span>
          <input
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
            placeholder="John"
            className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            WhatsApp number
          </span>
          <div className="mt-2 flex items-center gap-2 rounded-sm border border-input bg-background px-2 py-2 focus-within:border-primary">
            <div className="relative min-w-[8rem] rounded-sm border border-border bg-background">
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-foreground">
                <span className="text-lg leading-none">{selectedCountry.flag}</span>
                <span>{selectedCountry.code}</span>
                <svg viewBox="0 0 20 20" fill="none" className="ml-1 size-4 text-muted-foreground" aria-hidden="true">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <select
                value={countryCode}
                onChange={(event) => {
                  const nextCode = event.target.value;
                  setCountryCode(nextCode);
                  setPhone(nextCode);
                }}
                className="absolute inset-0 cursor-pointer appearance-none opacity-0"
                aria-label="Country code"
              >
                {COUNTRY_CODES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <input
              value={phone}
              maxLength={getPhoneMaxLength(countryCode)}
              inputMode="tel"
              onChange={(e) => setPhone(formatPhoneValue(e.target.value, countryCode))}
              placeholder="92 905 0509"
              className="w-full border-0 bg-transparent px-1 py-2 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Question / message
          </span>
          <textarea
            value={msg}
            maxLength={500}
            rows={3}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Which fade would suit me?"
            className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-3 py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </label>
      </div>

      {error && (
        <p className="animate-rise mt-5 rounded-sm border border-accent/50 bg-accent/10 px-4 py-2.5 text-sm text-accent">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={send}
        disabled={sending}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-sm bg-accent py-4 font-display text-lg uppercase tracking-widest text-accent-foreground transition-transform enabled:hover:scale-[1.02] disabled:opacity-70 blood-ring"
      >
        {sending ? (
          <>
            <Loader2 className="size-5 animate-spin" /> Opening WhatsApp…
          </>
        ) : (
          <>
            <MessageCircle className="size-5" /> Ask via WhatsApp
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sent straight to the barber’s WhatsApp — replies usually within the hour.
      </p>
    </div>
  );
}
