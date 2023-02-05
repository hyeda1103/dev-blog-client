import Head from "next/head";

interface Props {
  title: string;
  keywords?: string;
  description?: string;
  ogTitle?: string;
  ogImage?: string;
}

const Meta = ({ title, keywords, description, ogTitle, ogImage }: Props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta charSet="utf-8"></meta>
      <link rel="icon" href="/favicon.ico"></link>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/railscasts.min.css"
      />
    </Head>
  );
};

Meta.defaultProps = {
  title: "해다코의 블로그",
  keywords: "해다코, 블로그, 개발, 일상, 사이드 프로젝트",
  description: "개발하는 일상을 기록하는 해다코네 블로그입니다",
  ogTitle: "해다코의 블로그",
  ogImage:
    "https://dev-blog-for-ten.s3.ap-northeast-2.amazona…com/post/c7ae4d73-7495-4e35-bfe3-9b3615c67758.gif",
};

export default Meta;
