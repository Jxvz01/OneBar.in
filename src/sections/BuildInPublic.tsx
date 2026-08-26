import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Status types ────────────────────────────────────────────────────────────
type PhaseStatus = "completed" | "current" | "next" | "future" | "longterm";

interface RDPhase {
  phase: string;
  title: string;
  desc: string;
  status: PhaseStatus;
}

// ─── 8-phase R&D evolution ───────────────────────────────────────────────────
const RD_PHASES: RDPhase[] = [
  {
    phase: "01",
    title: "Protocol Research",
    desc: "Research into resilient payment communication, connectivity constraints, authorization models, security considerations, threat models and edge cases.",
    status: "completed",
  },
  {
    phase: "02",
    title: "Proximity Channel Research",
    desc: "Research and feasibility testing around Bluetooth, NFC, soundwave/audio communication and USSD fallback for low-connectivity environments.",
    status: "completed",
  },
  {
    phase: "03",
    title: "Prototype V1",
    desc: "Building the first functional OneBar prototype with connectivity-aware payment flows, multiple communication routes, automatic route selection, QR payments and transaction management.",
    status: "current",
  },
  {
    phase: "04",
    title: "Prototype Testing",
    desc: "Testing V1 across different connectivity conditions, devices, payment scenarios and failure states.",
    status: "next",
  },
  {
    phase: "05",
    title: "Prototype V1 Refinement",
    desc: "Using testing results to improve reliability, user experience, routing behaviour, security and the overall transaction flow.",
    status: "next",
  },
  {
    phase: "06",
    title: "Prototype V2",
    desc: "Building an improved prototype incorporating the technical and product learnings from V1 testing.",
    status: "future",
  },
  {
    phase: "07",
    title: "Controlled Field Testing",
    desc: "Testing the improved system in controlled real-world environments and evaluating reliability, latency, route selection and user experience.",
    status: "future",
  },
  {
    phase: "08",
    title: "Resilient Payment Infrastructure",
    desc: "Exploring advanced payment infrastructure, deeper financial-system integration, regulatory pathways and future possibilities for increasingly disconnected transaction environments.",
    status: "longterm",
  },
];

// ─── Status visual config ────────────────────────────────────────────────────
interface StatusCfg {
  label: string;
  srLabel: string;
  cardBorder: string;
  cardBg: string;
  cardShadow: string;
  badge: string;
  phaseNum: string;
  titleColor: string;
  descColor: string;
}

const STATUS_CFG: Record<PhaseStatus, StatusCfg> = {
  completed: {
    label: "COMPLETED",
    srLabel: "Completed",
    cardBorder: "border-white/[0.07]",
    cardBg: "bg-dark-card/60",
    cardShadow: "",
    badge: "text-state-settled border-state-settled/25 bg-state-settled/[0.06]",
    phaseNum: "text-state-settled/50",
    titleColor: "text-zinc-200",
    descColor: "text-zinc-400",
  },
  current: {
    label: "IN PROGRESS",
    srLabel: "Current phase — actively building",
    cardBorder: "border-onebar-purple/50",
    cardBg: "bg-dark-card/95",
    cardShadow: "shadow-[0_0_32px_rgba(109,40,217,0.13),0_0_0_1px_rgba(109,40,217,0.14)]",
    badge: "text-onebar-electric border-onebar-purple/50 bg-onebar-purple/[0.12] animate-pulse",
    phaseNum: "text-onebar-purple-light",
    titleColor: "text-white",
    descColor: "text-zinc-300",
  },
  next: {
    label: "NEXT",
    srLabel: "Upcoming",
    cardBorder: "border-white/[0.05]",
    cardBg: "bg-dark-card/45",
    cardShadow: "",
    badge: "text-amber-400/70 border-amber-500/20 bg-amber-500/[0.04]",
    phaseNum: "text-zinc-600",
    titleColor: "text-zinc-300",
    descColor: "text-zinc-500",
  },
  future: {
    label: "FUTURE",
    srLabel: "Planned for the future",
    cardBorder: "border-white/[0.04]",
    cardBg: "bg-dark-card/25",
    cardShadow: "",
    badge: "text-zinc-500 border-zinc-700/50 bg-white/[0.02]",
    phaseNum: "text-zinc-700",
    titleColor: "text-zinc-400",
    descColor: "text-zinc-600",
  },
  longterm: {
    label: "LONG-TERM R&D",
    srLabel: "Long-term research direction",
    cardBorder: "border-white/[0.03]",
    cardBg: "bg-dark/50",
    cardShadow: "",
    badge: "text-zinc-600 border-zinc-800 bg-transparent",
    phaseNum: "text-zinc-800",
    titleColor: "text-zinc-500",
    descColor: "text-zinc-700",
  },
};

