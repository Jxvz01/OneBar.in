import { useState } from "react";
import { Bluetooth, Radio, Network, Zap, RefreshCw } from "lucide-react";

interface TechLayer {
  id: string;
  name: string;
  badge: "Under Research" | "Exploring" | "Future Architecture";
  desc: string;
}

export default function Technology() {
  const [selectedLayer, setSelectedLayer] = useState("proximity");

  const layers: TechLayer[] = [
    {
      id: "device",
      name: "Device Capture",
      badge: "Under Research",
      desc: "We are researching how payment intent — amount, recipient identifier, and authorization signal — could be captured and encrypted locally on a device without requiring an immediate server round-trip.",
    },
    {
      id: "proximity",
      name: "Proximity Exchange",
      badge: "Under Research",
      desc: "The core research question: can payment tokens be transmitted between two devices using local communication channels (BLE, sound, NFC, USSD) without requiring active internet? We are exploring multiple mechanisms in parallel — no single channel has been selected as the solution.",
    },
    {
      id: "ledger",
      name: "Local State Ledger",
      badge: "Exploring",
      desc: "We are exploring architectures for a cryptographically-signed local record of a transaction's pending state — stored securely on-device until connectivity is restored. This is a concept under active research.",
    },
    {
      id: "sync",
      name: "Synchronization",
      badge: "Future Architecture",
      desc: "A proposed background mechanism that would detect connectivity restoration and securely upload pending locally-cached transaction records to a server for validation and processing.",
    },
    {
      id: "settlement",
      name: "Settlement Infrastructure",
      badge: "Future Architecture",
      desc: "In the long-term conceptual architecture, settlements would clear through appropriate financial infrastructure. This requires bank partnerships, regulatory frameworks, and compliance mechanisms we have not yet established.",
    },
  ];

  return (
    <section className="relative py-24 bg-dark border-t border-dark-border overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute inset-0 tech-grid-bg opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-onebar-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-onebar-purple/20 bg-onebar-purple/5 text-onebar-electric mb-6">
            RESEARCH ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Resilience infrastructure.
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            We are researching how to decouple payment authorization from live internet connectivity. This is an exploration — not a deployed system.
          </p>
        </div>

        {/* Layout: Pipeline on Left, Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Vertical Pipeline Map */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-2 block">
              Conceptual Architecture:
            </span>
            <div className="relative pl-8 space-y-4">
              {/* Vertical line indicator */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-dark-border" />
              
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedLayer === layer.id
                      ? "bg-dark-card border-onebar-purple scale-[1.02]"
                      : "bg-dark-card/20 border-dark-border opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Pipeline node bullet */}
                  <div
                    className={`absolute -left-[30px] top-6 w-[12px] h-[12px] rounded-full border-2 transition-all ${
                      selectedLayer === layer.id
                        ? "bg-onebar-purple border-onebar-electric scale-110"
                        : "bg-dark border-dark-border"
                    }`}
                  />

                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-sm font-semibold text-white font-mono">{layer.name}</span>
                    <span
                      className={`text-[9px] font-mono tracking-wider uppercase border px-2 py-0.5 rounded ${
                        layer.badge === "Under Research"
                          ? "bg-onebar-purple/15 border-onebar-purple/40 text-onebar-electric"
                          : layer.badge === "Exploring"
                          ? "bg-state-pending/10 border-state-pending/30 text-state-pending"
                          : "bg-gray-800/60 border-gray-700 text-gray-500"
                      }`}
                    >
                      {layer.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: In-depth Detail Card & Channels list */}
          <div className="lg:col-span-7 space-y-8">
            {/* Active Pipeline details display */}
            <div className="p-8 rounded-2xl border border-dark-border bg-dark-card/90 relative overflow-hidden">
              <span className="text-[10px] text-onebar-electric font-mono tracking-widest uppercase block mb-2">
                RESEARCH DETAIL
              </span>
              <h3 className="text-xl font-bold text-white mb-4">
                {layers.find((l) => l.id === selectedLayer)?.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {layers.find((l) => l.id === selectedLayer)?.desc}
              </p>
              
              <div className="flex items-center gap-3 border-t border-dark-border/40 pt-6 text-xs text-gray-500 font-mono">
                <span>DIRECTION: decoupled resilient infrastructure</span>
                <span>•</span>
                <span>STATUS: {layers.find((l) => l.id === selectedLayer)?.badge}</span>
              </div>
            </div>

            {/* Communication channels being explored */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 font-mono uppercase tracking-wider block">
                  Communication Channels Under Research:
                </span>
                <span className="text-[10px] text-gray-600 font-mono">Technology-agnostic approach</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* BLE */}
                <div className="p-5 rounded-xl border border-dark-border bg-dark-card/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-onebar-electric">
                      <Bluetooth size={16} />
                      <h4 className="text-sm font-semibold text-white font-mono">BLE</h4>
                    </div>
                    <span className="text-[9px] font-mono text-onebar-electric bg-onebar-purple/10 border border-onebar-purple/20 px-2 py-0.5 rounded">CURRENT RESEARCH</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Bluetooth Low Energy for short-range, low-power local data exchange between nearby devices.
                  </p>
                </div>

                {/* Sound */}
                <div className="p-5 rounded-xl border border-dark-border bg-dark-card/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-onebar-electric">
                      <Radio size={16} />
                      <h4 className="text-sm font-semibold text-white font-mono">Sound-based</h4>
                    </div>
                    <span className="text-[9px] font-mono text-state-pending bg-state-pending/10 border border-state-pending/20 px-2 py-0.5 rounded">EXPLORING</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Inaudible ultrasonic data encoding over device speakers — works on any hardware with a microphone.
                  </p>
                </div>

                {/* NFC */}
                <div className="p-5 rounded-xl border border-dark-border bg-dark-card/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-onebar-electric">
                      <Zap size={16} />
                      <h4 className="text-sm font-semibold text-white font-mono">NFC</h4>
                    </div>
                    <span className="text-[9px] font-mono text-state-pending bg-state-pending/10 border border-state-pending/20 px-2 py-0.5 rounded">EXPLORING</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Near-field contactless channel for extremely fast token handshakes within very short distances.
                  </p>
                </div>

                {/* USSD */}
                <div className="p-5 rounded-xl border border-dark-border bg-dark-card/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-onebar-electric">
                      <Network size={16} />
                      <h4 className="text-sm font-semibold text-white font-mono">USSD / Telecom</h4>
                    </div>
                    <span className="text-[9px] font-mono text-state-pending bg-state-pending/10 border border-state-pending/20 px-2 py-0.5 rounded">EXPLORING</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    GSM-layer fallback for scenarios with minimal cellular signal — no data plan required.
                  </p>
                </div>

                {/* Sync */}
                <div className="p-5 rounded-xl border border-dark-border bg-dark-card/30 sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <RefreshCw size={16} />
                      <h4 className="text-sm font-semibold text-gray-400 font-mono">Sync + Settlement</h4>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 bg-gray-800/50 border border-gray-700 px-2 py-0.5 rounded">FUTURE RESEARCH</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Long-term research tracks for synchronization architecture and settlement infrastructure — pending regulatory clarity and financial partnerships.
                  </p>
                </div>
              </div>

              {/* Honesty note */}
              <p className="text-[11px] text-gray-600 font-mono mt-4 text-center">
                OneBar is technology-agnostic. The final architecture will depend on what research validates as most viable.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
