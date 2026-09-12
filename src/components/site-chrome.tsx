import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  Facebook,
  ExternalLink,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  X,
  Youtube,
} from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/grooming-guide", label: "Blog" },
] as const;

export const PHONE = "+66 92 905 0509";
export const PHONE_HREF = "tel:+66929050509";
export const WHATSAPP_HREF = "https://wa.me/66929050509";
export const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=Bangkok+Kropper+Barber+Shop+Khlong+Toei+reviews";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { language, setLanguage, t } = useI18n();
  const { pathname } = useLocation();

  const languageButtons = (
    <div className="flex items-center gap-1 border-l border-border pl-2" aria-label={t.language}>
      <button
        type="button"
        onClick={() => setLanguage(language === "en" ? "th" : "en")}
        aria-label={language === "en" ? "Switch to Thai" : "Switch to English"}
        className="px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-primary transition-colors hover:text-foreground"
      >
        {language === "en" ? "THAI" : "ENG"}
      </button>
    </div>
  );

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["services", "gallery", "locations", "reviews", "faq"];
    let frame = 0;

    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter((section): section is HTMLElement => section !== null);
        const current = sections
          .filter((section) => section.getBoundingClientRect().top <= 170)
          .at(-1);
        setActiveSection(current?.id ?? "home");
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFromScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border/70 bg-background/92 backdrop-blur-xl"
          : "bg-background/78 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center gap-3 px-3 py-2.5 sm:px-5 sm:py-3">
        <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
          <img
            src="/logo.png"
            alt="Bangkok Kropper logo"
            className="h-10 w-14 shrink-0 object-contain sm:h-11 sm:w-16"
          />
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-base tracking-wide text-primary sm:text-lg">
              BANGKOK KROPPER
            </span>
            <span className="block truncate text-[0.58rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.35em]">
              Barber Shop
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden min-w-0 items-center justify-end gap-4 whitespace-nowrap md:flex lg:gap-4 xl:gap-5">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`whitespace-nowrap text-[0.61rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary xl:text-[0.64rem] ${item.to === "/" ? (pathname === "/" && activeSection === "home" ? "border-b border-primary pb-1 text-primary" : "text-muted-foreground") : pathname.startsWith(item.to) || (item.to === "/services" && pathname === "/" && activeSection === "services") ? "border-b border-primary pb-1 text-primary" : "text-muted-foreground"}`}
            >
              {item.label === "Home" ? t.home : item.label === "About" ? t.about : item.label === "Blog" ? t.blog : t.services}
            </Link>
          ))}
          <a
            href="/#reviews"
            onClick={() => window.dispatchEvent(new Event("bk-close-welcome"))}
            className={`whitespace-nowrap text-[0.61rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary xl:text-[0.64rem] ${activeSection === "reviews" ? "border-b border-primary pb-1 text-primary" : "text-muted-foreground"}`}
          >
            {t.reviews}
          </a>
          <a
            href="/#faq"
            className={`whitespace-nowrap text-[0.61rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary xl:text-[0.64rem] ${activeSection === "faq" ? "border-b border-primary pb-1 text-primary" : "text-muted-foreground"}`}
          >
            FAQ
          </a>
          <a
            href="/#gallery"
            onClick={() => window.dispatchEvent(new Event("bk-gallery-animate"))}
            className={`whitespace-nowrap text-[0.61rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary xl:text-[0.64rem] ${activeSection === "gallery" ? "border-b border-primary pb-1 text-primary" : "text-muted-foreground"}`}
          >
            {t.gallery}
          </a>
          <a
            href="/#locations"
            className={`whitespace-nowrap text-[0.61rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary xl:text-[0.64rem] ${activeSection === "locations" ? "border-b border-primary pb-1 text-primary" : "text-muted-foreground"}`}
          >
            {t.locations}
          </a>
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-1.5 whitespace-nowrap text-[0.61rem] font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-foreground xl:inline-flex"
          >
            <Phone className="size-4" /> {PHONE}
          </a>
          <a
            href="/book"
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary px-3 py-2 text-[0.61rem] font-bold uppercase tracking-[0.08em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-md xl:px-3.5"
          >
            <Phone className="size-4" /> {t.bookAppointment}
          </a>
          <div className="hidden lg:flex">{languageButtons}</div>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-primary/50 bg-card/85 text-primary shadow-sm md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-2 shadow-2xl shadow-black/40 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 font-display text-xl tracking-wide text-foreground"
            >
              {item.label === "Home" ? t.home : item.label === "About" ? t.about : item.label === "Blog" ? t.blog : t.services}
            </Link>
          ))}
          <a
            href="/#reviews"
            onClick={() => setOpen(false)}
            onClickCapture={() => window.dispatchEvent(new Event("bk-close-welcome"))}
            className="block border-b border-border py-3 font-display text-xl tracking-wide text-foreground"
          >
            {t.reviews}
          </a>
          <a
            href="/#faq"
            onClick={() => setOpen(false)}
            className="block border-b border-border py-3 font-display text-xl tracking-wide text-foreground"
          >
            FAQ
          </a>
          <a
            href="/#gallery"
            onClick={() => setOpen(false)}
            onClickCapture={() => window.dispatchEvent(new Event("bk-gallery-animate"))}
            className="block border-b border-border py-3 font-display text-xl tracking-wide text-foreground"
          >
            {t.gallery}
          </a>
          <a
            href="/#locations"
            onClick={() => setOpen(false)}
            className="block border-b border-border py-3 font-display text-xl tracking-wide text-foreground"
          >
            {t.locations}
          </a>
          <a
            href="/book"
            className="mt-4 flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary py-3 font-bold uppercase text-primary-foreground"
          >
            <Phone className="size-4" /> {t.bookAppointment}
          </a>
          <a
            href={PHONE_HREF}
            className="mt-3 flex items-center justify-center gap-2 rounded-sm border border-primary/50 py-3 font-bold uppercase text-primary"
          >
            <Phone className="size-4" /> {t.call} {PHONE}
          </a>
          <div className="mt-4 flex items-center justify-end border-t border-border pt-4">{languageButtons}</div>
        </div>
      )}
    </header>
  );
}

