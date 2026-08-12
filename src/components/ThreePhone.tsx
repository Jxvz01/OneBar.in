import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom helper to draw a crisp high-resolution OneBar UI onto an offscreen canvas
function createOneBarTextureCanvas(connectivity: "online" | "weak" | "offline") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Background
  ctx.fillStyle = "#08080f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle background mesh/grid patterns (simulating tech grid)
  ctx.strokeStyle = "rgba(124, 58, 237, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let j = 0; j < canvas.height; j += 64) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }

  // Draw Dynamic Island space (notch) at the top
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.roundRect(canvas.width / 2 - 160, 40, 320, 70, 35);
  ctx.fill();

  // Status Bar Left: Time
  ctx.fillStyle = "#a1a1aa";
  ctx.font = "bold 38px sans-serif";
  ctx.fillText("9:41", 80, 85);

  // Status Bar Right: Signal Bars
  // Draw signal icon based on connectivity state
  const signalX = 820;
  const signalY = 85;
  ctx.fillStyle = connectivity === "offline" ? "#3f3f46" : "#a1a1aa";
  ctx.fillRect(signalX, signalY - 15, 10, 20);
  ctx.fillRect(signalX + 15, signalY - 23, 10, 28);
  ctx.fillStyle = connectivity === "online" ? "#a1a1aa" : "#3f3f46";
  ctx.fillRect(signalX + 30, signalY - 32, 10, 37);
  ctx.fillRect(signalX + 45, signalY - 42, 10, 47);

  // Battery Icon
  ctx.strokeStyle = "#a1a1aa";
  ctx.lineWidth = 4;
  ctx.strokeRect(900, 52, 60, 30);
  ctx.fillStyle = "#a1a1aa";
  ctx.fillRect(904, 57, 42, 20);

  // App Logo/Header
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px sans-serif";
  ctx.fillText("OneBar", 80, 240);

  // Notification / Avatar Icons on Right Header
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(840, 220, 32, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#a855f7";
  ctx.beginPath();
  ctx.arc(920, 220, 32, 0, Math.PI * 2);
  ctx.fill();

  // Balance Card Container
  const balanceGradient = ctx.createLinearGradient(80, 320, 944, 660);
  balanceGradient.addColorStop(0, "rgba(124, 58, 237, 0.18)");
  balanceGradient.addColorStop(1, "rgba(124, 58, 237, 0.03)");
  ctx.fillStyle = balanceGradient;
  ctx.beginPath();
  ctx.roundRect(80, 320, 864, 340, 48);
  ctx.fill();
  ctx.strokeStyle = "rgba(124, 58, 237, 0.28)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Balance Label
  ctx.fillStyle = "#a1a1aa";
  ctx.font = "bold 26px monospace";
  ctx.fillText("TOTAL BALANCE", 140, 410);

  // Balance Amount
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 96px sans-serif";
  ctx.fillText("₹2,450.00", 140, 530);

  // Eye icon placeholder
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(670, 490, 16, 0, Math.PI * 2);
  ctx.stroke();

  // Connectivity Pill
  let connColor = "#f59e0b"; // limited
  let connText = "LIMITED CONNECTIVITY";
  if (connectivity === "online") {
    connColor = "#10b981";
    connText = "CONNECTIVITY: ACTIVE";
  } else if (connectivity === "offline") {
    connColor = "#ef4444";
    connText = "NO CONNECTIVITY";
  }

  // Draw pill shape
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.beginPath();
  ctx.roundRect(140, 580, 500, 54, 27);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.stroke();

  // Active status color dot
  ctx.fillStyle = connColor;
  ctx.beginPath();
  ctx.arc(175, 607, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px monospace";
  ctx.fillText(connText, 210, 616);

  // Action Buttons Grid (Send, Receive, Scan QR, Nearby)
  const actions = [
    { label: "Send", sub: "To anyone", icon: "↗" },
    { label: "Receive", sub: "From anyone", icon: "↙" },
    { label: "Scan QR", sub: "Pay or scan", icon: "▦" },
    { label: "Nearby", sub: "Find & pay", icon: "◎" },
  ];

  actions.forEach((act, idx) => {
    const x = 188 + idx * 224;
    const y = 820;

    // Outer Circle Button
    ctx.fillStyle = "rgba(124, 58, 237, 0.12)";
    ctx.beginPath();
    ctx.arc(x, y, 76, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(124, 58, 237, 0.22)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Icon
    ctx.fillStyle = "#c084fc";
    ctx.font = "bold 60px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(act.icon, x, y + 20);

    // Label
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(act.label, x, y + 125);

    // Sublabel
    ctx.fillStyle = "#71717a";
    ctx.font = "22px sans-serif";
    ctx.fillText(act.sub, x, y + 165);
    ctx.textAlign = "left"; // reset
  });

  // Recent Activity section title
  ctx.fillStyle = "#f4f4f5";
  ctx.font = "bold 44px sans-serif";
  ctx.fillText("Recent activity", 80, 1140);

  ctx.fillStyle = "#a855f7";
  ctx.font = "bold 32px monospace";
  ctx.fillText("View all", 780, 1140);

  // Mock Transactions list
  const txs = [
    { initials: "AR", name: "Aarav Retail Store", sub: "Payment initiated", amount: "₹850.00", status: "PENDING", color: "#f59e0b" },
    { initials: "CC", name: "Cafe Corner", sub: "Payment received", amount: "₹120.00", status: "COMPLETED", color: "#10b981" },
    { initials: "RK", name: "Rohan Kumar", sub: "Payment sent", amount: "₹450.00", status: "SYNCED", color: "#a855f7" }
  ];

  txs.forEach((tx, idx) => {
    const y = 1210 + idx * 165;

    // Divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(944, y);
    ctx.stroke();

    // Circle Avatar
    ctx.fillStyle = "rgba(124, 58, 237, 0.2)";
    ctx.beginPath();
    ctx.arc(140, y + 80, 48, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#d8b4fe";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(tx.initials, 140, y + 92);
    ctx.textAlign = "left";

    // Text details
    ctx.fillStyle = "#f4f4f5";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText(tx.name, 220, y + 68);

    ctx.fillStyle = "#71717a";
    ctx.font = "28px sans-serif";
    ctx.fillText(tx.sub, 220, y + 108);

    // Right-aligned status and amount
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(tx.amount, 944, y + 68);

    ctx.fillStyle = tx.color;
    ctx.font = "bold 26px monospace";
    ctx.fillText(tx.status, 944, y + 108);
    ctx.textAlign = "left";
  });

  // Divider line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 1720);
  ctx.lineTo(944, 1720);
  ctx.stroke();

  // R&D Concept Warning Box (Disclaimer)
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  ctx.beginPath();
  ctx.roundRect(80, 1760, 864, 160, 32);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.stroke();

  ctx.fillStyle = "#9ca3af";
  ctx.font = "bold 30px monospace";
  ctx.fillText("PRODUCT CONCEPT · R&D", 130, 1820);

  ctx.fillStyle = "#52525b";
  ctx.font = "24px sans-serif";
  ctx.fillText("Conceptual design only. OneBar is in active research & development.", 130, 1875);

  // Bottom Navigation Indicator Bar
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.beginPath();
  ctx.roundRect(canvas.width / 2 - 140, canvas.height - 35, 280, 10, 5);
  ctx.fill();

  return canvas;
}

// Inner model component to handle mouse move and frame updates
function PhoneMesh({ connectivity }: { connectivity: "online" | "weak" | "offline" }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef({ y: 0, scale: 1, rotZ: 0 });

  // Update canvas texture when state changes
  const screenTexture = useMemo(() => {
    const canvas = createOneBarTextureCanvas(connectivity);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 4;
    return texture;
  }, [connectivity]);

  // Track mouse coordinates for subtle parallax
  useEffect(() => {
    // Disable interactions if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Limit to desktop width bounds
      if (window.innerWidth < 768) return;

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Restrict rotation to very subtle range (approx 3 degrees max)
      targetRotation.current.x = normY * 0.05;
      targetRotation.current.y = normX * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Scroll Parallax setup
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollOffset.current, {
        y: -1.2,          // phone drifts upwards
        scale: 0.95,      // scales down slightly
        rotZ: -0.05,      // slight rotate offset
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Frame tick animation for smooth easing
  useFrame(() => {
    if (!meshRef.current) return;

    // Smooth damp rotation towards target mouse coordinates
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x + 0.15, // Base angle offset
      0.08
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y - 0.12, // Tilted left approx 7 degrees
      0.08
    );

    // Apply scroll offsets
    meshRef.current.position.y = scrollOffset.current.y;
    meshRef.current.scale.setScalar(scrollOffset.current.scale);
    meshRef.current.rotation.z = scrollOffset.current.rotZ;
  });

  return (
    <group ref={meshRef} position={[0, -0.2, 0]}>
      {/* 1. Metallic Chassis/Bezel of the Smartphone */}
      <RoundedBox args={[3.3, 6.7, 0.22]} radius={0.36} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0f0f15"
          metalness={0.9}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.8}
        />
      </RoundedBox>

      {/* 2. Volume Buttons (Left Side) */}
      <mesh position={[-1.66, 1.3, 0]}>
        <boxGeometry args={[0.04, 0.5, 0.08]} />
        <meshPhysicalMaterial color="#1a1a24" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.66, 0.6, 0]}>
        <boxGeometry args={[0.04, 0.5, 0.08]} />
        <meshPhysicalMaterial color="#1a1a24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 3. Power Button (Right Side) */}
      <mesh position={[1.66, 0.9, 0]}>
        <boxGeometry args={[0.04, 0.7, 0.08]} />
        <meshPhysicalMaterial color="#1a1a24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 4. Front glass & Screen backing layer */}
      <RoundedBox args={[3.12, 6.52, 0.02]} radius={0.3} smoothness={4} position={[0, 0, 0.11]}>
        <meshBasicMaterial color="#000000" />
      </RoundedBox>

      {/* 5. App Screen UI Material */}
      <mesh position={[0, 0, 0.121]}>
        <planeGeometry args={[3.02, 6.42]} />
        <meshBasicMaterial map={screenTexture} />
      </mesh>

      {/* 6. Realistic Reflective Screen Glass Layer */}
      <mesh position={[0, 0, 0.123]}>
        <planeGeometry args={[3.02, 6.42]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.02}
          metalness={0.1}
          transmission={0.95}
          thickness={0.1}
          ior={1.5}
        />
      </mesh>
    </group>
  );
}

export default function ThreePhone() {
  const [connectivity, setConnectivity] = useState<"online" | "weak" | "offline">("weak");
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // Cycle connectivity states
  useEffect(() => {
    const id = setInterval(() => {
      setConnectivity((prev) => (prev === "online" ? "weak" : prev === "weak" ? "offline" : "online"));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // WebGL support detection
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const isSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlAvailable(isSupported);
    } catch (e) {
      setWebGlAvailable(false);
    }
  }, []);

  // Static Fallback styling mapping
  const connStyles = {
    online: { color: "text-emerald-400", dot: "bg-emerald-400", label: "CONNECTIVITY: ACTIVE" },
    weak: { color: "text-amber-400", dot: "bg-amber-400", label: "LIMITED CONNECTIVITY" },
    offline: { color: "text-red-400", dot: "bg-red-400", label: "NO CONNECTIVITY" },
  }[connectivity];

  // 1. Static Fallback DOM rendering for WebGL unavailable or prefers-reduced-motion (Graceful Degrade)
  if (!webGlAvailable) {
    return (
      <div className="w-full max-w-[340px] aspect-[9/18.5] bg-[#0c0c14] border border-white/10 rounded-[56px] p-3 shadow-2xl relative overflow-hidden flex flex-col mx-auto">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 border border-white/5" />
        <div className="flex-1 rounded-[42px] bg-[#08080f] p-5 overflow-hidden flex flex-col relative border border-white/5">
          {/* Header */}
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mb-6">
            <span>9:41</span>
            <span>Signal ⚡</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-white font-extrabold text-lg">OneBar</span>
            <div className="w-8 h-8 rounded-full bg-onebar-purple/60" />
          </div>

          {/* Balance card */}
          <div className="p-4 rounded-2xl bg-onebar-purple/10 border border-onebar-purple/20 mb-4">
            <p className="text-[9px] font-mono text-zinc-400 mb-1">TOTAL BALANCE</p>
            <p className="text-2xl font-bold text-white mb-3">₹2,450.00</p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 text-[9px] font-mono text-white">
              <span className={`w-1.5 h-1.5 rounded-full ${connStyles.dot}`} />
              {connStyles.label}
            </div>
          </div>

          {/* Grid buttons */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {["Send", "Receive", "Scan QR", "Nearby"].map((action) => (
              <div key={action} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-onebar-purple/20 border border-onebar-purple/30 flex items-center justify-center text-purple-400 text-sm">
                  {action[0]}
                </div>
                <span className="text-[8px] text-zinc-300 font-semibold">{action}</span>
              </div>
            ))}
          </div>

          {/* Recents */}
          <div className="flex-1">
            <p className="text-[10px] text-zinc-400 font-bold mb-2">Recent activity</p>
            <div className="text-[8px] text-zinc-500 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Aarav Retail Store</span>
                <span className="text-amber-400 font-bold">PENDING</span>
              </div>
              <div className="flex justify-between">
                <span>Cafe Corner</span>
                <span className="text-emerald-400 font-bold">COMPLETED</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-2 border border-dashed border-zinc-800 rounded-lg text-[8px] text-zinc-500 mt-auto">
            PRODUCT CONCEPT · R&D
          </div>
        </div>
      </div>
    );
  }

  // 2. Main WebGL Three.js 3D Interactive Canvas
  return (
    <div className="relative w-full h-[600px] sm:h-[640px] md:h-[720px] flex items-center justify-center overflow-visible">
      {/* Soft atmospheric radial purple glow behind the canvas container */}
      <div className="absolute w-[450px] h-[450px] bg-onebar-purple/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 10], fov: 46 }}
        dpr={[1, 2]} // Performance: limit DPI to maximum 2x
        className="w-full h-full relative z-10"
        style={{ pointerEvents: "auto" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />

        {/* Dynamic spotlights to create the rich purple metallic rim sheen */}
        <spotLight
          position={[5, 8, 5]}
          angle={0.25}
          penumbra={1}
          intensity={8}
          color="#a855f7"
          castShadow
        />
        <spotLight
          position={[-5, -8, -5]}
          angle={0.3}
          penumbra={1}
          intensity={4}
          color="#a855f7"
        />

        {/* Generic white lighting to illuminate screen details */}
        <directionalLight position={[0, 4, 8]} intensity={1.5} />
        <directionalLight position={[0, -2, 4]} intensity={0.4} />

        {/* Interactive 3D phone model mesh */}
        <PhoneMesh connectivity={connectivity} />
      </Canvas>
    </div>
  );
}
