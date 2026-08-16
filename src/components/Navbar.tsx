import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const activeClassName = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? "text-onebar-electric font-semibold" : "text-gray-400 hover:text-white"
    }`;

  // Helper to handle scrolling to waitlist section
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "py-3 bg-dark-card/85 backdrop-blur-md border-dark-border"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="OneBar Logo"
              className="w-8 h-8 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-wider text-white group-hover:text-onebar-electric transition-colors duration-300">
              OneBar
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <NavLink to="/" className={activeClassName}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/how-it-works" className={activeClassName}>
                How it works
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={activeClassName}>
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeClassName}>
                Contact us
              </NavLink>
            </li>
          </ul>

          {/* Waitlist CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/#waitlist"
              onClick={handleWaitlistClick}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-onebar-purple text-white hover:bg-onebar-purple/90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-dark/95 backdrop-blur-lg flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-6 text-2xl font-medium mb-12">
          <li>
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-onebar-electric" : "text-gray-400 hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-onebar-electric" : "text-gray-400 hover:text-white"
              }
            >
              How it works
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-onebar-electric" : "text-gray-400 hover:text-white"
              }
            >
              About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-onebar-electric" : "text-gray-400 hover:text-white"
              }
            >
              Contact us
            </NavLink>
          </li>
        </ul>

        <Link
          to="/#waitlist"
          onClick={(e) => {
            setIsMobileMenuOpen(false);
            handleWaitlistClick(e);
          }}
          className="py-4 text-center rounded-lg font-medium bg-onebar-purple text-white hover:bg-onebar-purple/90 transition-all"
        >
          Join Waitlist
        </Link>
      </div>
    </>
  );
}

/* git-build-ref: 27 */