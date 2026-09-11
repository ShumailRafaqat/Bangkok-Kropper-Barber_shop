import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3, MapPin } from "lucide-react";
import { getSeoService } from "@/data/seo-services";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";
import { getServiceDescription, getServiceName } from "@/data/service-translations";

export const Route = createFileRoute("/$serviceSlug")({
  head: ({ params }) => {
    const service = getSeoService(params.serviceSlug);
    const title = service
      ? `${service.name} in Bangkok | Bangkok Kropper`
      : "Service Not Found | Bangkok Kropper";
    const description = service
      ? `${service.description} Book your chair at Bangkok Kropper, 33 Sukhumvit Rd, Khlong Toei.`
      : "Explore haircuts, fades, beard trims and grooming services at Bangkok Kropper in Sukhumvit, Bangkok.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { serviceSlug } = Route.useParams();
  const { language } = useI18n();
  const service = getSeoService(serviceSlug);

  if (!service) {
    return (
      <main className="min-h-screen bg-background px-5 pb-24 pt-32 text-foreground">
        <SiteHeader />
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">404 · Service</p>
          <h1 className="mt-4 font-display text-3xl uppercase">That service is not on the menu.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Browse the full Bangkok Kropper menu or speak to the team about what you have in mind.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground"
          >
            View all services <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    );
  }

  const localizedName = getServiceName(language, service.slug, service.name);
  const localizedDescription = getServiceDescription(language, service.slug, service.description);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: {
              "@type": "HairSalon",
              name: "Bangkok Kropper",
              telephone: "+66 92 905 0509",
              address: {
                "@type": "PostalAddress",
                streetAddress: "33 Sukhumvit Rd",
                addressLocality: "Khlong Toei",
                addressRegion: "Bangkok",
                postalCode: "10110",
                addressCountry: "TH",
              },
            },
            areaServed: "Sukhumvit, Bangkok",
            offers: {
              "@type": "Offer",
              price: service.price,
              priceCurrency: "THB",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32">
        <nav className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <span className="mx-2 text-border">/</span>
          <Link to="/services" className="transition-colors hover:text-primary">Services</Link>
          <span className="mx-2 text-border">/</span>
            <span className="text-primary">{localizedName}</span>
        </nav>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="relative min-h-[22rem] overflow-hidden rounded-sm border border-primary/40 bg-card md:min-h-[30rem]">
            <img src={service.image} alt={`${localizedName} at Bangkok Kropper`} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Bangkok Kropper · Sukhumvit</p>
              <h1 className="mt-3 max-w-xl font-display text-3xl uppercase leading-[0.95] text-foreground md:text-5xl">{localizedName}</h1>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-border bg-card/60 p-6 md:p-9">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
                <Clock3 className="size-4" /> {service.minutes} min chair time
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{localizedDescription}</p>
              <p className="mt-5 leading-7 text-muted-foreground">{language === "th" ? "บริการที่ออกแบบให้เหมาะกับสภาพผมและสไตล์ของคุณ พร้อมคำแนะนำจากช่างมืออาชีพ" : service.details}</p>
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Service price</p>
              <p className="mt-1 font-display text-4xl text-primary neon-text">
                {service.price.toLocaleString()} <span className="text-xl text-muted-foreground">THB</span>
              </p>
              <Link
                to="/book"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary px-5 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground neon-ring"
              >
                Book this service <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">What is included</p>
            <h2 className="mt-3 font-display text-2xl uppercase">{language === "th" ? "ใส่ใจเพื่อผลลัพธ์ที่เรียบร้อย" : "Built for a clean finish"}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-center gap-3 border border-border px-4 py-3 text-sm text-muted-foreground">
                  <Check className="size-4 shrink-0 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l border-primary/40 pl-6 md:pl-8">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              <MapPin className="size-4" /> Find the chair
            </p>
            <h2 className="mt-3 font-display text-2xl uppercase">33 Sukhumvit Road</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Khlong Toei, Bangkok 10110. Walk-ins are welcome when a chair is free, but booking ahead gets you the right time and barber.
            </p>
            <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary hover:text-foreground">
              Explore more services <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
