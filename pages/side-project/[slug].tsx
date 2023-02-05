import React from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import DOMPurify from "dompurify";
import styled, { css } from 'styled-components'
import { VscCalendar, VscGithubInverted, VscWindow } from 'react-icons/vsc';
import moment from 'moment';
import 'moment/locale/ko';

import { API } from '@/config'
import * as T from '@/types'
import CategoryItem from '@/components/molecules/categoryItem';
import Meta from '@/helpers/meta';

const Paper = styled.article`
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 16px 0;
`;

const MainText = styled.div`
  padding: 32px 0;
  line-height: 1.5;

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
    border-radius: 8px;
    padding: 12px 20px;
    font-family: consolas;
    overflow-x: scroll;
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

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0.5rem 0;

  a {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => theme.hyperlink.default};
  }
`;

const Icon = css`
  vertical-align: middle;
  font-size: 18px;
  margin-right: 8px;
`;

const CalendarIcon = styled(VscCalendar)`
  ${Icon}
`;

const GitHubIcon = styled(VscGithubInverted)`
  ${Icon}
  color: ${({ theme }) => theme.hyperlink.default};
`;

const WebIcon = styled(VscWindow)`
  ${Icon}
  color: ${({ theme }) => theme.hyperlink.default};
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
            <CalendarIcon />{moment(post.startDate).format("YYYY년 MM월")} → {moment(post.endDate).format("YYYY년 MM월")}
          </TypeWrapper>
          <LinkWrapper>
            <a href={post.githubLink} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />{post.githubLink}
            </a>
            <a href={post.webLink} target="_blank" rel="noopener noreferrer">
              <WebIcon />{post.webLink}
            </a>
          </LinkWrapper>
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
