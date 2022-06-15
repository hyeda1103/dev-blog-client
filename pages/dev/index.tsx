import { GetServerSideProps } from 'next'
import axios from 'axios'

import { API } from '@root/config';
import * as T from '@root/types';
import PostList from '@root/components/organisms/postList';
import OneColumn from '@root/components/templates/oneColumn';

interface Props {
  devPosts: Array<T.Post>
}

function DailyDevPage({ devPosts }: Props) {
  return (
    <OneColumn>
      <PostList posts={devPosts} />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`)
    const devPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DEV)

    return {
      props: {
        devPosts: devPostList,
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default DailyDevPage