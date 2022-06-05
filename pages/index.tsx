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
        title='개발하는 일상'
        link={<DirectTo text={`${numOfDevPosts}개의 글 모두 보기`} link='/daily-dev' />}
        logline='개발자로 사는 기쁨과 슬픔에 대해 주로 씁니다. (이밖에도) 새로 공부한 기술 스택, 동료에게 전수받은 개발 지식, 자주 구글링하는 이슈, 개발 서적 리뷰 등이 있습니다.'
        contents={<PostList posts={devPosts} />}
      />
      <Section
        title='흥미로운 키워드'
        logline='단 한 번이라도 글을 작성한 키워드라면 모두 여기에 있습니다. 눈길이 가는 키워드를 선택하고 관련한 글을 확인해보세요.'
        contents={<CategoryList categories={categories} />}
      />
      <Section
        title='사이드 프로젝트'
        link={<DirectTo text={`${numOfProjects}개의 글 모두 보기`} link='/daily-dev' />}
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