import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/material-icons";
// import "@fontsource/noto-sans-jp/100.css";
// import "@fontsource/noto-sans-jp/300.css";
// import "@fontsource/noto-sans-jp/400.css";
// import "@fontsource/noto-sans-jp/500.css";
// import "@fontsource/noto-sans-jp/700.css";
// import "@fontsource/noto-sans-jp/900.css";
// import "@fontsource/dotgothic16";
// import "@fontsource/shippori-mincho/400.css";
// import "@fontsource/shippori-mincho/500.css";
// import "@fontsource/shippori-mincho/600.css";
// import "@fontsource/shippori-mincho/700.css";
// import "@fontsource/shippori-mincho/800.css";
// import "@fontsource/kosugi-maru";

import * as nextImage from "next/image";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: ({ layout, objectFit, ...props }) => (
    <img
      {...props}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  ),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const decorators = [
  (Story) => (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  ),
];
