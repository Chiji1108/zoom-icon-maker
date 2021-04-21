const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "Noto Sans JP", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // TODO
        primary: "#1976D2",
        secondary: "#DD014E",
        action: "#757575",
        disabled: "#BDBDBD",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
