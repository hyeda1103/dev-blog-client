import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

import CategoryItem from '@/components/molecules/categoryItem/index';
import StatusTag from '@/components/atoms/statusTag';
import DateTag from '@/components/atoms/dateTag';
import * as T from '@/types'
import { API } from '@/config';
import { Details, Header, GitHubIcon, WebIcon, HyperLink, HyperText, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper, LinkWrapper } from './styles';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: Dispatch<SetStateAction<T.Post[]>>
}

function ProjectItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter()

  const handleClick: MouseEventHandler = async (e) => {
    if ((e.target as HTMLElement).tagName === 'A') return;
    e.preventDefault()
    e.stopPropagation()
    
    router.push(`/side-project/${post.slug}`)
    await axios.put(`${API}/click-count`, { postId: post._id })
  }

  return (
    <Container onClick={handleClick}>
      <Header>
        <Title>{post.title}</Title>
        <TypeWrapper>
          {(post.startDate && post.endDate) && <DateTag startDate={post.startDate} endDate={post.endDate} />}
          <StatusTag status={post.status} />
        </TypeWrapper>                      
      </Header>
      <Details>
        <LinkWrapper>
          <HyperLink href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
            <HyperText>{post.githubLink}</HyperText>
          </HyperLink>
          <HyperLink href={post.webLink} target="_blank" rel="noopener noreferrer">
            <WebIcon />
            <HyperText>{post.webLink}</HyperText>
          </HyperLink>
        </LinkWrapper>
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