// ─── Indicator dot per status ─────────────────────────────────────────────────
function PhaseIndicator({ status }: { status: PhaseStatus }) {
  if (status === "completed") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0">
        <circle cx="7" cy="7" r="6.5" stroke="#10B981" strokeOpacity="0.4" />
        <path d="M4.5 7l1.8 1.8L9.5 5.5" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "current") {
    return (
      <span className="relative flex h-3 w-3 flex-shrink-0" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-onebar-purple opacity-60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-onebar-purple" />
      </span>
    );
  }
  if (status === "next") {
    return (
      <span className="w-3 h-3 rounded-full border border-amber-400/40 bg-amber-400/10 flex-shrink-0" aria-hidden="true" />
    );
  }
  if (status === "future") {
    return (
      <span className="w-3 h-3 rounded-full border border-zinc-700 flex-shrink-0" aria-hidden="true" />
    );
  }
  // longterm
  return (
    <span className="w-3 h-3 rounded-full border border-zinc-800/60 flex-shrink-0" aria-hidden="true" />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BuildInPublic() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rdphase-card",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-dark border-t border-dark-border overflow-hidden"
      aria-labelledby="rd-timeline-heading"
    >
      {/* Subtle bg texture */}
      <div className="absolute inset-0 tech-grid-bg opacity-[0.025] pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Section header ── */}
        <div className="max-w-2xl mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-semibold border border-onebar-purple/25 bg-onebar-purple/[0.06] text-onebar-electric mb-6 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-onebar-purple animate-pulse" aria-hidden="true" />
            BUILD IN PUBLIC
          </span>
          <h2
            id="rd-timeline-heading"
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5"
          >
            R&amp;D Evolution.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Payment infrastructure should be built in the open. This is the honest
            progression of our research — from foundational study to prototype
            to future infrastructure.
          </p>
        </div>

        {/* ── Narrative flow labels (desktop) ── */}
        <div
          className="hidden lg:flex items-center gap-0 mb-8 font-mono text-[9px] text-zinc-700 uppercase tracking-widest select-none"
          aria-hidden="true"
        >
          {["Research", "Research", "Build", "Test", "Refine", "Rebuild", "Field Test", "Infrastructure"].map(
            (label, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`px-3 ${i === 2 ? "text-onebar-purple-light font-semibold" : ""}`}
                >
                  {label}
                </span>
                {i < 7 && <span className="text-zinc-800">→</span>}
              </span>
            )
          )}
        </div>

        {/* ── Phase grid: 1-col mobile, 2-col tablet, 4-col desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">

          {/* Connector gradient line (desktop) */}
          <div
            className="hidden lg:block absolute top-5 left-8 right-8 h-px z-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.2) 12%, rgba(109,40,217,0.7) 25%, rgba(109,40,217,0.25) 37%, rgba(251,191,36,0.2) 50%, rgba(255,255,255,0.04) 75%)",
            }}
          />

          {RD_PHASES.map((phase, idx) => {
            const cfg = STATUS_CFG[phase.status];
            return (
              <article
                key={idx}
                className={`rdphase-card relative z-10 p-5 rounded-2xl border flex flex-col gap-3.5 transition-all duration-300 ${cfg.cardBorder} ${cfg.cardBg} ${cfg.cardShadow} ${
                  phase.status === "current" ? "ring-1 ring-onebar-purple/15" : ""
                }`}
                aria-label={`Phase ${phase.phase}: ${phase.title} — ${cfg.srLabel}`}
              >
                {/* Active glow overlay for CURRENT only */}
                {phase.status === "current" && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% -10%, rgba(109,40,217,0.10) 0%, transparent 65%)",
                    }}
                  />
                )}

                {/* Row: indicator + phase number + badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <PhaseIndicator status={phase.status} />
                    <span className={`font-mono text-[9px] font-bold tracking-widest uppercase ${cfg.phaseNum}`}>
                      PHASE {phase.phase}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] font-mono tracking-widest uppercase border px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ${cfg.badge}`}
                    role="status"
                    aria-label={cfg.srLabel}
                  >
                    {cfg.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-sm font-bold leading-snug ${cfg.titleColor}`}>
                  {phase.title}
                </h3>

                {/* Description */}
                <p className={`text-xs leading-relaxed ${cfg.descColor}`}>
                  {phase.desc}
                </p>
              </article>
            );
          })}
        </div>

        {/* ── Current-phase callout bar ── */}
        <div className="mt-10 flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-onebar-purple opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-onebar-purple" />
          </span>
          <span>
            <span className="text-onebar-purple-light font-semibold">
              Currently building Prototype V1.
            </span>{" "}
            Research phases complete. Prototype V1 is in active development.
          </span>
        </div>

      </div>
    </section>
  );
}

/* git-build-ref: 31 */
