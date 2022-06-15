import { GetServerSideProps } from 'next'
import axios from 'axios'

import { API } from '@root/config';
import * as T from '@root/types';
import PostList from '@root/components/organisms/postList';
import OneColumn from '@root/components/templates/oneColumn';

interface Props {
  dailyPosts: Array<T.Post>
}

function DailyPage({ dailyPosts }: Props) {
  return (
    <OneColumn>
      <PostList posts={dailyPosts} />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`)
    const dailyPostList = postList.data.filter((post: T.Post) => post.type === T.PostType.DAILY)

    return {
      props: {
        dailyPosts: dailyPostList,
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default DailyPage