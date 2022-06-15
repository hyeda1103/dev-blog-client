import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'

import { API } from '@root/config'
import * as T from '@root/types'
import OneColumn from '@root/components/templates/oneColumn'
import PostList from '@root/components/organisms/postList';
import Section from '@root/components/organisms/section'

interface Props {
  projectPosts: Array<T.Post>
}

function ProjectPage({ projectPosts }: Props) {
  return (
    <OneColumn>
      <Section
        title="사이드 프로젝트"
        logline={`사이드 프로젝트에 대하여 총 ${projectPosts.length}개의 글이 작성되었습니다`}
        contents={<PostList posts={projectPosts} />}
      />
    </OneColumn>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postList = await axios.get(`${API}/posts`)
    const projectList = postList.data.filter((post: T.Post) => post.type === T.PostType.PROJECT)

    return {
      props: {
        projectPosts: projectList,
      }
    }
  } catch (error) {
    return {
      props:{},
    };
  }
}

export default ProjectPage