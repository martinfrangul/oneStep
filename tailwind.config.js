/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundSM: "url('/src/assets/bg-app-sm.jpg')",
        backgroundLG: "url('/src/assets/bg-app-lg.jpg')",
      },
      // PERSONALIZE YOUR COLORS HERE!
      colors: {
        primary: "#",
        secondary: "#C8E8E3",
        textLogo: "#155263",
        bgW: "#D8D8DD",
        btnControl: "#FDFDAC",
        bgSR: "#D8E6C6",
        bgLR: "#f68986",
        other: "#",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    darkTheme: false,
  },
};
