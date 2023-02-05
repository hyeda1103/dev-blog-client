import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";

import Layout from "@/components/templates/layout";
import { darkTheme, GlobalStyles, lightTheme } from "@/styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const darkmode = useDarkMode(true);
  const theme = darkmode.value ? darkTheme : lightTheme;

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isMounted && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ThemeProvider>
  );
}
export default MyApp;
