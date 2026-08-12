import { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle,
  FlaskConical,
  ShieldCheck,
  Send
} from "lucide-react";
import gsap from "gsap";

type InquiryOption = "General" | "Partnership" | "Investment" | "Technology" | "Early Access" | "Media";

const INQUIRY_OPTIONS: { value: InquiryOption; label: string; hint: string }[] = [
  {
    value: "General",
    label: "General Inquiry",
    hint: "Have a general question or feedback about our R&D direction?",
  },
  {
    value: "Partnership",
    label: "Partnership",
    hint: "Let's explore where OneBar could fit into your ecosystem.",
  },
  {
    value: "Investment",
    label: "Investment",
    hint: "Interested in the future of resilient payment infrastructure?",
  },
  {
    value: "Technology",
    label: "Technology & Research",
    hint: "Have a technical idea, protocol insight, or research opportunity?",
  },
  {
    value: "Early Access",
    label: "Early Access",
    hint: "Want to follow what we're building as R&D progresses?",
  },
  {
    value: "Media",
    label: "Media & Press",
    hint: "Press, editorial, or speaking inquiry?",
  },
];

export default function Contact() {
  // Form Field States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryOption>("General");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Custom Select Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Validation Error States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Inline Field Validation Logic
  const validateField = (fieldName: string, value: string): string => {
    if (fieldName === "name") {
      if (!value.trim()) return "Full Name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
    }
    if (fieldName === "email") {
      if (!value.trim()) return "Email address is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return "Please enter a valid email address.";
    }
    if (fieldName === "message") {
      if (!value.trim()) return "Message content is required.";
      if (value.trim().length < 10) return "Message should be at least 10 characters.";
    }
    return "";
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let valueToValidate = "";
    if (field === "name") valueToValidate = name;
    if (field === "email") valueToValidate = email;
    if (field === "message") valueToValidate = message;

    const error = validateField(field, valueToValidate);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const currentInquiryObj = INQUIRY_OPTIONS.find((opt) => opt.value === inquiryType) || INQUIRY_OPTIONS[0];

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields
    const nameErr = validateField("name", name);
    const emailErr = validateField("email", email);
    const msgErr = validateField("message", message);

    setErrors({
      name: nameErr,
      email: emailErr,
      message: msgErr,
    });
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (nameErr || emailErr || msgErr) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          inquiryType: inquiryType,
          message: message.trim(),
          hp: honeypot, // Honeypot anti-spam
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setServerError(
          data.error || "Something went wrong while sending your message. Please try again or email us directly."
        );
      }
    } catch (err: any) {
      console.error("[ONEBAR CONTACT SUBMISSION EXCEPTION]", err);
      setServerError(
        "Something went wrong while sending your message. Please try again or email us directly at onebar.help@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setInquiryType("General");
    setMessage("");
    setHoneypot("");
    setErrors({});
    setTouched({});
    setServerError(null);
    setIsSuccess(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen pt-32 pb-24 bg-onebar-bg text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 tech-grid-bg opacity-[0.02] pointer-events-none" />
      <div className="bg-glow top-12 right-12 opacity-50 pointer-events-none" />
      <div className="bg-glow bottom-24 left-8 opacity-25 pointer-events-none" />

      {/* Subtle Purple Signal Line Motif running vertically through the page */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-48 bottom-32 w-[1px] bg-gradient-to-b from-onebar-purple/40 via-onebar-purple/10 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ══════ SECTION 01: HERO / INTRODUCTION ══════ */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="reveal-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-onebar-purple/30 bg-onebar-purple/10 w-fit mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-onebar-purple animate-pulse-glow" />
            <span className="text-xs font-mono font-semibold tracking-widest text-onebar-purple-light uppercase">
              ONEBAR · R&amp;D · PRE-PROTOTYPE
            </span>
          </div>

          <h1 className="reveal-anim text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.05] uppercase font-sans">
            LET'S BUILD<br />
            <span className="text-gradient">WHAT COMES NEXT.</span>
          </h1>

          <p className="reveal-anim text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Have a question, partnership idea, investment interest, technical discussion, or want to follow what we're building?
          </p>

          <p className="reveal-anim text-zinc-500 text-xs md:text-sm font-mono mt-4">
            We're currently in R&amp;D and always interested in meaningful conversations.
          </p>
        </div>

        {/* ══════ SECTION 02 & 03: FORM & DIRECT CONTACT ══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* LEFT COLUMN: DIRECT CONTACT & COMPANY INFO (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 reveal-anim">
            
            {/* Context Card */}
            <div className="p-8 rounded-3xl border border-white/10 bg-dark-card/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-onebar-purple/10 border border-onebar-purple/30 flex items-center justify-center text-onebar-purple-light mb-6">
                <FlaskConical size={20} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight mb-3">
                Research Stage Memo
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                OneBar is an early-stage fintech protocol project. We are researching resilient digital payment infrastructure for situations where connectivity isn't guaranteed.
              </p>
              
              <div className="space-y-4 border-t border-white/5 pt-6 text-xs">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-onebar-purple-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">DIRECT EMAIL</span>
                    <a 
                      href="mailto:onebar.help@gmail.com" 
                      className="text-white hover:text-onebar-purple-light transition-colors font-mono font-medium"
                    >
                      onebar.help@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-onebar-purple-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">LOCATION</span>
                    <span className="text-white font-medium">Mysuru, India 🇮🇳</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-onebar-purple-light mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">DEVELOPMENT STATUS</span>
                    <span className="text-amber-400 font-mono font-semibold">R&amp;D · Pre-prototype</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiet Statement Memo Box */}
            <div className="p-6 rounded-2xl border border-dashed border-onebar-purple/20 bg-onebar-purple/5 text-xs text-zinc-400 leading-relaxed font-mono">
              <span className="text-onebar-purple-light font-bold block mb-1">SIGNAL &rarr; CONNECTION &rarr; COMMUNICATION</span>
              We treat every inquiry seriously. Messages are routed directly to the founding R&amp;D team.
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM / SUCCESS STATE (7 Cols) */}
          <div className="lg:col-span-7 reveal-anim">
            <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-dark-card/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  {/* Honeypot Spam Protection Field (Hidden from humans) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this out if you are human:</label>
                    <input
                      type="text"
                      id="hp_field"
                      name="hp_field"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  {/* Top Header Label */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Send a Direct Message
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      * Required fields
                    </span>
                  </div>

                  {/* Server Error Alert Banner */}
                  {serverError && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs flex items-start gap-3 animate-fade-in">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Submission Warning</p>
                        <p className="mt-0.5 opacity-90">{serverError}</p>
                      </div>
                    </div>
                  )}

                  {/* FIELD 1: Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      Full Name <span className="text-onebar-purple-light">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (touched.name) {
                          setErrors((prev) => ({ ...prev, name: validateField("name", e.target.value) }));
                        }
                      }}
                      onBlur={() => handleBlur("name")}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full bg-white/[0.02] border rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all duration-300 placeholder-zinc-600 ${
                        touched.name && errors.name
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-onebar-purple focus:bg-white/[0.04]"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* FIELD 2: Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-onebar-purple-light">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) {
                          setErrors((prev) => ({ ...prev, email: validateField("email", e.target.value) }));
                        }
                      }}
                      onBlur={() => handleBlur("email")}
                      placeholder="name@organisation.com"
                      className={`w-full bg-white/[0.02] border rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all duration-300 placeholder-zinc-600 ${
                        touched.email && errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-onebar-purple focus:bg-white/[0.04]"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* FIELD 3: Company / Organisation (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="company" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                        Company / Organisation
                      </label>
                      <span className="text-[10px] font-mono text-zinc-500">(Optional)</span>
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Venture Fund / Technology Institute"
                      className="w-full bg-white/[0.02] border border-white/10 focus:border-onebar-purple focus:bg-white/[0.04] rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all duration-300 placeholder-zinc-600"
                    />
                  </div>

                  {/* FIELD 4: Inquiry Type (Custom Accessible Dropdown) */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      Inquiry Type <span className="text-onebar-purple-light">*</span>
                    </label>
                    
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsDropdownOpen(!isDropdownOpen);
                          }
                        }}
                        aria-haspopup="listbox"
                        aria-expanded={isDropdownOpen}
                        className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-onebar-purple focus:bg-white/[0.04] rounded-xl py-3.5 px-4 text-white text-sm flex items-center justify-between transition-all duration-300 outline-none"
                      >
                        <span className="font-medium text-white">{currentInquiryObj.label}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-onebar-purple-light" : ""}`} 
                        />
                      </button>

                      {/* Dropdown Options Panel */}
                      {isDropdownOpen && (
                        <div 
                          role="listbox" 
                          tabIndex={-1}
                          className="absolute z-30 left-0 right-0 mt-2 py-2 bg-[#0c0c16] border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl animate-fade-in"
                        >
                          {INQUIRY_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              role="option"
                              aria-selected={inquiryType === option.value}
                              onClick={() => {
                                setInquiryType(option.value);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between transition-colors ${
                                inquiryType === option.value
                                  ? "bg-onebar-purple/20 text-onebar-purple-light font-semibold"
                                  : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                              }`}
                            >
                              <span>{option.label}</span>
                              {inquiryType === option.value && <CheckCircle2 size={14} className="text-onebar-purple-light" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dynamic Contextual Line beneath selector */}
                    <p className="mt-2 text-[11px] text-onebar-purple-light/90 font-mono transition-all">
                      &rarr; {currentInquiryObj.hint}
                    </p>
                  </div>

                  {/* FIELD 5: Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      Message <span className="text-onebar-purple-light">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (touched.message) {
                          setErrors((prev) => ({ ...prev, message: validateField("message", e.target.value) }));
                        }
                      }}
                      onBlur={() => handleBlur("message")}
                      placeholder="Share your question, proposal, or feedback with the OneBar team..."
                      className={`w-full bg-white/[0.02] border rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all duration-300 placeholder-zinc-600 resize-none ${
                        touched.message && errors.message
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-onebar-purple focus:bg-white/[0.04]"
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Primary Action Button: SEND MESSAGE */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-onebar-purple hover:bg-onebar-purple-light text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-mono text-xs">Transmitting message...</span>
                      </div>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                /* ══════ SUCCESS STATE CARD ══════ */
                <div className="py-12 px-6 flex flex-col items-center text-center animate-fade-in">
                  
                  {/* Subtle animated signal indicator */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-onebar-purple/10 border border-onebar-purple/40 flex items-center justify-center text-onebar-purple-light shadow-[0_0_30px_rgba(109,40,217,0.2)]">
                      <Send size={32} className="animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full border border-onebar-purple/30 animate-ping" style={{ animationDuration: "2.5s" }} />
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 uppercase mb-4">
                    STATUS: DISPATCHED
                  </span>

                  <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                    MESSAGE RECEIVED.
                  </h3>

                  <p className="text-zinc-400 text-sm max-w-md leading-relaxed mb-8">
                    Thanks for reaching out to OneBar. Your message has been received by our core team and we'll get back to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl border border-white/10 hover:border-onebar-purple/40 bg-white/[0.02] hover:bg-onebar-purple/10 text-xs font-mono text-white transition-all duration-300"
                  >
                    SEND ANOTHER MESSAGE
                  </button>

                </div>
              )}

            </div>
          </div>

        </div>

        {/* ══════ SECTION 04: CLOSING BRAND STATEMENT ══════ */}
        <div className="border-t border-white/5 pt-16 text-center max-w-2xl mx-auto reveal-anim">
          <p className="text-zinc-500 text-xs font-mono leading-relaxed">
            OneBar is exploring resilient offline-first payment protocols from Mysuru, India. All content describes early-stage research concepts.
          </p>
        </div>

      </div>
    </div>
  );
}
