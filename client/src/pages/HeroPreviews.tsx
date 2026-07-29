/*
 * 617 EAST TRUST — HERO ANIMATION PREVIEWS
 * Live working previews of all 4 hero animation concepts.
 * Midnight Ledger design system.
 */

import { useEffect, useRef, useState } from "react";

const HERO_IMG = "/images/617east-hero-v2_1ca341a7.jpg";
const LOGO = "/images/logo-final-B-transparent_bbde9f45.png";

/* ============================================================
   SHARED PIECES
============================================================ */
function TrustBadges({ visible = true, stagger = 0 }: { visible?: boolean; stagger?: number }) {
  const items = ["NC Registered", "Banking Background", "No Automated Filers", "Real Advisor"];
  return (
    <div className="flex flex-wrap items-center gap-6 pt-6" style={{ borderTop: "1px solid oklch(0.30 0.01 80 / 0.3)" }}>
      {items.map((t, i) => (
        <span
          key={t}
          className="flex items-center gap-2 text-xs"
          style={{
            color: "oklch(0.62 0.010 80)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: `opacity 500ms cubic-bezier(0.23,1,0.32,1) ${stagger + i * 90}ms, transform 500ms cubic-bezier(0.23,1,0.32,1) ${stagger + i * 90}ms`,
          }}
        >
          <span style={{ color: "oklch(0.78 0.12 80)", fontSize: "9px" }}>◆</span>
          {t}
        </span>
      ))}
    </div>
  );
}

function HeroCtas({ visible = true, delay = 0, pulse = false }: { visible?: boolean; delay?: number; pulse?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className={`btn-gold px-7 py-4 rounded-sm text-sm inline-flex items-center gap-2 ${pulse ? "hero-pulse-once" : ""}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: `opacity 400ms cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 400ms cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
        }}
      >
        Book a Free Consultation →
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="btn-ghost-gold px-7 py-4 rounded-sm text-sm inline-flex items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: `opacity 400ms cubic-bezier(0.23,1,0.32,1) ${delay + 80}ms, transform 400ms cubic-bezier(0.23,1,0.32,1) ${delay + 80}ms`,
        }}
      >
        (910) 315-1800 — We answer.
      </a>
    </div>
  );
}

