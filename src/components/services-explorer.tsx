import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, Search, X } from "lucide-react";
import { PHONE_HREF } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";
import { getServiceDescription, getServiceName } from "@/data/service-translations";
import { AnniversaryPrice } from "@/components/anniversary-price";

type ServiceKind = "men" | "women" | "kids" | "color" | "treatments" | "grooming";
type MenuService = {
  id: string;
  name: string;
  category: ServiceKind;
  price: number;
  starting?: boolean;
  minutes: number;
  description: string;
  image: string;
};
type DisplayCategory = {
  id: string;
  label: string;
  kind: ServiceKind[];
  image: string;
  eyebrow: string;
  description: string;
};

type ServicesExplorerProps = {
  initialCategory?: string;
};

const menu: MenuService[] = [
  {
    id: "shave-trim-beard",
    name: "Shave + Trim + Beard",
    category: "grooming",
    price: 400,
    minutes: 40,
    description: "A clean shave with beard trim and precise line work.",
    image: "/men1.png",
  },
  {
    id: "haircut-shampoo",
    name: "Haircut + Shampoo",
    category: "men",
    price: 700,
    minutes: 60,
    description: "Consultation, tailored cut, shampoo and finish.",
    image: "/men2.png",
  },
  {
    id: "hair-trim-beard-shampoo",
    name: "Hair + Trim + Beard + Shampoo",
    category: "grooming",
    price: 1100,
    minutes: 90,
    description: "Complete hair and beard service with shampoo and styling.",
    image: "/men3.png",
  },
  {
    id: "kids-hair-cut",
    name: "Kids' Haircut",
    category: "kids",
    price: 500,
    minutes: 35,
    description: "A calm, carefully shaped haircut for children.",
    image: "/kid1.png",
  },
  {
    id: "shampoo-spa-set",
    name: "Shampoo + Spa + Hair Styling + Head Massage",
    category: "treatments",
    price: 390,
    minutes: 45,
    description: "A full wash, scalp spa, massage and styled finish.",
    image: "/7.png",
  },
  {
    id: "men-hair-color",
    name: "Hair Color (Black / Brown)",
    category: "color",
    price: 1200,
    minutes: 90,
    description: "Classic black or brown color for a natural, even result.",
    image: "/womencolor.png",
  },
  {
    id: "beard-color",
    name: "Beard Color (Black / Brown)",
    category: "grooming",
    price: 500,
    minutes: 45,
    description: "Natural-looking beard color in black or brown.",
    image: "/men4.png",
  },
  {
    id: "fashion-color-men",
    name: "Hair Color (Fashion)",
    category: "color",
    price: 2500,
    starting: true,
    minutes: 180,
    description: "Creative fashion shades with personalised preparation.",
    image: "/women color1.png",
  },
  {
    id: "men-treatment",
    name: "Hair Treatment + Spa + Vitamin (Men)",
    category: "treatments",
    price: 600,
    minutes: 60,
    description: "A restorative men's treatment with spa care and vitamins.",
    image: "/women.png",
  },
  {
    id: "wax-ears-nose",
    name: "Wax (Ears / Nose)",
    category: "grooming",
    price: 200,
    minutes: 20,
    description: "Quick, precise grooming for ears or nose.",
    image: "/men5.png",
  },
  {
    id: "men-facial",
    name: "Facial Massage for Men",
    category: "treatments",
    price: 690,
    minutes: 45,
    description: "A relaxing facial massage designed for men's skin.",
    image: "/gallery1.png",
  },
  {
    id: "manicure-hands",
    name: "Manicure for Men (Hands)",
    category: "grooming",
    price: 350,
    minutes: 45,
    description: "Clean, detailed nail care for hands.",
    image: "/gallery2.png",
  },
  {
    id: "women-hair-cut",
    name: "Women Hair Cut",
    category: "women",
    price: 690,
    minutes: 60,
    description: "A personalised cut shaped for your texture and routine.",
    image: "/women3.png",
  },
  {
    id: "shampoo-blow-dry",
    name: "Shampoo + Blow Dry",
    category: "women",
    price: 450,
    minutes: 45,
    description: "Cleanse and a smooth, polished blow-dry finish.",
    image: "/womenshampoo.png",
  },
  {
    id: "hair-color-women",
    name: "Hair Color Women",
    category: "color",
    price: 2000,
    starting: true,
    minutes: 120,
    description: "Custom women's color priced by length and technique.",
    image: "/womencu1.png",
  },
  {
    id: "hair-spa",
    name: "Hair Spa (S, M, L)",
    category: "treatments",
    price: 600,
    minutes: 60,
    description: "Conditioning spa care for short, medium or long hair.",
    image: "/womwn1.png",
  },
  {
    id: "volume-perm",
    name: "Volume Perm",
    category: "women",
    price: 2500,
    minutes: 180,
    description: "Long-lasting volume and movement with a modern finish.",
    image: "/womwn2.png",
  },
  {
    id: "straightening",
    name: "Permanent Hair Straightening",
    category: "women",
    price: 2500,
    minutes: 180,
    description: "Sleek, lasting straightening with careful preparation.",
    image: "/women5.png",
  },
  {
    id: "color-highlight",
    name: "Color Highlight",
    category: "color",
    price: 2500,
    starting: true,
    minutes: 150,
    description: "Dimensional highlights placed to complement your cut.",
    image: "/womencolor.png",
  },
  {
    id: "fashion-color-women",
    name: "Hair Color (Fashion)",
    category: "color",
    price: 2500,
    starting: true,
    minutes: 180,
    description: "Creative fashion shades with personalised preparation.",
    image: "/hair1.png",
  },
  {
    id: "keratin-hair-treatment",
    name: "Hair Treatment Keratin",
    category: "treatments",
    price: 500,
    starting: true,
    minutes: 90,
    description: "Keratin care to smooth and improve manageability.",
    image: "/hair2.png",
  },
  {
    id: "women-facial",
    name: "Facial Massage for Women",
    category: "treatments",
    price: 600,
    minutes: 45,
    description: "A restorative facial massage for women.",
    image: "/gallery3.png",
  },
  {
    id: "brazilian-keratin",
    name: "Brazilian Keratin",
    category: "treatments",
    price: 1500,
    starting: true,
    minutes: 150,
    description: "Smoothing keratin treatment for softer, more manageable hair.",
    image: "/womenshampoo.png",
  },
];

