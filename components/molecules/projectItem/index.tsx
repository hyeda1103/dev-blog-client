import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import 'moment/locale/ko';

import * as T from '@root/types'
import { Details, Header, GitHubIcon, Container, TagBox, Title, Footer, Description, TypeWrapper, ClickIcon, ViewWrapper, LinkWrapper } from './styles';
import CategoryItem from '@root/components/molecules/categoryItem/index';
import { API } from '@root/config';
import getFirstSentence from '@root/helpers/getFirstSentence';
import StatusTag from '@root/components/atoms/statusTag';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: any
}

function ProjectItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter()

  const handleClick = async (postId: T.Post['_id']) => {
    const res = await axios.put(`${API}/click-count`, { postId })
    router.push(`/side-project/${postId}`)
  }
  const text = getFirstSentence(post.description)
  return (
    <Container onClick={(e) => handleClick(post._id)}>
      <Header>
        <Title>{post.title}</Title>
        <TypeWrapper>
          <StatusTag status={post.status} />
        </TypeWrapper>                      
      </Header>
      <Details>
        <LinkWrapper>
          <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />{post.githubLink}
          </a>
        </LinkWrapper>
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

export default ProjectItem
