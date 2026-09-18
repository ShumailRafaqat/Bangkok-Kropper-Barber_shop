import { useEffect, useState } from "react";

export function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1900);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        #kropper-splash * {
          box-sizing: border-box;
        }

        /* ============================================
           GOLD LINE
           ============================================ */

        #kropper-splash .kropper-line {
          animation:
            draw-line
            0.55s
            ease-out
            forwards !important;
        }

        @keyframes draw-line {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }

          100% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        /* ============================================
           SCISSORS
           
           FAST LEFT → RIGHT
           ============================================ */

        #kropper-splash .kropper-scissors {
          animation:
            scissors-fast-move
            1.05s
            0.08s
            cubic-bezier(0.25, 0.9, 0.35, 1)
            forwards !important;

          transform-origin: center center;
          transform-box: fill-box;
        }

        @keyframes scissors-fast-move {
          0% {
            opacity: 0;

            transform:
              translateX(-520px)
              translateY(0)
              rotate(0deg)
              scale(0.92);
          }

          6% {
            opacity: 1;
          }

          /* Very fast approach */
          18% {
            transform:
              translateX(-360px)
              translateY(0)
              rotate(0deg)
              scale(0.96);
          }

          34% {
            transform:
              translateX(-190px)
              translateY(0)
              rotate(0deg)
              scale(1);
          }

          /* Center */
          48% {
            transform:
              translateX(0)
              translateY(0)
              rotate(0deg)
              scale(1);
          }

          /* Pass through */
          61% {
            transform:
              translateX(120px)
              translateY(0)
              rotate(0deg)
              scale(1);
          }

          76% {
            transform:
              translateX(270px)
              translateY(0)
              rotate(0deg)
              scale(0.98);
          }

          91% {
            opacity: 1;

            transform:
              translateX(410px)
              translateY(0)
              rotate(0deg)
              scale(0.94);
          }

          100% {
            opacity: 0;

            transform:
              translateX(520px)
              translateY(0)
              rotate(0deg)
              scale(0.9);
          }
        }

        /* ============================================
           REALISTIC SNIP
           ============================================ */

        #kropper-splash .blade-top {
          transform-box: fill-box;
          transform-origin: 100% 100%;

          animation:
            blade-top-snip
            0.21s
            0.18s
            ease-in-out
            4
            alternate !important;
        }

        #kropper-splash .blade-bottom {
          transform-box: fill-box;
          transform-origin: 100% 0%;

          animation:
            blade-bottom-snip
            0.21s
            0.18s
            ease-in-out
            4
            alternate !important;
        }

        @keyframes blade-top-snip {
          0% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(-8deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes blade-bottom-snip {
          0% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(8deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        /* ============================================
           METAL SHINE
           ============================================ */

        #kropper-splash .scissor-shine {
          animation:
            shine
            0.55s
            0.25s
            ease-out
            forwards !important;

          opacity: 0;
        }

        @keyframes shine {
          0% {
            opacity: 0;
          }

          35% {
            opacity: 0.9;
          }

          100% {
            opacity: 0;
          }
        }

        /* ============================================
           BRAND NAME
           ============================================ */

        #kropper-splash .kropper-name {
          animation:
            reveal-name
            0.65s
            0.36s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards !important;
        }

        @keyframes reveal-name {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-8px);
          }

          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
          }
        }

        /* ============================================
           TAGLINE
           ============================================ */

        #kropper-splash .kropper-tagline {
          animation:
            rise-tagline
            0.4s
            0.78s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards !important;
        }

        @keyframes rise-tagline {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(3px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* ============================================
           EXIT
           ============================================ */

        #kropper-splash.kropper-exiting {
          animation:
            splash-exit
            0.7s
            ease
            forwards !important;
        }

        #kropper-splash.kropper-exiting .kropper-scene {
          animation:
            scene-exit
            0.7s
            ease
            forwards !important;
        }

        @keyframes scene-exit {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: scale(1.04);
            filter: blur(6px);
          }
        }

        @keyframes splash-exit {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* ============================================
           MOBILE
           ============================================ */

        @media (max-width: 600px) {
          #kropper-splash .kropper-scene {
            width: 94vw !important;
          }

          #kropper-splash .kropper-scissors {
            width: 82px !important;
            height: 70px !important;
          }
        }

        /* ============================================
           REDUCED MOTION
           ============================================ */

        @media (prefers-reduced-motion: reduce) {
          #kropper-splash .kropper-line,
          #kropper-splash .kropper-scissors,
          #kropper-splash .blade-top,
          #kropper-splash .blade-bottom,
          #kropper-splash .kropper-name,
          #kropper-splash .kropper-tagline {
            animation: none !important;
          }

          #kropper-splash .kropper-line {
            transform: scaleX(1) !important;
            opacity: 1 !important;
          }

          #kropper-splash .kropper-scissors {
            opacity: 1 !important;
          }

          #kropper-splash .kropper-name {
            opacity: 1 !important;
            clip-path: inset(0) !important;
          }

          #kropper-splash .kropper-tagline {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        id="kropper-splash"
        className={exiting ? "kropper-exiting" : ""}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,

          background:
            "radial-gradient(circle at 50% 43%, #19150f 0%, #090806 43%, #050505 75%, #020202 100%)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          overflow: "hidden",
        }}
      >
        {/* ==========================================
            SUBTLE CENTER GLOW
            ========================================== */}

        <div
          style={{
            position: "absolute",

            width: "55vw",
            height: "55vw",

            maxWidth: "650px",
            maxHeight: "650px",

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(196,164,108,0.05), transparent 68%)",

            pointerEvents: "none",
          }}
        />

        <div
          className="kropper-scene"
          style={{
            position: "relative",

            width: "min(92vw, 720px)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            textAlign: "center",
          }}
        >
          {/* ==========================================
              SCISSORS + LINE
              ========================================== */}

          <div
            style={{
              position: "relative",

              width: "100%",
              height: "100px",

              marginBottom: "8px",
            }}
          >
            {/* ========================================
                GOLD LINE
                ======================================== */}

            <div
              className="kropper-line"
              style={{
                position: "absolute",

                left: "10%",
                right: "10%",

                top: "78px",

                height: "1px",

                background:
                  "linear-gradient(90deg, transparent, #8b7048 15%, #c4a46c 35%, #e5cb96 50%, #c4a46c 65%, #8b7048 85%, transparent)",

                boxShadow:
                  "0 0 6px rgba(196,164,108,0.22)",

                transform: "scaleX(0)",
                transformOrigin: "center",
              }}
            />

            {/* ========================================
                SCISSORS

                BLADES = UP
                HANDLES = DOWN
                FAST LEFT → RIGHT
                ======================================== */}

            <svg
              className="kropper-scissors"
              viewBox="0 0 140 100"
              style={{
                position: "absolute",

                left: "calc(50% - 42px)",
                top: "2px",

                width: "100px",
                height: "72px",

                opacity: 0,

                overflow: "visible",

                filter:
                  "drop-shadow(0 7px 12px rgba(0,0,0,0.75))",
              }}
            >
              <defs>
                {/* ======================================
                    METAL
                    ====================================== */}

                <linearGradient
                  id="scissorMetal"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#fff9e9"
                  />

                  <stop
                    offset="22%"
                    stopColor="#e9d8b5"
                  />

                  <stop
                    offset="48%"
                    stopColor="#b8965c"
                  />

                  <stop
                    offset="68%"
                    stopColor="#f4e6c7"
                  />

                  <stop
                    offset="100%"
                    stopColor="#80633d"
                  />
                </linearGradient>

                {/* ======================================
                    BLADE
                    ====================================== */}

                <linearGradient
                  id="scissorBlade"
                  x1="0"
                  y1="1"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#9b7d4d"
                  />

                  <stop
                    offset="30%"
                    stopColor="#ded0ac"
                  />

                  <stop
                    offset="52%"
                    stopColor="#fff9e9"
                  />

                  <stop
                    offset="75%"
                    stopColor="#c4aa77"
                  />

                  <stop
                    offset="100%"
                    stopColor="#745b39"
                  />
                </linearGradient>

                {/* ======================================
                    SCREW
                    ====================================== */}

                <radialGradient
                  id="scissorScrew"
                  cx="35%"
                  cy="30%"
                  r="70%"
                >
                  <stop
                    offset="0%"
                    stopColor="#fff3cf"
                  />

                  <stop
                    offset="40%"
                    stopColor="#c4a36b"
                  />

                  <stop
                    offset="70%"
                    stopColor="#735b39"
                  />

                  <stop
                    offset="100%"
                    stopColor="#292117"
                  />
                </radialGradient>

                {/* ======================================
                    SHINE
                    ====================================== */}

                <linearGradient
                  id="scissorShine"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#fff"
                    stopOpacity="0"
                  />

                  <stop
                    offset="50%"
                    stopColor="#fff"
                    stopOpacity="0.9"
                  />

                  <stop
                    offset="100%"
                    stopColor="#fff"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* ========================================
                  SCISSOR BODY

                  TIP / BLADES = UP
                  PIVOT = CENTER
                  HANDLES = DOWN
                  ======================================== */}

              <g>
                {/* ======================================
                    TOP BLADE
                    ====================================== */}

                <g className="blade-top">
                  <path
                    d="
                      M70 51
                      L39 9
                      C37 6 39 3 42 5
                      L75 48
                      Z
                    "
                    fill="url(#scissorBlade)"
                  />

                  {/* Sharp blade edge */}
                  <path
                    d="M40 8 L72 49"
                    fill="none"
                    stroke="#fff9ea"
                    strokeWidth="1"
                    opacity="0.85"
                  />

                  {/* Blade shadow */}
                  <path
                    d="M43 9 L74 48"
                    fill="none"
                    stroke="#806440"
                    strokeWidth="0.55"
                    opacity="0.5"
                  />
                </g>

                {/* ======================================
                    BOTTOM BLADE
                    ====================================== */}

                <g className="blade-bottom">
                  <path
                    d="
                      M70 51
                      L53 5
                      C52 2 55 1 57 4
                      L76 49
                      Z
                    "
                    fill="url(#scissorBlade)"
                  />

                  <path
                    d="M55 5 L74 49"
                    fill="none"
                    stroke="#fff9e9"
                    strokeWidth="0.9"
                    opacity="0.72"
                  />
                </g>

                {/* ======================================
                    PIVOT / PIN
                    ====================================== */}

                <circle
                  cx="75"
                  cy="51"
                  r="5"
                  fill="url(#scissorScrew)"
                />

                <circle
                  cx="75"
                  cy="51"
                  r="2.3"
                  fill="#282116"
                />

                <circle
                  cx="74"
                  cy="50"
                  r="0.9"
                  fill="#fff2cf"
                />

                {/* ======================================
                    LEFT SHANK
                    ====================================== */}

                <path
                  d="
                    M78 54
                    C72 62 66 69 59 76
                  "
                  fill="none"
                  stroke="url(#scissorMetal)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* ======================================
                    RIGHT SHANK
                    ====================================== */}

                <path
                  d="
                    M80 54
                    C87 62 96 69 104 76
                  "
                  fill="none"
                  stroke="url(#scissorMetal)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* ======================================
                    LEFT HANDLE
                    ====================================== */}

                <ellipse
                  cx="57"
                  cy="82"
                  rx="10"
                  ry="11"
                  fill="none"
                  stroke="url(#scissorMetal)"
                  strokeWidth="4"
                />

                <ellipse
                  cx="57"
                  cy="82"
                  rx="5.8"
                  ry="6.8"
                  fill="#080706"
                  opacity="0.5"
                />

                {/* ======================================
                    RIGHT HANDLE
                    ====================================== */}

                <ellipse
                  cx="106"
                  cy="82"
                  rx="10"
                  ry="11"
                  fill="none"
                  stroke="url(#scissorMetal)"
                  strokeWidth="4"
                />

                <ellipse
                  cx="106"
                  cy="82"
                  rx="5.8"
                  ry="6.8"
                  fill="#080706"
                  opacity="0.5"
                />

                {/* ======================================
                    METAL SHINE
                    ====================================== */}

                <path
                  className="scissor-shine"
                  d="M42 9 L72 48"
                  stroke="url(#scissorShine)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          {/* ==========================================
              BRAND NAME
              ========================================== */}

          <div
            className="kropper-name"
            style={{
              color: "#e5d4b4",

              fontFamily:
                "Georgia, 'Times New Roman', serif",

              fontSize:
                "clamp(22px, 7.2vw, 54px)",

              letterSpacing: "0.04em",

              lineHeight: 1.1,

              whiteSpace: "nowrap",

              clipPath:
                "inset(0 100% 0 0)",

              opacity: 0,

              textShadow:
                "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            BANGKOK KROPPER
          </div>

          {/* ==========================================
              TAGLINE
              ========================================== */}

          <div
            className="kropper-tagline"
            style={{
              marginTop: "10px",

              color: "#bd9b68",

              fontFamily:
                "Arial, sans-serif",

              fontSize:
                "clamp(10px, 2.6vw, 14px)",

              letterSpacing: "0.22em",

              lineHeight: 1.3,

              opacity: 0,

              transform:
                "translateY(10px)",
            }}
          >
            CRAFTED WITH PRECISION
          </div>
        </div>
      </div>
    </>
  );
}