/* ============================================================
   CONCEPT 01 — Cinematic Ken Burns + Word-by-Word Reveal
============================================================ */
function Hero01({ active }: { active: boolean }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (active) {
      setStarted(false);
      const t = setTimeout(() => setStarted(true), 100);
      return () => clearTimeout(t);
    }
  }, [active]);

  const line1Words = ["The", "most", "important", "thing", "we", "do", "is", "tell", "you"];

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "oklch(0.10 0.008 240)" }}>
      {/* Ken Burns background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${HERO_IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          animation: started ? "kenburns-drift 24s ease-out forwards" : "none",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, oklch(0.10 0.008 240 / 0.97) 0%, oklch(0.10 0.008 240 / 0.92) 45%, oklch(0.10 0.008 240 / 0.55) 75%, oklch(0.10 0.008 240 / 0.35) 100%)" }}
      />
      <div className="relative z-10 h-full flex items-center px-10 md:px-16">
        <div className="max-w-2xl">
          <span
            className="section-label block mb-4"
            style={{
              opacity: started ? 1 : 0,
              transition: "opacity 600ms ease 200ms",
            }}
          >
            BUSINESS FORMATION & FINANCIAL ADVISORY — NORTH CAROLINA
          </span>
          <h1 className="font-display text-4xl md:text-6xl mb-6" style={{ color: "oklch(0.94 0.005 80)", lineHeight: 1.12 }}>
            {line1Words.map((w, i) => (
              <span
                key={i}
                className="inline-block mr-[0.28em]"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 500ms cubic-bezier(0.23,1,0.32,1) ${400 + i * 60}ms, transform 500ms cubic-bezier(0.23,1,0.32,1) ${400 + i * 60}ms`,
                }}
              >
                {w}
              </span>
            ))}
            <em
              className="block mt-1"
              style={{
                color: "oklch(0.78 0.12 80)",
                fontStyle: "italic",
                opacity: started ? 1 : 0,
                transform: started ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 700ms cubic-bezier(0.23,1,0.32,1) 1250ms, transform 700ms cubic-bezier(0.23,1,0.32,1) 1250ms",
              }}
            >
              what not to do.
            </em>
          </h1>
          <p
            className="text-base md:text-lg mb-8"
            style={{
              color: "oklch(0.65 0.010 80)",
              maxWidth: "480px",
              lineHeight: 1.75,
              opacity: started ? 1 : 0,
              transition: "opacity 800ms ease 1700ms",
            }}
          >
            617 East Trust is a North Carolina advisory firm for founders and individuals who want a partner — not a processor.
          </p>
          <HeroCtas visible={started} delay={2000} />
          <TrustBadges visible={started} stagger={2300} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CONCEPT 02 — Particle Field + Mouse Parallax + Typewriter
============================================================ */
function Hero02({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [showRest, setShowRest] = useState(false);
  const fullText = "The most important thing we do is tell you";

  // Typewriter
  useEffect(() => {
    if (!active) return;
    setTyped("");
    setShowRest(false);
    let i = 0;
    const startDelay = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTyped(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(iv);
          setTimeout(() => setShowRest(true), 250);
        }
      }, 38);
    }, 400);
    return () => clearTimeout(startDelay);
  }, [active]);

  // Particles
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const N = 90;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.5,
      vy: Math.random() * 0.25 + 0.08,
      vx: (Math.random() - 0.5) * 0.08,
      o: Math.random() * 0.5 + 0.15,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.78 0.12 80 / ${p.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [active]);

  // Mouse parallax
  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      bg.style.transform = `translateX(${nx * -14}px) scale(1.04)`;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "oklch(0.10 0.008 240)" }}>
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${HERO_IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          transform: "scale(1.04)",
          transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, oklch(0.10 0.008 240 / 0.97) 0%, oklch(0.10 0.008 240 / 0.92) 45%, oklch(0.10 0.008 240 / 0.55) 75%, oklch(0.10 0.008 240 / 0.35) 100%)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[5]" />
      <div className="relative z-10 h-full flex items-center px-10 md:px-16">
        <div className="max-w-2xl">
          <span className="section-label block mb-4">BUSINESS FORMATION & FINANCIAL ADVISORY — NORTH CAROLINA</span>
          <h1 className="font-display text-4xl md:text-6xl mb-6" style={{ color: "oklch(0.94 0.005 80)", lineHeight: 1.12, minHeight: "2.3em" }}>
            {typed}
            <span
              className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
              style={{
                background: "oklch(0.78 0.12 80)",
                opacity: showRest ? 0 : 1,
                animation: "cursor-blink 0.8s step-start infinite",
              }}
            />
            <em
              className="block mt-1"
              style={{
                color: "oklch(0.78 0.12 80)",
                fontStyle: "italic",
                opacity: showRest ? 1 : 0,
                transform: showRest ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 700ms cubic-bezier(0.23,1,0.32,1), transform 700ms cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              what not to do.
            </em>
          </h1>
          <p
            className="text-base md:text-lg mb-8"
            style={{
              color: "oklch(0.65 0.010 80)", maxWidth: "480px", lineHeight: 1.75,
              opacity: showRest ? 1 : 0,
              transition: "opacity 700ms ease 300ms",
            }}
          >
            617 East Trust is a North Carolina advisory firm for founders and individuals who want a partner — not a processor.
          </p>
          <HeroCtas visible={showRest} delay={500} />
          <TrustBadges visible={showRest} stagger={800} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CONCEPT 03 — Scroll-Driven Narrative (simulated with progress slider)
============================================================ */
function Hero03({ active }: { active: boolean }) {
  const [progress, setProgress] = useState(0);
  const [auto, setAuto] = useState(true);

  // Auto-play the scroll simulation
  useEffect(() => {
    if (!active || !auto) return;
    setProgress(0);
    let raf = 0;
    let start: number | null = null;
    const dur = 6000;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, 500);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [active, auto]);

  const p = progress;
  const imgX = Math.max(0, 60 - p * 0.6); // background slides in from right
  const line1 = p >= 2;
  const line2 = p >= 30;
  const line3 = p >= 60;
  const badges = p >= 80;

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "oklch(0.10 0.008 240)" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${HERO_IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          transform: `translateX(${imgX}%)`,
          opacity: Math.min(1, 0.3 + p * 0.014),
          transition: "transform 100ms linear, opacity 100ms linear",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, oklch(0.10 0.008 240 / 0.97) 0%, oklch(0.10 0.008 240 / 0.92) 45%, oklch(0.10 0.008 240 / 0.55) 75%, oklch(0.10 0.008 240 / 0.35) 100%)" }}
      />
      <div className="relative z-10 h-full flex items-center px-10 md:px-16">
        <div className="max-w-2xl">
          <span
            className="section-label block mb-4"
            style={{ opacity: line1 ? 1 : 0, transition: "opacity 500ms ease" }}
          >
            BUSINESS FORMATION & FINANCIAL ADVISORY — NORTH CAROLINA
          </span>
          <h1 className="font-display text-4xl md:text-6xl mb-6" style={{ color: "oklch(0.94 0.005 80)", lineHeight: 1.12 }}>
            <span
              className="block"
              style={{
                opacity: line1 ? 1 : 0,
                transform: line1 ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 600ms cubic-bezier(0.23,1,0.32,1), transform 600ms cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              The most important
            </span>
            <span
              className="block"
              style={{
                opacity: line2 ? 1 : 0,
                transform: line2 ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 600ms cubic-bezier(0.23,1,0.32,1), transform 600ms cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              thing we do is tell you
            </span>
            <em
              className="block mt-1"
              style={{
                color: "oklch(0.78 0.12 80)",
                fontStyle: "italic",
                opacity: line3 ? 1 : 0,
                transform: line3 ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 700ms cubic-bezier(0.23,1,0.32,1), transform 700ms cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              what not to do.
            </em>
          </h1>
          <p
            className="text-base md:text-lg mb-8"
            style={{
              color: "oklch(0.65 0.010 80)", maxWidth: "480px", lineHeight: 1.75,
              opacity: line3 ? 1 : 0, transition: "opacity 600ms ease 200ms",
            }}
          >
            617 East Trust is a North Carolina advisory firm for founders and individuals who want a partner — not a processor.
          </p>
          <HeroCtas visible={badges} delay={0} pulse={badges} />
          <TrustBadges visible={badges} stagger={200} />
        </div>
      </div>
      {/* Scroll progress simulator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full" style={{ background: "oklch(0.13 0.009 240 / 0.9)", border: "1px solid oklch(0.22 0.008 240)", backdropFilter: "blur(8px)" }}>
        <span className="text-xs font-mono" style={{ color: "oklch(0.58 0.010 80)" }}>SCROLL</span>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => { setAuto(false); setProgress(Number(e.target.value)); }}
          className="w-40 accent-[#c9a02f]"
        />
        <button
          onClick={() => { setAuto(true); }}
          className="text-xs font-mono px-2 py-1 rounded-sm"
          style={{ color: "oklch(0.78 0.12 80)", border: "1px solid oklch(0.78 0.12 80 / 0.4)" }}
        >
          REPLAY
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   CONCEPT 04 — Ambient Light Pulse + Staggered Entry
============================================================ */
function Hero04({ active }: { active: boolean }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (active) {
      setStarted(false);
      const t = setTimeout(() => setStarted(true), 100);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "oklch(0.10 0.008 240)" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${HERO_IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, oklch(0.10 0.008 240 / 0.97) 0%, oklch(0.10 0.008 240 / 0.92) 45%, oklch(0.10 0.008 240 / 0.55) 75%, oklch(0.10 0.008 240 / 0.35) 100%)" }}
      />
      {/* Ambient breathing gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 75% 45%, oklch(0.78 0.12 80 / 0.10) 0%, transparent 65%)",
          animation: "ambient-breathe 8s ease-in-out infinite",
        }}
      />
      {/* Mini nav simulation with logo drop */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-4">
        <img
          src={LOGO}
          alt=""
          style={{
            height: "44px",
            width: "auto",
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(-24px)",
            transition: "opacity 450ms cubic-bezier(0.34,1.56,0.64,1) 100ms, transform 450ms cubic-bezier(0.34,1.56,0.64,1) 100ms",
          }}
        />
        <div className="hidden md:flex items-center gap-6">
          {["Home", "Services", "About", "Resources", "Contact"].map((l, i) => (
            <span
              key={l}
              className="text-sm"
              style={{
                color: "oklch(0.72 0.010 80)",
                opacity: started ? 1 : 0,
                transition: `opacity 400ms ease ${250 + i * 80}ms`,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 h-full flex items-center px-10 md:px-16">
        <div className="max-w-2xl">
          <span
            className="section-label block mb-1"
            style={{ opacity: started ? 1 : 0, transition: "opacity 500ms ease 600ms" }}
          >
            BUSINESS FORMATION & FINANCIAL ADVISORY — NORTH CAROLINA
          </span>
          {/* Self-drawing gold rule */}
          <div
            className="mb-5"
            style={{
              height: "2px",
              background: "oklch(0.78 0.12 80)",
              width: started ? "42px" : "0px",
              transition: "width 600ms cubic-bezier(0.23,1,0.32,1) 800ms",
            }}
          />
          <h1 className="font-display text-4xl md:text-6xl mb-6" style={{ color: "oklch(0.94 0.005 80)", lineHeight: 1.12 }}>
            <span
              className="block overflow-hidden"
            >
              <span
                className="block"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(100%)",
                  transition: "opacity 650ms cubic-bezier(0.23,1,0.32,1) 900ms, transform 650ms cubic-bezier(0.23,1,0.32,1) 900ms",
                }}
              >
                The most important
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(100%)",
                  transition: "opacity 650ms cubic-bezier(0.23,1,0.32,1) 1100ms, transform 650ms cubic-bezier(0.23,1,0.32,1) 1100ms",
                }}
              >
                thing we do is tell you
              </span>
            </span>
            <span className="block overflow-hidden">
              <em
                className="block mt-1"
                style={{
                  color: "oklch(0.78 0.12 80)",
                  fontStyle: "italic",
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0)" : "translateY(100%)",
                  transition: "opacity 700ms cubic-bezier(0.23,1,0.32,1) 1350ms, transform 700ms cubic-bezier(0.23,1,0.32,1) 1350ms",
                }}
              >
                what not to do.
              </em>
            </span>
          </h1>
          <p
            className="text-base md:text-lg mb-8"
            style={{
              color: "oklch(0.65 0.010 80)", maxWidth: "480px", lineHeight: 1.75,
              opacity: started ? 1 : 0,
              transition: "opacity 700ms ease 1650ms",
            }}
          >
            617 East Trust is a North Carolina advisory firm for founders and individuals who want a partner — not a processor.
          </p>
          <HeroCtas visible={started} delay={1900} />
          <TrustBadges visible={started} stagger={2150} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PREVIEW PAGE
============================================================ */
const CONCEPT_META = [
  { id: "01", name: "Cinematic Ken Burns", desc: "Slow background drift + word-by-word headline reveal. Prestige documentary feel." },
  { id: "02", name: "Particle Field + Parallax", desc: "Rising gold embers, mouse parallax, typewriter headline. Move your mouse over it." },
  { id: "03", name: "Scroll-Driven Narrative", desc: "Elements reveal as you scroll. Auto-plays here; drag the slider to scrub manually." },
  { id: "04", name: "Ambient Pulse + Staggered Entry", desc: "Breathing gold glow, logo drop, line-by-line masked reveal, self-drawing rule." },
];

export default function HeroPreviews() {
  const [selected, setSelected] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    document.title = "Hero Animation Previews | 617 East Trust";
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.07 0.006 240)" }}>
      {/* Top bar */}
      <div className="px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid oklch(0.18 0.008 240)" }}>
        <div>
          <h1 className="font-display text-xl" style={{ color: "oklch(0.94 0.005 80)" }}>
            Hero Animation Previews
          </h1>
          <p className="text-xs font-mono mt-1" style={{ color: "oklch(0.45 0.007 80)" }}>
            INTERNAL REVIEW — SELECT A CONCEPT, WATCH IT RUN, HIT REPLAY TO SEE IT AGAIN
          </p>
        </div>
        <a href="/" className="text-xs font-mono px-4 py-2 rounded-sm" style={{ color: "oklch(0.78 0.12 80)", border: "1px solid oklch(0.78 0.12 80 / 0.4)" }}>
          ← BACK TO SITE
        </a>
      </div>

      {/* Concept switcher */}
      <div className="px-6 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {CONCEPT_META.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { setSelected(i); setReplayKey(k => k + 1); }}
            className="text-left p-4 rounded-sm transition-all"
            style={{
              background: selected === i ? "oklch(0.13 0.009 240)" : "transparent",
              border: selected === i ? "1px solid oklch(0.78 0.12 80 / 0.6)" : "1px solid oklch(0.20 0.008 240)",
            }}
          >
            <span className="text-xs font-mono block mb-1" style={{ color: "oklch(0.78 0.12 80)" }}>
              CONCEPT {c.id}
            </span>
            <span className="text-sm font-medium block mb-1" style={{ color: selected === i ? "oklch(0.94 0.005 80)" : "oklch(0.65 0.010 80)" }}>
              {c.name}
            </span>
            <span className="text-xs block leading-relaxed" style={{ color: "oklch(0.45 0.007 80)" }}>
              {c.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Preview stage */}
      <div className="px-6 md:px-10 pb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono" style={{ color: "oklch(0.58 0.010 80)" }}>
            NOW PLAYING: CONCEPT {CONCEPT_META[selected].id} — {CONCEPT_META[selected].name.toUpperCase()}
          </span>
          <button
            onClick={() => setReplayKey(k => k + 1)}
            className="text-xs font-mono px-4 py-2 rounded-sm"
            style={{ color: "oklch(0.10 0.008 240)", background: "oklch(0.78 0.12 80)" }}
          >
            ↻ REPLAY ANIMATION
          </button>
        </div>
        <div
          className="w-full rounded-sm overflow-hidden"
          style={{ height: "calc(100vh - 320px)", minHeight: "480px", border: "1px solid oklch(0.22 0.008 240)" }}
        >
          {selected === 0 && <Hero01 key={`h1-${replayKey}`} active={true} />}
          {selected === 1 && <Hero02 key={`h2-${replayKey}`} active={true} />}
          {selected === 2 && <Hero03 key={`h3-${replayKey}`} active={true} />}
          {selected === 3 && <Hero04 key={`h4-${replayKey}`} active={true} />}
        </div>
        <p className="text-xs mt-4 text-center font-mono" style={{ color: "oklch(0.45 0.007 80)" }}>
          REPLY WITH YOUR PREFERRED CONCEPT (01–04) OR A COMBINATION — I'LL IMPLEMENT IT ON THE LIVE HOME PAGE
        </p>
      </div>
    </div>
  );
}
