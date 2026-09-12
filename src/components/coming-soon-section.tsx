import { useEffect, useState } from "react";

const comingSoonImages = [
  ["/1.PNG", "Barber at work", "SIGNATURE FADE"],
  ["/2.PNG", "Precision barbering detail", "HOT TOWEL RITUAL"],
  ["/4.png", "Kropper barber service", "SHOP DETAILS"],
  ["/5.png", "Classic cut", "CLASSIC CUT"],
  ["/7.png", "Sharp finish", "SHARP FINISH"],
  ["/8.png", "The chair", "THE CHAIR"],
  ["/9.png", "Razor work", "RAZOR WORK"],
  ["/10.png", "Color session", "COLOUR SESSION"],
  ["/barbar1.png", "Barber craft", "BARBER CRAFT"],
  ["/barbar2.png", "Skilled hands", "SKILLED HANDS"],
  ["/barbar3.png", "The Kropper team", "THE KROPPER TEAM"],
  ["/banner.png", "Bangkok Kropper shop", "THE SHOP"],
] as const;

export function ComingSoonSection() {
  const [group, setGroup] = useState(0);
  const visibleImages = comingSoonImages.slice(group * 4, group * 4 + 4);

  useEffect(() => {
    const timer = window.setInterval(() => setGroup((current) => (current + 1) % 3), 3600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="coming-soon-section border-b border-border bg-background px-5 py-20 md:py-28">
      <style>{`
        @keyframes coming-soon-reveal {
          from { opacity: 0; transform: translateY(2rem); }
          to { opacity: 1; transform: translateY(0); }
        }

        .coming-soon-section .coming-soon-copy,
        .coming-soon-section .coming-soon-gallery {
          animation: coming-soon-reveal .9s cubic-bezier(.2,.8,.2,1) both;
        }

        .coming-soon-section .coming-soon-gallery { animation-delay: .16s; }
        .coming-soon-section .coming-soon-tile { animation: coming-soon-reveal .75s cubic-bezier(.2,.8,.2,1) both; }
        .coming-soon-section .coming-soon-tile:nth-child(2) { margin-top: 2rem; animation-delay: .1s; }
        .coming-soon-section .coming-soon-tile:nth-child(3) { margin-top: -2rem; animation-delay: .2s; }
        .coming-soon-section .coming-soon-tile:nth-child(4) { animation-delay: .3s; }
      `}</style>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="coming-soon-copy max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.35em] text-primary">
            The next chapter
          </p>
          <h2 className="mt-5 max-w-lg font-display text-5xl leading-[.86] tracking-[-.035em] text-foreground sm:text-6xl lg:text-7xl">
            Coming Soon
          </h2>
          <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            A new Bangkok Kropper experience is taking shape. More craft, more atmosphere, and more
            ways to leave looking sharp.
          </p>
        </div>

        <div className="coming-soon-gallery relative grid grid-cols-2 gap-2">
          {visibleImages.map(([src, alt, title], index) => (
            <div
              key={`${group}-${src}`}
              className="coming-soon-tile group relative h-52 overflow-hidden border border-border bg-card sm:h-64"
            >
              <img
                src={src}
                alt={alt}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8 sm:px-4 sm:pb-4">
                <p className="text-[.58rem] font-bold uppercase tracking-[.2em] text-primary">
                  {String(group * 4 + index + 1).padStart(2, "0")} / {title}
                </p>
              </div>
            </div>
          ))}
          <div
            className="absolute bottom-2 right-2 flex gap-1.5"
            aria-label={`Image group ${group + 1} of 3`}
          >
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className={`h-1 transition-all duration-500 ${item === group ? "w-7 bg-primary" : "w-3 bg-background/70"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
