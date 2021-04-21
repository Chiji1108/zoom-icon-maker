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
      color: {
        // TODO
        action: "",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
