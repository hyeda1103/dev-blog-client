import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Header from '@root/components/organisms/header'
import Footer from '@root/components/organisms/footer'
import { Main } from './styles'
import PostHeader from '@root/components/molecules/postHeader'

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
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {router.asPath === '/admin/post/create' && <PostHeader />}
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
