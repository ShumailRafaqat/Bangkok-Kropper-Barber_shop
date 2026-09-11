import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-chrome";
import barberWorkImage from "@/assets/barber-work.jpg";
import heroShopImage from "@/assets/hero-shop.jpg";
import { useI18n } from "@/lib/i18n";

const guideCategories = [
  {
    title: "Bangkok Barber Guides",
    description: "Expert advice on finding the right barber, service and haircut in Bangkok.",
    tags: ["Best Barber Bangkok", "Men's Haircut", "Barber Shop"],
  },
  {
    title: "Sukhumvit Guides",
    description: "Practical local guidance for visitors and residents around Sukhumvit and nearby areas.",
    tags: ["Barber Sukhumvit", "Men's Grooming", "Affordable Haircut"],
  },
  {
    title: "Phaya Thai & Phahon Yothin",
    description: "Useful location-focused content for customers searching around Phaya Thai and nearby routes.",
    tags: ["Barber Phaya Thai", "Men's Haircut", "Nearby Areas"],
  },
  {
    title: "Haircut Styles",
    description: "Fade, taper, skin fade, classic and modern hairstyle guidance for Bangkok men.",
    tags: ["Low Fade", "Mid Fade", "Skin Fade", "Taper"],
  },
  {
    title: "Beard & Grooming",
    description: "Trim, line-up, beard shaping, maintenance schedules and complete grooming advice.",
    tags: ["Beard Trim", "Beard Styling", "Haircut + Beard"],
  },
  {
    title: "Haircare & Weather",
    description: "How Bangkok's heat and humidity affect hair, scalp and grooming routines.",
    tags: ["Haircare", "Humid Weather", "Hair Treatment"],
  },
  {
    title: "Hair Color & Treatment",
    description: "Modern color, treatment and care options for men and women in Bangkok.",
    tags: ["Hair Color", "Keratin", "Hair Spa"],
  },
  {
    title: "Women's Hair",
    description: "Haircut, color, treatment and styling guidance for women in Bangkok.",
    tags: ["Women's Haircut", "Keratin", "Hair Highlights"],
  },
] as const;

const guideArticles = [
  {
    title: "Top Rated Barber in Bangkok: What Makes a Great Shop",
    category: "Bangkok Barber Guides",
    excerpt: "How to compare barber quality, consultation, cleanliness and service before booking your next appointment.",
    tags: ["Top rated barber", "Bangkok barber", "Best barber shop"],
  },
  {
    title: "Best Men's Haircuts for Different Face Shapes",
    category: "Haircut Styles",
    excerpt: "Learn how face shape, hair texture and styling time can help you choose a haircut that feels balanced and personal.",
    tags: ["Face shape", "Haircut guide", "Best haircut"],
  },
  {
    title: "Men's Haircut in Bangkok: Styles, Prices & What to Expect",
    category: "Bangkok Barber Guides",
    excerpt: "Compare the most popular men's haircut styles, maintenance needs and pricing expectations in Bangkok.",
    tags: ["Haircut Bangkok", "Fade", "Classic cut"],
  },
  {
    title: "Looking for an Affordable Barber Shop in Bangkok?",
    category: "Bangkok Barber Guides",
    excerpt: "Understand the value behind haircut pricing, service add-ons and solid choices for budget-conscious grooming.",
    tags: ["Affordable haircut", "Value", "Price guide"],
  },
  {
    title: "Best Barber in Sukhumvit Bangkok: Men's Haircuts & Grooming Guide",
    category: "Sukhumvit Guides",
    excerpt: "Learn what makes a good barber in Sukhumvit and how to choose based on style, convenience and quality.",
    tags: ["Barber Sukhumvit", "Men's grooming", "Professional barber"],
  },
  {
    title: "Best Barber in Phaya Thai Bangkok: Men's Haircut & Grooming Guide",
    category: "Phaya Thai & Phahon Yothin",
    excerpt: "Explore local barber guidance around Phaya Thai, including what to look for and how to book a polished service.",
    tags: ["Barber Phaya Thai", "Haircut Phaya Thai", "Local guide"],
  },
  {
    title: "Finding a Barber in Nana: A Practical Bangkok Guide",
    category: "Nana · Sukhumvit Guides",
    excerpt: "What to look for when choosing a clean, convenient barber near Nana for a haircut, fade or beard service.",
    tags: ["Barber near Nana", "Nana Bangkok", "Sukhumvit grooming"],
  },
  {
    title: "Complete Beard Grooming Guide for Men in Bangkok",
    category: "Beard & Grooming",
    excerpt: "Discover beard maintenance, trimming schedules and professional grooming options for all beard styles.",
    tags: ["Beard trim", "Beard grooming", "Grooming"],
  },
  {
    title: "Men's Haircare Guide for Bangkok's Hot & Humid Weather",
    category: "Haircare & Weather",
    excerpt: "A real-world guide to managing sweat, product build-up, humidity and scalp health in Bangkok.",
    tags: ["Haircare Bangkok", "Humidity", "Scalp care"],
  },
  {
    title: "Hair Color & Hair Treatment Guide in Bangkok",
    category: "Hair Color & Treatment",
    excerpt: "Understand different hair color approaches, treatment options and how to keep your style looking fresh.",
    tags: ["Hair color", "Keratin", "Hair treatment"],
  },
  {
    title: "Women's Hair Services in Bangkok: Haircuts, Color, Keratin & More",
    category: "Women's Hair",
    excerpt: "A user-friendly breakdown of women's hair services, color and treatment options available in Bangkok.",
    tags: ["Women's hair", "Keratin", "Hair color"],
  },
  {
    title: "A Parent's Guide to Kids' Haircuts in Bangkok",
    category: "Kids' Hair",
    excerpt: "What to expect, how to choose the right haircut, and how to make the experience comfortable for your child.",
    tags: ["Kids haircut", "Family barber", "Children's hair"],
  },
] as const;

