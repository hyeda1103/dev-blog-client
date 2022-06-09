import Head from 'next/head'
import Script from 'next/script'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Header from '@root/components/organisms/header'
import Footer from '@root/components/organisms/footer'
import { Main } from './styles'
import * as T from '@root/types'
interface Props {
  title?: string
  keywords?: string
  description?: string
  children: React.ReactNode
}

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

export default function Layout({ title, keywords, description, children }: Props) {
  const router = useRouter()
  const IsPosting = router.asPath === T.Page.POST
  const onAdminPage = router.asPath.startsWith(T.Page.ADMIN)
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/railscasts.min.css" />
      </Head>
      <Header />
      {IsPosting ? <>{children}</> : <Main>{children}</Main>}
      {!onAdminPage && <Footer />}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js" />
    </>
  )
}
