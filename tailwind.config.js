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
