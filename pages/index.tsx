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
  dailyPosts: Array<T.Post>
  numOfDailyPosts: number
}

function HomePage({
  categories,
  projectPosts,
  numOfProjects,
  devPosts,
  numOfDevPosts,
  dailyPosts,
  numOfDailyPosts
}: Props) {
  return (
    <OneColumn>
      <Section
        title='개발'
        link={<DirectTo NofNewPost={numOfDevPosts} link={T.Page.DEV} />}
        logline='오늘 배운 내용 (Today I Learned), 자주 구글링하는 이슈, 개발 서적 리뷰 등에 대한 글입니다'
        contents={<PostList posts={devPosts} />}
      />
      <Section
        title='일상'
        link={<DirectTo NofNewPost={numOfDailyPosts} link={T.Page.DAILY} />}
        logline='오늘 있었던 일에 대한 짧은 글입니다'
        contents={<PostList posts={dailyPosts} />}
      />
      <Section
        title='사이드 프로젝트'
        link={<DirectTo NofNewPost={numOfProjects} link={T.Page.SIDE_PROJECT} />}
        logline='필요 또는 재미를 위해 만들었거나, 돈을 벌어볼 겸 참여한 프로젝트들이 있습니다'
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
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DEV)
    const numOfDevPosts = devPostList.length;
    const dailyPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DAILY)
    const numOfDailyPosts = dailyPostList.length;
    
    return {
      props: {
        categories: categoryList.data,
        devPosts: devPostList.slice(0, 3),
        numOfDevPosts,
        projectPosts: projectList.slice(0, 3),
        numOfProjects,
        dailyPosts: dailyPostList.slice(0, 3),
        numOfDailyPosts
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default HomePage