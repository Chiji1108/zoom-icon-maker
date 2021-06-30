import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { darken, lighten } from "polished";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Head from "next/head";

const BRAND_COLOR = "#0b93f6";

const theme = extendTheme({
  colors: {
    brand: {
      400: lighten(0.1, BRAND_COLOR),
      500: BRAND_COLOR,
      600: darken(0.1, BRAND_COLOR),
      700: darken(0.2, BRAND_COLOR),
    },
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Zoomアイコンメーカー</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={BRAND_COLOR} />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
