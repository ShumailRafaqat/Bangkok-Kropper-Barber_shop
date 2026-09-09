import { useMemo, useState } from "react";
import { ArrowRight, Check, Clock3, MessageCircle } from "lucide-react";
import barberWork from "@/assets/barber-work.jpg";
import heroShop from "@/assets/hero-shop.jpg";
import { useI18n } from "@/lib/i18n";
import { getServiceDescription, getServiceName } from "@/data/service-translations";

type ServiceKind = "all" | "men" | "women" | "kids" | "color" | "treatments" | "grooming";
type MenuService = { id: string; name: string; category: ServiceKind; price: number; starting?: boolean; minutes: number; description: string; image: string };

const menu: MenuService[] = [
  { id: "shave-trim-beard", name: "Shave + Trim + Beard", category: "grooming", price: 400, minutes: 40, description: "Clean lines and a precise beard finish.", image: barberWork },
  { id: "haircut-shampoo", name: "Hair Cut + Shampoo", category: "men", price: 700, minutes: 60, description: "A complete cut, wash and finishing service.", image: barberWork },
  { id: "hair-trim-beard-shampoo", name: "Hair + Trim + Beard + Shampoo", category: "grooming", price: 1100, minutes: 90, description: "The full chair ritual with cut, beard and shampoo.", image: barberWork },
  { id: "kids-hair-cut", name: "Hair Cut Kids", category: "kids", price: 500, minutes: 35, description: "A patient, friendly cut for young clients.", image: barberWork },
  { id: "shampoo-spa-set", name: "Shampoo + Spa + Set Hair + Head Massage", category: "treatments", price: 390, minutes: 45, description: "Wash, scalp care, styling and head massage.", image: heroShop },
  { id: "men-hair-color", name: "Hair Color (Black/Brown)", category: "color", price: 1200, minutes: 90, description: "Natural black or brown color.", image: heroShop },
  { id: "beard-color", name: "Beard Color (Black/Brown)", category: "grooming", price: 500, minutes: 45, description: "Natural-looking beard color.", image: barberWork },
  { id: "fashion-color-men", name: "Hair Color (Fashion)", category: "color", price: 2500, starting: true, minutes: 180, description: "Fashion color starting from 2,500 THB.", image: heroShop },
  { id: "men-treatment", name: "Hair Treatment + Spa + Vitamin (Men)", category: "treatments", price: 600, minutes: 60, description: "Nourishing hair and scalp treatment.", image: heroShop },
  { id: "wax-ears-nose", name: "Wax (Ears/Nose)", category: "grooming", price: 200, minutes: 20, description: "A precise grooming finish for ears and nose.", image: barberWork },
  { id: "men-facial", name: "Facial Massage for Men", category: "treatments", price: 690, minutes: 45, description: "A refreshing facial massage.", image: heroShop },
  { id: "manicure-hands", name: "Manicure - Hands", category: "grooming", price: 350, minutes: 45, description: "Clean, cared-for hands with a precise finish.", image: heroShop },
  { id: "pedicure-feet", name: "Pedicure - Feet", category: "grooming", price: 350, minutes: 45, description: "Clean, cared-for feet with a precise finish.", image: heroShop },
  { id: "women-hair-cut", name: "Women Hair Cut", category: "women", price: 690, minutes: 60, description: "A considered cut shaped around your texture.", image: heroShop },
  { id: "shampoo-blow-dry", name: "Shampoo + Blow Dry", category: "women", price: 450, minutes: 45, description: "Fresh wash and polished blow dry.", image: heroShop },
  { id: "hair-color-women", name: "Hair Color Women", category: "color", price: 2000, starting: true, minutes: 120, description: "Women’s hair color starting from 2,000 THB.", image: heroShop },
  { id: "hair-spa", name: "Hair Spa S/M/L", category: "treatments", price: 600, minutes: 60, description: "Hair spa starting from 600 THB.", image: heroShop },
  { id: "volume-perm", name: "Volume Perm", category: "women", price: 2500, minutes: 180, description: "Soft, lasting volume.", image: heroShop },
  { id: "straightening", name: "Permanent Hair Straightening", category: "women", price: 2500, minutes: 180, description: "A smooth, polished finish.", image: heroShop },
  { id: "color-highlight", name: "Color Highlight", category: "color", price: 2500, starting: true, minutes: 150, description: "Dimensional highlights starting from 2,500 THB.", image: heroShop },
  { id: "fashion-color-women", name: "Hair Color (Fashion)", category: "color", price: 2500, starting: true, minutes: 180, description: "Fashion color starting from 2,500 THB.", image: heroShop },
  { id: "keratin-hair-treatment", name: "Hair Treatment Keratin", category: "treatments", price: 500, starting: true, minutes: 90, description: "Keratin treatment starting from 500 THB.", image: heroShop },
  { id: "women-facial", name: "Facial Massage for Women", category: "treatments", price: 600, minutes: 45, description: "A calming facial massage.", image: heroShop },
  { id: "brazilian-keratin", name: "Brazilian Keratin", category: "treatments", price: 1500, starting: true, minutes: 150, description: "Smoothing care starting from 1,500 THB.", image: heroShop },
];

