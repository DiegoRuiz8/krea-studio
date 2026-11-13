/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: token("ground"),
        surface: token("surface"),
        "surface-raised": token("surface-raised"),
        ink: token("ink"),
        "ink-soft": token("ink-soft"),
        accent: token("accent"),
        "on-accent": token("on-accent"),
        "wa-bg": token("wa-bg"),
        "wa-bar": token("wa-bar"),
        "wa-in": token("wa-in"),
        "wa-out": token("wa-out"),
        "wa-ink": token("wa-ink"),
        "wa-soft": token("wa-soft"),
        "wa-tick": token("wa-tick"),
        "wa-brand": token("wa-brand"),
        "shop-bg": token("shop-bg"),
        "shop-ink": token("shop-ink"),
        "shop-soft": token("shop-soft"),
        "shop-tile": token("shop-tile"),
        "shop-accent": token("shop-accent"),
        "rv-bg": token("rv-bg"),
        "rv-ink": token("rv-ink"),
        "rv-soft": token("rv-soft"),
        "rv-star": token("rv-star"),
        "rv-reply": token("rv-reply"),
        "rv-avatar": token("rv-avatar"),
        "rv-link": token("rv-link"),
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      spacing: {
        gutter: "var(--gutter)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
