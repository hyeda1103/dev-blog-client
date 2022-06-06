import React, { MouseEventHandler } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/ko';

import CategoryItem from '@root/components/molecules/categoryItem/index';
import * as T from '@root/types'
import { API } from '@root/config';
import { Header, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper } from './styles';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: any
}

function PostItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter()
  const handleClick: MouseEventHandler = async (e) => {
    e.preventDefault()
    router.push(`/daily-dev/${post.slug}`)
    await axios.put(`${API}/click-count`, { postId: post._id });
  }

  return (
    <Container onClick={handleClick}>
      <Header>
        <Title>{post.title}</Title>
        <TypeWrapper>
          {moment(post.createdAt).fromNow()}
        </TypeWrapper>                      
      </Header>
      <Footer>
        <TagBox>
          {post.categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <ViewWrapper>
          {post.clicks} clicks
          <ClickIcon />
        </ViewWrapper>          
      </Footer>
    </Container>
  )
}

export default PostItem
