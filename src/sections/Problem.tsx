import { useState, useEffect } from "react";
import { Smartphone, XCircle } from "lucide-react";

export default function Problem() {
  const [signalStrength, setSignalStrength] = useState(3);
  const [txnStatus, setTxnStatus] = useState<"idle" | "sending" | "connecting" | "failed">("idle");

  // Run a loop demonstrating the failure lifecycle
  useEffect(() => {
    const runDemo = () => {
      // Step 1: Idle
      setTxnStatus("idle");
      setSignalStrength(3);

      // Step 2: Sending
      setTimeout(() => {
        setTxnStatus("sending");
        setSignalStrength(2);
      }, 1500);

      // Step 3: Connecting & Signal drop
      setTimeout(() => {
        setTxnStatus("connecting");
        setSignalStrength(1);
      }, 3000);

      // Step 4: Drop completely to 0 and fail
      setTimeout(() => {
        setTxnStatus("failed");
        setSignalStrength(0);
      }, 4500);
    };

    runDemo();
    const interval = setInterval(runDemo, 7500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-dark border-t border-dark-border overflow-hidden">
      {/* Backdrops */}
      <div className="absolute inset-0 tech-grid-bg opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-state-failed/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-state-failed/20 bg-state-failed/5 text-state-failed mb-6">
            THE FRICTION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            You've been there.
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Standing at a crowded counter, waiting for the spinner to resolve. A failed payment isn't just an error code; it's a breakdown of trust.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Explanatory Copy */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Money shouldn't stop<br />
              <span className="text-gradient">because connectivity does.</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
              UPI has revolutionized transaction speeds. But standard online payments require an active network socket 
              every step of the way—connecting your device, the merchant's device, gateway routers, and core bank ledgers. 
              <br /><br />
              When you enter a basement shop, travel on a highway, or enter a crowded cricket stadium, that channel breaks. 
              The transaction stalls, times out, and leaves both customer and seller stranded.
            </p>

            <div className="flex flex-col gap-4 font-mono">
              <div className="flex items-center gap-3 border border-dark-border bg-dark-card/30 p-4 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-state-failed" />
                <span className="text-xs text-gray-300">UPI TIMEOUTS: 1 in 5 payments fail in congested areas.</span>
              </div>
              <div className="flex items-center gap-3 border border-dark-border bg-dark-card/30 p-4 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-state-failed" />
                <span className="text-xs text-gray-300">RURAL GAP: Over 300 million citizens live in cellular shadows.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Device Simulation */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-sm rounded-[32px] border border-dark-border bg-dark-card p-6 shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden">
              {/* Internal HUD */}
              <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-8 pb-3 border-b border-dark-border/40">
                <span className="flex items-center gap-1">
                  <Smartphone size={12} />
                  <span>CELLULAR_DEV_TX</span>
                </span>
                
                {/* Dynamic Signal strength visualizer */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-end gap-[2px] h-3">
                    <div className={`w-[3px] h-[3px] bg-current ${signalStrength >= 1 ? "text-state-failed" : "text-gray-700"}`} />
                    <div className={`w-[3px] h-[6px] bg-current ${signalStrength >= 2 ? "text-state-failed" : "text-gray-700"}`} />
                    <div className={`w-[3px] h-[9px] bg-current ${signalStrength >= 3 ? "text-state-failed" : "text-gray-700"}`} />
                    <div className={`w-[3px] h-[12px] bg-current ${signalStrength >= 4 ? "text-state-failed" : "text-gray-700"}`} />
                  </div>
                  <span className="font-semibold text-[10px] tracking-wider uppercase">
                    {signalStrength === 3 && "Strong Signal"}
                    {signalStrength === 2 && "Unstable Signal"}
                    {signalStrength === 1 && "Weak Signal"}
                    {signalStrength === 0 && "No Signal"}
                  </span>
                </div>
              </div>

              {/* Main screen content */}
              <div className="h-64 flex flex-col justify-between items-center text-center">
                
                {/* Transaction target */}
                <div>
                  <span className="text-xs text-gray-500 uppercase font-mono block mb-1">Paying Merchant</span>
                  <span className="text-lg font-bold text-white block">Local Tea Shop #2</span>
                </div>

                {/* Amount */}
                <div className="my-auto">
                  <span className="text-4xl font-extrabold text-white tracking-tight">₹500.00</span>
                </div>

                {/* Dynamic Payment State indicator */}
                <div className="w-full">
                  {txnStatus === "idle" && (
                    <div className="py-3 px-4 rounded-xl bg-dark border border-dark-border text-gray-400 text-xs font-mono">
                      <span>Tap to Send UPI Payment</span>
                    </div>
                  )}

                  {txnStatus === "sending" && (
                    <div className="py-3 px-4 rounded-xl bg-dark border border-dark-border text-onebar-electric text-xs font-mono flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-onebar-purple/30 border-t-onebar-purple rounded-full animate-spin" />
                      <span>Initiating UPI Handshake...</span>
                    </div>
                  )}

                  {txnStatus === "connecting" && (
                    <div className="py-3 px-4 rounded-xl bg-dark border border-dark-border text-state-pending text-xs font-mono flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-state-pending/30 border-t-state-pending rounded-full animate-spin" />
                      <span>Network Congestion Detected...</span>
                    </div>
                  )}

                  {txnStatus === "failed" && (
                    <div className="py-3 px-4 rounded-xl bg-state-failed/10 border border-state-failed/35 text-state-failed text-xs font-mono flex items-center justify-center gap-2 animate-pulse">
                      <XCircle size={14} />
                      <span>FAILED: Connection Timeout</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid representation */}
              <div className="absolute inset-0 tech-grid-bg opacity-[0.03] pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
