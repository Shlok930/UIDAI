import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#050816",
          card: "#0a0f1e",
          border: "#1a2744",
          cyan: "#00d4ff",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          green: "#10b981",
          red: "#ef4444",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cyan: "0 0 30px rgba(0,212,255,0.25), 0 0 60px rgba(0,212,255,0.08)",
        blue: "0 0 30px rgba(59,130,246,0.25), 0 0 60px rgba(59,130,246,0.08)",
        purple: "0 0 30px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.08)",
        green: "0 0 30px rgba(16,185,129,0.25), 0 0 60px rgba(16,185,129,0.08)",
        red: "0 0 30px rgba(239,68,68,0.25), 0 0 60px rgba(239,68,68,0.08)",
        glow: "0 0 40px rgba(0,212,255,0.2)",
        card: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "scan-line": "scanLine 4s linear infinite",
        "data-stream": "dataStream 2s linear infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "radar": "radar 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 20px rgba(0,212,255,0.2)" },
          "50%": { opacity: "1", boxShadow: "0 0 40px rgba(0,212,255,0.5)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        dataStream: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(0,212,255,0.3)" },
          "50%": { borderColor: "rgba(0,212,255,0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
