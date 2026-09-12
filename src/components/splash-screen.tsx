import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";

export default function SplashScreen() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashVisible(false), 4200);
    const progressTimer = window.setInterval(() => {
      setLoadingProgress((progress) => Math.min(progress + 1, 100));
    }, 30);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (loadingProgress >= 100) {
      setSplashVisible(false);
    }
  }, [loadingProgress]);

  if (!splashVisible) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes splash-reveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes wing-open-left {
          0% { opacity: 0; transform: translateX(2.5rem) scaleX(0); }
          55% { opacity: 1; transform: translateX(0) scaleX(1.08); }
          100% { opacity: 1; transform: translateX(0) scaleX(1); }
        }

        @keyframes wing-open-right {
          0% { opacity: 0; transform: translateX(-2.5rem) scaleX(0); }
          55% { opacity: 1; transform: translateX(0) scaleX(1.08); }
          100% { opacity: 1; transform: translateX(0) scaleX(1); }
        }

        @keyframes scissors-cut {
          0% { opacity: 0; transform: translateY(-2.5rem) rotate(-34deg) scale(.55); }
          25% { opacity: 1; transform: translateY(.2rem) rotate(-18deg) scale(1); }
          42% { transform: translateY(-.15rem) rotate(8deg) scale(1.04); }
          55% { transform: translateY(.1rem) rotate(-12deg) scale(1); }
          68% { transform: translateY(-.1rem) rotate(4deg) scale(1.08); }
          80% { transform: translateY(0) rotate(-12deg) scale(1); }
          100% { opacity: 1; transform: translateY(0) rotate(-12deg) scale(1); }
        }

        @keyframes kicker-arrive {
          from { opacity: 0; letter-spacing: .7em; transform: translateY(8px); }
          to { opacity: 1; letter-spacing: .36em; transform: translateY(0); }
        }

        @keyframes title-arrive {
          from { opacity: 0; transform: translateY(1.2rem); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes word-type {
          from { clip-path: inset(0 100% 0 0); transform: translateX(-.4rem); }
          to { clip-path: inset(0); transform: translateX(0); }
        }

        @keyframes subtitle-arrive {
          from { opacity: 0; transform: translateY(10px); letter-spacing: .7em; }
          to { opacity: 1; transform: translateY(0); letter-spacing: .36em; }
        }

        @keyframes line-draw {
          0% { opacity: 0; transform: scaleX(0); }
          60% { opacity: 1; transform: scaleX(1.08); }
          100% { opacity: 1; transform: scaleX(1); }
        }

        @keyframes glitter-drift {
          from { background-position: 0 0, 2rem 3rem, 0 0; }
          to { background-position: 10rem 0, 12rem 3rem, 8rem 0; }
        }

        @keyframes circle-twinkle {
          0%, 100% {
            opacity: .12;
            transform: translate3d(0, 0, 0) scale(.55);
            box-shadow: 0 0 0 oklch(0.78 0.12 76 / 0);
          }
          35% {
            opacity: .95;
            transform: translate3d(var(--twinkle-x), var(--twinkle-y), 0) scale(1);
            box-shadow: 0 0 1.1rem oklch(0.78 0.12 76 / .85);
          }
          60% {
            opacity: .3;
            transform: translate3d(calc(var(--twinkle-x) * .55), calc(var(--twinkle-y) * .55), 0) scale(.72);
            box-shadow: 0 0 .35rem oklch(0.78 0.12 76 / .25);
          }
        }

        @keyframes visible-sparkle {
          0%, 100% { opacity: .15; transform: translate3d(0, 0, 0) scale(.7) rotate(0); }
          25% { opacity: .8; transform: translate3d(1.2rem, -.9rem, 0) scale(1.15) rotate(45deg); }
          50% { opacity: .25; transform: translate3d(2rem, .5rem, 0) scale(.65) rotate(90deg); }
          75% { opacity: 1; transform: translate3d(.6rem, 1.3rem, 0) scale(1) rotate(135deg); }
        }

        @keyframes ambient-breathe {
          from { background-position: 0 0, 0 0; }
          to { background-position: 12rem 0, 12rem 0; }
        }

        @keyframes scissors-idle {
          0%, 100% { transform: rotate(-12deg) translateY(0); filter: drop-shadow(0 0 .35rem oklch(0.56 0.205 29 / .55)); }
          50% { transform: rotate(-5deg) translateY(-3px); filter: drop-shadow(0 0 .8rem oklch(0.56 0.205 29 / .9)); }
        }

        @keyframes title-float {
          0%, 100% { transform: translateY(0); text-shadow: 0 0 .05rem oklch(0.78 0.14 76 / .2); }
          50% { transform: translateY(-3px); text-shadow: 0 0 1.1rem oklch(0.78 0.14 76 / .35); }
        }

        @keyframes spotlight-sweep {
          0% { opacity: 0; transform: translateX(-120%); }
          20%, 55% { opacity: .38; }
          100% { opacity: 0; transform: translateX(320%); }
        }

        @keyframes subtitle-pulse {
          0%, 100% { opacity: .82; }
          50% { opacity: 1; text-shadow: 0 0 .75rem oklch(0.56 0.205 29 / .65); }
        }

        .splash-screen {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: oklch(0.09 0.008 75);
          overflow: hidden;
          background-image:
            radial-gradient(circle at 50% 45%, oklch(0.19 0.025 76 / .3), transparent 38%),
            linear-gradient(90deg, oklch(0.09 0.008 75), oklch(0.12 0.015 76 / .7), oklch(0.09 0.008 75));
          animation: ambient-breathe 8s ease-in-out infinite;
          transition: opacity 900ms ease 300ms;
        }

        .splash-screen::before {
          content: "";
          position: absolute;
          inset: -10%;
          z-index: 0;
          opacity: .6;
          background:
            radial-gradient(circle at 12% 20%, oklch(0.78 0.12 76 / .7) 0 1px, transparent 1.8px),
            radial-gradient(circle at 68% 74%, oklch(0.74 0.1 76 / .55) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 42%, oklch(0.68 0.08 76 / .3) 0 .7px, transparent 1.6px);
          background-size: 9rem 8rem, 13rem 11rem, 6rem 7rem;
          animation: glitter-drift 14s linear infinite;
        }

        .splash-screen::after {
          content: "";
          position: absolute;
          top: -20%;
          bottom: -20%;
          left: 0;
          width: 34%;
          z-index: 0;
          opacity: 0;
          background: linear-gradient(90deg, transparent, oklch(0.78 0.12 76 / .18), transparent);
          filter: blur(1px);
          animation: spotlight-sweep 5.5s 1s ease-in-out infinite;
          pointer-events: none;
        }

        .splash-twinkle {
          position: absolute;
          z-index: 2;
          width: .34rem;
          height: .34rem;
          border-radius: 50%;
          background: oklch(0.82 0.14 76);
          animation: circle-twinkle 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .splash-twinkle-1 { top: 18%; left: 19%; --twinkle-x: 1.2rem; --twinkle-y: -.8rem; animation-delay: .2s; }
        .splash-twinkle-2 { top: 27%; right: 22%; width: .24rem; height: .24rem; --twinkle-x: -1rem; --twinkle-y: .9rem; animation-delay: 1.1s; }
        .splash-twinkle-3 { top: 64%; left: 12%; width: .22rem; height: .22rem; --twinkle-x: 1.4rem; --twinkle-y: .6rem; animation-delay: 2s; }
        .splash-twinkle-4 { top: 76%; right: 15%; --twinkle-x: -1.3rem; --twinkle-y: -.7rem; animation-delay: .7s; }
        .splash-twinkle-5 { top: 12%; right: 41%; width: .2rem; height: .2rem; --twinkle-x: .8rem; --twinkle-y: 1rem; animation-delay: 1.7s; }
        .splash-twinkle-6 { top: 82%; left: 39%; width: .25rem; height: .25rem; --twinkle-x: -1.1rem; --twinkle-y: -.5rem; animation-delay: 2.5s; }
        .splash-twinkle-7 { top: 45%; left: 7%; width: .2rem; height: .2rem; --twinkle-x: .9rem; --twinkle-y: -.9rem; animation-delay: 1.4s; }
        .splash-twinkle-8 { top: 51%; right: 8%; width: .3rem; height: .3rem; --twinkle-x: -1.2rem; --twinkle-y: .5rem; animation-delay: .9s; }

        .splash-twinkle::before,
        .splash-twinkle::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2.1rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(0.82 0.14 76 / .75), transparent);
          transform: translate(-50%, -50%);
        }

        .splash-twinkle::after { transform: translate(-50%, -50%) rotate(90deg); }

        .splash-hidden {
          opacity: 0;
          pointer-events: none;
        }

        .splash-hidden .splash-mark,
        .splash-hidden .splash-title-wrap,
        .splash-hidden .splash-line,
        .splash-hidden .splash-loader {
          animation: splash-content-exit .45s ease forwards;
        }

        .splash-mark {
          position: relative;
          z-index: 2;
          width: 14rem;
          height: 4.5rem;
          display: grid;
          place-items: center;
          color: oklch(0.56 0.205 29);
        }

        .splash-scissors {
          width: 2.4rem;
          height: 2.4rem;
          transform: rotate(-12deg);
          animation: scissors-cut 1.9s .35s cubic-bezier(.2,.8,.2,1) both, scissors-idle 3.2s 2.5s ease-in-out infinite;
          filter: drop-shadow(0 0 .35rem oklch(0.56 0.205 29 / .55));
        }

        .splash-wing {
          position: absolute;
          top: 1.2rem;
          width: 5.2rem;
          height: 1px;
          background: oklch(0.68 0.125 76);
          transform-origin: right;
        }

        .splash-wing::before,
        .splash-wing::after {
          content: "";
          position: absolute;
          width: 85%;
          height: 1px;
          background: oklch(0.68 0.125 76);
        }

        .splash-wing::before { top: -.7rem; transform: rotate(-10deg); }
        .splash-wing::after { top: .7rem; transform: rotate(10deg); }

        .splash-wing-left {
          left: 0;
          animation: wing-open-left 1.15s .35s cubic-bezier(.2,.8,.2,1) both;
        }

        .splash-wing-right {
          right: 0;
          transform-origin: left;
          animation: wing-open-right 1.15s .35s cubic-bezier(.2,.8,.2,1) both;
        }

        .splash-title-wrap {
          position: relative;
          z-index: 2;
          text-align: center;
          perspective: 700px;
          animation: splash-reveal .7s 2.15s cubic-bezier(.2,.8,.2,1) both;
        }

        .splash-kicker,
        .splash-subtitle {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: .36em;
          font-size: .65rem;
          color: oklch(0.67 0.018 78);
        }

        .splash-kicker {
          animation: kicker-arrive .7s 2.25s ease-out both;
        }

        .splash-title {
          margin: .5rem 0 .2rem;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(2.8rem, 7vw, 5.2rem);
          line-height: .9;
          color: oklch(0.68 0.125 76);
          opacity: 1;
        }

        .splash-title-word {
          display: inline-block;
          opacity: 1;
          animation: word-type .75s 1.7s cubic-bezier(.2,.8,.2,1) both;
        }

        .splash-title-word + .splash-title-word {
          margin-left: .22em;
          animation-delay: 2.35s;
        }

        .splash-subtitle {
          color: oklch(0.56 0.205 29);
          font-weight: 700;
          animation: subtitle-arrive .7s 2.2s ease-out both, subtitle-pulse 2.6s 2.8s ease-in-out infinite;
        }

        .splash-line {
          position: relative;
          z-index: 2;
          width: min(18rem, 60vw);
          height: 1px;
          margin-top: 1.5rem;
          background: oklch(0.32 0.025 72);
          transform-origin: center;
          animation: line-draw 1s 2.45s cubic-bezier(.2,.8,.2,1) both;
        }

        .splash-loader {
          position: relative;
          z-index: 2;
          width: min(15rem, 52vw);
          margin-top: 1.25rem;
          animation: splash-reveal .7s 2.7s cubic-bezier(.2,.8,.2,1) both;
        }

        .splash-loader-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: .45rem;
          color: oklch(0.67 0.018 78);
          font: 600 .56rem "Manrope", sans-serif;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .splash-loader-track {
          width: 100%;
          height: 2px;
          overflow: hidden;
          background: oklch(0.32 0.025 72 / .65);
        }

        .splash-loader-fill {
          height: 100%;
          background: oklch(0.78 0.14 76);
          box-shadow: 0 0 .7rem oklch(0.78 0.14 76 / .7);
          transition: width 80ms linear;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div
        className={`splash-screen ${splashVisible ? "splash-visible" : "splash-hidden"}`}
        aria-hidden={!splashVisible}
      >
        <span className="splash-twinkle splash-twinkle-1" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-2" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-3" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-4" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-5" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-6" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-7" aria-hidden="true" />
        <span className="splash-twinkle splash-twinkle-8" aria-hidden="true" />
        <div className="splash-mark" aria-hidden="true">
          <span className="splash-wing splash-wing-left" />
          <Scissors className="splash-scissors" />
          <span className="splash-wing splash-wing-right" />
        </div>
        <div className="splash-title-wrap">
          <p className="splash-kicker">Bangkok · Thailand</p>
          <p className="splash-title">
            <span className="splash-title-word">Bangkok</span>
            <span className="splash-title-word">Kropper</span>
          </p>
          <p className="splash-subtitle">Barber Shop</p>
        </div>
        <span className="splash-line" />
        <div className="splash-loader" aria-label={`Loading ${loadingProgress}%`}>
          <div className="splash-loader-meta">
            <span>Preparing your experience</span>
            <span>{loadingProgress}%</span>
          </div>
          <div className="splash-loader-track" aria-hidden="true">
            <div className="splash-loader-fill" style={{ width: `${loadingProgress}%` }} />
          </div>
        </div>
      </div>
    </>
  );
}
