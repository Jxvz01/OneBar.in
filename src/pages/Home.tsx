import { useState, useEffect, useRef } from "react";
import Hero from "../sections/Hero";
import Problem from "../sections/Problem";
import Principle from "../sections/Principle";
import Technology from "../sections/Technology";
import BuildInPublic from "../sections/BuildInPublic";
import { Send } from "lucide-react";
import gsap from "gsap";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const expSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal animation for the "I just paid" slogan
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-slogan",
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: expSectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, expSectionRef);

    return () => ctx.revert();
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate database submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="bg-dark">
      {/* 1. Hero visual centerpiece */}
      <Hero />

      {/* Stats row (Subtle dashboard style) */}
      <div className="border-y border-dark-border bg-dark-card/30 py-12 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-center relative z-10">
          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white mb-1">18%</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Est. UPI Failure Rate</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white mb-1">30 Cr+</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Indians in Weak Signals</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white mb-1">5 Lakh+</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Signal-Shadow Villages</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white mb-1">100%</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Device Sandbox Secure</span>
          </div>
        </div>
      </div>

      {/* 2. Problem section */}
      <Problem />

      {/* 3. High impact brand principle section */}
      <Principle />

      {/* 4. Technology map section */}
      <Technology />

      {/* 5. Product Experience: Contrast Minimalist Section */}
      <div
        ref={expSectionRef}
        className="relative py-32 bg-dark border-t border-dark-border overflow-hidden flex flex-col items-center justify-center text-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-onebar-purple/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-onebar-purple/20 bg-onebar-purple/5 text-onebar-electric mb-8 uppercase tracking-widest">
            HUMAN SIMPLICITY
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The technology should disappear.
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12">
            You shouldn't need to understand Bluetooth frequencies, ultrasonic sound bands, sandboxed ledgers, or asynchronous 
            bank reconciliation APIs.
            <br />
            You should simply think:
          </p>

          {/* Slogan */}
          <div className="experience-slogan select-none">
            <span className="text-5xl md:text-7xl font-extrabold tracking-widest text-gradient uppercase font-mono">
              "I just paid."
            </span>
          </div>
        </div>
      </div>

      {/* 6. Build in public timeline section */}
      <BuildInPublic />

      {/* 7. Waitlist Sign Up Form */}
      <section id="waitlist" className="relative py-24 bg-dark border-t border-dark-border overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-onebar-purple/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="p-8 md:p-12 rounded-3xl border border-dark-border bg-dark-card/90 relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-onebar-purple/10 rounded-full blur-[40px]" />

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-onebar-purple/20 bg-onebar-purple/5 text-onebar-electric mb-4">
                EARLY ACCESS
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Be the first to use OneBar.
              </h2>
              <p className="text-gray-400 text-xs md:text-sm">
                We are developing fast. Drop your email and we'll notify you as soon as closed pilot trials open in your area.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="flex-1 bg-dark border border-dark-border focus:border-onebar-purple rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all placeholder-gray-600"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3.5 px-6 rounded-xl text-sm font-semibold bg-onebar-purple text-white hover:bg-onebar-purple/90 transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 font-mono text-center">
                  🔒 Sandbox Privacy. We only email you for pilot launch notification.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-onebar-purple/10 border border-onebar-purple/35 flex items-center justify-center text-onebar-electric mx-auto mb-4">
                  <CheckCircle2Icon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Waitlist Confirmed!</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  You are now on the queue for local sandbox pilot notifications. We'll ping you once nodes open in your zone.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Icon helper
function CheckCircle2Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* git-build-ref: 23 */