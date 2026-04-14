import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Bluetooth, 
  Volume2, 
  PhoneCall, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  Sparkles,
  Check
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Channel {
  id: string;
  name: string;
  badge: string;
  icon: any;
  desc: string;
  range: string;
  spec: string;
  simText: string;
  simSub: string;
  visualType: "bluetooth" | "sound" | "ussd" | "nfc" | "autoswitch";
}

export default function HowItWorks() {
  const [activeChannel, setActiveChannel] = useState<string>("autoswitch");
  const containerRef = useRef<HTMLDivElement>(null);

  const channels: Channel[] = [
    {
      id: "bluetooth",
      name: "Bluetooth",
      badge: "P2P Wireless",
      icon: Bluetooth,
      desc: "Peer-to-peer within 10 metres. No pairing needed. Works in basements, elevators, dead zones.",
      range: "Range: ~10m",
      spec: "BLE 5.0 Low Energy Mesh",
      simText: "Direct P2P Handshake",
      simSub: "Establishing encrypted 2.4GHz BLE signal payload",
      visualType: "bluetooth"
    },
    {
      id: "sound",
      name: "Sound Wave",
      badge: "Ultrasonic Frequency",
      icon: Volume2,
      desc: "Inaudible ultrasonic signal transmitted through the speaker. Works on literally any Android phone with a microphone.",
      range: "Range: ~3m",
      spec: "18kHz – 20kHz Acoustic Chirp",
      simText: "Ultrasonic Acoustic Pulse",
      simSub: "Broadcasting high-frequency audio token via speaker",
      visualType: "sound"
    },
    {
      id: "ussd",
      name: "USSD / *99#",
      badge: "Cellular Fallback",
      icon: PhoneCall,
      desc: "Uses the existing USSD infrastructure. Works on 2G, feature phones, and even the weakest cellular signal.",
      range: "Needs: 1 bar of signal",
      spec: "GSM Signaling Channel",
      simText: "2G Control Channel Dial",
      simSub: "Transmitting payload over GSM *99# signaling layer",
      visualType: "ussd"
    },
    {
      id: "nfc",
      name: "NFC Tap",
      badge: "Contactless",
      icon: Radio,
      desc: "Tap and pay at supported merchant terminals. Like a contactless card, but directly from your bank account.",
      range: "Range: ~4cm",
      spec: "13.56 MHz Near Field",
      simText: "Instant Proximity Tap",
      simSub: "Exchanging cryptographic token over 13.56 MHz induction",
      visualType: "nfc"
    },
    {
      id: "autoswitch",
      name: "Auto-Switch",
      badge: "Smart Engine",
      icon: Zap,
      desc: "OneBar's engine scans all channels in real time, ranks them by speed and reliability, and picks the winner. You just tap \"Pay\".",
      range: "Always-on intelligence",
      spec: "Real-time Telemetry Ranking",
      simText: "Auto-Selecting Optimal Channel",
      simSub: "Evaluating BLE, Sound, USSD & NFC latency in parallel...",
      visualType: "autoswitch"
    }
  ];

  const currentChannelObj = channels.find(c => c.id === activeChannel) || channels[4];

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
    <div ref={containerRef} className="relative min-h-screen pt-32 pb-24 bg-onebar-bg overflow-hidden text-white">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 tech-grid-bg opacity-[0.03] pointer-events-none" />
      <div className="bg-glow top-10 right-10 opacity-60" />
      <div className="bg-glow bottom-20 left-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ══════ HERO SECTION ══════ */}
        <div className="text-center max-w-3xl mx-auto mb-24 reveal-anim">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest text-onebar-purple-light bg-onebar-purple/10 border border-onebar-purple/30 uppercase mb-6">
            HOW IT WORKS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Three steps.<br />
            <span className="text-gradient">Zero complexity.</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Same UPI flow you already know. OneBar just makes sure it never fails — even without internet.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-onebar-purple/20 bg-white/[0.02] text-xs font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-onebar-purple animate-pulse" />
            <span>Research Concept · Designed for connectivity resilience</span>
          </div>
        </div>

        {/* ══════ STEP-BY-STEP ══════ */}
        <div className="max-w-5xl mx-auto mb-32 reveal-anim">
          <div className="flex flex-col gap-8 relative">
            
            {/* Connecting line behind steps */}
            <div className="hidden md:block absolute left-[39px] top-12 bottom-12 w-[2px] bg-gradient-to-b from-onebar-purple/50 via-onebar-purple/20 to-transparent pointer-events-none z-0" />

            {/* STEP 01 */}
            <div className="relative z-10 p-8 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl hover:border-onebar-purple/40 transition-all duration-300 glow-card">
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                <div className="w-16 h-16 rounded-2xl bg-onebar-purple/10 border border-onebar-purple/30 flex items-center justify-center flex-shrink-0 text-onebar-purple-light font-mono font-bold text-2xl shadow-lg shadow-purple-500/10">
                  01
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Open OneBar & pay like normal
                    </h2>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono text-zinc-400 border border-white/10 bg-white/[0.02]">
                      Step 1
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                    Enter the amount, scan a QR code, or type a phone number. The experience is identical to PhonePe, GPay, or any UPI app you've ever used. No learning curve. No new habits.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Scan QR", "Enter UPI ID", "Phone Number"].map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono bg-onebar-purple/10 border border-onebar-purple/20 text-onebar-purple-light flex items-center gap-1.5">
                        <Check size={12} className="text-onebar-purple" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="relative z-10 p-8 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl hover:border-onebar-purple/40 transition-all duration-300 glow-card">
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                <div className="w-16 h-16 rounded-2xl bg-onebar-purple/10 border border-onebar-purple/30 flex items-center justify-center flex-shrink-0 text-onebar-purple-light font-mono font-bold text-2xl shadow-lg shadow-purple-500/10">
                  02
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Signal drops? OneBar auto-switches.
                    </h2>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 border border-amber-500/20 bg-amber-500/5">
                      Offline Fallback
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                    The moment your internet dies — and it will — OneBar detects the drop and silently switches to offline mode. You don't press anything. You don't even notice. The app picks the best available channel automatically.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Auto-detect", "Silent switch", "Zero delay"].map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1.5">
                        <Zap size={12} className="text-amber-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="relative z-10 p-8 rounded-3xl border border-white/10 bg-dark-card/80 backdrop-blur-xl hover:border-onebar-purple/40 transition-all duration-300 glow-card">
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                <div className="w-16 h-16 rounded-2xl bg-onebar-purple/10 border border-onebar-purple/30 flex items-center justify-center flex-shrink-0 text-onebar-purple-light font-mono font-bold text-2xl shadow-lg shadow-purple-500/10">
                  03
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Payment goes through. Always.
                    </h2>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5">
                      Guaranteed Completion
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                    Your payment is sent via Bluetooth, sound wave, or USSD — whichever works best. Both sender and receiver get instant on-screen confirmation. The transaction settles to your bank the moment internet reconnects.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Instant confirmation", "Bank settlement", "Encrypted"].map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══════ THE CHANNELS (5 LAYERS OF RESILIENCE) ══════ */}
        <div className="mb-32 reveal-anim">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-onebar-purple-light font-mono tracking-widest uppercase block mb-3">
              THE CHANNELS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Five layers of<br />
              <span className="text-gradient">resilience.</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              OneBar doesn't rely on a single backup. It has five independent channels — and picks the best one in real time.
            </p>
          </div>

          {/* Channels Interactive Selector Tabs & Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: 5 Channel Cards (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {channels.map((chan) => {
                const IconComp = chan.icon;
                const isSelected = activeChannel === chan.id;

                return (
                  <div
                    key={chan.id}
                    onClick={() => setActiveChannel(chan.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-dark-card border-onebar-purple shadow-[0_0_30px_rgba(109,40,217,0.15)] ring-1 ring-onebar-purple/50 scale-[1.02]"
                        : "bg-white/[0.01] border-white/5 opacity-70 hover:opacity-100 hover:border-white/20"
                    } ${chan.id === "autoswitch" ? "sm:col-span-2" : ""}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          isSelected
                            ? "bg-onebar-purple/20 border-onebar-purple text-onebar-purple-light"
                            : "bg-white/[0.03] border-white/10 text-zinc-400"
                        }`}>
                          <IconComp size={20} />
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/[0.03] border border-white/10 text-zinc-400">
                          {chan.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                        <span>{chan.name}</span>
                        {isSelected && <Sparkles size={14} className="text-onebar-purple-light animate-pulse" />}
                      </h3>

                      <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                        {chan.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-onebar-purple-light">
                      <span>{chan.range}</span>
                      <span className="text-[9px] text-zinc-500 uppercase">{chan.spec}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Live Interactive Simulation Preview Card (5 Cols) */}
            <div className="lg:col-span-5 p-8 rounded-3xl border border-white/10 bg-dark-card/90 flex flex-col justify-between relative overflow-hidden min-h-[420px] shadow-2xl">
              <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-onebar-purple/10 blur-[50px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    Channel Telemetry Monitor
                  </span>
                  <span className="font-mono text-xs text-onebar-purple-light flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Active: {currentChannelObj.name}
                  </span>
                </div>

                {/* Animated Graphic Canvas matching active channel */}
                <div className="w-full h-56 bg-black/60 rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  
                  {/* Bluetooth Visual */}
                  {currentChannelObj.visualType === "bluetooth" && (
                    <div className="flex flex-col items-center animate-fade-in">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full bg-onebar-purple/20 border border-onebar-purple flex items-center justify-center text-onebar-purple-light shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                          <Bluetooth size={28} className="animate-pulse" />
                        </div>
                        <div className="absolute inset-0 rounded-full border border-onebar-purple/40 animate-ping" style={{ animationDuration: '2s' }} />
                      </div>
                      <p className="text-xs font-mono text-white font-semibold mb-1">BLE Mesh P2P Beam</p>
                      <p className="text-[10px] text-zinc-500 font-mono text-center max-w-[200px]">
                        Scanning 2.4GHz spectrum within 10m radius. Direct peer handshake.
                      </p>
                    </div>
                  )}

                  {/* Sound Wave Visual */}
                  {currentChannelObj.visualType === "sound" && (
                    <div className="flex flex-col items-center animate-fade-in">
                      <div className="flex items-center justify-center gap-1.5 h-16 mb-4">
                        {[40, 70, 100, 60, 90, 50, 80, 40].map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-onebar-purple-light rounded-full animate-pulse"
                            style={{
                              height: `${h}%`,
                              animationDelay: `${i * 0.15}s`,
                              animationDuration: '0.9s'
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-mono text-white font-semibold mb-1">19.2 kHz Ultrasonic Chirp</p>
                      <p className="text-[10px] text-zinc-500 font-mono text-center max-w-[200px]">
                        Transmitting encoded audio data payload through phone speaker.
                      </p>
                    </div>
                  )}

                  {/* USSD Visual */}
                  {currentChannelObj.visualType === "ussd" && (
                    <div className="flex flex-col items-center animate-fade-in">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                        <PhoneCall size={28} className="animate-bounce" />
                      </div>
                      <p className="text-xs font-mono text-white font-semibold mb-1">GSM Control Channel (*99#)</p>
                      <p className="text-[10px] text-zinc-500 font-mono text-center max-w-[200px]">
                        Bypasses IP data layer. Encodes payload into 2G network control signals.
                      </p>
                    </div>
                  )}

                  {/* NFC Visual */}
                  {currentChannelObj.visualType === "nfc" && (
                    <div className="flex flex-col items-center animate-fade-in">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                          <Radio size={28} />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 animate-pulse" />
                      </div>
                      <p className="text-xs font-mono text-white font-semibold mb-1">13.56 MHz Proximity Induction</p>
                      <p className="text-[10px] text-zinc-500 font-mono text-center max-w-[200px]">
                        Proximity contactless tap. Instant token exchange within 4cm.
                      </p>
                    </div>
                  )}

                  {/* Auto-Switch Visual */}
                  {currentChannelObj.visualType === "autoswitch" && (
                    <div className="w-full flex flex-col items-center animate-fade-in">
                      <div className="w-full space-y-2 mb-2">
                        {[
                          { name: "BLE Bluetooth", quality: "98% (Optimal)", color: "bg-onebar-purple" },
                          { name: "Sound Wave", quality: "84% (Good)", color: "bg-onebar-purple/60" },
                          { name: "USSD 2G", quality: "60% (Backup)", color: "bg-zinc-700" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[10px] font-mono p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-zinc-300">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} w-[85%]`} />
                              </div>
                              <span className="text-onebar-purple-light font-bold">{item.quality}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Status info bar */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Selected Transport Layer</span>
                    <p className="text-xs font-bold text-white">{currentChannelObj.simText}</p>
                  </div>
                  <button
                    onClick={() => {
                      const currentIndex = channels.findIndex(c => c.id === activeChannel);
                      const nextIndex = (currentIndex + 1) % channels.length;
                      setActiveChannel(channels[nextIndex].id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-onebar-purple/20 hover:bg-onebar-purple/40 border border-onebar-purple/40 text-xs font-mono text-onebar-purple-light transition-all flex items-center gap-1.5"
                  >
                    <span>Next Channel</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono mt-2">{currentChannelObj.simSub}</p>
              </div>

            </div>

          </div>
        </div>

        {/* ══════ COMPARISON (WHY ALTERNATIVES FAILED) ══════ */}
        <div className="mb-32 reveal-anim">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-onebar-purple-light font-mono tracking-widest uppercase block mb-3">
              COMPARISON
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why alternatives<br />
              <span className="text-gradient">failed.</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Offline payments exist on paper, not in practice. Here's why — and how OneBar is different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Preloaded Wallets",
                badge: "✕ FAILED",
                tagline: "Funds stuck. Internet required.",
                desc: "Needs pre-loading before the network drops. If you forget, your money is effectively trapped until you find a signal. UX friction is too high."
              },
              {
                title: "Traditional Apps",
                badge: "✕ FAILED",
                tagline: "Infinite loading. Timeout errors.",
                desc: "Standard UPI apps spin for 30s before failing. In a busy shop or station, this isn't just an error — it's an embarrassment and a lost sale."
              },
              {
                title: "UPI 123Pay",
                badge: "✕ FAILED",
                tagline: "Reliable Rails, Prehistoric UX.",
                desc: "Voice menus, dial tones, and long waits. In the age of tap-and-pay, nobody has the patience for a 2-minute phone call to send ₹50."
              }
            ].map((card, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-dark-card/60 backdrop-blur-xl hover:border-red-500/30 transition-all duration-300 glow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border border-red-500/30 bg-red-500/10 text-red-400 tracking-wider">
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-semibold text-red-400/90 mb-3">{card.tagline}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════ CALL TO ACTION ══════ */}
        <div className="text-center max-w-3xl mx-auto py-16 px-8 rounded-3xl border border-onebar-purple/30 bg-gradient-to-b from-onebar-purple/10 to-transparent relative overflow-hidden shadow-2xl reveal-anim">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-onebar-purple/20 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to never have<br />
            <span className="text-gradient">a failed payment again?</span>
          </h2>

          <div className="mt-8">
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-onebar-purple hover:bg-onebar-purple-light text-white font-semibold text-base transition-all duration-300 shadow-[0_0_30px_rgba(109,40,217,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

/* git-build-ref: 2 */