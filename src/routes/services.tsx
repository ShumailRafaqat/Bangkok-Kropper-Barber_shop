import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ServicesExplorer } from "@/components/services-explorer";
import { seoServices } from "@/data/seo-services";
import { useI18n } from "@/lib/i18n";

const seoThaiNames: Record<string, string> = {
  "mens-haircut": "ตัดผมผู้ชาย",
  "skin-fade": "สกินเฟด",
  "fade-haircut": "ตัดผมเฟด",
  "beard-trim": "แต่งหนวดเครา",
  "haircut-beard": "ตัดผม + หนวดเครา",
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Prices — Bangkok Kropper Barber Shop" },
      {
        name: "description",
        content:
          "Fades, straight-razor shaves, beard sculpting and Thai herbal head spa in Khlong Toei. Build your visit and see live pricing in Thai baht.",
      },
      { property: "og:title", content: "Services & Prices — Bangkok Kropper Barber Shop" },
      {
        property: "og:description",
        content:
          "Interactive menu of cuts, shaves and head spa treatments in Khlong Toei, Bangkok.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { language, t } = useI18n();
  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-accent">
          <span className="size-2 animate-pulse rounded-full bg-primary" /> {t.servicesIntroLabel}
        </p>
        <h1 className="mt-3 font-display text-xl uppercase tracking-wide text-foreground md:text-3xl">
          {t.servicesHeadline}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t.servicesDescription}
        </p>
        <div className="mt-12">
          <ServicesExplorer />
        </div>
        <section className="mt-16 border-t border-border pt-10" aria-labelledby="popular-services">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t.popularSearches}</p>
          <h2 id="popular-services" className="mt-3 font-display text-2xl uppercase text-foreground">
            {t.findExactService}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {seoServices.map((service) => (
              <Link
                key={service.slug}
                to="/$serviceSlug"
                params={{ serviceSlug: service.slug }}
                className="border border-border px-4 py-4 text-sm font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {language === "th" ? seoThaiNames[service.slug] ?? service.name : service.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
