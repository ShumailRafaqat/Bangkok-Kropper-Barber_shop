import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, ExternalLink, MapPin } from "lucide-react";
import { ADDRESS, ADDRESS_TWO, MAPS_LINK, MAPS_LINK_TWO, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Bangkok Kropper | More Than a Haircut" },
      { name: "description", content: "Discover the story, craft and experience behind Bangkok Kropper Barber Shop, established in Bangkok in 2024." },
      { property: "og:title", content: "About Bangkok Kropper | More Than a Haircut" },
      { property: "og:description", content: "A modern Bangkok barber brand built around precision, personality and genuine service." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  ["01", "PRECISION", "Clean lines. Balanced shapes. Finishing details that matter."],
  ["02", "PERSONAL STYLE", "Your haircut should work for you - your face, your style and your everyday life."],
  ["03", "REAL CRAFT", "Modern barbering techniques combined with careful, hands-on craftsmanship."],
  ["04", "GOOD ENERGY", "A relaxed environment where you can sit back, talk, and enjoy the experience."],
] as const;

const noticed = ["Sharp Fades", "Precise Finishing", "Beard Grooming", "Personal Advice", "Warm Hospitality", "Attention to Detail"] as const;

const values = [
  ["Listen.", "We start by understanding what you actually want."],
  ["Respect.", "Your style is personal. We work with it, not against it."],
  ["Refine.", "Small details make a big difference."],
  ["Keep Growing.", "Good barbering never stops evolving."],
] as const;

const locations = [
  { number: "01", name: "Khlong Toei", address: ADDRESS, image: "/4.png", maps: MAPS_LINK },
  { number: "02", name: "Phaya Thai", address: ADDRESS_TWO, image: "/8.png", maps: MAPS_LINK_TWO },
] as const;

function AboutPage() {
  return (
    <div className="about-page min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main>
        <section id="story" className="border-b border-border px-5 py-20 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20"><div className="relative min-h-[25rem] overflow-hidden md:min-h-[35rem]"><img src="/hero.png" alt="Interior of Bangkok Kropper Barber Shop" className="size-full object-cover" /><div className="absolute bottom-5 left-5 border-l-2 border-primary bg-background/80 px-4 py-3 backdrop-blur-sm"><p className="font-display text-3xl text-primary">2024</p><p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-muted-foreground">Born in Bangkok</p></div></div><div><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Our Story</p><h2 className="mt-5 max-w-xl font-display text-3xl leading-[0.95] md:text-5xl">Born in Bangkok. Built Around the Craft.</h2><div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-muted-foreground"><p>Established in 2024, Bangkok Kropper began with a vision to create a barbering experience where precision, personality and genuine service come together. What started as a passion for modern grooming has grown into a place where every client can find a style that feels like their own.</p><p>For us, barbering is about more than following a trend. It is about understanding the person in the chair, paying attention to the details, and creating a result that works for them.</p></div><div className="mt-10 border-t border-border pt-5 text-xs font-bold uppercase tracking-[0.22em] text-primary">Bangkok barber culture, made personal</div></div></div></section>

        <section className="border-b border-border bg-secondary/35 px-5 py-20 md:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">The Kropper Experience</p><h2 className="mt-5 max-w-md font-display text-4xl leading-[0.95] md:text-6xl">The Difference Is in the Details.</h2></div><p className="max-w-lg text-base leading-8 text-muted-foreground">A great cut is built one detail at a time. From the consultation to the final clean-up, our barbers focus on precision, balance and the details that make the finished look feel right.</p></div><div className="mt-16 grid border-t border-border md:grid-cols-2">{principles.map(([number, title, copy]) => <article key={number} className="min-h-52 border-b border-border py-7 md:border-r md:px-7 md:last:border-r-0"><span className="font-display text-5xl text-primary/60">{number}</span><h3 className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>

        <section className="border-b border-border px-5 py-20 md:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">What Our Clients Notice</p><h2 className="mt-5 font-display text-4xl leading-[0.95] md:text-6xl">It&apos;s the Little Things.</h2><p className="mt-7 text-base leading-8 text-muted-foreground">The difference isn&apos;t always something you can describe in one word. Sometimes it&apos;s the precision of a fade. Sometimes it&apos;s the extra minute spent getting the shape right. Sometimes it&apos;s simply feeling comfortable in the chair.</p></div><div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-3">{noticed.map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-border px-1 py-6 sm:px-4 lg:nth-[3n]:border-r-0"><span className="font-display text-2xl text-primary">0{index + 1}</span><span className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">{item}</span></div>)}</div></div></section>

        <section className="relative isolate overflow-hidden border-b border-border px-5 py-24 md:py-36"><img src="/1.PNG" alt="Barber working closely with a client" className="absolute inset-0 -z-20 size-full object-cover object-center" /><div className="absolute inset-0 -z-10 bg-background/80" /><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Our Philosophy</p><h2 className="mt-6 font-display text-5xl leading-[0.92] md:text-8xl">A Great Cut Should Change More Than Your Hair.</h2><p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">We believe grooming is personal. The right haircut can change the way you carry yourself, the way you feel when you walk into a room, and the confidence you take with you when you leave.</p><p className="mt-8 border-l-2 border-primary pl-5 text-sm font-bold uppercase tracking-[0.16em] text-foreground">That is what we aim to create - every time you sit in our chair.</p></div></div></section>

        <section id="locations" className="border-b border-border bg-secondary/35 px-5 py-20 md:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Two Locations. One Standard.</p><h2 className="mt-5 font-display text-4xl leading-[0.95] md:text-6xl">One Kropper Experience, Wherever You Sit.</h2><p className="mt-7 text-base leading-8 text-muted-foreground">Wherever you visit us, the experience should feel unmistakably Bangkok Kropper. Both locations share the same commitment to craftsmanship, cleanliness, attention to detail, friendly service and a comfortable atmosphere.</p></div><div className="mt-14 grid gap-5 lg:grid-cols-2">{locations.map((location) => <article key={location.number} className="group grid overflow-hidden border border-border bg-background md:grid-cols-[0.8fr_1.2fr]"><div className="relative min-h-64 overflow-hidden"><img src={location.image} alt={`${location.name} Bangkok Kropper location`} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute bottom-4 left-4 font-display text-4xl text-primary">{location.number}</span></div><div className="flex flex-col justify-between p-6 md:p-8"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Bangkok Kropper</p><h3 className="mt-3 font-display text-3xl">{location.name}</h3><p className="mt-5 flex gap-3 text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 size-4 shrink-0 text-primary" />{location.address}</p></div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"><Clock3 className="size-4 text-primary" /> 9:00am - 5:00am</p><a href={location.maps} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground">Google Maps <ExternalLink className="size-3.5" /></a></div></div></article>)}</div></div></section>

        <section className="px-5 py-20 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Our Values</p><h2 className="mt-5 font-display text-4xl leading-[0.95] md:text-6xl">What We Stand For</h2></div><div className="grid border-t border-border sm:grid-cols-2">{values.map(([title, copy]) => <div key={title} className="border-b border-border py-6 sm:px-5 sm:first:pl-0"><h3 className="font-display text-3xl text-primary">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div></section>

        <section className="border-y border-border bg-secondary/35 px-5 py-20 md:py-28"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Future Vision</p><h2 className="mt-5 font-display text-4xl leading-[0.95] md:text-6xl">Where We&apos;re Going</h2></div><div className="max-w-xl space-y-5 text-base leading-8 text-muted-foreground"><p>Our goal is to grow Bangkok Kropper into a barbering brand people know for its craft, its people and the experience it creates - without losing the personal feeling that started it all.</p><p>More locations may come. More styles will evolve. But the standard stays the same.</p></div></div></section>

        <section className="border-y border-border bg-secondary/35 px-5 py-24 text-center [background-image:radial-gradient(circle_at_center,rgba(184,139,69,0.16),transparent_62%)] md:py-32"><div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Your Next Look Starts Here</p><h2 className="mt-6 font-display text-5xl leading-[0.9] md:text-7xl">Ready for Your Next Cut?</h2><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="/book" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-accent">Book Your Appointment <ArrowRight className="size-4" /></a><a href="#locations" className="inline-flex items-center gap-2 border border-foreground/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground hover:border-primary hover:text-primary">Find a Location <MapPin className="size-4" /></a></div></div></section>
      </main>
    </div>
  );
}