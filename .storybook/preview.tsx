import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/material-icons";
import "@fontsource/noto-sans-jp";
import "@fontsource/dotgothic16";
import "@fontsource/shippori-mincho";

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