const popularSearches = [
  "Best Barber Bangkok",
  "Barber Sukhumvit",
  "Men's Haircut Bangkok",
  "Affordable Barber Bangkok",
  "Barber Phaya Thai",
  "Fade Haircut",
  "Beard Grooming",
  "Hair Color",
  "Hair Treatment",
  "Korean Hairstyle",
  "Haircare Bangkok",
];

const groomingPaths = [
  {
    id: "refresh",
    number: "01",
    title: "I need a clean refresh",
    label: "Polished",
    description: "Keep your style familiar, sharpen the shape and leave with a finish that works for everyday life.",
    detail: "Start with a classic cut, tidy fade or beard clean-up. It is the easiest choice when you want to look polished without changing your identity.",
    action: "Read haircut guides",
    slug: "mens-haircut-bangkok",
    maintenance: "Every 3–4 weeks",
    climate: "Easy in humidity",
  },
  {
    id: "change",
    number: "02",
    title: "I want a new direction",
    label: "Sharper",
    description: "Compare shapes, fades and proportions before committing to a style that feels noticeably different.",
    detail: "Bring a reference photo and let the barber adjust it to your hairline, face shape and maintenance routine. A good change still feels personal.",
    action: "Compare fade styles",
    slug: "low-fade-vs-mid-fade",
    maintenance: "Every 2–3 weeks",
    climate: "Crisp and structured",
  },
  {
    id: "advice",
    number: "03",
    title: "I need help choosing",
    label: "Personal",
    description: "Not sure what to book? Begin with a conversation and let the team shape the right service around you.",
    detail: "You do not need to know the technical name of a haircut. Explain what you like, what you want to avoid and how much time you have for styling.",
    action: "Book a consultation",
    slug: null,
    maintenance: "Decided together",
    climate: "Built around you",
  },
] as const;

