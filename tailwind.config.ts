import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [...defaultConfig.content, "./pages/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        "pool-blue": "#4FC3F7",
        "pool-pink": "#FF69B4",
        "pool-yellow": "#FFD54F",
        "pool-orange": "#FF9800",
        "pool-purple": "#9C27B0",
        "pool-green": "#4CAF50",
        "pool-navy": "#1A237E",
        "money-green": "#2E7D32",
        "coin-gold": "#FFB300",
        "splash-blue": "#03A9F4",
        "droplet-cyan": "#00BCD4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        doodle: ["Comic Sans MS", "cursive", "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "money-rain": "money-rain 10s linear infinite",
        "droplet-fall": "droplet-fall 4s ease-in infinite",
        splash: "splash 2s ease-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-15px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-5px)" },
        },
        "money-rain": {
          "0%": { transform: "translateY(-100vh) rotate(0deg)" },
          "100%": { transform: "translateY(100vh) rotate(360deg)" },
        },
        "droplet-fall": {
          "0%": { transform: "translateY(-20px) scale(0)" },
          "50%": { transform: "translateY(0px) scale(1)" },
          "100%": { transform: "translateY(20px) scale(0)" },
        },
        splash: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
