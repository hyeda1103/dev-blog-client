import { GetServerSideProps } from 'next'
import axios from 'axios'

import { API } from '@/config';
import * as T from '@/types';
import PostList from '@/components/organisms/postList';
import Section from '@/components/organisms/section';
import OneColumn from '@/components/templates/oneColumn';
import DirectTo from '@/components/molecules/directTo';

interface Props {
  projectPosts: Array<T.Post>
  numOfProjects: number
  devPosts: Array<T.Post>
  numOfDevPosts: number
  dailyPosts: Array<T.Post>
  numOfDailyPosts: number
}

function HomePage({
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
        contents={<PostList posts={devPosts} />}
      />
      <Section
        title='일상'
        link={<DirectTo NofNewPost={numOfDailyPosts} link={T.Page.DAILY} />}
        contents={<PostList posts={dailyPosts} />}
      />
      <Section
        title='사이드 프로젝트'
        link={<DirectTo NofNewPost={numOfProjects} link={T.Page.SIDE_PROJECT} />}
        contents={<PostList posts={projectPosts} />}
      />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`)
    const projectList = postList.data.filter((post: T.Post) => post.type === T.PostType.PROJECT)
    const numOfProjects = projectList?.length || 0;  
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DEV)
    const numOfDevPosts = devPostList?.length || 0;
    const dailyPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DAILY)
    const numOfDailyPosts = dailyPostList?.length || 0;
    
    return {
      props: {
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
