import { Link } from "@tanstack/react-router";
import { ArrowRight, X, Gift } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import "./anniversary-welcome-offer.css";

type WelcomeStage = "intro";

export function AnniversaryWelcomeOffer() {
  const { language } = useI18n();
  const [open, setOpen] = useState(false);
  const [stage] = useState<WelcomeStage>("intro");
  const [typedCopy, setTypedCopy] = useState("");
  const [introReveal, setIntroReveal] = useState(0);

  /* ── Intro reveal sequence ─────────────────── */
  useEffect(() => {
    if (!open || stage !== "intro") return;

    const timers = [
      window.setTimeout(() => setIntroReveal(1), 700),
      window.setTimeout(() => setIntroReveal(2), 1200),
      window.setTimeout(() => setIntroReveal(3), 1700),
      window.setTimeout(() => setIntroReveal(4), 2300),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [open, stage]);

  /* ── Typewriter ────────────────────────────── */
  useEffect(() => {
    if (!open || introReveal < 4) return;

    const copy = language === "th"
      ? "เพลิดเพลินกับเครื่องดื่มและของว่างฟรี มาใช้บริการ 9 ครั้ง รับครั้งที่ 10 ฟรี"
      : "Enjoy complimentary drinks and snacks. Visit us 9 times and get your 10th visit free.";

    let index = 0;

    setTypedCopy("");

    const timer = window.setInterval(() => {
      index += 1;
      setTypedCopy(copy.slice(0, index));

      if (index >= copy.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [language, open, introReveal]);

  /* ── Close ─────────────────────────────────── */
  const close = useCallback(() => {
    window.localStorage.setItem(
      "bk-anniversary-offer-dismissed",
      "true"
    );

    setOpen(false);
  }, []);

  /* ── Reopen ────────────────────────────────── */
  const reopen = useCallback(() => {
    setIntroReveal(0);
    setTypedCopy("");
    setOpen(true);
  }, []);

  if (!open) {
    return (
      <button
        type="button"
        className="anniversary-welcome__launcher"
        onClick={reopen}
        aria-label={language === "th" ? "เปิดสิทธิพิเศษ" : "Open guest perks"}
      >
        <Gift className="size-4" />
        <span>{language === "th" ? "สิทธิพิเศษ" : "Guest perks"}</span>
      </button>
    );
  }

  return (
    <div
      className="anniversary-welcome"
      role="dialog"
      aria-modal="true"
      aria-labelledby="anniversary-welcome-title"
    >
      {/* Ambient background */}
      <div className="anniversary-welcome__glow anniversary-welcome__glow--gold" />
      <div className="anniversary-welcome__glow anniversary-welcome__glow--warm" />

      {/* Close */}
      <button
        type="button"
        className="anniversary-welcome__close"
        onClick={close}
        aria-label={language === "th" ? "ปิดสิทธิพิเศษ" : "Close guest perks"}
      >
        <X className="size-4" />
      </button>

      {/* Card */}
      <div className="anniversary-welcome__card anniversary-welcome__card--intro">
        <div className="anniversary-welcome__content">

          {/* Loyalty badge */}
          {introReveal >= 1 && (
            <div
              className="anniversary-welcome__badge"
              aria-label={language === "th" ? "ครั้งที่ 10 ฟรี" : "10th visit free"}
            >
              <span className="anniversary-welcome__badge-shine" />
              <strong>10</strong>
              <span>{language === "th" ? "ครั้งที่ 10 ฟรี" : "10TH FREE"}</span>
            </div>
          )}

          {/* Icon */}
          {introReveal >= 2 && (
            <div className="anniversary-welcome__icon">
              <Gift className="size-4" />
            </div>
          )}

          {/* Eyebrow */}
          {introReveal >= 2 && (
            <p className="anniversary-welcome__eyebrow">
              {language === "th" ? "Bangkok Kropper · สิทธิพิเศษสำหรับคุณ" : "Bangkok Kropper · A Little Extra For You"}
            </p>
          )}

          {/* Main heading */}
          {introReveal >= 3 && (
            <h2 id="anniversary-welcome-title">
              {language === "th" ? "สิทธิพิเศษ" : "Guest Perks"}
            </h2>
          )}

          {/* Main announcement */}
          {introReveal >= 4 && (
            <>
              <p className="anniversary-welcome__copy anniversary-welcome__typewriter">
                {typedCopy}
                <span
                  className="anniversary-welcome__caret"
                  aria-hidden="true"
                />
              </p>

              {/* Promotion details */}
              <div className="anniversary-welcome__details">

                <div className="anniversary-welcome__detail">
                  <span className="anniversary-welcome__detail-label">
                    {language === "th" ? "สะสมการใช้บริการ" : "LOYALTY REWARDS"}
                  </span>

                  <strong>{language === "th" ? "มา 9 ครั้ง รับครั้งที่ 10 ฟรี" : "9 visits → 10th visit free"}</strong>
                </div>

                <div className="anniversary-welcome__detail">
                  <span className="anniversary-welcome__detail-label">
                    {language === "th" ? "วิธีสะสม" : "TRACK YOUR VISITS"}
                  </span>

                  <strong>{language === "th" ? "สแกนผ่าน LINE หรือใช้บัตรสะสมแต้ม" : "Scan via LINE or use a stamp card"}</strong>
                </div>

                <div className="anniversary-welcome__detail">
                  <span className="anniversary-welcome__detail-label">
                    {language === "th" ? "เครื่องดื่มและของว่างฟรี" : "COMPLIMENTARY DRINKS & SNACKS"}
                  </span>

                  <strong>{language === "th" ? "วิสกี้ออนเดอะร็อก · วอดก้าช็อต · กาแฟร้อนหรือเย็น · ชาร้อนหรือเย็น · เครื่องดื่มแอลกอฮอล์ปั่น · สมูทตี้ผลไม้ · อิตาเลียนโซดา · ของว่าง · เบียร์" : "Whisky on the rocks · Vodka shots · Hot or iced coffee · Hot or iced tea · Blended alcoholic drinks · Fruit smoothies · Italian soda · Snacks · Beer"}</strong>
                </div>

              </div>

              {/* Customer eligibility */}
              <p className="anniversary-welcome__note">
                {language === "th"
                  ? "สำหรับลูกค้าใหม่และลูกค้าปัจจุบัน · ขอบคุณที่ไว้วางใจเรา"
                  : "Open to both new and existing customers · A token of our appreciation"}
              </p>

              {/* CTA */}
              <Link
                to="/book"
                className="anniversary-welcome__cta"
                onClick={close}
              >
                <span>{language === "th" ? "จองคิวของคุณ" : "Book Your Visit"}</span>
                <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
