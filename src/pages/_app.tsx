import type { AppProps } from "next/app";
// import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
