import React, { MouseEventHandler } from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import 'moment/locale/ko';

import * as T from '@root/types'
import CategoryItem from '@root/components/molecules/categoryItem/index';
import { API } from '@root/config';
import { Details, Header, Description, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper } from './styles';
import getFirstSentence from '@root/helpers/getFirstSentence';
import { useRouter } from 'next/router';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: any
}

function PostItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter()
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    router.push(`/daily-dev/${post._id}`)
    axios.put(`${API}/click-count`, { postId: post._id });
  }

  const text = getFirstSentence(post.description)
  return (
    <Container onClick={handleClick}>
      <Header>
        <Title>{post.title}</Title>
        <TypeWrapper>
          {moment(post.createdAt).fromNow()}
        </TypeWrapper>                      
      </Header>
      <Details>
        <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      </Details>
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
