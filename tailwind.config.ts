import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        // Accent is reserved exclusively for AI-related UI (copilot, insights, suggestions).
        // Do not use `accent` for general hover/selection states — use `secondary` instead.
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          foreground: "hsl(var(--danger-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
        },
        navy: {
          50: "hsl(var(--navy-50) / <alpha-value>)",
          100: "hsl(var(--navy-100) / <alpha-value>)",
          200: "hsl(var(--navy-200) / <alpha-value>)",
          300: "hsl(var(--navy-300) / <alpha-value>)",
          400: "hsl(var(--navy-400) / <alpha-value>)",
          500: "hsl(var(--navy-500) / <alpha-value>)",
          600: "hsl(var(--navy-600) / <alpha-value>)",
          700: "hsl(var(--navy-700) / <alpha-value>)",
          800: "hsl(var(--navy-800) / <alpha-value>)",
          900: "hsl(var(--navy-900) / <alpha-value>)",
          950: "hsl(var(--navy-950) / <alpha-value>)",
        },
        slate: {
          50: "hsl(var(--slate-50) / <alpha-value>)",
          100: "hsl(var(--slate-100) / <alpha-value>)",
          200: "hsl(var(--slate-200) / <alpha-value>)",
          300: "hsl(var(--slate-300) / <alpha-value>)",
          400: "hsl(var(--slate-400) / <alpha-value>)",
          500: "hsl(var(--slate-500) / <alpha-value>)",
          600: "hsl(var(--slate-600) / <alpha-value>)",
          700: "hsl(var(--slate-700) / <alpha-value>)",
          800: "hsl(var(--slate-800) / <alpha-value>)",
          900: "hsl(var(--slate-900) / <alpha-value>)",
          950: "hsl(var(--slate-950) / <alpha-value>)",
        },
        // Violet accent scale — reserved exclusively for AI surfaces (copilot, insights, AI badges).
        violet: {
          50: "hsl(var(--violet-50) / <alpha-value>)",
          100: "hsl(var(--violet-100) / <alpha-value>)",
          200: "hsl(var(--violet-200) / <alpha-value>)",
          300: "hsl(var(--violet-300) / <alpha-value>)",
          400: "hsl(var(--violet-400) / <alpha-value>)",
          500: "hsl(var(--violet-500) / <alpha-value>)",
          600: "hsl(var(--violet-600) / <alpha-value>)",
          700: "hsl(var(--violet-700) / <alpha-value>)",
          800: "hsl(var(--violet-800) / <alpha-value>)",
          900: "hsl(var(--violet-900) / <alpha-value>)",
          950: "hsl(var(--violet-950) / <alpha-value>)",
        },
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "glow-violet": "var(--shadow-glow-violet)",
        "glow-navy": "var(--shadow-glow-navy)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-in": "fade-in 0.15s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
