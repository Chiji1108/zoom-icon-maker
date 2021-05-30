import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

//TODO: lazyで読み込む
import "@fontsource/material-icons";
import "@fontsource/noto-sans-jp";
import "@fontsource/dotgothic16";
import "@fontsource/shippori-mincho";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
