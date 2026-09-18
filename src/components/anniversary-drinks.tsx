import { Link } from "@tanstack/react-router";
import { ArrowRight, GlassWater, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const drinkGallery = [
  ["/drinks/1000222985.jpg", "Signature refreshment"],
  ["/drinks/1000222988.jpg", "Celebratory pour"],
  ["/drinks/1000222991.jpg", "House refreshment"],
  ["/drinks/1000222994.jpg", "Cold refreshment"],
  ["/drinks/1000222997.jpg", "Signature serve"],
  ["/drinks/1000223000.jpg", "Celebratory serve"],
  ["/drinks/1000223003.jpg", "Fresh coffee"],
  ["/drinks/1000223006.jpg", "Iced coffee"],
] as const;

export function AnniversaryDrinks() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % drinkGallery.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        .anniversary-drinks {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: #11100d;
          color: #f5efe5;
          padding: 44px 20px;
        }

        .anniversary-drinks__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          align-items: center;
          gap: 32px;
          grid-template-columns: 0.78fr 1.22fr;
        }

        .anniversary-drinks__content {
          position: relative;
        }

        .anniversary-drinks__eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 800;
          color: #d9b86a;
        }

        .anniversary-drinks__eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #d9b86a;
          box-shadow: 0 0 12px currentColor;
        }

        .anniversary-drinks__title {
          margin-top: 14px;
          max-width: 520px;
          font-family: "Bodoni Moda", Georgia, serif;
          font-size: clamp(1.9rem, 3vw, 3.4rem);
          line-height: 1;
          letter-spacing: 0.015em;
          text-transform: uppercase;
          color: #f3e9d8;
        }

        .anniversary-drinks__copy {
          margin-top: 16px;
          max-width: 440px;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(245, 239, 229, 0.76);
        }

        .anniversary-drinks__note {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 239, 229, 0.66);
        }

        .anniversary-drinks__divider {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 800;
          color: #d9b86a;
        }

        .anniversary-drinks__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 22px;
          padding: 14px 20px;
          border: 1px solid #d9b86a;
          background: #d9b86a;
          color: #11100d;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 12px 28px -14px rgba(217, 184, 106, 0.85);
          transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }

        .anniversary-drinks__cta:hover {
          transform: translateY(-2px);
          background: #e6c97e;
          box-shadow: 0 16px 32px -14px rgba(217, 184, 106, 0.95);
        }

        .anniversary-drinks__gallery {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(217, 184, 106, 0.35);
          border-radius: 4px 34px 4px 34px;
          background: #181713;
          box-shadow: 0 30px 80px -35px rgba(0, 0, 0, 0.9);
        }

        .anniversary-drinks__frame {
          position: relative;
          aspect-ratio: 16 / 10;
        }

        .anniversary-drinks__image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 1000ms ease;
        }

        .anniversary-drinks__image.is-hidden {
          opacity: 0;
          transform: scale(1.05);
        }

        .anniversary-drinks__image.is-visible {
          opacity: 1;
          transform: scale(1);
        }

        .anniversary-drinks__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.55));
        }

        .anniversary-drinks__badge {
          position: absolute;
          top: 20px;
          left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: rgba(17, 16, 13, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 239, 229, 0.8);
        }

        .anniversary-drinks__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #d9b86a;
        }

        .anniversary-drinks__meta {
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: 20px;
          display: flex;
          align-items: end;
          justify-content: space-between;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 239, 229, 0.7);
        }

        @media (max-width: 900px) {
          .anniversary-drinks {
            padding: 36px 16px;
          }

          .anniversary-drinks__inner {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .anniversary-drinks__title {
            max-width: 420px;
            font-size: clamp(2rem, 9vw, 3.2rem);
          }

          .anniversary-drinks__copy {
            margin-top: 12px;
          }

          .anniversary-drinks__gallery {
            max-width: 680px;
          }
        }
      `}</style>

      <section className="anniversary-drinks">
        <div className="anniversary-drinks__inner">
          <div className="anniversary-drinks__content">
            <p className="anniversary-drinks__eyebrow">
              <span className="anniversary-drinks__eyebrow-dot" />
              Anniversary hospitality
            </p>
            <h2 className="anniversary-drinks__title">Raise a glass to the celebration</h2>
            <p className="anniversary-drinks__copy">
              While we celebrate our anniversary, enjoy a complimentary refreshment as part of your Kropper experience.
            </p>
            <p className="anniversary-drinks__note">
              <GlassWater className="size-3 text-primary" />
              Settle in. Relax. Enjoy the moment.
            </p>
            <div className="anniversary-drinks__divider">
              <Sparkles className="size-3" />
              Complimentary refreshments
            </div>
            <Link to="/book" className="anniversary-drinks__cta">
              Book your visit
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="anniversary-drinks__gallery">
            <div className="anniversary-drinks__frame">
              {drinkGallery.map(([src, alt], index) => (
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  className={`anniversary-drinks__image ${index === activeImage ? "is-visible" : "is-hidden"}`}
                />
              ))}
              <div className="anniversary-drinks__overlay" />
              <div className="anniversary-drinks__badge">
                <span className="anniversary-drinks__badge-dot" />
                A complimentary touch
              </div>
              <div className="anniversary-drinks__meta">
                <span>Kropper hospitality</span>
                <span>
                  {String(activeImage + 1).padStart(2, "0")} / {String(drinkGallery.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
