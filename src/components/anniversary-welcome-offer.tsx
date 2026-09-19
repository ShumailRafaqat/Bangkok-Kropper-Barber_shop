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
      ? "ฉลองครบรอบกับเรา รับส่วนลด 50% สำหรับบริการทั้งหมด พร้อมเครื่องดื่มต้อนรับ"
      : "To celebrate our anniversary, enjoy 50% off all services, with complimentary refreshments.";

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
        aria-label={language === "th" ? "เปิดข้อเสนอครบรอบอีกครั้ง" : "Open anniversary offer"}
      >
        <Gift className="size-4" />
        <span>{language === "th" ? "ข้อเสนอครบรอบ" : "Anniversary offer"}</span>
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
        aria-label={language === "th" ? "ปิดข้อเสนอครบรอบ" : "Close anniversary offer"}
      >
        <X className="size-4" />
      </button>

      {/* Card */}
      <div className="anniversary-welcome__card anniversary-welcome__card--intro">
        <div className="anniversary-welcome__content">

          {/* 50% Badge */}
          {introReveal >= 1 && (
            <div
              className="anniversary-welcome__badge"
              aria-label="50 percent off"
            >
              <span className="anniversary-welcome__badge-shine" />
              <strong>50%</strong>
              <span>{language === "th" ? "ลด" : "OFF"}</span>
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
              {language === "th" ? "Bangkok Kropper · ฉลองครบรอบ" : "Bangkok Kropper · Anniversary Celebration"}
            </p>
          )}

          {/* Main heading */}
          {introReveal >= 3 && (
            <h2 id="anniversary-welcome-title">
              {language === "th" ? "ข้อเสนอครบรอบ" : "Anniversary Offer"}
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
                    {language === "th" ? "ระยะเวลาโปรโมชั่น" : "OFFER PERIOD"}
                  </span>

                  <strong>{language === "th" ? "วันนี้ – 15 ตุลาคม 2026" : "Now – October 15, 2026"}</strong>
                </div>

                <div className="anniversary-welcome__detail">
                  <span className="anniversary-welcome__detail-label">
                    {language === "th" ? "สาขา" : "BRANCHES"}
                  </span>

                  <strong>{language === "th" ? "ทั้งสองสาขา Bangkok Kropper" : "Both Bangkok Kropper branches"}</strong>
                </div>

                <div className="anniversary-welcome__detail">
                  <span className="anniversary-welcome__detail-label">
                    {language === "th" ? "เครื่องดื่มต้อนรับฟรี" : "COMPLIMENTARY REFRESHMENT"}
                  </span>

                  <strong>{language === "th" ? "กาแฟ · ชา · วิสกี้" : "Coffee · Tea · Whisky"}</strong>
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
                search={{ promo: "anniversary50" } as any}
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
