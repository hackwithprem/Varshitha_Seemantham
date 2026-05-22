import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

// ─── Event constants ────────────────────────────────────────────────
const EVENT = {
  bride: "Varshitha",
  partner: "Suresh",
  parents: ["Ch. Chinnam Naidu", "Ch. Bhagya Lakshmi"],
  dateISO: "2026-06-11T10:45:00+05:30",
  dateLabel: "11th June 2026, Thursday",
  time: "10:45 AM onwards",
  lunch: "12:00 PM",
  venue: "Rotary Club",
  venueLine2: "NCS Backside, Vizianagaram Town",
  mapsUrl:
    "https://maps.app.goo.gl/AD7yHLtHkG6oB2k37",
  whatsapp: "+91 6305201603",
};

// ─── Reusable SVG art ───────────────────────────────────────────────
function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="80" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="40" strokeDasharray="1 2" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          const x = 100 + Math.cos(a) * 70;
          const y = 100 + Math.sin(a) * 70;
          return (
            <g key={i} transform={`rotate(${(i * 360) / 16} 100 100)`}>
              <path d="M100 30 C 105 50, 105 70, 100 90 C 95 70, 95 50, 100 30 Z" fill="currentColor" fillOpacity="0.08" />
              <circle cx={x} cy={y} r="2" fill="currentColor" />
            </g>
          );
        })}
        <circle cx="100" cy="100" r="6" fill="currentColor" />
      </g>
    </svg>
  );
}

function Ganesha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 240" className={className} aria-hidden>
      <defs>
        <radialGradient id="halo" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fdf0c4" />
          <stop offset="60%" stopColor="#e7c372" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c89b3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f7c2a8" />
          <stop offset="100%" stopColor="#e08a6a" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="100" r="100" fill="url(#halo)" />
      {/* halo rays */}
      <g stroke="#c89b3c" strokeWidth="1" opacity="0.7">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="110" y1="100" x2="110" y2="6"
            transform={`rotate(${(i * 360) / 24} 110 100)`} strokeDasharray="2 6" />
        ))}
      </g>
      {/* Crown */}
      <path d="M70 60 L85 25 L95 55 L110 20 L125 55 L135 25 L150 60 Z"
            fill="#c89b3c" stroke="#6b1a1a" strokeWidth="1.4" />
      <circle cx="110" cy="22" r="4" fill="#6b1a1a" />
      {/* Head */}
      <ellipse cx="110" cy="105" rx="55" ry="50" fill="url(#bodyGrad)" stroke="#6b1a1a" strokeWidth="1.5" />
      {/* Ears */}
      <path d="M55 90 Q 35 110 50 140 Q 65 130 65 110 Z" fill="#e08a6a" stroke="#6b1a1a" strokeWidth="1.2" />
      <path d="M165 90 Q 185 110 170 140 Q 155 130 155 110 Z" fill="#e08a6a" stroke="#6b1a1a" strokeWidth="1.2" />
      {/* Tilak */}
      <path d="M108 70 L112 70 L113 90 L107 90 Z" fill="#6b1a1a" />
      <circle cx="110" cy="68" r="3" fill="#c89b3c" />
      {/* Eyes */}
      <ellipse cx="92" cy="100" rx="4" ry="3" fill="#4a1010" />
      <ellipse cx="128" cy="100" rx="4" ry="3" fill="#4a1010" />
      {/* Trunk */}
      <path d="M110 120 Q 105 150 90 165 Q 80 175 95 185 Q 110 180 115 165 Q 120 145 118 130 Z"
            fill="#e08a6a" stroke="#6b1a1a" strokeWidth="1.4" />
      {/* Tusks */}
      <path d="M100 135 L92 155" stroke="#fff7e1" strokeWidth="3" strokeLinecap="round" />
      <path d="M125 135 L133 155" stroke="#fff7e1" strokeWidth="3" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="110" cy="210" rx="70" ry="30" fill="#f7c2a8" stroke="#6b1a1a" strokeWidth="1.4" />
      {/* Lotus base */}
      <g transform="translate(110 232)">
        {[-2, -1, 0, 1, 2].map((i) => (
          <ellipse key={i} cx={i * 14} cy="0" rx="10" ry="6" fill="#f5d3cf" stroke="#c89b3c" strokeWidth="0.8" />
        ))}
      </g>
    </svg>
  );
}

