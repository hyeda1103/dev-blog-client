import React from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import DOMPurify from "dompurify";
import styled, { css } from 'styled-components'
import moment from 'moment';
import 'moment/locale/ko';

import { API } from '@root/config'
import * as T from '@root/types'
import CategoryItem from '@root/components/molecules/categoryItem';
import { VscGithubInverted, VscWindow } from 'react-icons/vsc';

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
  padding: 32px 0;
  line-height: 1.8;

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
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 32px 0 16px;
`;

const TypeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
`;

const TagBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px 0;

  a {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => theme.hyperlink.default};
  }
`;

const Icon = css`
  color: ${({ theme }) => theme.hyperlink.default};
  vertical-align: middle;
  font-size: 18px;
  margin-right: 8px;
`;

const GitHubIcon = styled(VscGithubInverted)`
  ${Icon}
`;

const WebIcon = styled(VscWindow)`
  ${Icon}
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
        <LinkWrapper>
          <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />{post.githubLink}
          </a>
          <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
            <WebIcon />{post.webLink}
          </a>
        </LinkWrapper>

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