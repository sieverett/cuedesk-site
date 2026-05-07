/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          sunken: "var(--color-surface-sunken)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          inverse: "var(--color-text-inverse)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        topic: {
          1: "var(--color-topic-1)",
          2: "var(--color-topic-2)",
          3: "var(--color-topic-3)",
          4: "var(--color-topic-4)",
          5: "var(--color-topic-5)",
          6: "var(--color-topic-6)",
          7: "var(--color-topic-7)",
          8: "var(--color-topic-8)",
        },
        "comment-accent": "var(--color-comment-accent)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Söhne",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["13px", "20px"],
        base: ["14px", "22px"],
        md: ["15px", "24px"],
        lg: ["18px", "26px"],
        xl: ["22px", "30px"],
        "2xl": ["28px", "36px"],
        "3xl": ["36px", "44px"],
        "4xl": ["48px", "56px"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
      },
      letterSpacing: {
        body: "-0.01em",
        heading: "-0.02em",
        label: "0.04em",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "6px",
        lg: "10px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(17, 17, 17, 0.04)",
        md: "0 2px 8px rgba(17, 17, 17, 0.06)",
        lg: "0 8px 24px rgba(17, 17, 17, 0.08)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "200ms",
        slow: "400ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
