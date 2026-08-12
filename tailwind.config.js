/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'onebar-bg': '#02000A',
        'onebar-purple': '#6D28D9',
        'onebar-purple-light': '#8B5CF6',
        'onebar-surface': 'rgba(255, 255, 255, 0.03)',
        'onebar-surface-hover': 'rgba(255, 255, 255, 0.06)',
        'onebar-border': 'rgba(255, 255, 255, 0.08)',
        dark: {
          DEFAULT: "#030306",
          card: "#0a0a0f",
          cardHover: "#12121a",
          border: "rgba(255, 255, 255, 0.05)",
          borderHover: "rgba(124, 58, 237, 0.25)",
        },
        state: {
          pending: "#F59E0B",     // Local storage / offline state
          settled: "#10B981",     // Synced / confirmed state
          failed: "#EF4444",      // Connection lost / timeout state
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ["'Share Tech Mono'", "ui-monospace", "monospace"],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 1s infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "pulse-signal": "pulseSignal 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate)) scale(var(--tw-scale-x))' },
          '50%': { transform: 'translateY(-15px) rotate(var(--tw-rotate)) scale(var(--tw-scale-x))' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(109, 40, 217, 0.6))' },
          '50%': { opacity: '.7', filter: 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.8))' },
        },
        pulseSignal: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".3", transform: "scale(0.95)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
