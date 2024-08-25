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
      // colors: {
      //   primary: "#",
      //   success: "#",
      //   danger: "#",
      //   info: "#",
      //   warning: "#",
      //   other: "#",
      // },
    },
  },
  plugins: [daisyui],
  daisyui: {
    darkTheme: false,
  },
};
