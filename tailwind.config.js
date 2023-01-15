/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "error": "#f43f5e",
      },
      backgroundColor: {
        "primary": "#212121",
        "primary-dark": "#1a1a1a",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f59e0b",
          secondary: "#F000B8",
          accent: "#37CDBE",
          neutral: "#2F2F2F",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