export const ADDRESS = "33 Sukhumvit Rd, Khlong Toei, Bangkok 10110, Thailand";
export const ADDRESS_TWO = "2/3 Phahon Yothin 7, Phaya Thai, Bangkok 10400, Thailand";
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Bangkok Kropper Barber Shop, 33 Sukhumvit Rd, Khlong Toei, Bangkok 10110");
export const MAPS_EMBED =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("33 Sukhumvit Rd, Khlong Toei, Bangkok 10110, Thailand") +
  "&z=16&output=embed";
export const MAPS_LINK_TWO =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS_TWO);
export const MAPS_EMBED_TWO =
  "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS_TWO) + "&z=16&output=embed";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/popular/bangkok-kropper-barber-shop/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/p/Bangkok-kropper-Barber-shop-61566903118616/", Icon: Facebook },
  { label: "YouTube", href: "https://youtube.com/@bangkokkropper?si=z2ZF30C4bPnwnQPb", Icon: Youtube },
  { label: "Email", href: "mailto:bangkokkropper33@gmail.com", Icon: Mail },
  { label: "WhatsApp", href: WHATSAPP_HREF, Icon: MessageCircle },
] as const;

const hours = [
  { day: "Monday", open: "9:00am", close: "5:00am" },
  { day: "Tuesday", open: "9:00am", close: "5:00am" },
  { day: "Wednesday", open: "9:00am", close: "5:00am" },
  { day: "Thursday", open: "9:00am", close: "5:00am" },
  { day: "Friday", open: "9:00am", close: "5:00am" },
  { day: "Saturday", open: "9:00am", close: "5:00am" },
  { day: "Sunday", open: "9:00am", close: "5:00am" },
] as const;

const openingMinutes = 9 * 60;
const closingMinutes = 5 * 60;

/** Bangkok time (UTC+7) with weekday index (0 = Monday). */
function bangkokNow() {
  const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
  const bkk = new Date(utc + 7 * 3600000);
  return {
    minutes: bkk.getHours() * 60 + bkk.getMinutes(),
    seconds: bkk.getSeconds(),
    day: (bkk.getDay() + 6) % 7,
  };
}

