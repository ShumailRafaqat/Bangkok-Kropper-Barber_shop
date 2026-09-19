import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";

const stylePages = {
  men: {
    label: "Men's Haircuts",
    eyebrow: "Precision · Shape · Finish",
    description: "Sharp fades, classic cuts and considered grooming for a look that works every day.",
    hero: "/men1.png",
    cards: [["Low Fade", "/men1.png", "Gentle taper with a clean, confident finish."], ["Mid Fade", "/men2.png", "A balanced shape that stays sharp as it grows."], ["High Fade", "/men3.png", "Clean and sporty with a strong outline."], ["Skin Fade", "/men4.png", "Extra crisp edges for a fresh, standout finish."], ["French Crop", "/men5.png", "Short fringe forward, simple to style every morning."], ["Textured Crop", "/men6.png", "Playful texture on top with easy upkeep."]],
  },
  women: {
    label: "Women's Haircuts",
    eyebrow: "Texture · Movement · Style",
    description: "Thoughtful cuts, styling and color services shaped around your hair and routine.",
    hero: "/women3.png",
    cards: [["Soft Layers", "/Soft Layers.png", "Light movement and an easy, polished shape."], ["Modern Texture", "/womwn1.png", "A fresh cut designed around your natural texture."], ["Signature Style", "/Signature Style.png", "Confident shape with a considered finish."], ["Long Layers", "/womwn2.png", "Flowing shape with softness and natural movement."], ["Color Detail", "/women color1.png", "A considered color finish with bright dimension."], ["Classic Cut", "/Classiccut.png", "Clean, timeless styling made for everyday wear."]],
  },
  kids: {
    label: "Kids' Haircuts",
    eyebrow: "Comfort · Care · Confidence",
    description: "Patient, comfortable cuts with a neat finish and an easy experience for younger guests.",
    hero: "/kid1.png",
    cards: [["Classic Cut", "/kid1.png", "A neat, comfortable shape for school days."], ["Clean Fade", "/kid2.png", "A sharp blend with an easy, confident finish."], ["Side Detail", "/kid3.png", "A playful detail that keeps the cut distinctive."], ["Textured Crop", "/kid4.png", "Easy texture with a fun, low-maintenance shape."], ["Modern Crop", "/kid1.png", "A fresh everyday style built for active kids."], ["Signature Fade", "/kid2.png", "Clean lines and a comfortable chair experience."]],
  },
} as const;

type StyleSlug = keyof typeof stylePages;

const thaiStyleCopy: Record<StyleSlug, { label: string; eyebrow: string; description: string; cards: string[] }> = {
  men: { label: "ทรงผมผู้ชาย", eyebrow: "ความคม · รูปทรง · รายละเอียด", description: "เฟดคม ทรงคลาสสิก และการดูแลที่ใส่ใจ เพื่อสไตล์ที่เหมาะกับทุกวัน", cards: ["เฟดต่ำ", "เฟดกลาง", "เฟดสูง", "สกินเฟด", "เฟรนช์ครอป", "เท็กซ์เจอร์ครอป"] },
  women: { label: "ทรงผมผู้หญิง", eyebrow: "เท็กซ์เจอร์ · การเคลื่อนไหว · สไตล์", description: "ตัดผม จัดแต่งทรง และทำสีที่ออกแบบให้เข้ากับเส้นผมและกิจวัตรของคุณ", cards: ["เลเยอร์นุ่ม", "เท็กซ์เจอร์โมเดิร์น", "สไตล์ซิกเนเจอร์", "เลเยอร์ยาว", "รายละเอียดสี", "ทรงคลาสสิก"] },
  kids: { label: "ทรงผมเด็ก", eyebrow: "สบาย · ใส่ใจ · มั่นใจ", description: "ตัดผมอย่างใจเย็น สบาย และเรียบร้อย เพื่อประสบการณ์ที่ดีของเด็ก ๆ", cards: ["ทรงคลาสสิก", "เฟดคม", "รายละเอียดด้านข้าง", "เท็กซ์เจอร์ครอป", "โมเดิร์นครอป", "ซิกเนเจอร์เฟด"] },
};

export const Route = createFileRoute("/styles/$styleSlug")({
  head: ({ params }) => {
    const style = stylePages[params.styleSlug as StyleSlug];
    return {
      meta: [
        { title: style ? `${style.label} | Bangkok Kropper` : "Style Collection | Bangkok Kropper" },
        { name: "description", content: style?.description ?? "Explore haircut styles at Bangkok Kropper Barber Shop." },
      ],
    };
  },
  component: StylePage,
});

function StylePage() {
  const { styleSlug } = Route.useParams();
  const { language } = useI18n();
  const style = stylePages[styleSlug as StyleSlug];
  const thai = language === "th" ? thaiStyleCopy[styleSlug as StyleSlug] : undefined;

  if (!style) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-5 pb-24 pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">404 · {language === "th" ? "สไตล์" : "Style"}</p>
          <h1 className="mt-4 font-display text-4xl">{language === "th" ? "ไม่มีคอลเลกชันสไตล์นี้" : "That style collection is not available."}</h1>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            <ArrowLeft className="size-4" /> {language === "th" ? "กลับหน้าหลัก" : "Back home"}
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-foreground">
          <ArrowLeft className="size-4" /> {language === "th" ? "กลับหน้าหลัก" : "Back home"}
        </Link>
        <section className="relative mt-8 min-h-[22rem] overflow-hidden border-y border-border py-16 md:min-h-[27rem] md:py-20">
          <img src={style.hero} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-25 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="relative max-w-3xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-primary">{thai?.eyebrow ?? style.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-7xl">{thai?.label ?? style.label}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{thai?.description ?? style.description}</p>
            <p className="mt-6 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-muted-foreground">{language === "th" ? "03 สไตล์ซิกเนเจอร์" : "03 signature styles"}</p>
          </div>
        </section>
        <div className="style-page-reel mt-8 overflow-hidden border-y border-border py-3" aria-label={`${style.label} image series`}>
          <div className="style-page-reel-track flex w-max gap-3">
            {[...style.cards, ...style.cards].map(([title, image], index) => (
              <img
                key={`${title}-${index}`}
                src={image}
                alt=""
                aria-hidden="true"
                className="h-36 w-28 shrink-0 object-cover sm:h-44 sm:w-36"
              />
            ))}
          </div>
        </div>
        <section className="mt-10" aria-labelledby="style-collection">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{language === "th" ? "สำรวจสไตล์" : "Explore styles"}</p>
              <h2 id="style-collection" className="mt-3 font-display text-3xl uppercase">{language === "th" ? "ค้นหาลุคถัดไปของคุณ" : "Find your next look"}</h2>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {style.cards.map(([title, image, copy], index) => (
              <article key={title} className="group overflow-hidden border border-border bg-card transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-[20rem] overflow-hidden bg-black md:h-[22rem]">
                  <img src={image} alt={title} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="min-h-[7rem] bg-card px-4 py-4">
                  <h3 className="font-display text-xl uppercase leading-none text-foreground">{thai?.cards[index] ?? title}</h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">{language === "th" ? "ทรงที่ออกแบบอย่างใส่ใจ พร้อมการดูแลที่เหมาะกับคุณ" : copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
