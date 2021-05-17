import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { StrictMode } from "react";

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
    <StrictMode>
      <Provider store={store}>
        <Story />
      </Provider>
    </StrictMode>
  ),
];
