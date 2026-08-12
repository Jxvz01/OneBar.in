import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Principle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Split text into lines/words for staggered animation
    const words = el.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { 
          opacity: 0.1, 
          y: 20, 
          scale: 0.95,
          color: "rgba(156, 163, 175, 0.2)" // dimmed grey
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          color: "#ffffff", // crisp white
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[75vh] flex items-center justify-center bg-dark border-t border-dark-border py-20"
    >
      {/* Decorative vertical lines and ambient lighting */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-onebar-purple/10 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-onebar-purple/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-onebar-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h2
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-left sm:text-center select-none"
        >
          {/* Breaking sentence into words for individual control */}
          <span className="word inline-block mr-3 sm:mr-4 mb-2">THE</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2 text-state-failed">NETWORK</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2">CAN</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2">FAIL.</span>
          <br className="hidden sm:inline" />
          <span className="word inline-block mr-3 sm:mr-4 mb-2">THE</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2 text-onebar-electric">PAYMENT</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2">SHOULDN'T</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2">HAVE</span>
          <span className="word inline-block mr-3 sm:mr-4 mb-2">TO.</span>
        </h2>
        
        <p className="mt-8 text-xs sm:text-sm font-mono text-gray-500 tracking-widest uppercase">
          Onebar Resilience Principle 01
        </p>
      </div>
    </section>
  );
}
