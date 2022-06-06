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
  padding: 32px 0 16px;
  line-height: 2;
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
  display: flex;
  justify-content: flex-end;
  gap: 6px;
`;

interface Props {
  post: T.Post
}

function SinglePostPage({ post }: Props) {
  return (
    <Paper>
      <Header>
        <TagBox>
          {post.categories?.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <Title>{post.title}</Title>
        <TypeWrapper>
          {moment(post.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
        </TypeWrapper>
      </Header>
      <MainText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
    </Paper>
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