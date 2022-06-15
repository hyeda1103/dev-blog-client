import React from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import DOMPurify from "dompurify";
import styled from 'styled-components'
import moment from 'moment';
import 'moment/locale/ko';

import { API } from '@root/config'
import * as T from '@root/types'
import CategoryItem from '@root/components/molecules/categoryItem';
import Meta from '@root/helpers/meta';

const Paper = styled.article`
  background: ${({ theme }) => theme.themeWhite};
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 16px 0;
`;

const MainText = styled.div`
  padding: 16px 0 16px;
  line-height: 2;

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
    background: ${({ theme }) => theme.bodyBackground};
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

interface Props {
  post: T.Post
}

function SinglePostPage({ post }: Props) {
  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        keywords={(post.categories).join(' ')}
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
    </>
  )
}

export default SinglePostPage

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { slug } = query

  try {
    const res = await axios.get(encodeURI(`${API}/post/${slug}`))
    return {
      props: {
        post: res.data,
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}