const categories: DisplayCategory[] = [
  {
    id: "men",
    label: "Men's Cuts",
    kind: ["men", "grooming"],
    image: "/1.PNG",
    eyebrow: "CUT · SHAVE · BEARD",
    description: "Clean lines, considered shape and polished barbering from chair to finish.",
  },
  {
    id: "women",
    label: "Women's Styling",
    kind: ["women"],
    image: "/womenstyling.png",
    eyebrow: "SHAPE · STYLE · RESTORE",
    description:
      "Modern cutting, smooth finishes and restorative treatments tailored to your hair.",
  },
  {
    id: "color",
    label: "Color & Perm",
    kind: ["color"],
    image: "/9.png",
    eyebrow: "COLOR · HIGHLIGHT · TREAT",
    description:
      "Rich natural shades, expressive color and intensive care selected for your result.",
  },
  {
    id: "spa",
    label: "Spa & Grooming",
    kind: ["treatments"],
    image: "/SpaGroming.png",
    eyebrow: "RESET · REFRESH · DETAIL",
    description:
      "Finishing rituals and thoughtful maintenance for a complete head-to-hand refresh.",
  },
  {
    id: "kids",
    label: "Kids",
    kind: ["kids"],
    image: "/10.png",
    eyebrow: "COMFORT · CARE · CONFIDENCE",
    description: "A patient, comfortable haircut with a neat finish for younger guests.",
  },
];