function getJournalSlug(title: string) {
  if (title.includes("Top Rated Barber")) return "top-rated-barber-bangkok";
  if (title.includes("Best Barber in Bangkok")) return "best-barber-bangkok";
  if (title.includes("Men's Haircut in Bangkok")) return "mens-haircut-bangkok";
  if (title.includes("Low Fade vs")) return "low-fade-vs-mid-fade";
  if (title.includes("Barber in Nana")) return "barber-in-nana-bangkok";
  if (title.includes("Affordable Barber Shop")) return "affordable-barber-shop-bangkok";
  if (title.includes("Best Barber in Sukhumvit")) return "barber-sukhumvit-bangkok";
  if (title.includes("Best Barber in Phaya Thai")) return "barber-phaya-thai-bangkok";
  if (title.includes("Skin Fade")) return "skin-fade-bangkok";
  if (title.includes("Beard Grooming")) return "beard-grooming-bangkok";
  if (title.includes("Haircare Guide")) return "haircare-bangkok-humidity";
  if (title.includes("Hair Color & Hair Treatment")) return "hair-color-treatment-bangkok";
  if (title.includes("Best Men's Haircuts")) return "mens-haircuts-face-shapes";
  if (title.includes("Women's Hair Services")) return "womens-hair-services-bangkok";
  if (title.includes("Kids Haircuts") || title.includes("Parent's Guide")) return "kids-haircuts-bangkok";
  return null;
}

