/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      "light-lavender": "#F5EFFF",
      lavender: "#A594F9",
      "lavender-dark": "#7A6ACD",
      "indigo-light": "#5F67EC",
      "lavender-pale": "#E5D9F2",
      "indigo-bold": "#7358FC",
    },
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
