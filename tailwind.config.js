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
        sans: ["Instrument Sans", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      spacing: {
        gutter: "var(--gutter)",
      },
      gridTemplateColumns: {
        axis: "var(--axis) minmax(0, 1fr)",
      },
    },
  },
  plugins: [],
};