export const Route = createFileRoute("/grooming-guide")({
  head: () => ({
    meta: [
      { title: "Bangkok Hair & Grooming Guide | Bangkok Kropper" },
      {
        name: "description",
        content: "Explore expert grooming guides, haircut advice, beard care and Bangkok barber insights for men and women.",
      },
      { property: "og:title", content: "Bangkok Hair & Grooming Guide | Bangkok Kropper" },
      {
        property: "og:description",
        content: "Haircuts, beard care, hair color, treatment and local barber advice for Bangkok and nearby areas.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "/grooming-guide" },
      { rel: "alternate", hrefLang: "th", href: "/grooming-guide?lang=th" },
      { rel: "alternate", hrefLang: "x-default", href: "/grooming-guide" },
    ],
  }),
  component: GroomingGuidePage,
});

function GroomingGuidePage() {
  const [query, setQuery] = useState("");
  const { language } = useI18n();
  const [activePathId, setActivePathId] = useState<(typeof groomingPaths)[number]["id"]>("refresh");
  const activePath = groomingPaths.find((path) => path.id === activePathId) ?? groomingPaths[0];

  if (language === "th") return <ThaiGroomingGuidePage />;

  const filteredArticles = query.trim()
    ? guideArticles.filter((article) => {
        const haystack = `${article.title} ${article.category} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      })
    : guideArticles;

  const featuredArticles = [
    {
      title: "Best Barber in Bangkok: full guide to premium cuts and grooming",
      meta: "Bangkok barber guide",
      copy: "Learn how people search for top barbers in Bangkok and what makes a reliable grooming experience worth booking.",
      slug: "best-barber-bangkok",
      image: barberWorkImage,
    },
    {
      title: "Beard grooming in Bangkok: trim, shape and maintenance tips",
      meta: "Beard care",
      copy: "Understand the difference between beard trim, line-up, styling and professional grooming recommendations.",
      slug: null,
      image: heroShopImage,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:pt-32">
        <section className="relative overflow-hidden border border-border bg-secondary/20 px-5 py-12 md:px-8 md:py-16">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(205,152,87,0.16),_transparent_60%)] lg:block" />
          <div className="relative max-w-5xl">
            <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[0.95] text-foreground md:text-6xl">
              Bangkok Barber Journal
            </h1>
            <h2 className="mt-4 max-w-3xl font-display text-2xl leading-tight text-primary md:text-3xl">
              Haircuts, Beard Care &amp; Men&apos;s Grooming in Bangkok
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              Expert haircut advice, beard care tips and men&apos;s grooming guides for Bangkok, from finding the right barber near you to choosing your next haircut and grooming style.
            </p>

            <div className="mt-8 max-w-2xl rounded-full border border-border bg-background/80 p-2 shadow-lg shadow-black/10 backdrop-blur-sm">
              <label className="flex items-center gap-3 px-2 py-2">
                <Search className="size-4 text-primary" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  type="button"
                  onClick={() => setQuery(search)}
                  className="border border-border bg-background/80 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">Featured reads</p>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Popular articles from the journal</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <article key={article.title} className="group flex h-full flex-col overflow-hidden border border-border bg-secondary/10">
                <div className="relative h-56 overflow-hidden border-b border-border bg-secondary/20">
                  <img src={article.image} alt={article.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">{article.meta}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl leading-tight text-foreground">{article.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{article.copy}</p>
                  {article.slug ? (
                    <Link
                      to="/barber-journal/$articleSlug"
                      params={{ articleSlug: article.slug }}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-foreground"
                    >
                      Read article <ArrowRight className="size-3.5" />
                    </Link>
                  ) : (
                    <Link to="/book" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-foreground">
                      Book a beard trim <ArrowRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mt-20 overflow-hidden border border-border bg-secondary/10 p-6 md:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,_rgba(205,152,87,0.15),_transparent_62%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">The style lab</p>
              <h2 className="mt-4 max-w-lg font-display text-2xl leading-tight text-foreground md:text-4xl">Find Your Next Look</h2>
              <p className="mt-5 max-w-md text-xs leading-6 text-muted-foreground md:text-sm">Forget the technical names for a moment. Pick the mood, then explore the advice that fits your hair and your routine.</p>

              <div className="mt-8 space-y-2">
                {groomingPaths.map((path) => {
                  const isActive = activePath.id === path.id;
                  return (
                    <button
                      key={path.id}
                      type="button"
                      onClick={() => setActivePathId(path.id)}
                      className={`flex w-full items-center gap-4 border p-4 text-left transition-colors ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background/40 text-foreground hover:border-primary"}`}
                    >
                      <span className={`font-display text-lg ${isActive ? "text-primary-foreground" : "text-primary"}`}>{path.number}</span>
                      <span className="flex-1 text-xs font-semibold md:text-sm">{path.label}</span>
                      <ArrowRight className={`size-4 ${isActive ? "translate-x-1" : "text-primary"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-border bg-background/80 p-6 md:p-8">
              <div className="flex items-start justify-between gap-5 border-b border-border pb-6">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-primary">Your direction</p>
                  <h3 className="mt-3 font-display text-xl leading-tight text-foreground md:text-2xl">{activePath.title}</h3>
                </div>
                <span className="font-display text-4xl text-primary/40">{activePath.number}</span>
              </div>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">{activePath.detail}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="border-l-2 border-primary px-4 py-2">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Maintenance</p>
                  <p className="mt-2 text-xs text-foreground md:text-sm">{activePath.maintenance}</p>
                </div>
                <div className="border-l-2 border-primary px-4 py-2">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Bangkok fit</p>
                  <p className="mt-2 text-xs text-foreground md:text-sm">{activePath.climate}</p>
                </div>
              </div>

              {activePath.slug ? (
                <Link to="/barber-journal/$articleSlug" params={{ articleSlug: activePath.slug }} className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-accent">
                  {activePath.action} <ArrowRight className="size-4" />
                </Link>
              ) : (
                <Link to="/book" className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-accent">
                  {activePath.action} <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">Journal archive</p>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Fresh reads from Bangkok grooming topics</h2>
            </div>
            <span className="text-sm text-muted-foreground">{filteredArticles.length} articles</span>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => (
              <article key={article.title} className="flex h-full flex-col overflow-hidden border border-border bg-secondary/10 transition-transform hover:-translate-y-1">
                <div className="border-b border-border bg-[radial-gradient(circle_at_top,_rgba(205,152,87,0.12),_transparent_55%)] p-4">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary">{article.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl leading-tight text-foreground">{article.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{article.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    {getJournalSlug(article.title) ? (
                      <Link
                        to="/barber-journal/$articleSlug"
                        params={{ articleSlug: getJournalSlug(article.title)! }}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-foreground"
                      >
                        Read article <ArrowRight className="size-3.5" />
                      </Link>
                    ) : (
                      <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-foreground">
                        Explore services <ArrowRight className="size-3.5" />
                      </Link>
                    )}
                    <Link to="/book" className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">
                      Book now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-border pt-12 text-center">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-primary">Need a recommendation?</p>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">Choose the right service for your style.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-accent"
            >
              Book Appointment <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-foreground hover:border-primary hover:text-primary"
            >
              Explore Services <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

const thaiJournalArticles = [
  ["Top Rated Barber in Bangkok: What Makes a Great Shop", "คู่มือบาร์เบอร์กรุงเทพฯ", "วิธีเลือกบาร์เบอร์ที่มีฝีมือ สะอาด และใส่ใจรายละเอียดก่อนจองคิว", "top-rated-barber-bangkok"],
  ["A Parent's Guide to Kids' Haircuts in Bangkok", "ผมเด็ก", "สิ่งที่ผู้ปกครองควรรู้ก่อนพาลูกมาตัดผม ให้ประสบการณ์สบายและเป็นมิตร", "kids-haircuts-bangkok"],
  ["Looking for an Affordable Barber Shop in Bangkok?", "คู่มือบาร์เบอร์กรุงเทพฯ", "แนวทางเลือกบาร์เบอร์ที่คุ้มค่า โดยไม่ต้องลดคุณภาพของบริการ", "affordable-barber-shop-bangkok"],
  ["Finding a Barber in Nana: A Practical Bangkok Guide", "นานา · สุขุมวิท", "เลือกบาร์เบอร์ใกล้นานาอย่างไรให้เดินทางสะดวกและได้ทรงที่ต้องการ", "barber-in-nana-bangkok"],
  ["Men's Haircare Guide for Bangkok's Hot & Humid Weather", "ดูแลเส้นผมและสภาพอากาศ", "เคล็ดลับดูแลเส้นผมและหนังศีรษะในอากาศร้อนชื้นของกรุงเทพฯ", "haircare-bangkok-humidity"],
  ["Complete Beard Grooming Guide for Men in Bangkok", "หนวดเคราและกรูมมิ่ง", "คู่มือดูแลหนวดเครา การแต่งทรง และการดูแลให้ดูเรียบร้อย", "beard-grooming-bangkok"],
] as const;

function ThaiGroomingGuidePage() {
  const [query, setQuery] = useState("");
  const articles = thaiJournalArticles.filter((article) => article[0].toLowerCase().includes(query.toLowerCase()) || article[1].includes(query) || article[2].includes(query));

  return (
    <div className="min-h-screen bg-background font-sans text-foreground"><SiteHeader /><main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:pt-32">
      <section className="border border-border bg-secondary/20 px-5 py-12 md:px-8 md:py-16"><h1 className="font-display text-4xl leading-tight md:text-6xl">บล็อก Bangkok Kropper</h1><h2 className="mt-4 font-display text-2xl text-primary md:text-3xl">เคล็ดลับตัดผม ดูแลหนวดเครา และกรูมมิ่งสำหรับกรุงเทพฯ</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">คำแนะนำจากผู้เชี่ยวชาญ ตั้งแต่การเลือกบาร์เบอร์ใกล้คุณ ไปจนถึงการเลือกทรงผมและสไตล์กรูมมิ่งที่เหมาะกับคุณ</p><label className="mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-border bg-background/80 p-4"><Search className="size-4 text-primary" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="คุณกำลังมองหาอะไรอยู่" className="w-full bg-transparent text-sm focus:outline-none" /></label></section>
      <section className="mt-16"><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">บทความแนะนำ</p><h2 className="mt-3 font-display text-3xl md:text-4xl">เรื่องน่าอ่านจาก Bangkok Kropper</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{articles.map(([title, category, excerpt, slug]) => <article key={slug} className="flex min-h-80 flex-col border border-border bg-secondary/10 p-5"><p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-primary">{category}</p><h3 className="mt-6 font-display text-2xl leading-tight">{title}</h3><p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{excerpt}</p><Link to="/barber-journal/$articleSlug" params={{ articleSlug: slug }} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">อ่านบทความ <ArrowRight className="size-3.5" /></Link></article>)}</div></section>
      <section className="mt-20 border-t border-border pt-12 text-center"><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">พร้อมสำหรับลุคใหม่หรือยัง</p><h2 className="mt-4 font-display text-4xl md:text-5xl">เลือกบริการที่เหมาะกับคุณ</h2><Link to="/book" className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground">จองคิว <ArrowRight className="size-4" /></Link></section>
    </main></div>
  );
}
