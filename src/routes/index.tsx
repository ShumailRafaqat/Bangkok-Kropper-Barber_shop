import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Instagram, MapPin, Phone, Quote, Scissors, Star } from "lucide-react";
import { ADDRESS, ADDRESS_TWO, MAPS_EMBED, MAPS_EMBED_TWO, MAPS_LINK, MAPS_LINK_TWO, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ServicesExplorer } from "@/components/services-explorer";
import { SpecialOffers } from "@/components/special-offers";
import { useI18n } from "@/lib/i18n";
import heroShop from "@/assets/hero-shop.jpg";
import barberWork from "@/assets/barber-work.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bangkok Kropper | Best Barber Shop in Bangkok" },
      {
        name: "description",
        content:
          "Bangkok Kropper is a professional barber shop with locations in Sukhumvit and Phaya Thai, Bangkok. We offer precision haircuts, modern fades, styling, beard trims, and premium grooming for both men and women.",
      },
      { property: "og:title", content: "Bangkok Kropper | Best Barber Shop in Bangkok" },
      {
        property: "og:description",
        content: "Signature fades, royal razor shaves and herbal head spa. 4.9★, 667 reviews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const googleReviewLink =
  "https://www.google.com/search?q=best+barber+shop+in+bangkok&oq=best+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIQCAEQLhjHARixAxjRAxiABDIGCAIQRRg5MgYIAxAjGCcyCggEEAAYsQMYgAQyCggFEAAYsQMYgAQyCggGEAAYsQMYgAQyCggHEAAYsQMYgAQyEAgIEAAYgwEYsQMYgAQYigUyBwgJEAAYgATSAQgxODMxajBqN6gCCLACAfEFJQ3-WJUzjUg&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dEpqSTZGd3QzUElEcml2dXF0UU92OUNvZ0RySG5KbzY5TGhxT0tTVVRITF92amtyNHhBN20yQnRRSHd2eDE5ZnlVYVREemQwdkFxcHlYeDJIOG5pYl9DTHpBSWgzc193RGZwUDNST3NoV0E3eTVjQ053EhZBbm1kYXJtaU9yeW1rZFVQeTZ5ekFRGiJBRHNyOWZSc3dpNkRfbm5ScWZlWGhPQmhaYlJhbEdib0NBEgQ4MDUxGgEzKgAwADgBQAAYACDb5emeAkoCEAI";

const reviews = [
  ["I had a great experience at this barber shop in Bangkok. I’m a tourist visiting the city, and they gave me an excellent haircut. The staff was very professional, friendly, and understood exactly what I wanted. The service was clean, quick, and well-organized. I’m really happy with the result and would highly recommend this place to anyone visiting Bangkok.", "Sagar Sonar", "Google review"],
  ["Lucky to have found this nice shop. They are all professionals who can give you sound advice and do their job nicely. Furthermore, they are good in English and one of them can even understand and speak Mandarin. Whatever you would like to have done, beard or hair, just go to them.", "Victor Gomes", "Google review"],
  ["One of the best experiences I’ve had in a barber shop. Maa pays so much attention to detail, the fade was immaculate, and he was very gentle. He also razor shaved the edges and wiped me with a warm towel afterwards. Highly recommend.", "Ryan Muir", "Google review"],
  ["I cut my hair and beard here, and the result was really good. The barber was professional, careful, and paid attention to the details. The place was clean, the service was smooth, and I left very happy with the haircut and beard trim. Highly recommended! Special thanks to Fong.", "Ahmed Alhefeiti", "Google review"],
  ["Exceptional! Decided to wash and dry my hair as my partner was cutting his and I had a lovely time. My hair turned out perfect. Such a good late night pick me up.", "Judith Louis", "Google review"],
] as const;

const galleryItems = [
  ["01", "Signature fade", "/1.PNG"], ["02", "Hot towel ritual", "/2.PNG"], ["04", "Shop details", "/4.png"], ["05", "Classic cut", "/5.png"],
  ["07", "Sharp finish", "/7.png"], ["08", "The chair", "/8.png"], ["09", "Razor work", "/9.png"], ["10", "Color session", "/10.png"],
] as const;

const galleryThaiLabels: Record<string, string> = {
  "Signature fade": "เฟดซิกเนเจอร์",
  "Hot towel ritual": "พิธีผ้าร้อน",
  "Beard sculpt": "แต่งทรงหนวดเครา",
  "Shop details": "รายละเอียดภายในร้าน",
  "Classic cut": "ทรงคลาสสิก",
  "Head spa": "เฮดสปา",
  "Sharp finish": "เก็บรายละเอียดคมกริบ",
  "The chair": "เก้าอี้ของเรา",
  "Razor work": "งานมีดโกน",
  "Color session": "การทำสีผม",
  "Fresh shape": "ทรงผมใหม่",
  "Khlong Toei": "คลองเตย",
  "Clean lines": "เส้นคมสะอาด",
  "After the cut": "หลังตัดผม",
  "Detail work": "งานเก็บรายละเอียด",
  "Bangkok texture": "สไตล์กรุงเทพฯ",
  "New look": "ลุคใหม่",
  "The finish": "ผลงานที่เสร็จสมบูรณ์",
  "In the room": "บรรยากาศในร้าน",
  "Ready chair": "เก้าอี้พร้อมบริการ",
};

const reviewThai = [
  "ประสบการณ์ยอดเยี่ยม ช่างใส่ใจในทุกรายละเอียด เฟดสวยมาก โกนขอบอย่างประณีต และมีผ้าร้อนให้บริการ ประทับใจมากและแนะนำอย่างยิ่ง",
  "หนึ่งในประสบการณ์ที่ดีที่สุดที่เคยได้รับในร้านบาร์เบอร์ ช่างใส่ใจรายละเอียดและให้บริการอย่างนุ่มนวล แนะนำอย่างมาก",
  "ร้านสะอาด บริการเป็นมืออาชีพ และช่างเข้าใจสไตล์ที่ต้องการ ผลลัพธ์ออกมาดีมาก",
  "ตัดผมและแต่งหนวดที่นี่แล้วพอใจมาก ช่างละเอียดและบริการราบรื่น แนะนำเป็นอย่างยิ่ง",
  "บริการยอดเยี่ยม ผมออกมาสวยและได้รับการดูแลอย่างดี เป็นประสบการณ์ที่ผ่อนคลายมาก",
];

const faqThai = [
    ["ร้าน Bangkok Kropper Barber Shop อยู่ที่ไหน", "Bangkok Kropper Barber Shop มี 2 สาขา: 33 ถนนสุขุมวิท คลองเตย กรุงเทพฯ 10110 และ 2/3 พหลโยธิน 7 พญาไท กรุงเทพฯ 10400 ประเทศไทย"],
    ["มีร้านบาร์เบอร์ใกล้สุขุมวิทในกรุงเทพฯ หรือไม่", "มี Bangkok Kropper ให้บริการตัดผมและดูแลบุคลิกภาพบนถนนสุขุมวิทในย่านคลองเตย กรุงเทพฯ"],
    ["Bangkok Kropper Barber Shop มีบริการอะไรบ้าง", "เรามีบริการตัดผมผู้ชาย หนวดเครา โกนหนวด สระผม ทำสี ทรีตเมนต์ เฮดสปาสมุนไพรไทย บริการผู้หญิง และตัดผมเด็ก"],
    ["มีบริการตัดผมผู้ชายหรือไม่", "มี เราให้บริการตัดผมผู้ชาย เฟด แต่งหนวดเครา โกนหนวด จัดแต่งทรง และทรีตเมนต์ดูแลเส้นผม"],
    ["มีบริการแต่งหนวดเคราและโกนหนวดในกรุงเทพฯ หรือไม่", "มี บริการกรูมมิ่งของเรารวมถึงการแต่งหนวดเคราและการโกนหนวด"],
    ["มีบริการทำผมสำหรับผู้หญิงหรือไม่", "มี เรามีตัดผม สระและไดร์ แฮร์สปา ทำสี ไฮไลต์ เคราติน ดัดผม และยืดผมถาวรสำหรับผู้หญิง"],
    ["มีบริการทำสีผมในกรุงเทพฯ หรือไม่", "มี เรามีสีผมทั่วไป สีแฟชั่น และไฮไลต์ ราคาสุดท้ายขึ้นอยู่กับความยาวและบริการที่เลือก"],
    ["มีบริการตัดผมเด็กหรือไม่", "มี เรามีบริการตัดผมเด็กพร้อมการดูแลอย่างอ่อนโยน"],
    ["จองตัดผมผ่าน WhatsApp ได้หรือไม่", "ได้ ติดต่อเราได้ที่ WhatsApp +66 92 905 0509 เพื่อสอบถามคิว บริการ และราคา"],
    ["จะเดินทางไป Bangkok Kropper Barber Shop ได้อย่างไร", "เราอยู่ที่ 33 ถนนสุขุมวิท คลองเตย กรุงเทพฯ 10110 และสามารถค้นหาสถานที่ผ่าน Google Maps ได้"],
  ] as const;
const faqs = [
  ["Where is your barber shop located in Bangkok?", "Bangkok Kropper Barber Shop has two Bangkok locations: 33 Sukhumvit Rd, Khlong Toei, Bangkok 10110, and 2/3 Phahon Yothin 7, Phaya Thai, Bangkok 10400, Thailand. You can also find maps and directions in our Locations section."],
  ["Is your barber shop near Nana BTS or Asok BTS?", "Yes. Our Sukhumvit location is conveniently located near Nana BTS, making it easy to reach by public transportation."],
  ["What are your opening hours?", "We’re open from 9:00 AM to 5:00 AM, which means we’re open 20 hours a day for your convenience."],
  ["Do I need an appointment, or do you accept walk-ins?", "Both! We welcome appointments and walk-ins, so you can visit us whichever way is more convenient for you."],
  ["Do you provide haircuts for men, women, and kids?", "Yes. We provide haircuts for men, women, and kids, along with a variety of other grooming and hair services."],
  ["Do your barbers speak English?", "Yes. We have barbers who can assist you in English, making it easy to communicate exactly what haircut or style you want."],
  ["Do you provide skin fades, taper fades, and classic haircuts?", "Absolutely. Skin fades, taper fades, and classic haircuts are some of our specialties."],
  ["Can your barber recommend a hairstyle suitable for my face shape?", "Yes. Our experienced barbers can recommend a hairstyle based on your face shape, hair type, and personal style."],
  ["Can I show the barber a photo of the haircut I want?", "Of course! Feel free to show us a reference photo. Our barbers will work to deliver a haircut that matches your expectations as closely as possible."],
  ["Do you offer hair washing and styling with a haircut?", "Yes. You can choose a haircut with shampoo, along with other available grooming and styling services."],
  ["How much does a haircut cost in Bangkok?", "Our prices vary depending on the service you choose. You can find the current prices for haircuts and all other services in our Services section."],
  ["What payment methods do you accept?", "We accept cash, card payments, and PromptPay."],
  ["Is parking available near the barber shop?", "Yes, parking is available near the barber shop."],
  ["What happens if I arrive late for my appointment?", "No problem. We understand that delays can happen, and we’ll do our best to accommodate you at the earliest available time."],
  ["Why should I choose your barber shop in Bangkok?", "Our founder brings over 18 years of experience to the business, and customer satisfaction has always been one of our top priorities. We’re proud to be a highly reviewed barber shop in Bangkok, trusted and recommended by many of our customers."],
] as const;

function Home() {
  const [activeReview, setActiveReview] = useState(0);
  const [activeGallery, setActiveGallery] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryAnimationKey, setGalleryAnimationKey] = useState(0);
  const galleryPointerStart = useRef<number | null>(null);
  const [galleryDrag, setGalleryDrag] = useState(0);
  const [locationsVisible, setLocationsVisible] = useState(false);
  const { language, t } = useI18n();
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveGallery((current) => (current + 1) % galleryItems.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const moveGallery = (direction: 1 | -1) => {
    setActiveGallery((current) => (current + direction + galleryItems.length) % galleryItems.length);
    setGalleryDrag(0);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const galleryPhotoIndex = (offset: number) =>
    (activeGallery + offset + galleryItems.length) % galleryItems.length;

  useEffect(() => {
    const gallery = document.getElementById("gallery");
    if (!gallery || !("IntersectionObserver" in window)) {
      setGalleryVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setGalleryVisible(entry?.isIntersecting ?? false),
      { threshold: 0.18 },
    );
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const replayGallery = () => setGalleryAnimationKey((current) => current + 1);
    window.addEventListener("bk-gallery-animate", replayGallery);
    return () => window.removeEventListener("bk-gallery-animate", replayGallery);
  }, []);

  useEffect(() => {
    const locations = document.getElementById("locations");
    if (!locations || !("IntersectionObserver" in window)) {
      setLocationsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setLocationsVisible(entry?.isIntersecting ?? false),
      { threshold: 0.12 },
    );
    observer.observe(locations);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <Scissors className="hero-float absolute left-[8%] top-[28%] size-8 rotate-[-24deg] text-primary/20 md:size-11" />
          <Scissors className="hero-float absolute right-[10%] top-[22%] size-6 rotate-[58deg] text-accent/20 md:size-9" style={{ animationDelay: "-3s" }} />
          <span className="hero-float absolute bottom-[25%] right-[19%] h-px w-16 rotate-[-28deg] bg-primary/15 md:w-24" style={{ animationDelay: "-1.5s" }} />
        </div>
        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:py-20">
          <div className="relative z-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-sm border border-primary/50 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">
              <Star className="size-3 fill-primary" /> 4.9★ · 667 Google reviews
            </span>

            <h1
              className="mt-5 max-w-xl font-display uppercase leading-[0.82] tracking-[-0.04em] text-foreground transition-all duration-700 ease-out text-[1.9rem] sm:text-[2.5rem] lg:text-[3.3rem]"
              style={{
                textShadow: "0 0 28px rgba(184, 139, 69, 0.14)",
                filter: `drop-shadow(0 18px 24px rgba(0, 0, 0, 0.12))`,
                lineHeight: "0.82",
              }}
            >
              <span className="inline-block text-foreground">Bangkok</span>{" "}
              <span className="text-primary neon-text inline-block">Kropper</span>
              <br className="mt-2 block" />
              <span className="text-accent inline-block pt-2">Barber Shop</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {t.heroDescription}
            </p>

            <div className="mt-9 flex flex-wrap gap-2.5">
              <a
                href="/book"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_var(--color-primary)] neon-ring"
              >
                <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-18deg] bg-white/25 transition-transform duration-500 group-hover:translate-x-[360%]" />
                <Phone className="relative size-3.5" /> <span className="relative">{t.bookCta}</span>
              </a>

              <a
                href="#offers"
                className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowRight className="size-3.5" /> {t.specialDeals}
              </a>
            </div>
          </div>
          <div className="relative min-h-[24rem] overflow-hidden border border-border md:min-h-[34rem]">
            <img
              src="/hero.png"
              alt="Bangkok Kropper Barber Shop storefront"
              width={606}
              height={891}
              className="size-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 border-l-2 border-primary bg-background/75 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-sm">
              Bangkok Kropper · Est. 2024
            </span>
          </div>
        </div>
      </section>

      <SpecialOffers />

      {/* Services preview */}
      <section id="services" className="border-b border-border bg-card/20 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">{t.services}</p><h2 className="mt-3 font-display text-xl uppercase tracking-wide text-foreground md:text-3xl">{t.menuCta}</h2></div>
            <a href="/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-foreground">{t.menuCta} <ArrowRight className="size-4" /></a>
          </div>
          <div className="mt-10">
            <ServicesExplorer />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section key={galleryAnimationKey} id="gallery" className={`gallery-section border-b border-border bg-background px-5 py-20 ${galleryVisible ? "gallery-section-visible" : ""}`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">{t.visualArchive}</p>
              <h2 className="mt-3 max-w-2xl font-display text-xl uppercase leading-none tracking-wide text-foreground sm:text-2xl md:text-4xl">{t.framesFromChair}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">{t.galleryDescription}</p>
          </div>
          <div
            className="cinematic-gallery-stage mx-auto mt-8 w-full max-w-6xl"
            onPointerDown={(event) => {
              galleryPointerStart.current = event.clientX;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (galleryPointerStart.current !== null) setGalleryDrag(event.clientX - galleryPointerStart.current);
            }}
            onPointerUp={(event) => {
              if (galleryPointerStart.current !== null) {
                const delta = event.clientX - galleryPointerStart.current;
                if (Math.abs(delta) > 45) moveGallery(delta < 0 ? 1 : -1);
              }
              galleryPointerStart.current = null;
              setGalleryDrag(0);
            }}
            onPointerCancel={() => {
              galleryPointerStart.current = null;
              setGalleryDrag(0);
            }}
          >
            {([-1, 0, 1] as const).map((offset) => {
              const [number, label, image] = galleryItems[galleryPhotoIndex(offset)]!;
              const localizedLabel = language === "th" ? galleryThaiLabels[label] ?? label : label;
              const position = offset === -1 ? "cinematic-gallery-prev" : offset === 1 ? "cinematic-gallery-next" : "cinematic-gallery-current";
              const depth = offset === -1 ? " rotateY(18deg) scale(0.82)" : offset === 1 ? " rotateY(-18deg) scale(0.82)" : "";
              return <a key={`${number}-${activeGallery}`} href="/services" aria-label={`Open ${localizedLabel} service gallery item`} className={`cinematic-gallery-card ${position}`} style={{ transform: `translate3d(calc(-50% + ${galleryDrag}px), -50%, 0)${depth}` }}>
                <img src={image} alt={`${label} at Bangkok Kropper Barber Shop`} />
                <div className="cinematic-gallery-gradient" />
                <div className="cinematic-gallery-caption"><span>{number} / {localizedLabel}</span><ArrowRight className="size-4" /></div>
              </a>;
            })}
            <button type="button" aria-label="Previous gallery image" onClick={() => moveGallery(-1)} className="cinematic-gallery-arrow cinematic-gallery-arrow-prev"><ArrowRight className="size-4 rotate-180" /></button>
            <button type="button" aria-label="Next gallery image" onClick={() => moveGallery(1)} className="cinematic-gallery-arrow cinematic-gallery-arrow-next"><ArrowRight className="size-4" /></button>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-muted-foreground">{String(activeGallery + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</span>
            <div className="gallery-progress flex items-center gap-2" aria-label="Gallery slideshow progress">
              {Array.from({ length: galleryItems.length }).map((_, index) => <span key={index} className={`h-1 transition-all duration-700 ${index === activeGallery ? "w-8 bg-primary" : "w-2 bg-border"}`} />)}
            </div>
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-primary">Infinite archive</span>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className={`locations-section border-b border-border bg-card/20 px-5 py-12 ${locationsVisible ? "locations-visible" : ""}`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-accent"><MapPin className="size-4" /> {t.locations}</p>
              <h2 className="mt-3 font-display text-xl uppercase tracking-wide text-foreground md:text-3xl">{t.findYourChair}</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{t.visitLocations}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              { number: "01", name: language === "th" ? "คลองเตย · สุขุมวิท" : "Khlong Toei · Sukhumvit", address: ADDRESS, embed: MAPS_EMBED, link: MAPS_LINK },
              { number: "02", name: language === "th" ? "พญาไท · พหลโยธิน" : "Phaya Thai · Phahon Yothin", address: ADDRESS_TWO, embed: MAPS_EMBED_TWO, link: MAPS_LINK_TWO },
            ].map((location) => <article key={location.number} className="location-card group relative overflow-hidden border border-border bg-background">
              <div className="location-map relative h-[22rem] overflow-hidden bg-black sm:h-[25rem]">
                <iframe title={`Map for ${location.name}`} src={location.embed} loading="lazy" className="location-map-frame absolute inset-[-7%] h-[114%] w-[114%] border-0 grayscale-[45%] contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0" />
                <div className="location-map-shade absolute inset-0" />
                <svg className="location-route absolute inset-0 size-full" viewBox="0 0 600 360" fill="none" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M72 292 C 142 250, 166 176, 257 206 S 362 280, 438 183 S 497 91, 536 62" />
                </svg>
                <span className="location-pin absolute left-[72%] top-[23%] text-primary">
                  <span className="location-radar absolute -inset-5 rounded-full border border-primary/70" />
                  <span className="location-radar location-radar-delay absolute -inset-5 rounded-full border border-primary/50" />
                  <MapPin className="relative size-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.55)]" fill="currentColor" />
                </span>
                <span className="location-live absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" /> Live location
                </span>
                <div className="location-glass-card absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-lg border border-white/20 bg-black/55 p-3 text-white shadow-2xl backdrop-blur-xl sm:inset-x-4 sm:bottom-4">
                  <div className="min-w-0">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-primary">{location.number} / {t.locationLabel}</p>
                    <h3 className="mt-1 truncate font-display text-lg uppercase sm:text-xl">{location.name}</h3>
                    <p className="mt-1 truncate text-xs text-white/70">{location.address}</p>
                  </div>
                  <a href={location.link} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/70 bg-primary px-2.5 py-1.5 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-primary-foreground">{t.openMap} <ArrowRight className="size-3" /></a>
                </div>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="team-section relative overflow-hidden border-y border-border bg-secondary/35 px-5 py-12 text-foreground">
        <div className="pointer-events-none absolute -right-24 top-16 size-72 rounded-full border border-primary/25" />
        <div className="pointer-events-none absolute -left-28 bottom-10 size-80 rounded-full border border-primary/15" />
        <div className="mx-auto max-w-7xl">
          <div className="team-heading flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">{t.peopleBehindChair}</p>
              <h2 className="mt-3 font-display text-xl uppercase tracking-wide text-foreground md:text-3xl">{t.handsBehindCraft}</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4" aria-label="Our team">
            {Array.from({ length: 4 }).map((_, index) => (
              <article key={index} className="overflow-hidden border border-border bg-background/80">
                <div className="flex h-44 items-center justify-center border-b border-border bg-gradient-to-br from-primary/10 to-background">
                  <div className="h-20 w-20 rounded-full border border-dashed border-primary/60 bg-background/70" aria-hidden="true" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl leading-none text-primary/80">Name</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Google reviews */}
      <section id="reviews" className="reviews-section relative overflow-hidden border-y border-border bg-card/30 px-5 py-8 md:py-10">
        <div className="pointer-events-none absolute -left-16 top-8 size-72 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute -right-16 bottom-8 size-80 rounded-full border border-accent/10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="reviews-heading mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">
                <span className="relative grid size-3 place-items-center rounded-full border border-primary"><span className="size-1.5 rounded-full bg-primary" /></span>
                {t.reviews}
              </p>
              <h2 className="mt-3 font-display text-lg uppercase leading-[0.98] tracking-wide text-foreground md:text-2xl">
                {t.lovedByCustomers}
              </h2>
            </div>
            <div className="flex items-baseline gap-2 border-l border-primary/50 pl-4 md:pb-1">
              <span className="font-display text-3xl leading-none text-primary">667</span>
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Google reviews</span>
            </div>
          </div>

          <div className="relative mx-auto h-[34rem] w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-background p-4 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.45)] sm:h-[28rem] md:h-[25rem] md:p-5">
            <div key={activeReview} className="reviews-content grid items-start gap-4 md:grid-cols-[145px_minmax(0,1fr)] md:gap-6">
              <div className="flex flex-row items-center justify-between gap-4 border-b border-border pb-4 md:flex-col md:items-start md:border-b-0 md:border-r md:pb-0 md:pr-6">
                <div>
                  <span className="grid size-8 place-items-center rounded-full bg-foreground text-sm font-black shadow-sm ring-1 ring-border">
                    <span className="text-background">G</span>
                  </span>
                  <p className="mt-2 text-xs font-bold text-foreground">{t.googleReviews}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.experiences}</p>
                </div>
                <div>
                  <span className="font-display text-xl text-foreground">4.9</span>
                  <div className="mt-1 flex gap-0.5 text-primary" aria-label="4.9 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="size-3.5 fill-primary" />)}</div>
                  <p className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">667 reviews</p>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <Quote className="size-5 text-primary" />
                  <span className="tabular-nums text-xs font-bold text-muted-foreground">{String(activeReview + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 max-w-none text-sm leading-6 text-foreground md:text-base">
                  “{language === "th" ? reviewThai[activeReview] : reviews[activeReview]?.[0]}”
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-primary">{reviews[activeReview]?.[1]}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t.googleReviewer} · {reviews[activeReview]?.[2]}</p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:inline">{t.verifiedGoogle}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
              <div className="flex gap-2">
                {reviews.map(([_, author], index) => (
                  <button
                    key={author}
                    type="button"
                    aria-label={`Show review from ${author}`}
                    onClick={() => setActiveReview(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeReview ? "w-10 bg-primary" : "w-4 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <a
                href={googleReviewLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-foreground px-3 py-2 text-[0.68rem] font-bold tracking-wide text-background shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-[0_5px_14px_rgba(0,0,0,0.22)]"
                aria-label="Open Google profile and leave a review"
              >
                <span className="grid size-6 place-items-center rounded-full bg-white text-base font-black shadow-sm ring-1 ring-border">
                  <span className="google-mark">G</span>
                </span>
                <span>{language === "th" ? "รีวิวล่าสุด" : "Live reviews"}</span>
                <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ */}
      <section id="faq" className="border-y border-border bg-secondary/35 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-primary">
                <span className="h-px w-10 bg-primary" />
                {t.faqTitle}
              </div>
              <h2 className="mt-4 max-w-sm font-display text-2xl uppercase leading-[0.94] tracking-wide text-foreground md:text-4xl">
                {t.faqTitle}
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
                {t.faqIntro}
              </p>
              <a href="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-md">
                {t.bookCta} <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="space-y-2 rounded-2xl border border-border/80 bg-background/45 p-2 shadow-[0_18px_45px_-30px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]">
              {(language === "th" ? faqThai : faqs).map(([question, answer], index) => (
                <div key={question} className="rounded-xl border border-transparent bg-background/55">
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-display text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-semibold leading-6 text-foreground">{question}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-lg leading-none text-muted-foreground">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <p className="border-t border-border/70 px-12 pb-5 pt-4 text-sm leading-7 text-muted-foreground">{answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            }),
          }}
        />
      </section>

      {/* Social CTA */}
      <section className="border-y border-border bg-card/40 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <a
            href="https://www.instagram.com/popular/bangkok-kropper-barber-shop/"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-sm border border-border bg-background p-7 md:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-foreground/15 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-125" />
            <div className="pointer-events-none absolute -bottom-24 right-24 size-56 rounded-full border border-foreground/10 transition-transform duration-700 group-hover:-rotate-45 group-hover:scale-110" />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  <span className="size-2 animate-pulse rounded-full bg-foreground" /> {t.liveFromChair}
                </p>
                <h2 className="mt-3 font-display text-lg uppercase tracking-wide text-foreground md:text-2xl">
                  {t.followInstagram}
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {t.instagramDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-foreground">
                  @bangkokkropper{" "}
                  <ArrowRight className="size-4" />
                </span>
              </div>
              <span className="relative grid size-24 shrink-0 place-items-center rounded-full bg-foreground p-1 shadow-[0_0_35px_rgba(255,255,255,0.16)]">
                <span className="grid size-full place-items-center rounded-full bg-background/90">
                  <Instagram className="size-10 text-foreground" />
                </span>
                <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-foreground text-background">
                  <ArrowRight className="size-3.5 -rotate-45" />
                </span>
              </span>
            </div>
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
