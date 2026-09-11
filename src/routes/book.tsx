import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Flame, MapPin, ShieldCheck, Sparkles, UserRound, X } from "lucide-react";
import { BookingFlow } from "@/components/booking-flow";
import { SiteHeader } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";
import { specialOffers, type OfferAudience } from "@/data/offers";
import { getServiceName } from "@/data/service-translations";

const offerThaiNames: Record<string, string> = {
  "fresh-gentleman": "สุภาพบุรุษสดใหม่",
  "complete-grooming": "ดูแลครบชุด",
  "relax-care": "ผ่อนคลายและดูแล",
  "hair-refresh": "รีเฟรชเส้นผม",
  "beauty-care": "ดูแลความงาม",
};

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Chair — Bangkok Kropper Barber Shop" },
      {
        name: "description",
        content:
          "Book a haircut, beard trim or head spa at Bangkok Kropper in Khlong Toei. Pick your service, date and time, then confirm via WhatsApp in under a minute.",
      },
      { property: "og:title", content: "Book Your Chair — Bangkok Kropper Barber Shop" },
      {
        property: "og:description",
        content:
          "A premium step-by-step booking experience: service, date, time, details, then confirm via WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "/book" },
      { rel: "alternate", hrefLang: "th", href: "/book?lang=th" },
      { rel: "alternate", hrefLang: "x-default", href: "/book" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { language, t } = useI18n();
  const [showDeals, setShowDeals] = useState(false);
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [dealAudience, setDealAudience] = useState<OfferAudience | null>(null);

  useEffect(() => {
    const hasDeal = new URLSearchParams(window.location.search).has("deal");
    if (!hasDeal) setShowDeals(true);
  }, []);

  const closeDeals = () => {
    setShowDeals(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-24 pt-28">
      <SiteHeader />
      {showDeals && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/35 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-deals-title">
          <div className="relative max-h-[90vh] w-full max-w-2xl animate-rise overflow-y-auto rounded-2xl border border-border bg-background p-5 shadow-2xl sm:p-8">
            <button type="button" onClick={closeDeals} aria-label="Close special deals" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <X className="size-4" />
            </button>
            <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-primary"><Flame className="size-4" /> {t.beforeBook}</p>
            {!showAudiencePicker ? (
              <>
                <h2 id="booking-deals-title" className="mt-3 max-w-lg font-display text-2xl uppercase leading-none text-foreground sm:text-3xl">{t.saveWithCombination}</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{t.beforeBookText}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => setShowAudiencePicker(true)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent">{t.viewSpecialDeals} <ArrowRight className="size-3.5" /></button>
                  <button type="button" onClick={closeDeals} className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-primary">{t.continueRegular}</button>
                </div>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setDealAudience(null)} className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-3.5" /> {language === "th" ? "เลือกใหม่" : "Choose again"}</button>
                <h2 className="mt-4 font-display text-2xl uppercase leading-none text-foreground sm:text-3xl">{t.chooseCollection}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.chooseCollectionText}</p>
                {!dealAudience ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {(["men", "women"] as const).map((audience) => (
                      <button key={audience} type="button" onClick={() => setDealAudience(audience)} className="group rounded-2xl border border-border bg-secondary/25 p-5 text-left transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/10">
                        <span className="grid size-11 place-items-center rounded-full border border-primary/40 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><UserRound className="size-5" /></span>
                        <span className="mt-4 block font-display text-2xl uppercase text-foreground">{audience === "men" ? t.mensDeals : t.womensDeals}</span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted-foreground">{audience === "men" ? (language === "th" ? "การดูแลและพิธีกรรมบาร์เบอร์" : "Grooming and barber rituals") : (language === "th" ? "ทำสี ดูแล และจัดแต่งทรง" : "Color, care and styling")}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 grid gap-3">
                    {specialOffers.filter((offer) => offer.audience === dealAudience).map((offer) => (
                      <article key={offer.id} className="rounded-xl border border-border bg-secondary/30 p-4">
                        <div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl uppercase text-foreground">{language === "th" ? offerThaiNames[offer.id] ?? offer.name : offer.name}</h3><span className="shrink-0 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-primary">{language === "th" ? t.saveLabel : "Save"} {offer.savings} THB</span></div>
                        <div className="mt-3 space-y-1 text-xs text-muted-foreground">{offer.items.map((item) => <p key={item.serviceId}>{getServiceName(language, item.serviceId, item.name)}</p>)}</div>
                        <div className="mt-4 flex items-end justify-between border-t border-border pt-3"><div><p className="text-[0.62rem] text-muted-foreground line-through">{offer.originalTotal.toLocaleString()} THB</p><p className="font-display text-2xl text-primary">{offer.dealPrice.toLocaleString()} THB</p></div><a href={`/book?deal=${offer.id}`} onClick={closeDeals} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-accent">{t.bookDeal} <ArrowRight className="size-3" /></a></div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_70%_10%,color-mix(in_oklab,var(--color-primary)_12%,transparent),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid min-w-0 max-w-full gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent">
              Bangkok Kropper · Khlong Toei
            </p>
            <h1 className="mt-4 font-display text-2xl uppercase leading-[0.98] tracking-wide text-foreground md:text-3xl">
              {t.reserve}
              <br />
              your <span className="text-primary neon-text">{t.chair}</span>
            </h1>
            <p className="mt-6 max-w-sm text-muted-foreground">
              {t.bookIntro}
            </p>
            <div className="mt-8 space-y-3 border-l border-primary/40 pl-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <Clock3 className="size-4 text-primary" /> {t.under60}
              </p>
              <p className="flex items-center gap-3">
                <ShieldCheck className="size-4 text-primary" /> {t.noPayment}
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" /> 33 Sukhumvit Rd
              </p>
            </div>
            <div className="mt-10 hidden border-t border-border pt-5 lg:block">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
                <Sparkles className="size-3.5" /> {t.chairShape}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {t.bookIntro}
              </p>
            </div>
          </aside>

          <div className="min-w-0 max-w-full">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {t.digitalConcierge}
                </p>
                <p className="mt-2 font-display text-2xl uppercase tracking-wide text-foreground">
                  {t.nextCut}
                </p>
              </div>
            </div>

            <div className="animate-rise mt-6">
              <BookingFlow />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
