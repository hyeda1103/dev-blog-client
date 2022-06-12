import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

import CategoryItem from '@root/components/molecules/categoryItem/index';
import StatusTag from '@root/components/atoms/statusTag';
import DateTag from '@root/components/atoms/dateTag';
import * as T from '@root/types'
import { API } from '@root/config';
import { Details, Header, GitHubIcon, WebIcon, Container, TagBox, Title, Footer, TypeWrapper, ClickIcon, ViewWrapper, LinkWrapper } from './styles';

interface Props {
  slug?: string
  post: T.Post
  allPosts: Array<T.Post>
  setAllPosts: any
}

function ProjectItem({ slug, post, allPosts, setAllPosts }: Props) {
  const router = useRouter()

  const handleClick: MouseEventHandler = async (e) => {
    e.preventDefault()
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
          <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />{post.githubLink}
          </a>
          <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <WebIcon />{post.webLink}
          </a>
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
