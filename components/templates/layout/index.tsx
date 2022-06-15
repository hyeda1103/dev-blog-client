import Head from 'next/head'
import Script from 'next/script'
import Router, { useRouter } from 'next/router'
import { ReactNode } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Header from '@root/components/organisms/header'
import Footer from '@root/components/organisms/footer'
import Meta from '@root/helpers/meta'
import { Main } from './styles'
import * as T from '@root/types'
interface Props {
  children: ReactNode
}

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

export default function Layout({ children }: Props) {
  const router = useRouter()
  const IsPosting = router.asPath === T.Page.POST
  const onAdminPage = router.asPath.startsWith(T.Page.ADMIN)
  
  return (
    <>
      <Meta
        title="해다코의 블로그"
      />
      <Header />
      {IsPosting ? <>{children}</> : <Main>{children}</Main>}
      {!onAdminPage && <Footer />}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js" />
    </>
  )
}
