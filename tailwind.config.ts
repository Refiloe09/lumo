import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Primary Brand Colors
        "lumo-primary": "#FFB300", // Vibrant Orange (Main Accent)
        "lumo-secondary": "#254B5A", // Deep Blue (Backgrounds, Secondary Buttons)
        "lumo-dark": "#1E3A45", // Dark Teal (Text & Headers)
        "lumo-accent": "#FFC857", // Muted Yellow (Subtle Highlights)
        "lumo-light": "#F5F7FA", // Soft Gray (Light Backgrounds)

        // ✅ Neutral Grays
        "lumo-gray-100": "#F5F7FA",
        "lumo-gray-200": "#E1E5EA",
        "lumo-gray-300": "#CBD5E1",
        "lumo-gray-400": "#94A3B8",
        "lumo-gray-500": "#64748B",
        "lumo-gray-600": "#475569",
        "lumo-gray-700": "#334155",
        "lumo-gray-800": "#1E293B",
        "lumo-gray-900": "#0F172A",

        // ✅ Additional Utility Colors
        success: "#22C55E", // Green for success messages
        warning: "#FACC15", // Yellow for warnings
        error: "#EF4444", // Red for errors
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern Sans-Serif
        display: ["Poppins", "sans-serif"], // Clean Display Font
      },
      boxShadow: {
        card: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        button: "0px 4px 10px rgba(255, 179, 0, 0.4)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
