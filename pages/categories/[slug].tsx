import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '@/config'
import * as T from '@/types'
import Section from '@/components/organisms/section';
import PostList from '@/components/organisms/postList';
import OneColumn from '@/components/templates/oneColumn';

interface Props {
  slug: string
  category: T.Category
  posts: Array<T.Post>
  numOfPosts: number
  postsLimit: number
  postSkip: number
}

function SingleCategoryPage({ category, posts }: Props) {
  return (
    <OneColumn>
      <Section
        title={`${category.name}`}
        logline={`${category.name}에 대해 총 ${posts?.length}편의 글이 작성되었습니다`}
        contents={<PostList posts={posts} />}
      />
    </OneColumn>
  )
}

export default SingleCategoryPage

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  let skip = 0
  let limit = 3
  const { slug } = query
  
  const all = await axios.post(encodeURI(`${API}/category/${slug}`))

  const res = await axios.post(encodeURI(`${API}/category/${slug}`), { skip, limit })
  return {
    props: {
      slug,
      category: res.data.category,
      posts: res.data.posts,
      numOfPosts: all.data.posts.length,
      postsLimit: limit,
      postSkip: skip,
    }
  }
}
