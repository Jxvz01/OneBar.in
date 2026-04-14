import { Link, useLocation } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  const handleWaitlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("waitlist");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-dark-card border-t border-dark-border mt-20 pt-16 pb-8">
      {/* Decorative background grid and spotlight */}
      <div className="absolute inset-0 tech-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-onebar-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 44 44" className="w-7 h-7" aria-label="OneBar logo">
                <circle cx="22" cy="22" r="22" fill="#7C3AED" />
                <circle cx="22" cy="30" r="2" fill="#FFF" />
                <path
                  d="M14 24a11 11 0 0 1 16 0"
                  stroke="#FFF"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity=".25"
                />
                <path
                  d="M16.5 26.5a7.5 7.5 0 0 1 11 0"
                  stroke="#FFF"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity=".25"
                />
                <path
                  d="M19 29a4 4 0 0 1 6 0"
                  stroke="#FFF"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="35" cy="9" r="8" fill="#FFF" />
                <text
                  x="35"
                  y="13"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  fill="#7C3AED"
                  fontFamily="monospace"
                >
                  1
                </text>
              </svg>
              <span className="font-semibold text-white tracking-wider">OneBar</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              We are researching and developing resilient payment infrastructure for a world where connectivity isn't guaranteed.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-gray-500 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-onebar-purple" />
                <span>Mysuru, India 🇮🇳</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-onebar-purple" />
                <a href="mailto:onebar.help@gmail.com" className="hover:text-white transition-colors">
                  onebar.help@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6 font-mono">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Action / Socials */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6 font-mono">
              Engagement
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 mb-6">
              <li>
                <Link to="/#waitlist" onClick={handleWaitlistClick} className="hover:text-white transition-colors">
                  Join Waitlist
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/onebar.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
            <div className="py-2.5 px-4 rounded border border-dashed border-onebar-purple/20 bg-onebar-purple/5 max-w-xs text-xs text-onebar-electric/90">
              <span className="font-mono font-semibold">SIGNAL: Active R&D</span>
              <p className="mt-1 text-[11px] text-gray-400">Exploring BLE, NFC, Sound, and USSD offline channels.</p>
            </div>
          </div>
        </div>

        {/* Regulatory/Honesty Disclaimer Area */}
        <div className="border-t border-dark-border py-8 text-[11px] text-gray-500 leading-relaxed font-sans">
          <p className="mb-4">
            <span className="text-gray-400 font-semibold uppercase font-mono mr-1">R&D Disclaimer:</span>
            OneBar is a research and development project. We are exploring conceptual architectures for connectivity-resilient payment systems.
            OneBar does NOT currently have a working offline payment system, live transaction processing, bank integrations, UPI integration,
            or production settlement infrastructure. We do not hold any banking, payment gateway, or regulatory licenses.
            All content on this website describes research directions, conceptual flows, and future aspirations — not operational features.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-gray-600">
            <p>© {new Date().getFullYear()} OneBar. All rights reserved.</p>
            <p className="font-mono text-[10px]">VER_BETA_2.0_POWERED_BY_RESILIENCE_CORE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* git-build-ref: 6 */