import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '@root/config'
import * as T from '@root/types'
import Section from '@root/components/organisms/section';
import PostList from '@root/components/organisms/postList';
import OneColumn from '@root/components/templates/oneColumn';

interface Props {
  slug: string
  category: T.Category
  posts: Array<T.Post>
  numOfPosts: number
  postsLimit: number
  postSkip: number
}

function SingleCategoryPage({ slug, category, posts, numOfPosts, postsLimit, postSkip }: Props) {
  const [allPosts, setAllPosts] = useState<Array<T.Post>>(posts)
  const [limit, setLimit] = useState(postsLimit);
  const [skip, setSkip] = useState(postSkip)
  const [size, setSize] = useState(numOfPosts)

  useEffect(() => {
    setAllPosts(posts)
    setSkip(postSkip)
    setSize(numOfPosts)
    setLimit(postsLimit)
  }, [slug, posts, postSkip, numOfPosts, postsLimit])
  
  const loadMore = async () => {
    let toSkip = skip + limit
    setSkip(toSkip)
    const res = await axios.post(encodeURI(`${API}/category/${slug}`), { skip: toSkip, limit })
    setAllPosts([...allPosts, ...res.data.posts])
    setSize(res.data.posts.length)
  }
  
  const postList = (() => {
    return (
      <InfiniteScroll
        dataLength={allPosts.length}
        next={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<></>}
        endMessage={<></>}
      >
        <PostList posts={allPosts} />
      </ InfiniteScroll>
    )
  })()
  return (
    <OneColumn>
      <Section
        title={`${category.name}`}
        logline={`${category.name}에 대해 총 ${allPosts.length}개의 글이 작성되었습니다`}
        contents={postList}
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