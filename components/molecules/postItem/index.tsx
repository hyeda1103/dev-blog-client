import React, { MouseEventHandler } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';

import DateTag from '@root/components/atoms/dateTag';
import CategoryItem from '@root/components/molecules/categoryItem/index';
import * as T from '@root/types'
import { API } from '@root/config';
import {
  Header,
  Description,
  Container,
  TagBox,
  Title,
  Footer,
  TypeWrapper,
  ClickIcon,
  ViewWrapper,
  ContentsWrapper,
} from './styles';

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
    if (post.type === T.PostType.DAILY) {
      router.push(`/daily/${post.slug}`)
    } else if (post.type === T.PostType.DEV) {
      router.push(`/dev/${post.slug}`)
    }
    await axios.put(`${API}/click-count`, { postId: post._id });
  }

  return (
    <Container onClick={handleClick}>
      <Header>
        <Title>{post.title}</Title>
        <TypeWrapper>
          <DateTag endDate={post.createdAt} />
        </TypeWrapper>                      
      </Header>
      <ContentsWrapper>
        <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
      </ContentsWrapper>
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
