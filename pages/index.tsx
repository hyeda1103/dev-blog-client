import { GetServerSideProps } from 'next'
import axios from 'axios'

import { API } from '@root/config';
import * as T from '@root/types';
import PostList from '@root/components/organisms/postList';
import Section from '@root/components/organisms/section';
import CategoryList from '@root/components/organisms/categoryList';
import OneColumn from '@root/components/templates/oneColumn';
import DirectTo from '@root/components/molecules/directTo';

interface Props {
  categories: Array<T.Category>
  projectPosts: Array<T.Post>
  numOfProjects: number
  devPosts: Array<T.Post>
  numOfDevPosts: number
}

function HomePage({
  categories,
  projectPosts,
  numOfProjects,
  devPosts,
  numOfDevPosts,
}: Props) {
  return (
    <OneColumn>
      <Section
        title='개발과 일상'
        link={<DirectTo text='모두 보기' link={T.Page.DAILY_DEV} />}
        logline='새로 공부한 기술, 동료에게 전수받은 개발 지식, 자주 구글링하는 이슈, 개발 서적 리뷰, 그리고 개발하는 일상에 대해 씁니다'
        contents={<PostList posts={devPosts} />}
      />
      <Section
        title='흥미로운 키워드'
        logline='언젠가 포스팅을 작성하고 싶은 키워드를 모두 모아두었습니다. 눈길이 가는 키워드를 선택하고 관련한 글을 확인해보세요'
        contents={<CategoryList categories={categories} />}
      />
      <Section
        title='사이드 프로젝트'
        link={<DirectTo text='모두 보기' link={T.Page.SIDE_PROJECT} />}
        logline='일상에 기름칠을 하고 싶을 땐 사이드 프로젝트!'
        contents={<PostList posts={projectPosts} />}
      />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categoryList = await axios.get(`${API}/categories`)
    const postList = await axios.get(`${API}/posts`)
    const projectList = postList.data.filter((post: T.Post) => post.type === T.PostType.PROJECT)
    const numOfProjects = projectList.length;  
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.ARTICLE)
    const numOfDevPosts = devPostList.length;
    
    return {
      props: {
        categories: categoryList.data,
        devPosts: devPostList.slice(0, 3),
        numOfDevPosts,
        projectPosts: projectList.slice(0, 3),
        numOfProjects
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default HomePage