function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden>
      <ellipse cx="30" cy="65" rx="26" ry="8" fill="#6b1a1a" />
      <path d="M5 60 Q 30 78 55 60 Q 50 70 30 72 Q 10 70 5 60 Z" fill="#c89b3c" stroke="#6b1a1a" strokeWidth="1" />
      <g className="animate-flicker" style={{ transformOrigin: "30px 55px" }}>
        <ellipse cx="30" cy="35" rx="6" ry="18" fill="#ffb84a" />
        <ellipse cx="30" cy="30" rx="3" ry="12" fill="#fff1a8" />
      </g>
    </svg>
  );
}

function PregnantWoman({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 320" className={className} aria-hidden>
      <defs>
        <linearGradient id="saree" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a31818" />
          <stop offset="100%" stopColor="#6b1a1a" />
        </linearGradient>
      </defs>
      {/* head */}
      <circle cx="100" cy="50" r="28" fill="#e8b48a" stroke="#4a1010" strokeWidth="1" />
      {/* hair bun */}
      <ellipse cx="100" cy="34" rx="22" ry="14" fill="#1a0a0a" />
      <circle cx="100" cy="22" r="12" fill="#1a0a0a" />
      {/* jasmine flowers around bun */}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={100 + Math.cos((i / 8) * Math.PI) * 18} cy={20 + Math.sin((i / 8) * Math.PI) * 8} r="3" fill="#fff7e1" stroke="#c89b3c" strokeWidth="0.5" />
      ))}
      {/* bindi */}
      <circle cx="100" cy="44" r="3" fill="#6b1a1a" />
      {/* neck */}
      <rect x="92" y="72" width="16" height="14" fill="#e8b48a" />
      {/* saree body with belly */}
      <path d="M50 90 Q 60 80 100 82 Q 140 80 150 90 L 165 230 Q 100 250 35 230 Z" fill="url(#saree)" stroke="#c89b3c" strokeWidth="1.2" />
      {/* belly */}
      <ellipse cx="100" cy="170" rx="55" ry="50" fill="#a31818" stroke="#c89b3c" strokeWidth="1.2" />
      {/* gold border on saree */}
      <path d="M35 230 Q 100 250 165 230 L 168 245 Q 100 268 32 245 Z" fill="#c89b3c" />
      <path d="M32 245 Q 100 268 168 245 L 170 310 L 30 310 Z" fill="#8a6a1f" />
      {/* arms over belly */}
      <path d="M55 110 Q 35 160 75 200 Q 100 180 125 200 Q 165 160 145 110" fill="none" stroke="#e8b48a" strokeWidth="14" strokeLinecap="round" />
      {/* bangles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={67 + i * 4} y="190" width="3" height="14" fill="#c89b3c" rx="1" />
          <rect x={127 - i * 4} y="190" width="3" height="14" fill="#c89b3c" rx="1" />
        </g>
      ))}
      {/* necklace */}
      <path d="M80 92 Q 100 110 120 92" fill="none" stroke="#c89b3c" strokeWidth="2" />
      <circle cx="100" cy="106" r="4" fill="#c89b3c" />
    </svg>
  );
}

function BananaLeaf({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 200 400" className={className} aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <defs>
        <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2f5d33" />
          <stop offset="100%" stopColor="#6fa570" />
        </linearGradient>
      </defs>
      <path d="M100 10 Q 30 100 40 250 Q 60 380 100 395 Q 140 380 160 250 Q 170 100 100 10 Z" fill="url(#leaf)" stroke="#1f3a22" strokeWidth="1" />
      <path d="M100 15 L 100 390" stroke="#1f3a22" strokeWidth="2" />
      {Array.from({ length: 16 }).map((_, i) => {
        const y = 40 + i * 22;
        return (
          <g key={i}>
            <path d={`M100 ${y} Q 70 ${y + 6} 50 ${y + 30}`} stroke="#1f3a22" strokeWidth="0.6" fill="none" />
            <path d={`M100 ${y} Q 130 ${y + 6} 150 ${y + 30}`} stroke="#1f3a22" strokeWidth="0.6" fill="none" />
          </g>
        );
      })}
    </svg>
  );
}

function Marigold({ className = "", color = "#e8a13a" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={20 + Math.cos((i / 12) * Math.PI * 2) * 12} cy={20 + Math.sin((i / 12) * Math.PI * 2) * 12} r="5" fill={color} opacity="0.9" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={20 + Math.cos((i / 8) * Math.PI * 2) * 6} cy={20 + Math.sin((i / 8) * Math.PI * 2) * 6} r="4" fill="#d97706" />
      ))}
      <circle cx="20" cy="20" r="3" fill="#8a3a07" />
    </svg>
  );
}

