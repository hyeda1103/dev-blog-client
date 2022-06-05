import React from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import DOMPurify from "dompurify";
import moment from 'moment';
import 'moment/locale/ko';

import { API } from '@root/config'
import * as T from '@root/types'
import { Header, MainText, Title, TypeWrapper, TagBox, Container } from './styles';
import CategoryItem from '@root/components/molecules/categoryItem';

interface Props {
  post: T.Post
}

function SinglePost({ post }: Props) {
  return (
    <Container>
      <Header>
        <TagBox>
          {post.categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <Title>{post.title}</Title>
        <TypeWrapper>
          {moment(post.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
        </TypeWrapper>
      </Header>
      <MainText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
    </Container>
  )
}

export default SinglePost

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id } = query

  try {
    const res = await axios.get(`${API}/post/${id}`)
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