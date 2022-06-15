import { GetServerSideProps } from 'next'
import axios from 'axios'

import { API } from '@root/config';
import * as T from '@root/types';
import PostList from '@root/components/organisms/postList';
import OneColumn from '@root/components/templates/oneColumn';
import Section from '@root/components/organisms/section';

interface Props {
  devPosts: Array<T.Post>
}

function DevPage({ devPosts }: Props) {
  return (
    <OneColumn>
      <Section
        title="개발"
        logline={`개발에 대하여 총 ${devPosts.length}개의 글이 작성되었습니다`}
        contents={<PostList posts={devPosts} />}
      />
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

export default DevPage