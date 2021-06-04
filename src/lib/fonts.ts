import "@fontsource/noto-sans-jp/100.css";
import "@fontsource/noto-sans-jp/300.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/noto-sans-jp/900.css";
import "@fontsource/noto-serif-jp/200.css";
import "@fontsource/noto-serif-jp/300.css";
import "@fontsource/noto-serif-jp/400.css";
import "@fontsource/noto-serif-jp/500.css";
import "@fontsource/noto-serif-jp/600.css";
import "@fontsource/noto-serif-jp/700.css";
import "@fontsource/noto-serif-jp/900.css";
import "@fontsource/m-plus-1p";
import "@fontsource/m-plus-1p/100.css";
import "@fontsource/m-plus-1p/300.css";
import "@fontsource/m-plus-1p/400.css";
import "@fontsource/m-plus-1p/500.css";
import "@fontsource/m-plus-1p/700.css";
import "@fontsource/m-plus-1p/800.css";
import "@fontsource/m-plus-1p/900.css";
import "@fontsource/shippori-mincho/400.css";
import "@fontsource/shippori-mincho/500.css";
import "@fontsource/shippori-mincho/600.css";
import "@fontsource/shippori-mincho/700.css";
import "@fontsource/shippori-mincho/800.css";
import "@fontsource/kosugi-maru";
import "@fontsource/dotgothic16";

export default {
  "san-serif": {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  serif: {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  "Noto Sans JP": {
    weights: ["100", "300", "400", "500", "700", "900"],
    defaultWeight: "400",
    // import: async () => {
    //   // @ts-ignore
    //   await import("@fontsource/noto-sans-jp/100.css");
    //   await import("@fontsource/noto-sans-jp/300.css");
    //   await import("@fontsource/noto-sans-jp/400.css");
    //   await import("@fontsource/noto-sans-jp/500.css");
    //   await import("@fontsource/noto-sans-jp/700.css");
    //   await import("@fontsource/noto-sans-jp/900.css");
    // },
  },
  "Noto Serif JP": {
    weights: ["200", "300", "400", "500", "600", "700", "900"],
    defaultWeight: "400",
  },
  "M PLUS 1p": {
    weights: ["100", "300", "400", "500", "700", "800", "900"],
    defaultWeight: "400",
  },
  "Shippori Mincho": {
    weights: ["400", "500", "600", "700", "800"],
    defaultWeight: "400",
  },

  "Kosugi Maru": {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  DotGothic16: {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
};
