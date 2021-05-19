// import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { ChakraProvider } from "@chakra-ui/react";

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
      <Provider store={store}>
        <Story />
      </Provider>
    </ChakraProvider>
  ),
];
