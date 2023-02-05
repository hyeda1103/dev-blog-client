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
  devPosts: Array<T.Post>
  dailyPosts: Array<T.Post>
}

function HomePage({
  projectPosts,
  devPosts,
  dailyPosts,
}: Props) {
  return (
    <OneColumn>
      <Section
        title='개발'
        link={<DirectTo link={T.Page.DEV} />}
        contents={<PostList posts={devPosts} />}
      />
      <Section
        title='일상'
        link={<DirectTo link={T.Page.DAILY} />}
        contents={<PostList posts={dailyPosts} />}
      />
      <Section
        title='사이드 프로젝트'
        link={<DirectTo link={T.Page.SIDE_PROJECT} />}
        contents={<PostList posts={projectPosts} />}
      />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`)
    const projectList = postList.data.filter((post: T.Post) => post.type === T.PostType.PROJECT)
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DEV)
    const dailyPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DAILY)
    
    return {
      props: {
        devPosts: devPostList.slice(0, 3),
        projectPosts: projectList.slice(0, 3),
        dailyPosts: dailyPostList.slice(0, 3),
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default HomePage
