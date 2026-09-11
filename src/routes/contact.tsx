import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { SiteFooter, SiteHeader, PHONE, PHONE_HREF } from "@/components/site-chrome";
import { services } from "@/data/services";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit & Book | Bangkok Kropper Barber Shop, Khlong Toei" },
      {
        name: "description",
        content:
          "Book a chair at Bangkok Kropper Barber Shop in Khlong Toei, Bangkok. Call +66 92 905 0509. Open daily, rated 4.9★ from 667 reviews.",
      },
      { property: "og:title", content: "Visit & Book | Bangkok Kropper Barber Shop" },
      {
        property: "og:description",
        content: "Khlong Toei, Bangkok. Call +66 92 905 0509 to reserve your chair.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const slots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ContactPage() {
  const [day, setDay] = useState("Fri");
  const [slot, setSlot] = useState<string | null>(null);
  const [service, setService] = useState(services[0]!.id);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const picked = services.find((s) => s.id === service)!;
  const ready = Boolean(slot && name.trim());

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent">Khlong Toei</p>
        <h1 className="mt-3 font-display text-xl uppercase tracking-wide text-foreground md:text-3xl">
          Reserve <span className="text-primary neon-text">your chair</span>
        </h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-sm border border-border bg-card/70 p-6">
            <p className="font-display text-xl uppercase tracking-widest text-primary">
              Request a time
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  className={`w-16 rounded-sm border py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    day === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={`rounded-sm border py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    slot === s
                      ? "border-accent bg-accent text-accent-foreground blood-ring"
                      : "border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Your name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Somchai"
                  className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Service
                </span>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}, ฿{s.price}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 rounded-sm border border-border bg-background/60 p-4 text-sm text-muted-foreground">
              {sent ? (
                <p className="text-primary">
                  Thanks {name.trim()}. We’ve noted {picked.name} on {day} at {slot}. Call{" "}
                  {PHONE} to lock it in.
                </p>
              ) : (
                <p>
                  {picked.name}, {picked.minutes} min, ฿{picked.price}.{" "}
                  {slot ? `${day} at ${slot}` : "choose a time above"}
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!ready}
              onClick={() => setSent(true)}
              className="mt-5 w-full rounded-sm bg-primary py-3 font-bold uppercase tracking-widest text-primary-foreground transition-transform enabled:hover:scale-[1.02] disabled:opacity-40"
            >
              {sent ? "Request noted" : "Request this slot"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Requests are confirmed by phone. Walk-ins are always welcome.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-4 rounded-sm border border-border bg-card/70 p-5 transition-all hover:-translate-y-1 hover:border-primary"
            >
              <Phone className="size-6 text-primary" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Call the shop
                </span>
                <span className="font-display text-xl text-foreground">{PHONE}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-sm border border-border bg-card/70 p-5">
              <MapPin className="size-6 text-accent" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Location
                </span>
                <span className="text-foreground">33 Sukhumvit Rd, Khlong Toei, Bangkok 10110</span>
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-sm border border-border bg-card/70 p-5">
              <Clock className="size-6 text-primary" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Hours
                </span>
                <span className="text-foreground">Daily 9:00am – 5:00am</span>
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-sm border border-primary/40 bg-card/70 p-5 neon-ring">
              <Star className="size-6 fill-primary text-primary" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Google rating
                </span>
                <span className="font-display text-xl text-primary">4.9★ · 667 reviews</span>
              </span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
