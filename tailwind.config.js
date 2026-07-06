/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundSM: "url('/assets/images/bg-app-sm.jpg')",
        backgroundLG: "url('/assets/images/bg-app-lg.jpg')",
      },
      // PERSONALIZE YOUR COLORS HERE!
      colors: {
        primary: "#FFC1BD",
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
