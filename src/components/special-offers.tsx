import { useEffect, useRef, useState } from "react";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { specialOffers, type OfferAudience } from "@/data/offers";
import { getServiceName } from "@/data/service-translations";
import { useI18n } from "@/lib/i18n";

const offerNames = {
  en: {
    "fresh-gentleman": "Fresh Gentleman",
    "complete-grooming": "Complete Grooming",
    "relax-care": "Relax & Care",
    "hair-refresh": "Hair Refresh",
    "beauty-care": "Beauty Care",
  },
  th: {
    "fresh-gentleman": "สุภาพบุรุษสดใหม่",
    "complete-grooming": "ดูแลครบชุด",
    "relax-care": "ผ่อนคลายและดูแล",
    "hair-refresh": "รีเฟรชเส้นผม",
    "beauty-care": "ดูแลความงาม",
  },
} as const;

export function SpecialOffers() {
  const { language, t } = useI18n();
  const [audience, setAudience] = useState<OfferAudience>("men");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visibleOffers = specialOffers.filter((offer) => offer.audience === audience);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.16 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="offers" className={`deals-section border-y border-border bg-secondary/45 px-5 py-20 ${visible ? "deals-section-visible" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="deals-copy">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-primary">
              <Flame className="size-4" /> {t.specialDeals}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-2xl uppercase leading-[0.92] tracking-wide text-foreground md:text-4xl">
              {t.combineServices}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              {t.curatedDeals}
            </p>
          </div>
          <div className="deals-switcher flex rounded-full border border-border bg-background/70 p-1">
            {(["men", "women"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setAudience(item)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all ${audience === item ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item === "men" ? t.mensDeals : t.womensDeals}
              </button>
            ))}
          </div>
        </div>

        <div key={audience} className="mt-10 grid gap-5 lg:grid-cols-3">
          {visibleOffers.map((offer, index) => (
            <article key={offer.id} style={{ animationDelay: `${index * 75}ms` }} className="deals-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background/80 p-5 shadow-[0_20px_50px_-35px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/70">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-primary">{t.dealLabel} 0{index + 1}</p>
                  <h3 className="mt-2 font-display text-xl uppercase text-foreground">{offerNames[language][offer.id as keyof typeof offerNames.en] ?? offer.name}</h3>
                </div>
                <span className="rounded-full border border-primary/45 bg-primary/10 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-primary">{t.saveLabel} {offer.savings} THB</span>
              </div>

              <div className="mt-6 space-y-3 border-y border-border py-4">
                {offer.items.map((item) => (
                  <div key={item.serviceId} className="flex items-start justify-between gap-4 text-sm">
                    <span className="flex items-start gap-2 text-muted-foreground"><Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />{getServiceName(language, item.serviceId, item.name)}</span>
                    <span className="shrink-0 font-semibold text-foreground">{item.price.toLocaleString()} THB</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground line-through">{t.normalTotal}: {offer.originalTotal.toLocaleString()} THB</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t.discount}: -{offer.savings.toLocaleString()} THB</p>
                  <p className="mt-1 font-display text-3xl text-primary">{offer.dealPrice.toLocaleString()} <span className="text-sm text-muted-foreground">THB</span></p>
                </div>
                <span className="text-right text-[0.58rem] font-bold uppercase tracking-[0.16em] text-primary">{t.youSave}<br />{offer.savings} THB</span>
              </div>

              <a href={`/book?deal=${offer.id}`} className="mt-6 inline-flex items-center justify-between rounded-full bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-accent">
                {t.bookDeal} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