export function ServicesExplorer({ initialCategory = "men" }: ServicesExplorerProps) {
  const { language, t } = useI18n();
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const categoryNavRef = useRef<HTMLDivElement | null>(null);
  const isFirstCategorySelection = useRef(true);
  const activeCategory =
    categories.find((category) => category.id === categoryId) ?? categories[0]!;
  const categoryLabel = (category: DisplayCategory) => {
    if (language !== "th") return category.label;
    const labels: Record<string, string> = {
      men: t.categoryMen,
      women: t.categoryWomen,
      grooming: t.categoryGrooming,
      color: t.categoryColor,
      treatments: t.categoryTreatments,
      kids: t.categoryKids,
    };
    return labels[category.id] ?? category.label;
  };

  const goToNextCategory = () => {
    const currentIndex = categories.findIndex((category) => category.id === categoryId);
    const nextIndex = (currentIndex + 1) % categories.length;
    setCategoryId(categories[nextIndex]!.id);
  };

  const goToMenu = () => {
    categoryNavRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCategory = (nextCategoryId: string) => {
    if (nextCategoryId === categoryId && typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        requestAnimationFrame(() => {
          listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
    setCategoryId(nextCategoryId);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isFirstCategorySelection.current) {
      isFirstCategorySelection.current = false;
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile || !listRef.current) return;

    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [categoryId]);
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesCategory = activeCategory.kind.includes(item.category);
      const matchesSearch =
        query.length === 0 ||
        `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
      return query.length > 0 ? matchesSearch : matchesCategory;
    });
  }, [activeCategory, searchQuery]);
  const serviceName = (item: MenuService) => getServiceName(language, item.id, item.name);
  const serviceDescription = (item: MenuService) =>
    getServiceDescription(language, item.id, item.description);

  return (
    <div className="services-menu space-y-3">
      <form
        className="flex max-w-2xl items-center gap-3 rounded-sm border border-primary/35 bg-card/45 px-3 py-2.5 text-muted-foreground shadow-[0_10px_35px_-25px_var(--color-primary)] transition-colors focus-within:border-primary focus-within:bg-card/70"
        onSubmit={(event) => {
          event.preventDefault();
          setSearchQuery(searchInput.trim());
        }}
      >
        <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <label htmlFor="service-search" className="sr-only">
          Search services
        </label>
        <input
          id="service-search"
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={language === "th" ? "ค้นหาบริการ หนวดเครา ทำสี หรือสปา..." : "Search services, beard, color, spa..."}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/75"
        />
        <button
          type="submit"
          className="shrink-0 bg-primary px-4 py-2 text-[.6rem] font-bold uppercase tracking-[.14em] text-primary-foreground transition-colors hover:bg-accent"
        >
          {language === "th" ? "ค้นหา" : "Search"}
        </button>
        {(searchInput || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              setSearchQuery("");
            }}
            className="shrink-0 p-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Clear service search"
          >
            <X className="size-4" />
          </button>
        )}
      </form>
      {!searchQuery && (
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <nav
            ref={categoryNavRef}
            className="grid w-full grid-cols-2 gap-2 border border-border p-2 sm:flex sm:overflow-x-auto"
            aria-label="Service categories"
          >
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                className={`group relative aspect-[1.1/1] min-w-0 overflow-hidden border text-left transition-colors last:col-span-2 last:aspect-[2/1] sm:min-w-0 sm:flex-1 sm:last:col-span-auto sm:last:aspect-[1.1/1] ${category.id === categoryId ? "border-primary" : "border-border"}`}
              >
                <img
                  src={category.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-full object-cover opacity-100 saturate-110 contrast-105 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/45" />
                <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-3 text-left">
                  <span className="text-[.65rem] font-bold text-primary">0{index + 1}</span>
                  <span className="text-base font-bold uppercase leading-none tracking-[.04em] text-foreground sm:text-lg">
                    {categoryLabel(category)}
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {!searchQuery && (
        <div className="flex items-center justify-between gap-3 bg-card/45 px-3 py-2.5 text-[.62rem] font-medium uppercase tracking-[.18em] text-muted-foreground shadow-[0_10px_35px_-25px_var(--color-primary)]">
          <span>{filtered.length} {language === "th" ? "บริการ" : "services"}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToMenu}
              className="rounded-full border border-primary/50 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-[.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {language === "th" ? "กลับไปที่เมนู" : "Back to menu"}
            </button>
            <button
              type="button"
              onClick={goToNextCategory}
              className="rounded-full bg-primary px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-[.14em] text-primary-foreground transition-colors hover:bg-accent"
            >
              {language === "th" ? "หมวดถัดไป" : "Next category"}
            </button>
          </div>
        </div>
      )}

      <div
        ref={listRef}
        className={`grid overflow-hidden border border-border bg-card/45 ${searchQuery ? "lg:grid-cols-1" : "lg:grid-cols-[.72fr_1.28fr]"}`}
        style={{ scrollMarginTop: "100px" }}
      >
        {!searchQuery && (
          <div className="services-feature relative min-h-[27rem] overflow-hidden border-b border-border lg:min-h-[31rem] lg:border-b-0 lg:border-r">
            <img
              src={activeCategory.image}
              alt={`${activeCategory.label} at Bangkok Kropper`}
              className="absolute inset-0 size-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[.6rem] font-bold uppercase tracking-[.24em] text-primary">
                {activeCategory.eyebrow}
              </p>
              <h3 className="mt-3 max-w-sm font-display text-3xl leading-[.9] text-foreground md:text-5xl">
                {categoryLabel(activeCategory)}
              </h3>
              <p className="mt-4 max-w-sm text-xs leading-5 text-muted-foreground">
                {activeCategory.description}
              </p>
            </div>
          </div>
        )}

        <div className="flex min-h-[27rem] flex-col p-5 md:p-7 lg:min-h-[31rem]">
          <div className="flex-1 divide-y divide-border">
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="group flex w-full items-start gap-4 py-4 text-left first:pt-0 last:pb-4"
                >
                  <span className="pt-1 text-[.6rem] font-bold text-primary/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base leading-tight text-foreground transition-colors group-hover:text-primary md:text-lg">
                      {serviceName(item)}
                    </span>
                    <span className="mt-1 block text-[.65rem] leading-4 text-muted-foreground">
                      {serviceDescription(item)}
                    </span>
                  </span>
                  <AnniversaryPrice
                    price={item.price}
                    prefix={item.starting ? `${t.startingFrom} ` : ""}
                    className="shrink-0 pt-1 text-sm"
                  />
                </button>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                {language === "th" ? "ไม่พบบริการที่ตรงกัน" : "No matching services found."}
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xs text-[.62rem] leading-4 text-muted-foreground"></p>
            <div className="flex flex-wrap justify-end gap-2">
              <a
                href={PHONE_HREF}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-primary/60 px-4 py-3 text-[.6rem] font-bold uppercase tracking-[.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="size-3.5" /> {language === "th" ? "โทร" : "Call"}
              </a>
              <Link
                to="/book"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[.6rem] font-bold uppercase tracking-[.14em] text-primary-foreground transition-colors hover:bg-accent"
              >
                {t.bookAppointment} <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
        <Check className="size-4 text-primary" /> {filtered.length} {language === "th" ? "บริการในหมวด" : "services available in"}{" "}
        {categoryLabel(activeCategory)}
      </div>
    </div>
  );
}