// ─── Countdown hook ─────────────────────────────────────────────────
function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff / 3_600_000) % 24);
  const m = Math.floor((diff / 60_000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

// ─── Envelope intro ─────────────────────────────────────────────────
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  return (
    <div className="fixed inset-0 z-50 mandala-bg flex items-center justify-center px-4 animate-fade-in">
      <div className="relative w-full max-w-md aspect-[4/5]">
        {/* envelope body */}
        <div className="absolute inset-0 bg-maroon rounded-lg gold-border overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <Marigold className="w-12 h-12 mb-3 animate-slow-spin" />
            <p className="font-telugu text-2xl gold-text">శుభాకాంక్షలు</p>
            <h2 className="font-display text-2xl md:text-3xl gold-text mt-4">
              An Invitation Awaits
            </h2>
            <p className="font-serif-elegant text-amber-100/90 italic mt-3">
              For the Seemantham of Varshitha
            </p>
            <button
              onClick={() => {
                setOpening(true);
                setTimeout(onOpen, 1100);
              }}
              className="mt-8 px-7 py-3 rounded-full bg-gradient-to-r from-[#e7c372] via-[#f7e6a8] to-[#c89b3c] text-[#4a1010] font-display text-sm tracking-widest hover:scale-105 transition-transform shadow-lg"
            >
              OPEN INVITATION
            </button>
          </div>
        </div>
        {/* flap */}
        <div
          className="absolute left-0 right-0 top-0 origin-top transition-transform duration-1000 ease-in-out"
          style={{
            transform: opening ? "rotateX(-180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <svg viewBox="0 0 400 250" className="w-full">
            <polygon points="0,0 400,0 200,230" fill="#6b1a1a" stroke="#c89b3c" strokeWidth="2" />
            <polygon points="20,10 380,10 200,200" fill="none" stroke="#e7c372" strokeWidth="1" strokeDasharray="3 4" />
          </svg>
        </div>
        {/* wax seal */}
        <div className={`absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${opening ? "opacity-0" : "opacity-100"}`}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a31818] to-[#4a1010] flex items-center justify-center shadow-2xl border-2 border-[#c89b3c]">
            <span className="font-script text-3xl gold-text">V</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Petals ─────────────────────────────────────────────────────────
function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: Math.random() * 100,
        dur: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
        size: 14 + Math.random() * 14,
        hue: ["#f5d3cf", "#e8a13a", "#fbcfe8", "#fff7e1"][i % 4],
      })),
    [],
  );
  return (
    <>
      {petals.map((p, i) => (
        <svg
          key={i}
          className="petal"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
          viewBox="0 0 20 20"
        >
          <path d="M10 1 C 14 5, 19 8, 10 19 C 1 8, 6 5, 10 1 Z" fill={p.hue} stroke="#c89b3c" strokeWidth="0.4" />
        </svg>
      ))}
    </>
  );
}

