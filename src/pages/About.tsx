import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Bluetooth, 
  Volume2, 
  PhoneCall, 
  Zap, 
  Radio, 
  Globe
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-anim",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-32 pb-24 bg-onebar-bg text-white overflow-hidden">
      {/* Subtle background atmosphere */}
      <div className="absolute inset-0 tech-grid-bg opacity-[0.02] pointer-events-none" />
      <div className="bg-glow top-12 right-12 opacity-50 pointer-events-none" />
      <div className="bg-glow bottom-24 left-8 opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ══════ 1. HERO ══════ */}
        <div className="text-center max-w-4xl mx-auto mb-28">
          <div className="reveal-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-onebar-purple/30 bg-onebar-purple/10 w-fit mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-onebar-purple animate-pulse-glow" />
            <span className="text-xs font-mono font-semibold tracking-widest text-onebar-purple-light uppercase">
              ABOUT ONEBAR
            </span>
          </div>

          <h1 className="reveal-anim text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.05] uppercase">
            PAYMENTS SHOULD<br />
            <span className="text-gradient">JUST WORK.</span>
          </h1>

          <p className="reveal-anim text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We're exploring what happens when digital payments don't have to depend entirely on a live internet connection.
          </p>
        </div>

        {/* ══════ 2. WHY ONEBAR EXISTS (THE PROBLEM) ══════ */}
        <div className="max-w-5xl mx-auto mb-32 reveal-anim">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-semibold text-onebar-purple-light tracking-widest uppercase block mb-4">
                THE PROBLEM
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight uppercase">
                THE "HOTSPOT"<br />
                <span className="text-gradient">IRONY.</span>
              </h2>

              <div className="space-y-6 text-zinc-300 text-base md:text-lg leading-relaxed font-sans">
                <p>
                  We live in a digital-first India where money can move across the country in seconds.
                </p>
                <p>
                  Yet sometimes, you still need to ask a stranger for a hotspot just to complete a payment.
                </p>
                <p className="text-white font-medium text-lg md:text-xl pt-2">
                  That disconnect is what OneBar is exploring.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ 3. THE BIGGER QUESTION ══════ */}
        <div className="max-w-4xl mx-auto text-center mb-32 reveal-anim">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-onebar-purple/30 bg-onebar-purple/5 text-[11px] font-mono text-onebar-purple-light mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>EXPLORATION · R&amp;D</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight uppercase">
            WHAT IF THE<br />
            NETWORK ISN'T<br />
            <span className="text-gradient">THE LIMIT?</span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            OneBar is exploring a resilience layer for digital payments that could help transaction states survive temporary connectivity loss and synchronize when connectivity returns.
          </p>
        </div>

        {/* ══════ 4. FOUNDER SECTION (REAL PHOTOGRAPH OF H. JEEVAN) ══════ */}
        <div className="max-w-6xl mx-auto mb-32 reveal-anim">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-dark-card/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Founder Photo */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-onebar-purple/20 rounded-2xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black">
                  <img
                    src="/jeevan.png"
                    alt="H. Jeevan, Founder & CEO of OneBar"
                    className="w-full h-auto object-cover grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700 rounded-2xl"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-center">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase block">MYSURU, INDIA</span>
                  </div>
                </div>
              </div>

              {/* Founder Editorial Content */}
              <div className="lg:col-span-7">
                <span className="text-xs font-mono font-semibold text-onebar-purple-light tracking-widest uppercase block mb-3">
                  THE FOUNDER
                </span>

                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                  H. JEEVAN
                </h3>

                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
                  FOUNDER &amp; CEO · ONEBAR
                </p>

                <div className="space-y-6 text-zinc-300 text-base leading-relaxed italic border-l-2 border-onebar-purple/50 pl-6 my-6">
                  <p className="not-italic text-zinc-200 font-medium text-lg">
                    "OneBar started with a simple question: why should the ability to make a digital payment depend entirely on whether a network happens to be available?"
                  </p>
                  <p className="not-italic text-zinc-400">
                    "That question became an exploration into resilient payment infrastructure."
                  </p>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  Building out of Mysuru, India, we are focusing on solving real connectivity constraints with honest engineering, minimal friction, and zero pre-loading requirements.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ══════ 5. WHAT WE ARE EXPLORING ══════ */}
        <div className="max-w-6xl mx-auto mb-32 reveal-anim">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold text-onebar-purple-light tracking-widest uppercase block mb-3">
              RESEARCH DIRECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              ONE PROBLEM.<br />
              <span className="text-gradient">MULTIPLE POSSIBILITIES.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Bluetooth / BLE",
                icon: Bluetooth,
                desc: "Exploring peer-to-peer low energy transmission within short proximity."
              },
              {
                title: "NFC Tap",
                icon: Radio,
                desc: "Researching contactless token exchange at terminal interfaces."
              },
              {
                title: "Sound / Ultrasonic",
                icon: Volume2,
                desc: "Investigating high-frequency acoustic data transmission via phone speakers."
              },
              {
                title: "USSD / *99#",
                icon: PhoneCall,
                desc: "Evaluating low-bandwidth GSM control channel fallbacks for 2G environments."
              },
              {
                title: "Alternative Channels",
                icon: Globe,
                desc: "Investigating mesh and hybrid data transport mechanisms."
              },
              {
                title: "Automatic Fallback",
                icon: Zap,
                desc: "Conceptualizing intelligent real-time ranking and channel switching engines."
              }
            ].map((tech, idx) => {
              const IconComp = tech.icon;
              return (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl border border-white/10 bg-dark-card/60 hover:border-onebar-purple/30 transition-all duration-300 glow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-onebar-purple/10 border border-onebar-purple/20 flex items-center justify-center text-onebar-purple-light">
                        <IconComp size={20} />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono text-zinc-400 bg-white/[0.03] border border-white/10 uppercase">
                        EXPLORING
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{tech.title}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════ 6. WHAT WE BELIEVE ══════ */}
        <div className="max-w-6xl mx-auto mb-32 reveal-anim">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold text-onebar-purple-light tracking-widest uppercase block mb-3">
              OUR PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              WHAT WE BELIEVE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl hover:border-onebar-purple/40 transition-all duration-300 glow-card flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-onebar-purple-light block mb-4 uppercase">01 / PRINCIPLE</span>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">RESILIENCE FIRST</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Digital payment infrastructure should be designed for imperfect real-world conditions.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl hover:border-onebar-purple/40 transition-all duration-300 glow-card flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-onebar-purple-light block mb-4 uppercase">02 / PRINCIPLE</span>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">INDIA FIRST</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Build around the connectivity, hardware, infrastructure and behavioural realities of the market we're starting in.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl hover:border-onebar-purple/40 transition-all duration-300 glow-card flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-onebar-purple-light block mb-4 uppercase">03 / PRINCIPLE</span>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">SIMPLICITY FOR THE USER</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  The complexity should stay underneath the experience, not inside it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ 7. WHERE WE ARE (STAGE PROGRESSION) ══════ */}
        <div className="max-w-5xl mx-auto mb-32 reveal-anim">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-dark-card/90 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden">
            <span className="text-xs font-mono font-semibold text-onebar-purple-light tracking-widest uppercase block mb-8">
              COMPANY STAGE
            </span>

            {/* Visual Progression Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 font-mono text-xs sm:text-sm mb-10">
              {["IDEA", "RESEARCH", "PROTOTYPE", "VALIDATION", "DEPLOYMENT"].map((stage, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4">
                  <div className={`px-3.5 py-2 rounded-xl border font-bold transition-all ${
                    stage === "RESEARCH"
                      ? "bg-onebar-purple text-white border-onebar-purple shadow-[0_0_20px_rgba(109,40,217,0.4)] scale-110"
                      : stage === "IDEA"
                      ? "bg-white/[0.03] text-zinc-400 border-white/10"
                      : "bg-transparent text-zinc-600 border-white/5"
                  }`}>
                    {stage}
                  </div>
                  {idx < 4 && <span className="text-zinc-700 font-mono text-xs">&rarr;</span>}
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-onebar-purple/30 bg-onebar-purple/10 text-xs font-mono font-semibold text-onebar-purple-light uppercase mb-6">
              CURRENTLY R&amp;D · PRE-PROTOTYPE
            </div>

            <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
              We're currently researching the technical feasibility of resilient payment concepts. The next step is turning the strongest ideas into something we can actually test.
            </p>
          </div>
        </div>

        {/* ══════ 8. FUTURE / CLOSING STATEMENT ══════ */}
        <div className="text-center max-w-3xl mx-auto py-16 px-8 rounded-3xl border border-onebar-purple/30 bg-gradient-to-b from-onebar-purple/10 to-transparent relative overflow-hidden shadow-2xl reveal-anim">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-onebar-purple/20 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase leading-tight">
            WE'RE JUST<br />
            <span className="text-gradient">GETTING STARTED.</span>
          </h2>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
            The final system doesn't exist yet. We're here to figure out what it should become.
          </p>

          <div className="border-t border-white/10 pt-8 max-w-xs mx-auto">
            <span className="font-bold text-white text-lg tracking-wider block font-sans">ONEBAR</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Mysuru, India</span>
          </div>

          <div className="mt-8">
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-onebar-purple hover:bg-onebar-purple-light text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(109,40,217,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]"
            >
              <span>Follow Our Journey</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

/* git-build-ref: 3 */