export function ServicesExplorer() {
  const { language, t } = useI18n();
  const [category, setCategory] = useState<ServiceKind>("all");
  const [selectedId, setSelectedId] = useState(menu[0]!.id);
  const filtered = useMemo(() => category === "all" ? menu : menu.filter((item) => item.category === category), [category]);
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? menu[0]!;
  const chooseCategory = (next: ServiceKind) => { setCategory(next); const first = menu.find((item) => item.category === next); if (first) setSelectedId(first.id); };
  const serviceName = (item: MenuService) => getServiceName(language, item.id, item.name);
  const serviceDescription = (item: MenuService) => getServiceDescription(language, item.id, item.description);
  const whatsappLink = (item: MenuService) => `https://wa.me/66929050509?text=${encodeURIComponent(`Hi, I would like to book ${serviceName(item)} at Bangkok Kropper Barber Shop. I found Bangkok Kropper through your website.`)}`;

  return (
    <div className="space-y-10">
      <nav className="sticky top-16 z-20 -mx-2 flex gap-5 overflow-x-auto border-y border-border bg-background/95 px-2 py-4 backdrop-blur-xl" aria-label="Service categories">
        {[
          { id: "all" as const, label: t.allCategories },
          { id: "men" as const, label: t.categoryMen },
          { id: "women" as const, label: t.categoryWomen },
          { id: "kids" as const, label: t.categoryKids },
          { id: "color" as const, label: t.categoryColor },
          { id: "treatments" as const, label: t.categoryTreatments },
          { id: "grooming" as const, label: t.categoryGrooming },
        ].map((item) => <button key={item.id} type="button" onClick={() => chooseCategory(item.id)} className={`relative shrink-0 pb-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${category === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{item.label}{category === item.id && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary neon-ring" />}</button>)}
      </nav>

      <div className="flex items-center justify-between border-y border-border py-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t.servicesCatalog}</p><h2 className="mt-1 font-display text-xl uppercase text-foreground">{t.chooseService}</h2></div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{filtered.length} {t.options}</span>
      </div>

      <div key={category} className="service-grid grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => <article key={item.id} style={{ animationDelay: `${index * 55}ms` }} className={`service-card group relative overflow-hidden rounded-sm border bg-card/60 transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-[0_18px_45px_-25px_var(--color-primary)] ${selected.id === item.id ? "service-card-selected border-primary" : "border-border"}`}>
          <button type="button" aria-pressed={selected.id === item.id} onClick={() => setSelectedId(item.id)} className="service-card-content relative z-10 block w-full text-left">
            <div className="p-5"><p className="service-card-meta flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"><Clock3 className="size-3.5" /> {item.minutes} {t.minutes}</p><h3 className="service-card-title mt-3 font-display text-lg uppercase leading-tight text-foreground">{serviceName(item)}</h3><p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{serviceDescription(item)}</p><p className="service-card-price mt-5 font-display text-2xl text-primary">{item.starting ? `${t.startingFrom} ` : ""}{item.price.toLocaleString()} <span className="text-sm text-muted-foreground">THB</span></p></div>
          </button>
          <div className="service-card-footer relative z-10 border-t border-border p-3"><a href={whatsappLink(item)} target="_blank" rel="noreferrer" className="service-card-cta mx-auto inline-flex w-fit items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary-foreground"><MessageCircle className="size-3.5" /> {t.whatsappToBook} <ArrowRight className="size-3.5" /></a></div>
        </article>)}
      </div>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[1fr_1fr]">
        <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t.selectedService}</p><h2 className="mt-3 font-display text-2xl uppercase text-foreground">{serviceName(selected)}</h2><p className="mt-3 text-muted-foreground">{serviceDescription(selected)}</p><p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="size-4 text-primary" /> {selected.minutes} {t.minutes} · {selected.starting ? `${t.startingFrom} ` : ""}{selected.price.toLocaleString()} THB</p></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t.whatsIncluded}</p><ul className="mt-4 grid gap-2 sm:grid-cols-2"><li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-primary" /> {t.consultation}</li><li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-primary" /> {t.professionalService}</li><li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-primary" /> {t.cleanFinish}</li><li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-primary" /> {t.stylingAdvice}</li></ul><div className="mt-5"><a href={whatsappLink(selected)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"><MessageCircle className="size-3.5" /> {t.whatsappToBook} <ArrowRight className="size-3.5" /></a></div></div>
      </section>
    </div>
  );
}