// ─── Music toggle (external audio, autoplay when `play` true) ─────
function MusicToggle({ play = false }: { play?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ensureAudio = () => {
    if (!audioRef.current) {
      const a = new Audio("/BABY CEREMONY.mp3");
      a.loop = true;
      a.volume = 0.5;
      audioRef.current = a;
    }
    return audioRef.current;
  };

  // Autoplay when `play` becomes true (envelope opened)
  useEffect(() => {
    if (play) {
      const a = ensureAudio();
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [play]);

  // No visible button — music is controlled by `play` prop only
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}

// ─── Sections ───────────────────────────────────────────────────────
function DottedDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 w-full max-w-md mx-auto ${className}`}>
      <div className="flex-1 divider-dotted" />
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c89b3c] flex-none"><path fill="currentColor" d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" /></svg>
      <div className="flex-1 divider-dotted" />
    </div>
  );
}

function ArchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute inset-0 -m-2 pointer-events-none">
        <div className="w-full h-full rounded-t-[50%] rounded-b-xl gold-border bg-cream/60 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 px-6 sm:px-12 py-10">{children}</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-12 pb-16 px-4 overflow-hidden">
      {/* Mandala backdrop */}
      <Mandala className="absolute inset-x-0 top-10 mx-auto w-[700px] max-w-none text-[#c89b3c] opacity-20 animate-slow-spin" />

      <div className="relative max-w-3xl mx-auto text-center animate-fade-up">
        {/* Ganesha */}
        <div className="flex justify-center">
          <Ganesha className="w-44 h-48 md:w-56 md:h-60 animate-shimmer" />
        </div>

        <p className="font-telugu text-2xl md:text-3xl text-maroon mt-4">
          ఓం గణేశాయ నమః
        </p>
        <p className="font-serif-elegant italic text-sm md:text-base text-[#7a3a3a] mt-1">
          Om Ganeshaya Namaha
        </p>

        <DottedDivider className="my-8" />

        <p className="font-serif-elegant text-[#7a3a3a] tracking-[0.3em] uppercase text-xs md:text-sm">
          With the blessings of the divine
        </p>

        <h1 className="mt-4 font-display gold-text text-4xl sm:text-5xl md:text-6xl leading-tight">
          Varshitha's
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl">Seemantham Ceremony</span>
        </h1>

        <p className="font-telugu text-4xl md:text-5xl text-maroon-deep mt-6">సీమంతం</p>

        <p className="font-script text-3xl md:text-4xl text-[#a3506c] mt-6">
          A blessing for the parents-to-be
        </p>

        <DottedDivider className="mt-10" />
      </div>
    </section>
  );
}

function Countdown() {
  const { d, h, m, s } = useCountdown(EVENT.dateISO);
  const items = [
    { k: "Days", v: d },
    { k: "Hours", v: h },
    { k: "Minutes", v: m },
    { k: "Seconds", v: s },
  ];
  return (
    <section className="px-4 py-12">
      <div className="max-w-3xl mx-auto grid grid-cols-4 gap-3 sm:gap-6">
        {items.map((it) => (
          <div
            key={it.k}
            className="bg-cream gold-border rounded-lg py-4 sm:py-6 text-center"
          >
            <div className="font-display gold-text text-2xl sm:text-4xl">
              {String(it.v).padStart(2, "0")}
            </div>
            <div className="font-serif-elegant uppercase tracking-widest text-[10px] sm:text-xs text-maroon mt-1">
              {it.k}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Details() {
  const rows = [
    { label: "Date", value: EVENT.dateLabel },
    { label: "Time", value: EVENT.time },
    { label: "Lunch", value: EVENT.lunch },
    { label: "Venue", value: `${EVENT.venue}, ${EVENT.venueLine2}` },
  ];
  return (
    <section className="px-4 py-16 relative">
      <ArchFrame>
        <div className="flex justify-center -mt-2 mb-4">
          <Marigold className="w-10 h-10 animate-slow-spin" />
        </div>
        <h2 className="font-display gold-text text-3xl md:text-4xl text-center">
          Ceremony Details
        </h2>
        <p className="font-telugu text-center text-xl text-maroon mt-2">
          సీమంత వేడుక వివరాలు
        </p>
        <DottedDivider className="my-6" />
        <dl className="space-y-5">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-3 gap-4 items-baseline border-b border-[#c89b3c]/30 pb-4">
              <dt className="font-display uppercase tracking-widest text-xs text-[#8a6a1f]">
                {r.label}
              </dt>
              <dd className="col-span-2 font-serif-elegant text-lg md:text-xl text-maroon-deep">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex justify-center mt-8">
          <div className="flex gap-6">
            <Diya className="w-12 h-16" />
            <Diya className="w-12 h-16" />
            <Diya className="w-12 h-16" />
          </div>
        </div>
      </ArchFrame>
    </section>
  );
}

function Blessing() {
  return (
    <section className="px-4 py-16 bg-blush/40">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-telugu text-2xl md:text-3xl text-maroon leading-relaxed">
          “లక్ష్మీం క్షీరసముద్ర రాజతనయాం
          <br />
          శ్రీరంగ ధామేశ్వరీం”
        </p>
        <DottedDivider className="my-6" />
        <p className="font-serif-elegant italic text-[#7a3a3a] text-lg leading-relaxed">
          May the divine mother bless the parents-to-be with health, happiness,
          and a beautiful, joyful little one.
        </p>
      </div>
    </section>
  );
}

function Parents() {
  return (
    <section className="px-4 py-16 relative overflow-hidden">
      <BananaLeaf className="absolute -left-10 top-0 w-32 md:w-48 opacity-70" />
      <BananaLeaf className="absolute -right-10 top-0 w-32 md:w-48 opacity-70" flip />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="font-display uppercase tracking-[0.4em] text-xs text-[#8a6a1f]">
          The Parents-to-be
        </p>
        <h2 className="mt-4 font-script text-4xl md:text-6xl gold-text">
          {EVENT.bride} &amp; {EVENT.partner}
        </h2>
        <p className="font-telugu text-xl text-maroon mt-3">వర్షిత &amp; సురేష్</p>

        <div className="flex justify-center mt-8">
          <PregnantWoman className="w-44 md:w-56" />
        </div>

        <DottedDivider className="my-8" />

        <p className="font-serif-elegant italic text-[#7a3a3a]">
          Lovingly invited by
        </p>
        <div className="mt-3 font-display text-lg md:text-xl text-maroon-deep">
          {EVENT.parents[0]}
          <span className="mx-3 text-[#c89b3c]">◆</span>
          {EVENT.parents[1]}
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="px-4 py-16">
      <ArchFrame>
        <h2 className="font-display gold-text text-3xl text-center">Venue</h2>
        <p className="font-telugu text-center text-xl text-maroon mt-2">వేదిక</p>
        <DottedDivider className="my-6" />
        <div className="text-center">
          <p className="font-serif-elegant text-2xl text-maroon-deep">{EVENT.venue}</p>
          <p className="font-serif-elegant text-lg text-[#7a3a3a] mt-1">{EVENT.venueLine2}</p>
        </div>
        <div className="flex justify-center mt-8">
          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-maroon text-amber-100 font-display tracking-widest text-sm hover:bg-maroon-deep transition shadow-lg border border-[#c89b3c]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
            Open in Google Maps
          </a>
        </div>
      </ArchFrame>
    </section>
  );
}

function RSVP() {
  const msg = encodeURIComponent(
    `Namaste! I would love to attend Varshitha's Seemantham ceremony on 11th June 2026. — `,
  );
  const wa = `https://wa.me/${EVENT.whatsapp.replace(/[^0-9]/g, "")}?text=${msg}`;
  return (
    <section className="px-4 py-16 bg-blush/30">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display gold-text text-3xl">RSVP</h2>
        <p className="font-serif-elegant italic text-[#7a3a3a] mt-3">
          Your presence will be our greatest blessing. Kindly let us know if you
          can join us.
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-display tracking-widest text-sm shadow-lg hover:scale-105 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.3-.4A9.9 9.9 0 1 1 12 22z" /></svg>
          RSVP via WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-4 pt-16 pb-24 text-center overflow-hidden">
      <div className="flex justify-center gap-6 mb-6">
        <Marigold className="w-8 h-8" />
        <Marigold className="w-8 h-8" color="#c44a2a" />
        <Marigold className="w-8 h-8" />
      </div>
      <p className="font-serif-elegant italic text-lg text-[#7a3a3a] max-w-xl mx-auto">
        Please join us for the baby shower honoring the parents-to-be
      </p>
      <h3 className="font-script text-4xl gold-text mt-4">
        
        {EVENT.bride} &amp; {EVENT.partner}
      </h3>

      <DottedDivider className="my-8" />

      <p className="font-display uppercase tracking-[0.4em] text-xs text-[#8a6a1f]">
        With Love
      </p>
      <div className="mt-3 font-serif-elegant text-lg text-maroon-deep">
        {EVENT.parents[0]}
        <br />
        {EVENT.parents[1]}
      </div>

      <div className="mt-10 flex justify-center gap-10">
        <Diya className="w-10 h-14" />
        <Diya className="w-10 h-14" />
      </div>

      <p className="font-telugu text-maroon mt-6 text-lg">శుభం భూయాత్</p>
    </footer>
  );
}

// ─── Page ───────────────────────────────────────────────────────────
function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="mandala-bg min-h-screen text-maroon-deep relative overflow-hidden">
      {!opened && <Envelope onOpen={() => setOpened(true)} />}
      <Petals />
      <MusicToggle play={opened} />

      {/* Corner decorative leaves */}
      <BananaLeaf className="absolute -top-10 -left-16 w-40 opacity-30 rotate-[-25deg] pointer-events-none" />
      <BananaLeaf className="absolute -top-10 -right-16 w-40 opacity-30 rotate-[25deg] pointer-events-none" flip />

      <div className={opened ? "animate-fade-in" : "opacity-0"}>
        <Hero />
        <Countdown />
        <Details />
        <Blessing />
        <Parents />
        <Venue />
        <RSVP />
        <Footer />
      </div>
    </main>
  );
}
