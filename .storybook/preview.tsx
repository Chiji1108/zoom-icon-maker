import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/material-icons";

import { QueryClient, QueryClientProvider } from "react-query";

import * as nextImage from "next/image";

const queryClient = new QueryClient();

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: ({ layout, objectFit, ...props }) => (
    <img
      {...props}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  ),
});

import { addDecorator } from "@storybook/react";
import { initializeWorker, mswDecorator } from "msw-storybook-addon";

initializeWorker();
addDecorator(mswDecorator);

import { handlers } from "../src/mocks/handlers";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: handlers,
};
export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    </QueryClientProvider>
  ),
];
