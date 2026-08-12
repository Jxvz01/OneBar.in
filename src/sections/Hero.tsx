import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Copy entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy-anim",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(copyRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });
      gsap.to(rightRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleScrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-onebar-bg pt-32 pb-20 overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="bg-glow top-1/2 right-1/4 transform -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-onebar-purple/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-onebar-purple/10 via-onebar-bg to-onebar-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* LEFT: Typography & Content */}
        <div ref={copyRef} className="flex flex-col justify-center max-w-xl relative z-20">
          
          {/* Tag */}
          <div className="hero-copy-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-onebar-purple/30 bg-onebar-purple/10 w-fit mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-onebar-purple animate-pulse-glow" />
            <span className="text-xs font-semibold tracking-wider text-onebar-purple-light uppercase">
              Product Concept <span className="mx-1">•</span> R&amp;D
            </span>
          </div>

          {/* Headlines */}
          <h1 className="hero-copy-anim text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Payments that <br />
            <span className="text-onebar-purple-light">keep moving.</span>
          </h1>
          <h2 className="hero-copy-anim text-2xl sm:text-3xl font-medium text-gray-400 mb-6">
            Even when connectivity doesn't.
          </h2>

          {/* Description */}
          <p className="hero-copy-anim text-base sm:text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
            We are researching and developing resilient payment infrastructure for a world where connectivity isn't guaranteed.
          </p>

          {/* CTAs */}
          <div className="hero-copy-anim flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#waitlist"
              onClick={handleScrollToWaitlist}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-onebar-purple hover:bg-onebar-purple-light rounded-xl transition-all shadow-[0_0_20px_rgba(109,40,217,0.3)] group"
            >
              <span>Join the Waitlist</span>
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-transparent border border-gray-600 hover:border-gray-400 rounded-xl transition-all"
            >
              Explore how it works
            </Link>
          </div>

          {/* Features Grid */}
          <div className="hero-copy-anim grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
            {/* Feature 1 */}
            <div>
              <div className="mb-3 text-onebar-purple-light">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Resilient</h3>
              <p className="text-xs text-gray-500">Designed for real world uncertainty.</p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="mb-3 text-onebar-purple-light">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Private</h3>
              <p className="text-xs text-gray-500">Your data. Your control.</p>
            </div>

            {/* Feature 3 */}
            <div>
              <div className="mb-3 text-onebar-purple-light">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Future ready</h3>
              <p className="text-xs text-gray-500">Exploring multiple technologies.</p>
            </div>

            {/* Feature 4 */}
            <div>
              <div className="mb-3 text-onebar-purple-light">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Research stage</h3>
              <p className="text-xs text-gray-500">Conceptual. Not a live payment system.</p>
            </div>
          </div>

        </div>

        {/* RIGHT: Phone Mockups 3D Composition */}
        <div 
          ref={rightRef} 
          className="relative h-[480px] lg:h-auto flex items-center justify-center perspective-1000 overflow-visible select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative w-full h-full flex items-center justify-center animate-float-slow pointer-events-none">
            <img
              alt="OneBar App Interface Mockup"
              className="w-full h-auto max-w-2xl object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] pointer-events-none select-none no-drag"
              draggable={false}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLy5E--bRY0C32kPmrDvcBxE8PhJO75BsVSPuPnyW62hZrc7jl9wgZSBgfdquPbKKcePHx7NxKD27nL3hcT3y2GStMu3RnWIZ7JBj55ELmnA5D_z6OQquf826WgRKC13amneT_8mhFd63hG66WFJ-_EDWo2jBdMwUHAb3ITcFDxFqmyn3hWMcd5VtLfwPkEGFaQUTF_kFvzyNuFJQK6Q9lDviwTkATanhIEMVKlK7gzVh2vVddSWMGxRn9OhI3nC4l5g"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
