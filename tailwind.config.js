/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      s: ["14px", "16px"],
      md: ["16px", "24px"],
      mdBold: ["16px", "24px"],
      xBold: ["40px", "48px"],
      lg: ["20px", "24px"],
      titleLg: ["32px", "40px"],
      titleMd: ["24px", "32px"],
    },
    colors: {
      bg00: "#F0F2F5",
      bg01: "#fff",
      gray00: "#2E2F30",
      gray01: "#6E6F70",
      primary: "#1C92FF",
      primaryDark: "#0A78DE",
      border: "rgba(0, 0, 0, 0.05)",
      white: "#fff",
    },
    borderRadius: {
      DEFAULT: "16px",
      button: "24px",
    },
  },
  plugins: [],
};
