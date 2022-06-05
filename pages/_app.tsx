import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import useDarkMode from 'use-dark-mode'

import { lightTheme, darkTheme, GlobalStyles } from '@root/styles/theme'
import Layout from '@root/components/templates/layout'

function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  const darkmode = useDarkMode(true)
  const theme = darkmode.value ? darkTheme : lightTheme

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isMounted &&
        <Layout>
          <Component {...pageProps} />
        </Layout>
      }
    </ThemeProvider>
  )
}
export default MyApp
