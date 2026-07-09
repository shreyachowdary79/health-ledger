/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#d9f2ec",
        mint: "#10b981",
        coral: "#fb7185",
        bg: {
          0: "#020617",
          1: "#07111F",
          2: "#0F172A"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(2, 6, 23, 0.35)",
        glow: "0 0 0 1px rgba(16, 185, 129, 0.22), 0 24px 80px rgba(16, 185, 129, 0.18)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.22), transparent 24%), radial-gradient(circle at 80% 10%, rgba(34, 211, 238, 0.18), transparent 22%), radial-gradient(circle at 50% 80%, rgba(20, 184, 166, 0.16), transparent 28%)",
        premium:
          "linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(34, 211, 238, 0.9))"
      },
      borderRadius: {
        "3xl": "1.75rem"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" }
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" }
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        glowPulse: "glowPulse 5s ease-in-out infinite",
        sheen: "sheen 2.6s linear infinite"
      }
    }
  },
  plugins: []
};
