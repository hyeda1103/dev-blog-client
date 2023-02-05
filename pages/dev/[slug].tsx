import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { css } from "styled-components";

import CategoryItem from "@/components/molecules/categoryItem";
import { API } from "@/config";
import Meta from "@/helpers/meta";
import * as T from "@/types";

import "moment/locale/ko";

const Paper = styled.article`
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 16px 0;
`;

const MainText = styled.div`
  padding: 16px 0 16px;
  line-height: 1.5;

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  s {
    color: ${({ theme }) => theme.disabled};
  }

  u {
    text-underline-offset: 2px;
  }

  a {
    color: ${({ theme }) => theme.hyperlink.default};
  }

  li {
    margin-left: 20px;
  }

  li.ql-indent-1 {
    margin-left: 40px;
  }

  pre.ql-syntax {
    border-radius: 8px;
    padding: 12px 20px;
    font-family: consolas;
    overflow-x: scroll;
  }

  img {
    @media only screen and (max-width: 840px) {
      width: 100%;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 1rem 0;
`;

const TypeWrapper = styled.div`
  display: flex;
  font-size: 14px;
`;

const TagBox = styled.div`
  box-sizing: border-box;
  padding-top: 16px;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  margin: 24px 0;
`;

const Button = styled.button<{
  isVisible: boolean;
  arrowOnLeft: boolean;
}>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.typePrimary};
  color: ${({ theme }) => theme.typePrimary};
  background: ${({ theme }) => theme.bodyBackground};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  display: grid;
  grid-template-columns: ${({ arrowOnLeft }) => (arrowOnLeft ? "32px auto" : "auto 32px")};
  align-items: center;
  cursor: pointer;

  svg {
    margin: auto 0;
    color: ${({ theme }) => theme.bodyBackground};
  }

  span {
    position: relative;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: inherit;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: left;
    margin: 12px 8px;
  }
`;

const ArrowIcon = css`
  font-size: 32px;
  background: ${({ theme }) => theme.typePrimary};
  color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
`;

export const RightArrow = styled(IoIosArrowForward)`
  ${ArrowIcon};
`;

export const LeftArrow = styled(IoIosArrowBack)`
  ${ArrowIcon};
`;

interface Props {
  post: T.Post;
  prev: T.Post | undefined;
  next: T.Post | undefined;
}

export default function SinglePostPage({ post, prev, next }: Props) {
  const router = useRouter();
  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        keywords={post.categories.join(" ")}
        ogTitle={post.title}
      />
      <Paper>
        <Header>
          <Title>{post.title}</Title>
          <TypeWrapper>
            {moment(post.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
          </TypeWrapper>
        </Header>
        <TagBox>
          {post.categories?.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <MainText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
      </Paper>
      <Nav>
        <Button
          arrowOnLeft={true}
          onClick={() => router.push(`/dev/${prev?.slug}`)}
          isVisible={!!prev}
        >
          <LeftArrow />
          <span>{prev?.title}</span>
        </Button>
        <Button
          arrowOnLeft={false}
          onClick={() => router.push(`/dev/${next?.slug}`)}
          isVisible={!!next}
        >
          <span>{next?.title}</span>
          <RightArrow />
        </Button>
      </Nav>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { slug } = query;

  try {
    const postList = await axios.get(`${API}/posts`);
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DEV);

    const res = await axios.get(encodeURI(`${API}/post/${slug}`));
    const idx = devPostList.findIndex((post: T.Post) => post._id === res.data._id);

    const prev = idx - 1 < 0 ? null : devPostList[idx - 1];
    const next = idx + 1 < devPostList.length ? devPostList[idx + 1] : null;

    return {
      props: {
        post: res.data,
        prev,
        next,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
