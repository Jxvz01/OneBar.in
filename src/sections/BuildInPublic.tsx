import { CheckCircle2, Circle, HelpCircle } from "lucide-react";

interface Milestone {
  phase: string;
  title: string;
  desc: string;
  status: "completed" | "active" | "future";
  label: string;
}

export default function BuildInPublic() {
  const milestones: Milestone[] = [
    {
      phase: "Phase 1",
      title: "Protocol Research",
      desc: "Studying the feasibility of offline token security models and cryptographic approaches to local transaction authorization. Mapping threat models and edge cases.",
      status: "active",
      label: "ACTIVE R&D",
    },
    {
      phase: "Phase 2",
      title: "Proximity Channel Research",
      desc: "Evaluating peer-to-peer data transfer approaches via Bluetooth Low Energy, ultrasonic audio, NFC, and USSD. Designing simulation environments for comparison testing.",
      status: "future",
      label: "Planned Research",
    },
    {
      phase: "Phase 3",
      title: "Local Ledger Architecture",
      desc: "Designing encrypted local record structures inside device sandboxes. Researching auto-expiry mechanisms for pending offline tokens.",
      status: "future",
      label: "Future R&D",
    },
    {
      phase: "Phase 4",
      title: "Closed Concept Pilots",
      desc: "Controlled concept tests using simulated transactions in a lab environment in Mysuru, India to evaluate flow, latency, and user friction before any real-world deployment.",
      status: "future",
      label: "Future Pilot",
    },
    {
      phase: "Phase 5",
      title: "Financial Infrastructure",
      desc: "Establishing frameworks for bank integration, synchronization architecture, and settlement protocols — pending regulatory guidance and financial partnerships.",
      status: "future",
      label: "Future Architecture",
    },
    {
      phase: "Phase 6",
      title: "Regulatory & Scale",
      desc: "Pursuing compliance frameworks for resilient payment processing and scaling the infrastructure under appropriate regulatory sandbox and approval pathways.",
      status: "future",
      label: "Long-term Vision",
    },
  ];

  return (
    <section className="relative py-24 bg-dark border-t border-dark-border overflow-hidden">
      <div className="absolute inset-0 tech-grid-bg opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-onebar-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-onebar-purple/20 bg-onebar-purple/5 text-onebar-electric mb-6">
            BUILD IN PUBLIC
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            R&D timeline.
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            We believe payment infrastructure should be engineered with transparency. Here is our current development roadmap.
          </p>
        </div>

        {/* Vertical Timeline for mobile, horizontal grid for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Vertical/Horizontal lines */}
          <div className="hidden md:block absolute left-4 right-4 top-1/2 h-[1px] bg-dark-border z-0" />

          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border relative z-10 bg-dark-card/90 transition-all duration-300 ${
                milestone.status === "active"
                  ? "border-onebar-purple shadow-[0_0_20px_rgba(124,58,237,0.08)] scale-[1.02]"
                  : "border-dark-border"
              }`}
            >
              {/* Header: Phase & Badge */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-gray-500 font-mono tracking-wider">
                  {milestone.phase}
                </span>
                
                <span
                  className={`text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 rounded ${
                    milestone.status === "completed"
                      ? "bg-state-settled/10 border-state-settled/30 text-state-settled"
                      : milestone.status === "active"
                      ? "bg-onebar-purple/15 border-onebar-purple/45 text-onebar-electric animate-pulse"
                      : "bg-gray-800/60 border-gray-700 text-gray-500"
                  }`}
                >
                  {milestone.label}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                {milestone.status === "completed" && (
                  <CheckCircle2 size={18} className="text-state-settled flex-shrink-0" />
                )}
                {milestone.status === "active" && (
                  <Circle size={18} className="text-onebar-purple animate-ping flex-shrink-0" />
                )}
                {milestone.status === "future" && (
                  <HelpCircle size={18} className="text-gray-600 flex-shrink-0" />
                )}
                <h3 className="text-base font-semibold text-white">{milestone.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                {milestone.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