export function SiteFooter() {
  const { language, t } = useI18n();
  const [now, setNow] = useState(() => bangkokNow());
  const [hovered, setHovered] = useState<string | null>(null);
  const [panel, setPanel] = useState<"hours" | "reviews" | "why">("hours");
  const [cuts, setCuts] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(bangkokNow());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const today = hours[now.day] ?? hours[0];
  const isOpen = now.minutes >= openingMinutes || now.minutes < closingMinutes;
  const nowTotalSeconds = now.minutes * 60 + now.seconds;
  const openingSeconds = openingMinutes * 60;
  const closingSeconds = closingMinutes * 60;
  const untilSeconds = isOpen
    ? now.minutes >= openingMinutes
      ? 24 * 60 * 60 + closingSeconds - nowTotalSeconds
      : closingSeconds - nowTotalSeconds
    : openingSeconds - nowTotalSeconds + 24 * 60 * 60;
  const untilHours = Math.floor(untilSeconds / 3600);
  const untilMinutes = Math.floor((untilSeconds % 3600) / 60);
  const untilLabel = `${untilHours}h ${String(untilMinutes).padStart(2, "0")}m`;
  const clock = `${String(Math.floor(now.minutes / 60)).padStart(2, "0")}:${String(
    now.minutes % 60,
  ).padStart(2, "0")}:${String(now.seconds).padStart(2, "0")}`;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      {/* barber poles */}
      <div
        aria-hidden
        className="barber-pole pointer-events-none absolute inset-y-0 left-0 w-2 opacity-70"
      />
      <div
        aria-hidden
        className="barber-pole pointer-events-none absolute inset-y-0 right-0 w-2 opacity-70"
      />

      <div className="group/marquee relative flex select-none whitespace-nowrap border-b border-border py-3 text-muted-foreground">
        <div className="marquee-track flex shrink-0 gap-10 pr-10 font-display text-sm uppercase tracking-[0.4em] group-hover/marquee:[animation-play-state:paused]">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            (t.serviceMarquee ?? []).map(
              (w) => (
                <span key={`${i}-${w}`} className="flex items-center gap-10">
                  {w} <Scissors className="size-3.5 text-accent" />
                </span>
              ),
            ),
          )}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-7 py-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCuts((c) => c + 1)}
              className="group text-left font-display text-3xl tracking-wide text-primary neon-text"
            >
              BANGKOK KROPPER
              <Scissors
                key={cuts}
                className={`ml-3 inline size-5 text-accent transition-transform ${
                  cuts ? "animate-rise" : ""
                } group-hover:rotate-45`}
              />
            </button>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {t.footerIntro} {t.footerRated}
          </p>
          {cuts > 0 && (
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-accent">
              {cuts} {t.snipText}{cuts > 1 && language === "en" ? "s" : ""} — {language === "th" ? "ปัตตาเลี่ยนอุ่นพร้อมแล้ว" : "the clippers are warm"}
            </p>
          )}

          <div
            className={`mt-6 inline-flex items-center gap-3 rounded-sm border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
              isOpen
                ? "border-primary/50 text-primary neon-ring"
                : "border-border text-muted-foreground"
            }`}
          >
            <span className="relative grid size-2.5 place-items-center">
              <span
                className={`absolute inset-0 rounded-full ${isOpen ? "bg-primary" : "bg-muted-foreground"}`}
              />
              {isOpen && (
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/70" />
              )}
            </span>
            {isOpen ? t.openNow : t.closed} · Bangkok{" "}
            <span className="tabular-nums">
              {clock}
            </span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {isOpen ? `${t.closesIn} ${untilLabel}` : `${t.opensIn} ${untilLabel}`}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className="group grid size-11 place-items-center rounded-sm border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
          <p className="mt-3 h-4 text-xs uppercase tracking-[0.3em] text-primary">
            {hovered ?? ""}
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          <div className="flex gap-1 rounded-sm border border-border p-1">
            {(["hours", "reviews", "why"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setPanel(key)}
                className={`flex-1 rounded-sm px-2 py-1.5 font-display text-xs uppercase tracking-[0.2em] transition-colors ${
                  panel === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {key === "why" ? t.whyUs : key === "hours" ? t.openingHours : t.reviews}
              </button>
            ))}
          </div>

          {panel === "hours" && (
            <ul className="mt-4 space-y-1 animate-rise">
              {hours.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between rounded-sm px-2 py-1 transition-colors ${
                    i === now.day ? "bg-primary/10 text-primary" : "hover:bg-secondary/60"
                  }`}
                >
                  <span>{t.dayNames?.[i] ?? h.day}</span>
                  <span className="tabular-nums">
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {panel === "reviews" && (
            <div className="mt-4 animate-rise">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-sm border border-border bg-background px-4 py-4 text-foreground transition-all hover:-translate-y-1 hover:border-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white shadow-md">
                    <span className="font-sans text-xl font-black text-background">
                      G
                    </span>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {t.liveGoogleReviews}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">4.9★ · 667 {t.reviews.toLowerCase()}</span>
                  </span>
                </span>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          )}

          {panel === "why" && (
            <ul className="mt-4 space-y-2 animate-rise">
              {(t.whyPoints ?? []).map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 rounded-sm px-2 py-1 hover:bg-secondary/60"
                >
                  <Scissors className="mt-0.5 size-3.5 shrink-0 text-accent" />
                  {line}
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>

      <p className="relative border-t border-border px-7 py-5 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Bangkok Kropper Co., Ltd. · 4.9★ · 667 {t.reviews.toLowerCase()}
      </p>
    </footer>
  );
}
