import { ReactNode } from "react";
import Router, { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";

import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
import Meta from "@/helpers/meta";
import * as T from "@/types";

import { Main } from "./styles";

import "nprogress/nprogress.css";
interface Props {
  children: ReactNode;
}

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

export default function Layout({ children }: Props) {
  const router = useRouter();
  const IsPosting = router.asPath === T.Page.POST;
  const onAdminPage = router.asPath.startsWith(T.Page.ADMIN);

  return (
    <>
      <Meta title="해다코의 블로그" />
      <Header />
      {IsPosting ? <>{children}</> : <Main>{children}</Main>}
      {!onAdminPage && <Footer />}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js" />
    </>
  );
}
